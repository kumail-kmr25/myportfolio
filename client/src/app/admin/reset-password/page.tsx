import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ResetPasswordForm from "@/components/admin/ResetPasswordForm";

export default async function ResetPasswordPage() {
    const session = await getSession();

    if (session) {
        redirect("/admin");
    }

    return <ResetPasswordForm />;
}
