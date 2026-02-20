const http = require('http');

async function testDelete() {
    console.log("Starting API delete test...");

    const loginRes = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'ka6307464@gmail.com', password: 'admin123' })
    });

    if (!loginRes.ok) {
        console.error("Login failed:", await loginRes.text());
        return;
    }
    const cookieHeader = loginRes.headers.get('set-cookie');
    const cookie = cookieHeader ? cookieHeader.split(';')[0] : '';
    console.log("Login success. Cookie:", cookie);

    const getRes = await fetch('http://localhost:3000/api/contact', {
        headers: { 'Cookie': cookie }
    });

    if (!getRes.ok) {
        console.error("GET failed:", await getRes.text());
        return;
    }

    const messages = await getRes.json();
    console.log(`Fetched ${messages.length} messages.`);

    if (messages.length === 0) {
        console.log("No messages to delete.");
        return;
    }

    const idToDelete = messages[0].id;
    console.log(`Attempting to delete message ${idToDelete}`);

    const deleteRes = await fetch(`http://localhost:3000/api/admin/contact/${idToDelete}`, {
        method: 'DELETE',
        headers: { 'Cookie': cookie }
    });

    const body = await deleteRes.text();
    console.log(`DELETE status: ${deleteRes.status} ${deleteRes.statusText}`);
    console.log("DELETE response:", body);

    const verifyRes = await fetch('http://localhost:3000/api/contact', {
        headers: { 'Cookie': cookie }
    });
    const remainingMessages = await verifyRes.json();
    console.log(`Remaining messages: ${remainingMessages.length}`);
}

testDelete().catch(console.error);
