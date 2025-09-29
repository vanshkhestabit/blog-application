"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { UserContext } from "@/context/User.context";
import useFetch from "@/hooks/useFetch";
import { Loader2, UserCircle2 } from "lucide-react";
import { signUpSchema } from "@/schema/signUpSchema";

export function SignUpForm({ className, ...props }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { signUpUser } = useContext(UserContext);
  const { loading, fun } = useFetch(signUpUser);
  const [errors, setErrors] = useState({});

  const onChangeFunction = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const { [name]: removed, ...rest } = prev;
        return rest;
      });
    }
  };

  const submitFunction = async (e) => {
     e.preventDefault();
    const errorsObj = signUpSchema(formData);
    setErrors(errorsObj);
    if (Object.keys(errorsObj).length !== 0) {
      return;
    }
    await fun(formData);
    setFormData({ username: "", password: "", confirmPassword: "" });
  };

  return (
    <form className={cn("flex flex-col items-center gap-6", className)} {...props}>
       <UserCircle2 size={'5rem'}/>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your username below
        </p>
      </div>
      <div className="grid gap-6 w-full">
        <div className="grid gap-3">
          <Label htmlFor="email">Username</Label>
          <Input
            value={formData.username}
            onChange={onChangeFunction}
            id="username"
            name="username"
            type="username"
            placeholder="Enter your username"
            required
          />
          {errors.username && (
            <p className="text-red-500 text-xs -mt-2">{errors.username}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            value={formData.password}
            onChange={onChangeFunction}
            name="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            required
          />
          {errors.password && (
            <p className="text-red-500 text-xs -mt-2">{errors.password}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Confirm Password</Label>
          <Input
            value={formData.confirmPassword}
            onChange={onChangeFunction}
            name="confirmPassword"
            id="password"
            type="password"
            placeholder="Confirm password"
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs -mt-2">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <Button
          disabled={loading}
          onClick={submitFunction}
          className={"w-full"}
        >
          {loading ? (
            <>
              <h1 className="flex items-center gap-2">
                Signing up.. <Loader2 className="animate-spin" />
              </h1>
            </>
          ) : (
            <>Sign-Up</>
          )}
        </Button>
      </div>
    </form>
  );
}
