import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ResetPasswordForm from "@/components/admin/ResetPasswordForm";

export default async function ResetPasswordPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/admin");
    }

    return <ResetPasswordForm />;
}
