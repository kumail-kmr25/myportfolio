import { authOptions } from "@/lib/auth";
export const dynamic = "force-dynamic";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
