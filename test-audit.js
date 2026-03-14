// Node 22 has global fetch
async function testAudit() {
    try {
        const response = await fetch('http://localhost:3000/api/audit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: 'https://google.com' })
        });
        const text = await response.text();
        try {
            const data = JSON.parse(text);
            console.log(JSON.stringify(data, null, 2));
        } catch (e) {
            console.log("Raw Response:", text);
            console.error("JSON Parse Error:", e);
        }
    } catch (err) {
        console.error(err);
    }
}

testAudit();
