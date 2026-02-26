import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ForgotPasswordForm from "@/components/admin/ForgotPasswordForm";

export default async function ForgotPasswordPage() {
    const session = await getSession();

    if (session) {
        redirect("/admin");
    }

    return <ForgotPasswordForm />;
}
