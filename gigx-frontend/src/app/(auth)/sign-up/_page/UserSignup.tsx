"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axiosConfig";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Globe from "@/components/magicui/Globe";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const schema = z
  .object({
    role: z.enum(["worker", "client"], {
      message: "Please select a role",
    }),
    fullName: z.string().min(3, "Full name is required"),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function UserSignup() {
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [tempToken, setTempToken] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      role: undefined,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/user-service/auth/auth/sendOtp", {
        email: data.email,
        password: data.password,
        username: data.fullName,
        role: data.role,
      });

      console.log("response",response);
      // const response = await axios.post("/user-service/auth/test");
      // console.log(response);
      // const response = await axios.post('/user-service/auth/send-otp', {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //       email: data.email,
      //       password: data.password,
      //       username: data.fullName,
      //       role: data.role,
      //     })
      // })
      // console.log(response);
      setSubmitted(true);
      setError("");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  // const verifyOtp = async () => {
  //   if (tempToken === "") setSubmitted(false);
  //   if (otp.length < 6) setError("Invalid otp!");
  //   const response = await axios.post("/user-service/auth/signup", {

  //   })
  // };

  return (
    <div className="min-h-screen w-full flex items-center justify-between bg-background sm:px-6 lg:px-8">
      <div className="w-[35%] min-h-[95vh] flex flex-col bg-blue rounded-xl">
        <div className="logo h-[30%] p-10">
          <span className="font-atkinson font-bold text-background text-3xl">
            GIGGX
          </span>
        </div>
        <div className="w-auto h-auto font-atkinson text-white p-10">
          <span className="font-bold text-5xl">
            Be part of <br />
            the Gig Economy.
          </span>
          <div className="w-[74%] h-auto font-atkinson text-white mt-10">
            <span className="">
              Discover a world of opportunities. Connect with talented
              freelancers and find exciting projects that align with your
              skills.
            </span>
          </div>
          <div className="globe w-auto h-auto p-10">
            <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden bg-blue px-40 pb-80">
              <Globe className="top-30" />
            </div>
          </div>
        </div>
      </div>
      {!submitted ? (
        <div className="signup-form w-[50%] h-90vh flex flex-col p-10">
          <div className="signup-heading">
            <h3 className="font-atkinson font-bold text-3xl text-black mb-2">
              Sign up
            </h3>
            <span className="font-atkinson text-black">Have an account ? </span>
            <Link
              className="font-atkinson text-blue underline"
              href={"/sign-in"}
            >
              Sign in
            </Link>
          </div>
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md">
              <div className="mb-3">
                <label
                  htmlFor="role"
                  className="font-atkinson text-lg tracking-wide"
                >
                  Select Your Role
                </label>
                <div className="mt-2 flex space-x-4">
                  <div
                    className={`flex-1 p-4 border-2 rounded-md cursor-pointer ${
                      watch("role") === "worker"
                        ? "bg-blue-50 border-blue"
                        : "border-gray-30"
                    }`}
                  >
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="worker"
                        {...register("role")}
                        className="form-radio text-blue"
                      />
                      <span className="font-atkinson text-md">Worker</span>
                    </label>
                  </div>
                  <div
                    className={`flex-1 p-4 border-2 rounded-md cursor-pointer ${
                      watch("role") === "client"
                        ? "bg-blue-50 border-blue-500"
                        : "border-gray-30"
                    }`}
                  >
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="client"
                        {...register("role")}
                        className="form-radio text-blue-600"
                      />
                      <span className="font-atkinson text-md">Client</span>
                    </label>
                  </div>
                </div>
                {errors.role && (
                  <p className="mt-1 font-atkinson text-sm text-red-600 tracking-tight font-thin">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="full-name"
                  className="font-atkinson text-lg tracking-wide"
                >
                  Full Name
                </label>
                <input
                  id="full-name"
                  // name="email"
                  type="text"
                  autoComplete="name"
                  className="w-full px-3 py-3 border-2 border-gray-30 text-blackfaded rounded-md font-atkinson focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  {...register("fullName")}
                />
                {errors.email && (
                  <p className="mt-1 font-atkinson text-sm text-red-600 tracking-tight font-thin">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="email-address"
                  className="font-atkinson text-lg tracking-wide"
                >
                  Email
                </label>
                <input
                  id="email-address"
                  // name="password"
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
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="font-atkinson text-lg tracking-wide"
                >
                  Password
                </label>
                <input
                  id="password"
                  // name="password"
                  type="password"
                  autoComplete="new-password"
                  className="w-full px-3 py-3 border-2 border-gray-30 text-blackfaded rounded-md font-atkinson focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="mt-1 font-atkinson text-sm text-red-600 tracking-tight font-thin">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="confirm-password"
                  className="font-atkinson text-lg tracking-wide"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  // name="password"
                  type="password"
                  autoComplete="new-password"
                  className="w-full px-3 py-3 border-2 border-gray-30 text-blackfaded rounded-md font-atkinson focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 font-atkinson text-sm text-red-600 tracking-tight font-thin">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3">
              <button
                type="submit"
                className="w-1/3 flex justify-center py-3 px-4 border border-transparent text-md font-atkinson font-bold rounded-md text-white bg-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="otp-form w-[50%] h-90vh flex flex-col justify-center items-center p-10">
          <h2 className="font-atkinson font-bold text-2xl mb-3">
            Account verification
          </h2>
          <h1 className="font-atkinson font-bold text-3xl mb-2">
            Enter the 6 digit PIN sent to you
          </h1>
          <p className="font-atkinson text-lg mb-6">
            PIN sent to given email address.
          </p>
          <div className="mb-5">
            <InputOTP maxLength={6} onChange={(value) => setOtp(value)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <button className="bg-blue font-atkinson text-white py-2 px-6 rounded-md mb-5">
            Submit
          </button>
          <a className="font-atkinson text-blue hover: cursor-pointer">
            <span className="text-black">Didn't recieve pin ? </span>Send again
          </a>
          {error && (
            <p className="mt-1 font-atkinson text-sm text-red-600 tracking-tight font-thin">
              {error}
            </p>
          )}
        </div>
      )}
      <div className="space w-[2%] h-screen"></div>
    </div>
  );
}
