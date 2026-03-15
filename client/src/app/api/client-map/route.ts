import { apiResponse } from "@/lib/rate-limit";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Curated global presence data — updated manually or via admin
const CLIENT_LOCATIONS = [
    { city: "San Francisco", count: 12, coords: [37.7749, -122.4194] },
    { city: "London", count: 8, coords: [51.5074, -0.1278] },
    { city: "Dubai", count: 5, coords: [25.2048, 55.2708] },
    { city: "Bengaluru", count: 15, coords: [12.9716, 77.5946] },
    { city: "Singapore", count: 6, coords: [1.3521, 103.8198] },
];

export async function GET() {
    return apiResponse({ locations: CLIENT_LOCATIONS });
}
