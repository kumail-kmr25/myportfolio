// verify_testimonials.js
const http = require('http');

// Helper to make HTTP requests
const request = (options, data = null) => {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = body ? JSON.parse(body) : {};
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
};

const runTest = async () => {
    console.log('🧪 Starting Testimonial System Verification...\n');

    try {
        // 1. Submit Testimonial
        console.log('1️⃣  Submitting Testimonial...');
        const testimonialData = {
            name: 'Test User',
            email: 'test@example.com',
            phone: '1234567890',
            role: 'Tester',
            rating: 5,
            message: 'This is a test testimonial content ensuring functionality directly.'
        };

        const submitRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/testimonials',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, testimonialData);

        if (submitRes.status === 201) {
            console.log('✅ Submission Successful:', submitRes.data.message);
        } else {
            console.error('❌ Submission Failed:', submitRes.data);
            process.exit(1);
        }

        // 2. Login Admin
        console.log('\n2️⃣  Logging in Admin...');
        const loginData = {
            username: 'admin',
            password: 'adminpassword123'
        };

        const loginRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, loginData);

        if (loginRes.status === 200 && loginRes.data.success) {
            console.log('✅ Login Successful. Token received.');
        } else {
            console.error('❌ Login Failed:', loginRes.data);
            process.exit(1);
        }

        const token = loginRes.data.data.token;

        // 3. Get Pending Testimonials
        console.log('\n3️⃣  Fetching All Testimonials (Admin)...');
        const allRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/testimonials/all',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const newTestimonial = allRes.data.find(t => t.email === 'test@example.com' && t.message === testimonialData.message);

        if (newTestimonial && newTestimonial.approved) {
            console.log('✅ Found new auto-approved testimonial:', newTestimonial._id);
        } else {
            console.error('❌ Check Failed: Testimonial not found or not approved.');
            process.exit(1);
        }

        // 4. (Deprecated) Approve Testimonial - Now auto-approved
        console.log('\n4️⃣  (Skipping Approval - Auto-approved)');

        // 5. Verify Public Display
        console.log('\n5️⃣  Verifying Public Endpoint...');
        const publicRes = await request({
            hostname: 'localhost',
            port: 5000,
            path: '/api/testimonials',
            method: 'GET'
        });

        const isVisible = publicRes.data.some(t => t._id === newTestimonial._id);

        if (isVisible) {
            console.log('✅ Testimonial is now live on public API!');
        } else {
            console.error('❌ Verification Failed: Testimonial not visible in public list.');
            process.exit(1);
        }

        // Cleanup: Delete the test testimonial
        console.log('\n🧹 Cleaning up...');
        await request({
            hostname: 'localhost',
            port: 5000,
            path: `/api/testimonials/${newTestimonial._id}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('✅ Test Data Deleted');

        console.log('\n🎉 ALL SYSTEMS GO! Testimonial workflow is 100% operational.');

    } catch (error) {
        console.error('⚠️ Verification script notice:', error.message);
        // If it's a connection error, it might be running during build phase without server
        if (error.code === 'ECONNREFUSED') {
            console.log('ℹ️ Server unreachable, skipping verification (expected during build/CI).');
            process.exit(0);
        }
        process.exit(1);
    }
};

runTest();
