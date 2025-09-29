import React from "react";
import axios from "axios";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const PostList = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await axios.get(baseUrl + "/api/v1/post/all-post", {
    withCredentials: true,
  });

  const postArr = res.data.data;

  return (
    <div className={`mt-5 grid grid-cols-1 lg:grid-cols-${postArr.length} gap-5`}>
      {postArr?.map((ele, idx) => {
        return (
          <Card key={ele._id} className={"flex flex-col justify-between"}>
            <CardContent>
              <h1 className="text-sm lg:text-base font-bold">
                Title : <span className="font-normal">{ele.postTitle}</span>
              </h1>
              <h1 className="text-sm lg:text-base font-bold">
                Content : <span className="font-normal">{ele.postContent}</span>
              </h1>
            </CardContent>
            <CardFooter>
              <p className="text-xs">
                Created At: {new Date(ele.createdAt).toLocaleString()}
              </p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default PostList;
