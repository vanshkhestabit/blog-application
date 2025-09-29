import { SignUpForm } from "@/components/signup-form";
import Image from "next/image";
import blog from "@/assets/blog.webp";

export default function Page() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          alt="hi"
          className="w-full object-cover rounded-lg absolute inset-0 h-full dark:brightness-[0.2] dark:grayscale"
          src={blog}
        />
      </div>
    </div>
  );
}
