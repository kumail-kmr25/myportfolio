import { Request, Response } from 'express';
import { cookies } from "next/headers";

export const POST = async (req: Request, res: Response) => {
    (await cookies()).set("admin_session", "", {
        expires: new Date(0),
        path: "/",
    });
    return res.json({ success: true });
}
