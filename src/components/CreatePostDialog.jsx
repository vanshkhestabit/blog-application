"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useContext, useState } from "react";
import { Textarea } from "./ui/textarea";
import { PostContext } from "@/context/Post.context";
import useFetch from "@/hooks/useFetch";
import { Loader2 } from "lucide-react";
import { postSchema } from "@/schema/postSchema";
import { Button } from "./ui/button";

const CreatePostDialog = ({ children }) => {
  const [formData, setFormData] = useState({
    inputTitle: "",
    inputContent: "",
  });
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const { createPost } = useContext(PostContext);
  const { loading, fun } = useFetch(createPost);

  const createPostFunction = async () => {
    const errorsObj = postSchema(formData.inputTitle, formData.inputContent);
    setErrors(errorsObj);
    if (Object.keys(errorsObj).length === 0) {
      try {
        await fun(formData.inputContent, formData.inputTitle);
        setFormData({ inputContent: "", inputTitle: "" });
        setOpen(false);
      } catch (error) {}
    }
  };

  const onChangeFunction = (e) => {
    const field = e.target.name;
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => {
      const { [field]: removed, ...rest } = prev;
      return rest;
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write your post</DialogTitle>
          <DialogDescription className={"space-y-3"}>
            <div className="space-y-1">
              <Textarea
                name="inputTitle"
                className={"resize-none"}
                value={formData.inputTitle}
                onChange={onChangeFunction}
                placeholder="Enter the title"
              ></Textarea>
              {errors.postTitle && (
                <p className="text-xs text-red-600">{errors.postTitle}</p>
              )}
            </div>
            <div className="space-y-1">
              <Textarea
                name="inputContent"
                className={"resize-none"}
                value={formData.inputContent}
                onChange={onChangeFunction}
                placeholder="Enter the content"
              ></Textarea>
              {errors.postTitle && (
                <p className="text-xs text-red-600">{errors.postTitle}</p>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="space-x-3">
          <Button
            onClick={() => {
              setOpen(false);
              setFormData({ inputContent: "", inputTitle: "" });
              setErrors({});
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={createPostFunction}
            className={`mr-3 bg-blue-500 text-white ${
              loading && "bg-blue-700"
            } hover:bg-blue-700`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                Creating...
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <p>Create</p>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
