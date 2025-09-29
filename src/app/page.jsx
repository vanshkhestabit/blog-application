import PostList from "@/components/PostList";
import Image from "next/image";
import React from "react";
import blog from "@/assets/blog.webp";

const page = async () => {
  return (
    <div className="min-h-screen p-5">
      <div className="flex flex-col mx-auto space-y-4 w-[85%]">
        <div className="text-center py-2">
          <h1 className="text-xl lg:text-3xl font-bold">
            Login Your Account To Start Posting.
          </h1>
          <p className="text-sm lg:text-lg">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
            ratione.
          </p>
        </div>
        <Image alt="hi" className="w-full h-[300px] object-cover rounded-lg" src={blog} />
      </div>

      <div className="w-[80%] mx-auto mt-10">
        <h1 className="text-xl lg:text-2xl font-semibold">Sample Posts</h1>
        <PostList />
      </div>
    </div>
  );
};

export default page;
