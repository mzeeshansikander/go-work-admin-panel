"use client";
import LoadingSpinner from "@/components/common/loading-spinner.component";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { loginSchema } from "@/schema/auth-schema";
import { useLoginMutation } from "@/services/react-query/auth/login";
import { LoginApiResponse } from "@/types/response";
import { setCookie } from "cookies-next";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginView = () => {
  const router = useRouter();
  const { mutate: login, isPending } = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login(values, {
        onSuccess: (data) => {
          const res = data as LoginApiResponse;
          if (res[0] !== null) {
            router.push("/dashboard");
            setCookie("accessToken", res?.[0]?.token);
            toast.success("Login Sucessful.");
          } else {
            toast.error("Invalid credentials.");
          }
        },
      });
    },
  });

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="w-full flex flex-col justify-start">
        <h1 className="text-[30px] text-[#212636] text-center font-bold">
          Login
        </h1>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        noValidate
        className="flex flex-col gap-y-3 w-full mt-5 lg:ml-[200px] ml-20"
      >
        <Input
          type="email"
          label="Email"
          name="email"
          placeholder="e.g alexjohn@example.com"
          required={true}
          className="lg:w-[75%] w-[80%] h-[42px] px-3 py-2"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email ? formik.errors.email : undefined}
        />
        <PasswordInput
          type="password"
          label="Password"
          name="password"
          placeholder="Enter your password"
          required={true}
          className="lg:w-[75%] w-[80%] h-[42px] px-1 py-2"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password ? formik.errors.password : undefined}
        />
        <div className="lg:w-[75%] w-[80%] flex justify-end">
          <p
            onClick={() => {
              router.push("/forgot-password");
            }}
            className="text-primary text-[14px] font-bold cursor-pointer"
          >
            Forgot Password?
          </p>
        </div>
        <div className="lg:w-[75%] w-[80%]">
          <Button
            type="submit"
            text={isPending ? <LoadingSpinner size={20} /> : "Login"}
            disabled={isPending}
            className="rounded-lg bg-primary p-2 mt-2 text-[15px] w-full h-[45px] text-white disabled:opacity-50 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginView;
