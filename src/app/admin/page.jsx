"use client";
import React, { useContext, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetch from "@/hooks/useFetch";
import { UserContext } from "@/context/User.context";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const page = () => {
  const { adminUsersData, adminGetAllUsers, adminChangeUserActiveStatus } =
    useContext(UserContext);
  const { loading, fun } = useFetch(adminGetAllUsers);

  useEffect(() => {
    fun();
  }, []);

  if (loading) {
    return (
      <div className="p-5 text-2xl flex justify-center items-center">
        Loading .... <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <Table className={"p-5 w-[90%] mx-auto border mt-10"}>
      <TableCaption>A list of all users.</TableCaption>
      <TableHeader>
        <TableRow className={"text-base"}>
          <TableHead className="w-[100px]">Index</TableHead>
          <TableHead className={"text-center"}>Username</TableHead>
          <TableHead className={"text-center"}>Total Post</TableHead>
          <TableHead className={"text-center"}>Admin</TableHead>
          <TableHead className={"text-center"}>Active</TableHead>
          <TableHead className="text-right">Joined</TableHead>
        </TableRow>
      </TableHeader>
      {adminUsersData?.map((ele, idx) => {
        return (
          <TableBody key={ele._id}>
            <TableRow>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell className={"text-center"}>{ele.username}</TableCell>
              <TableCell className={"text-center"}>{ele.noOfPosts}</TableCell>
              <TableCell className={"text-center"}>
                {ele.isAdmin === true ? "True" : "False"}
              </TableCell>
              <TableCell className={"flex gap-4 justify-center items-center"}>
                {ele.isActive === true ? "True" : "False"}
                <Button
                  onClick={() => {
                    adminChangeUserActiveStatus(ele._id);
                  }}
                  className={`${
                    ele.isActive === true
                      ? "bg-red-500 text-white hover:bg-red-700"
                      : "bg-green-500 text-white hover:bg-green-700"
                  }`}
                >
                  Change Status
                </Button>
              </TableCell>
              <TableCell className="text-right">
                {new Date(ele.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        );
      })}
    </Table>
  );
};

export default page;
