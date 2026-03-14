import { getServerSession } from "next-auth";
export const dynamic = "force-dynamic";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/admin/RegisterForm";

export default async function RegisterPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/admin");
    }

    return <RegisterForm />;
}
