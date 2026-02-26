import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/admin/RegisterForm";

export default async function RegisterPage() {
    const session = await getSession();

    if (session) {
        redirect("/admin");
    }

    return <RegisterForm />;
}
