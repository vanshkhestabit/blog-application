"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { UserContext } from "@/context/User.context";
import useFetch from "@/hooks/useFetch";
import { signInSchema } from "@/schema/signInSchema";
import { Loader2, User2Icon, UserCircle2 } from "lucide-react";

export function LoginForm({ className, ...props }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { loginUser } = useContext(UserContext);
  const { loading, fun } = useFetch(loginUser);
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
    const errorsObj = signInSchema(formData);
    setErrors(errorsObj);
    if (Object.keys(errorsObj).length !== 0) {
      return;
    }
    await fun(formData);
    setFormData({ username: "", password: "" });
    
  };

  return (
    <form className={cn("flex flex-col items-center gap-6 p-5", className)}>
      <UserCircle2 size={'5rem'}/>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
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
            name="username"
            type="text"
            placeholder="Enter your username"
            required
          />
          {errors.username && (
            <p className="text-red-500 text-xs -mt-2">{errors.username}</p>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            value={formData.password}
            onChange={onChangeFunction}
            name="password"
            type="password"
            placeholder="Enter your password"
            required
          />
          {errors.password && (
            <p className="text-red-500 text-xs -mt-2">{errors.password}</p>
          )}
        </div>
        <Button onClick={submitFunction} className="w-full">
          {loading ? (
            <>
              <h1 className="flex items-center gap-2">
                Logging in.. <Loader2 className="animate-spin" />
              </h1>
            </>
          ) : (
            <>Log-In</>
          )}
        </Button>
      </div>
    </form>
  );
}
