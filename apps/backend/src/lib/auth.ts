import { SignJWT, jwtVerify } from "jose";

const secretKey = "secret"; // In production, use a secure secret from env
const key = new TextEncoder().encode(process.env.JWT_SECRET || secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function getSession(req: any) {
    try {
        const cookieHeader = req.headers?.cookie || "";
        const cookies = Object.fromEntries(
            cookieHeader.split("; ").map((c: string) => {
                const [key, ...value] = c.split("=");
                return [key, value.join("=")];
            })
        );
        const session = cookies["admin_session"];
        if (!session) return null;
        return await decrypt(session);
    } catch (error) {
        return null;
    }
}
