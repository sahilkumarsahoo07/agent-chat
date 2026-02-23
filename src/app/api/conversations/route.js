import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth'; // Assuming this helper exists and works
import { success, error } from '@/lib/api-helpers';

// GET /api/conversations
// List all conversations for the authenticated user
export async function GET(request) {
    try {
        const auth = getAuthUser(request);
        if (!auth) {
            return error('Unauthorized', 401);
        }

        const { userId } = auth;

        const conversations = await prisma.conversation.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                updatedAt: 'desc',
            },
            select: {
                id: true,
                title: true,
                modelId: true,
                modelName: true,
                isPinned: true,
                assistantId: true,
                isLocked: true,
                activePath: true,
                updatedAt: true,
                createdAt: true,
                projectId: true,
                messages: {
                    take: 1,
                    orderBy: {
                        createdAt: 'desc'
                    },
                    select: {
                        createdAt: true
                    }
                }
            },
        });

        return success(conversations);
    } catch (err) {
        console.error('Error fetching conversations:', err);
        return error('Internal Server Error', 500);
    }
}

// POST /api/conversations
// Create a new conversation
export async function POST(request) {
    try {
        const auth = getAuthUser(request);
        if (!auth) {
            return error('Unauthorized', 401);
        }

        const { userId } = auth;
        const body = await request.json();
        const { title, modelId, modelName, assistantId, messages, allMessages, activePath: requestPath, projectId } = body;

        // Perform transaction to create conversation and initial messages if provided
        const result = await prisma.$transaction(async (tx) => {
            // 1. Create Conversation
            const conversation = await tx.conversation.create({
                data: {
                    userId,
                    title: title || 'New Chat',
                    modelId,
                    modelName,
                    assistantId,
                    projectId
                },
            });

            let activePath = [];

            // 2. Create Messages
            if (allMessages && allMessages.length > 0) {
                const idMap = new Map();
                const createdMessages = [];

                // Pass 1: Create all messages to get new IDs
                for (const msg of allMessages) {
                    const createdMsg = await tx.message.create({
                        data: {
                            role: msg.role,
                            content: msg.content,
                            modelName: msg.modelName,
                            reasoning: msg.reasoning,
                            rating: msg.rating,
                            conversationId: conversation.id,
                            attachmentName: msg.attachmentName,
                            attachmentType: msg.attachmentType,
                            attachmentContent: msg.attachmentContent,
                            createdAt: msg.createdAt ? new Date(msg.createdAt) : undefined
                        }
                    });
                    idMap.set(msg.id, createdMsg.id);
                    createdMessages.push({ oldMsg: msg, newId: createdMsg.id });
                }

                // Pass 2: Update relationships (parentId, siblingIds)
                for (const { oldMsg, newId } of createdMessages) {
                    const newParentId = oldMsg.parentId ? idMap.get(oldMsg.parentId) : null;
                    const newSiblingIds = (oldMsg.siblingIds || []).map(sid => idMap.get(sid)).filter(Boolean);

                    if (newParentId || newSiblingIds.length > 0) {
                        await tx.message.update({
                            where: { id: newId },
                            data: {
                                parentId: newParentId,
                                siblingIds: newSiblingIds
                            }
                        });
                    }
                }

                // Pass 3: Map activePath
                if (requestPath && requestPath.length > 0) {
                    activePath = requestPath.map(id => idMap.get(id)).filter(Boolean);
                } else {
                    // Fallback to auto-detecting a path if none provided but we have messages
                    const rootMsg = createdMessages.find(m => !m.oldMsg.parentId);
                    if (rootMsg) {
                        let current = rootMsg;
                        activePath.push(current.newId);
                        // Very simple forward walk to build A path
                        while (true) {
                            const child = createdMessages.find(m => m.oldMsg.parentId === current.oldMsg.id);
                            if (!child) break;
                            activePath.push(child.newId);
                            current = child;
                        }
                    }
                }
            } else if (messages && messages.length > 0) {
                // Legacy Fallback: Creating initial messages flat
                for (const msg of messages) {
                    const createdMsg = await tx.message.create({
                        data: {
                            role: msg.role,
                            content: msg.content,
                            modelName: msg.modelName,
                            conversationId: conversation.id,
                        }
                    });
                    activePath.push(createdMsg.id);
                }
            }

            // Update conversation activePath
            if (activePath.length > 0) {
                await tx.conversation.update({
                    where: { id: conversation.id },
                    data: { activePath }
                });
            }

            // Return conversation WITH filtered messages to avoid extra fetch/duplication
            const finalConv = await tx.conversation.findUnique({
                where: { id: conversation.id },
                include: { messages: true }
            });

            const allMsg = finalConv.messages;
            const path = finalConv.activePath || [];
            const activeMessages = path.map(id => allMsg.find(m => m.id === id)).filter(Boolean);

            return {
                ...finalConv,
                messages: activeMessages,
                allMessages: allMsg
            };
        });

        return success(result, 201);

    } catch (err) {
        console.error('Error creating conversation:', err);
        return error('Internal Server Error', 500);
    }
}
