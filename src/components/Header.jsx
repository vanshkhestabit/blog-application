"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { UserContext } from "@/context/User.context";
import { Loader2, LogOutIcon } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";

const Header = () => {
  const { setLogin, user, logoutUser, verifyUser } = useContext(UserContext);
  const { loading, fun } = useFetch(logoutUser);
  
  const onSubmitFunction = async () => {
    await fun(logoutUser);
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row p-5 bg-black items-center justify-between">
      <h1 className="text-3xl font-bold">Blog Application</h1>
      <div className="space-x-5">
        {!user ? (
          <>
            <Link href="/sign-up">
              <Button
                onClick={() => {
                  setLogin(false);
                }}
              >
                Sign-up
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                variant={"outline"}
                onClick={() => {
                  setLogin(false);
                }}
              >
                Sign-in
              </Button>
            </Link>
          </>
        ) : (
          <div className="flex flex-col">
            <h1 className="text-right">Welcome {user.username}</h1>
            <Button
              className={"w-full bg-red-500 text-white hover:bg-red-700"}
              disabled={loading}
              onClick={onSubmitFunction}
            >
              <LogOutIcon />
              {loading ? (
                <div className="flex items-center gap-2">
                  Logging Out <Loader2 className="animate-spin" />
                </div>
              ) : (
                "Log out"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
