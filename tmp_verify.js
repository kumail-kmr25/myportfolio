async function verify() {
    try {
        const endpoints = ['/api/stats', '/api/availability', '/api/skills'];
        for (const endpoint of endpoints) {
            console.log(`Verifying ${endpoint}...`);
            const res = await fetch(`http://localhost:3000${endpoint}`);
            const data = await res.json();
            console.log(`${endpoint} Data:`, JSON.stringify(data, null, 2));
            console.log("-------------------");
        }
    } catch (err) {
        console.error("Verification failed:", err.message);
    }
}

verify();
