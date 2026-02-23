
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Prisma DMMF models:');
    const sharedChatModel = prisma._dmmf.modelMap['SharedChat'];
    if (sharedChatModel) {
        console.log('Fields in SharedChat:');
        sharedChatModel.fields.forEach(f => {
            console.log(`- ${f.name} (${f.type}${f.isList ? '[]' : ''})${f.isRequired ? ' [REQUIRED]' : ''}`);
        });
    } else {
        console.log('SharedChat model not found!');
    }
    await prisma.$disconnect();
}

main().catch(console.error);
