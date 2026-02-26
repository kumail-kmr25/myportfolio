import { Suspense } from "react";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { Loader2 } from "lucide-react";

export default async function AdminPage() {
    const session = await getSession();

    if (!session) {
        redirect("/admin/login");
    }

    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6 text-white text-xs tracking-widest uppercase font-black">
                <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading Portal...
            </div>
        }>
            <AdminDashboard />
        </Suspense>
    );
}
