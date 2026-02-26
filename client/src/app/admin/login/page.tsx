import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";

export default async function LoginPage() {
    const session = await getSession();

    if (session) {
        redirect("/admin");
    }

    return <LoginForm />;
}
