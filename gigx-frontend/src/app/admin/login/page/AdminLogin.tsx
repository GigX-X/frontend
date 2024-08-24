"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axiosConfig";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAdminAuth from "@/hooks/adminAuthHook";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(15, { message: "Password must be at most 15 characters." }),
});

type FormData = z.infer<typeof schema>;

export default function AdminLogin() {
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const {role, loading} = useAdminAuth();

  useEffect(() => {
    console.log("Token:", localStorage.getItem("token"));
    if (!loading && role === "admin") {
      router.push("/admin");
    }
  }, [role, loading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log("inside on submit");
      // Send login request to API gateway
      const response = await axios.post("/user-service/admin/login", {
        email: data.email,
        password: data.password,
      });

      // Save JWT in local storage
      localStorage.setItem("token", response.data.token);

      // Redirect to admin dashboard
      router.push("/admin");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-blue sm:px-6 lg:px-8">
      <div className="max-w-md w-full h-auto border bg-white p-8 rounded-xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-blue font-atkinson">
            GIGGX
          </h2>
        </div>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md">
            <div className="mb-5">
              <label
                htmlFor="email-address"
                className="font-atkinson font-bold text-lg tracking-wide"
              >
                Email
              </label>
              <input
                id="email-address"
                // name="email"
                type="email"
                autoComplete="email"
                className="w-full px-3 py-3 border-2 border-gray-30 text-blackfaded rounded-md font-atkinson focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 font-atkinson text-sm text-red-600 tracking-tight font-thin">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-9">
              <label
                htmlFor="password"
                className="font-atkinson font-bold text-lg tracking-wide"
              >
                Password
              </label>
              <input
                id="password"
                // name="password"
                type="password"
                autoComplete="current-password"
                className="w-full px-3 py-3 border-2 border-gray-30 text-blackfaded rounded-md font-atkinson focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 font-atkinson text-sm text-red-600 tracking-tight font-thin">
                  {errors.password.message}
                </p>
              )}
              {error && (
                <p className="mt-1 font-atkinson text-sm text-red-600 tracking-tight font-thin">
                  {error}
                </p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-md font-atkinson font-bold rounded-md text-white bg-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
