import { Request, Response } from 'express';

export const POST = async (req: Request, res: Response) => {
    res.cookie("admin_session", "", {
        expires: new Date(0),
        path: "/",
    });
    return res.json({ success: true });
}
