import Button from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";

const ResetPasswordView = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center border-2 px-16 ">
      <div className="w-full flex flex-col justify-start mt-3 ml-3 lg:ml-10">
        <h1 className=" font-semibold text-[32px]">Set New Password</h1>
        <p className="text-[#51595A] text-[16px]">
          Enter a New Password and Remember it
        </p>
      </div>
      <form className="flex flex-col gap-y-6 w-full mt-5 ml-3 lg:ml-10">
        <PasswordInput
          type="password"
          label="New Password"
          name="password"
          placeholder="Enter new password"
          required={true}
          className="lg:w-[65%] w-[95%] h-14 px-1 py-2 "
        />
        <PasswordInput
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Enter confirm password"
          required={true}
          className="lg:w-[65%] w-[95%] h-14 px-1 py-2 "
        />
        <div className="lg:w-[65%] w-[95%]">
          <Button
            type="submit"
            text={"Save Password"}
            className="rounded-xl bg-primary p-2 w-full h-14 text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordView;
