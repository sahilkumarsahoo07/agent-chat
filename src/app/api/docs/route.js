// GET /api/docs — Swagger UI Documentation
// Serves a full interactive API documentation page

export async function GET() {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agent-Chat API Documentation</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css">
  <style>
    body { margin: 0; background: #fafafa; }
    .swagger-ui { max-width: 1200px; margin: 0 auto; }
    .swagger-ui .topbar { display: none; }
    #swagger-header {
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      padding: 30px 40px;
      text-align: center;
    }
    #swagger-header h1 { color: #fff; margin: 0; font-family: -apple-system, sans-serif; font-size: 28px; }
    #swagger-header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-family: -apple-system, sans-serif; }
  </style>
</head>
<body>
  <div id="swagger-header">
    <h1>🤖 Agent-Chat API</h1>
    <p>Interactive API Documentation • PostgreSQL Backend • JWT Authentication</p>
  </div>
  <div id="swagger-ui"></div>
  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    const spec = ${JSON.stringify(getOpenAPISpec(), null, 2)};
    SwaggerUIBundle({
      spec,
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
      layout: 'BaseLayout',
      defaultModelsExpandDepth: 1,
      docExpansion: 'list',
    });
  </script>
</body>
</html>`;

    return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
    });
}

function getOpenAPISpec() {
    return {
        openapi: '3.0.3',
        info: {
            title: 'Agent-Chat API',
            version: '1.0.0',
            description: 'Complete REST API for the Agent-Chat application. Supports authentication, conversations, messages, assistants, projects, and sharing.',
        },
        servers: [{ url: 'http://localhost:3000', description: 'Development' }],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        name: { type: 'string' },
                        avatar: { type: 'string', nullable: true },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                },
                Conversation: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        modelId: { type: 'string' },
                        modelName: { type: 'string' },
                        isPinned: { type: 'boolean' },
                        assistantId: { type: 'string', nullable: true },
                        projectId: { type: 'string', nullable: true },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                Message: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        role: { type: 'string', enum: ['user', 'assistant', 'system'] },
                        content: { type: 'string' },
                        reasoning: { type: 'string', nullable: true },
                        modelName: { type: 'string', nullable: true },
                        parentId: { type: 'string', nullable: true },
                        siblingIds: { type: 'array', items: { type: 'string' } },
                        sources: { type: 'object', nullable: true },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                },
                Assistant: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        description: { type: 'string', nullable: true },
                        instructions: { type: 'string', nullable: true },
                        model: { type: 'string' },
                        temperature: { type: 'number' },
                        icon: { type: 'string', nullable: true },
                        color: { type: 'string', nullable: true },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                },
                Project: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        instructions: { type: 'string', nullable: true },
                        color: { type: 'string', nullable: true },
                        icon: { type: 'string', nullable: true },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: false },
                        error: { type: 'string' },
                    },
                },
                Success: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: true },
                        data: { type: 'object' },
                    },
                },
            },
        },
        security: [{ BearerAuth: [] }],
        paths: {
            // ─── AUTH ───
            '/api/auth/register': {
                post: {
                    tags: ['Authentication'],
                    summary: 'Register a new user',
                    security: [],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['email', 'name', 'password'],
                                    properties: {
                                        email: { type: 'string', format: 'email', example: 'user@example.com' },
                                        name: { type: 'string', example: 'John Doe' },
                                        password: { type: 'string', minLength: 6, example: 'password123' },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        201: { description: 'User created successfully with JWT token' },
                        409: { description: 'Email already exists' },
                    },
                },
            },
            '/api/auth/login': {
                post: {
                    tags: ['Authentication'],
                    summary: 'Login and get JWT token',
                    security: [],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['email', 'password'],
                                    properties: {
                                        email: { type: 'string', format: 'email', example: 'user@example.com' },
                                        password: { type: 'string', example: 'password123' },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        200: { description: 'Login successful, returns user + JWT token' },
                        401: { description: 'Invalid credentials' },
                    },
                },
            },
            '/api/auth/me': {
                get: {
                    tags: ['Authentication'],
                    summary: 'Get current user profile',
                    responses: {
                        200: { description: 'Current user profile with counts' },
                        401: { description: 'Invalid or expired token' },
                    },
                },
            },
            // ─── CONVERSATIONS ───
            '/api/conversations': {
                get: {
                    tags: ['Conversations'],
                    summary: 'List all conversations',
                    parameters: [
                        { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
                        { name: 'limit', in: 'query', schema: { type: 'integer', default: 50 } },
                        { name: 'projectId', in: 'query', schema: { type: 'string' }, description: 'Filter by project' },
                        { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Search by title' },
                    ],
                    responses: {
                        200: { description: 'Paginated list of conversations' },
                    },
                },
                post: {
                    tags: ['Conversations'],
                    summary: 'Create a new conversation',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: { type: 'string', example: 'New Chat' },
                                        modelId: { type: 'string', example: 'gpt-4o' },
                                        modelName: { type: 'string', example: 'GPT-4o' },
                                        assistantId: { type: 'string', nullable: true },
                                        projectId: { type: 'string', nullable: true },
                                    },
                                },
                            },
                        },
                    },
                    responses: { 201: { description: 'Conversation created' } },
                },
            },
            '/api/conversations/{id}': {
                get: {
                    tags: ['Conversations'],
                    summary: 'Get a conversation with all messages',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                    responses: { 200: { description: 'Conversation with messages' }, 404: { description: 'Not found' } },
                },
                put: {
                    tags: ['Conversations'],
                    summary: 'Update a conversation',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: { type: 'string' },
                                        isPinned: { type: 'boolean' },
                                        modelId: { type: 'string' },
                                        modelName: { type: 'string' },
                                        projectId: { type: 'string', nullable: true },
                                    },
                                },
                            },
                        },
                    },
                    responses: { 200: { description: 'Updated' }, 404: { description: 'Not found' } },
                },
                delete: {
                    tags: ['Conversations'],
                    summary: 'Delete a conversation',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                    responses: { 200: { description: 'Deleted' }, 404: { description: 'Not found' } },
                },
            },
            '/api/conversations/{id}/messages': {
                get: {
                    tags: ['Messages'],
                    summary: 'List all messages in a conversation',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                    responses: { 200: { description: 'Array of messages' } },
                },
                post: {
                    tags: ['Messages'],
                    summary: 'Create a new message',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['role', 'content'],
                                    properties: {
                                        role: { type: 'string', enum: ['user', 'assistant', 'system'] },
                                        content: { type: 'string' },
                                        reasoning: { type: 'string' },
                                        modelName: { type: 'string' },
                                        parentId: { type: 'string' },
                                        siblingIds: { type: 'array', items: { type: 'string' } },
                                        attachmentName: { type: 'string' },
                                        attachmentType: { type: 'string' },
                                        sources: { type: 'object' },
                                    },
                                },
                            },
                        },
                    },
                    responses: { 201: { description: 'Message created' } },
                },
            },
            // ─── ASSISTANTS ───
            '/api/assistants': {
                get: {
                    tags: ['Assistants'],
                    summary: 'List all assistants',
                    responses: { 200: { description: 'Array of assistants' } },
                },
                post: {
                    tags: ['Assistants'],
                    summary: 'Create an assistant',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['name'],
                                    properties: {
                                        name: { type: 'string', example: 'Code Helper' },
                                        description: { type: 'string' },
                                        instructions: { type: 'string' },
                                        model: { type: 'string', example: 'gpt-4o' },
                                        temperature: { type: 'number', example: 0.7 },
                                        icon: { type: 'string' },
                                        color: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                    responses: { 201: { description: 'Assistant created' } },
                },
            },
            '/api/assistants/{id}': {
                get: {
                    tags: ['Assistants'],
                    summary: 'Get an assistant',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                    responses: { 200: { description: 'Assistant details' } },
                },
                put: {
                    tags: ['Assistants'],
                    summary: 'Update an assistant',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        description: { type: 'string' },
                                        instructions: { type: 'string' },
                                        model: { type: 'string' },
                                        temperature: { type: 'number' },
                                    },
                                },
                            },
                        },
                    },
                    responses: { 200: { description: 'Updated' } },
                },
                delete: {
                    tags: ['Assistants'],
                    summary: 'Delete an assistant',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                    responses: { 200: { description: 'Deleted' } },
                },
            },
            // ─── PROJECTS ───
            '/api/projects': {
                get: {
                    tags: ['Projects'],
                    summary: 'List all projects',
                    responses: { 200: { description: 'Array of projects with conversation counts' } },
                },
                post: {
                    tags: ['Projects'],
                    summary: 'Create a project',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['name'],
                                    properties: {
                                        name: { type: 'string', example: 'My Project' },
                                        instructions: { type: 'string' },
                                        color: { type: 'string' },
                                        icon: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                    responses: { 201: { description: 'Project created' } },
                },
            },
            '/api/projects/{id}': {
                get: {
                    tags: ['Projects'],
                    summary: 'Get a project with its conversations',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                    responses: { 200: { description: 'Project details with conversations' } },
                },
                put: {
                    tags: ['Projects'],
                    summary: 'Update a project',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        instructions: { type: 'string' },
                                        color: { type: 'string' },
                                        icon: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                    responses: { 200: { description: 'Updated' } },
                },
                delete: {
                    tags: ['Projects'],
                    summary: 'Delete a project',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                    responses: { 200: { description: 'Deleted' } },
                },
            },
            '/api/projects/{id}/chats': {
                post: {
                    tags: ['Projects'],
                    summary: 'Add a conversation to a project',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['conversationId'],
                                    properties: { conversationId: { type: 'string' } },
                                },
                            },
                        },
                    },
                    responses: { 200: { description: 'Chat added to project' } },
                },
                delete: {
                    tags: ['Projects'],
                    summary: 'Remove a conversation from a project',
                    parameters: [
                        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
                        { name: 'conversationId', in: 'query', required: true, schema: { type: 'string' } },
                    ],
                    responses: { 200: { description: 'Chat removed from project' } },
                },
            },
            // ─── SHARE ───
            '/api/share': {
                post: {
                    tags: ['Sharing'],
                    summary: 'Create a share link for a conversation',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['conversationId'],
                                    properties: {
                                        conversationId: { type: 'string' },
                                        expiresInDays: { type: 'integer', description: 'Optional. Link expires after N days' },
                                    },
                                },
                            },
                        },
                    },
                    responses: { 201: { description: 'Share link created with token and URL' } },
                },
            },
            '/api/share/{token}': {
                get: {
                    tags: ['Sharing'],
                    summary: 'Get shared chat (public, no auth)',
                    security: [],
                    parameters: [{ name: 'token', in: 'path', required: true, schema: { type: 'string' } }],
                    responses: {
                        200: { description: 'Shared chat with messages' },
                        404: { description: 'Share not found' },
                        410: { description: 'Share link expired' },
                    },
                },
            },
        },
    };
}
