"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Ban,
  Check,
  Edit2,
  PanelRightIcon,
  Pencil,
  TicketCheckIcon,
  TrashIcon,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteDialog from "./DeleteDialog";
import { Textarea } from "@/components/ui/textarea";
import UpdateDialog from "./UpdateDialog";

const Post = ({ ele }) => {
  const [editPost, setEditPost] = useState(false);
  const [formData, setFormData] = useState({
    postTitle: ele.postTitle,
    postContent: ele.postContent,
  });
  const [errors, setErrors] = useState({});

  const onChangeFunction = (e) => {
    const field = e.target.name;
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => {
      const { [field]: removed, ...rest } = prev;
      return rest;
    });
  };

  return (
    <Card key={ele._id} className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="font-semibold tabular-nums @[250px]/card:text-xl">
          {ele.postTitle}
        </CardTitle>
        <CardDescription>{ele.postContent}</CardDescription>
      </CardHeader>
      {editPost && (
        <div className="w-[90%] mx-auto space-y-3">
          <Textarea
            value={formData.postTitle}
            name="postTitle"
            onChange={onChangeFunction}
            className={"resize-none"}
            placeholder="Enter the title"
          ></Textarea>
          {errors.postTitle && (
            <p className="text-xs text-red-600">{errors.postTitle}</p>
          )}
          <Textarea
            name="postContent"
            value={formData.postContent}
            onChange={onChangeFunction}
            className={"resize-none"}
            placeholder="Enter the content"
          ></Textarea>
          {errors.postContent && (
            <p className="text-xs text-red-600">{errors.postContent}</p>
          )}
        </div>
      )}
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="flex gap-2">
          {editPost ? (
            <>
              <UpdateDialog
                ele={ele}
                postContent={formData.postContent}
                postTitle={formData.postTitle}
                setEditPost={setEditPost}
                setErrors={setErrors}
                setFormData={setFormData}
              >
                {" "}
                <Button>
                  <Check />
                </Button>
              </UpdateDialog>

              <Button
                onClick={() => {
                  setInputPostContent(ele.postContent);
                  setInputPostTitle(ele.postTitle);
                  setEditPost(false);
                }}
                className={"bg-red-500 text-white hover:bg-red-700"}
              >
                <Ban />
              </Button>
            </>
          ) : (
            <div>
              <div className="space-x-2 space-y-2">
                <Button
                  onClick={() => {
                    setEditPost(true);
                  }}
                >
                  <Pencil />
                </Button>
                <DeleteDialog ele={ele}>
                  <Button className={"bg-red-500 text-white hover:bg-red-700"}>
                    <TrashIcon />
                  </Button>
                </DeleteDialog>
              </div>
              <p className="text-xs">
                {new Date(ele.createdAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Post;
