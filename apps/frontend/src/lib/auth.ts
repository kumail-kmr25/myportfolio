import { jwtVerify } from "jose";

const getJwtSecretKey = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length === 0) {
        throw new Error("JWT_SECRET environment variable is not set");
    }
    return secret;
}

export const decrypt = async (token: string) => {
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));
        return payload;
    } catch (error) {
        return null;
    }
}
