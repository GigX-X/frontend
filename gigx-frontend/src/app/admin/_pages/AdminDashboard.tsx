"use client";

import useAdminAuth from "@/hooks/adminAuthHook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminLogoutButton from "@/components/admin/AdminLogout";

export default function AdminDashboard() {
  const router = useRouter();
  const {role, loading} = useAdminAuth();

  useEffect(() => {
    console.log("Token:", localStorage.getItem("token"));
    if (!loading && role !== "admin") {
      console.log("Redirecting to login...");
      router.push("/admin/login");
    } else if (!loading && role === "admin") {
      console.log("User is an admin");
    }
  }, [role, loading, router]);
  return (
    <>
      {role === "admin" && (
        <>
          <h3>Admin dashboard</h3>
          <AdminLogoutButton />
        </>
      )}
    </>
  );
}
