import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ForgotPasswordForm from "@/components/admin/ForgotPasswordForm";

export default async function ForgotPasswordPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/admin");
    }

    return <ForgotPasswordForm />;
}
