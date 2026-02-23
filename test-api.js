// Native fetch is available in Node 18+

// Helper for requests
async function request(path, method = 'GET', body = null, token = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    // Use native fetch if available (Node 18+)
    const response = await fetch(`http://localhost:3000/api${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    });

    // Check contentType for JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return { status: response.status, data: await response.json() };
    } else {
        return { status: response.status, text: await response.text() };
    }
}

async function run() {
    console.log('--- Starting API Verification ---');

    const email = `test-${Date.now()}@example.com`;
    const password = 'password123';
    let token = null;
    let userId = null;
    let conversationId = null;
    let messageId = null;

    // 1. Register
    console.log(`\n1. Registering user: ${email}`);
    const regRes = await request('/auth/register', 'POST', { email, name: 'Test User', password });
    if (regRes.status === 200 || regRes.status === 201) {
        console.log('✅ Registration successful:', regRes.data);
        token = regRes.data.data.token;
        userId = regRes.data.data.user.id;
    } else {
        console.error('❌ Registration failed:', regRes);
        // Try login just in case
        console.log('Trying login...');
        const loginRes = await request('/auth/login', 'POST', { email, password });
        if (loginRes.status === 200) {
            token = loginRes.data.data.token;
            console.log('✅ Login successful after fail reg');
        } else {
            return;
        }
    }

    if (!token) {
        console.error('❌ No token obtained. Aborting.');
        return;
    }

    // 2. Create Conversation
    console.log('\n2. Creating conversation...');
    const convRes = await request('/conversations', 'POST', {
        title: 'Test Chat',
        modelId: 'gpt-4o',
        messages: [{ role: 'user', content: 'Hello API' }]
    }, token);

    if (convRes.status === 200 || convRes.status === 201) {
        conversationId = convRes.data.data.id;
        console.log('✅ Conversation created:', conversationId);
    } else {
        console.error('❌ Create conversation failed:', convRes);
        return;
    }

    // 3. Add Message
    console.log('\n3. Adding message...');
    const msgRes = await request('/messages', 'POST', {
        conversationId,
        role: 'user',
        content: 'Second message'
    }, token);

    if (msgRes.status === 200 || msgRes.status === 201) {
        messageId = msgRes.data.data.id;
        console.log('✅ Message added:', messageId);
    } else {
        console.error('❌ Add message failed:', msgRes);
    }

    // 4. Update Conversation Path (Simulate Version Switch)
    console.log('\n4. Updating active path...');
    if (messageId) {
        const updateRes = await request(`/conversations/${conversationId}`, 'PUT', {
            activePath: [messageId] // Just test updating it
        }, token);

        if (updateRes.status === 200) {
            console.log('✅ Active path updated:', updateRes.data.data.activePath);
        } else {
            console.error('❌ Update path failed:', updateRes);
        }
    }

    // 5. List Conversations
    console.log('\n5. Listing conversations...');
    const listRes = await request('/conversations', 'GET', null, token);
    if (listRes.status === 200) {
        console.log(`✅ Conversations found: ${listRes.data.data.length}`);
        const found = listRes.data.data.find(c => c.id === conversationId);
        if (found) console.log('✅ Created conversation is in list.');
        else console.error('❌ Created conversation NOT in list.');
    } else {
        console.error('❌ List conversations failed:', listRes);
    }

    // 6. Delete Conversation
    console.log('\n6. Deleting conversation...');
    const delRes = await request(`/conversations/${conversationId}`, 'DELETE', null, token);
    if (delRes.status === 200) {
        console.log('✅ Conversation deleted.');
    } else {
        console.error('❌ Delete conversation failed:', delRes);
    }

    console.log('\n--- API Verification Complete ---');
}

run().catch(console.error);
