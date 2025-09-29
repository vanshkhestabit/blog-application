"use client";
import { Button } from "./ui/button";
import CreatePostDialog from "./CreatePostDialog";
import { useContext } from "react";
import { PostContext } from "@/context/Post.context";

export function SiteHeader() {
  const { allPosts } = useContext(PostContext);
  return (
    <header className="flex flex-col lg:flex-row lg:justify-between gap-3 lg:gap-0 p-3 items-center">
      <div className="space-y-1 text-center lg:text-left">
        <h1 className="text-3xl font-bold">Post Section</h1>
        <p>Total Post: {allPosts.length}</p>
      </div>
      <CreatePostDialog>
        <Button className={"mr-3 bg-blue-500 text-white hover:bg-blue-700"}>
          Create A Post
        </Button>
      </CreatePostDialog>
    </header>
  );
}
