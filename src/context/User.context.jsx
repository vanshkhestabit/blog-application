"use client";
import api from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [adminUsersData, setAdminUsersData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [login, setLogin] = useState(false);
  const router = useRouter();

  const signUpUser = useCallback(async (data) => {
    try {
      const res = await api.post("/user/sign-up", data);
      if (res.response?.data.error) {
        toast(res.response?.data.error);
        return;
      }
      setUser(res.data.data);
      toast("User Created");
    } catch (error) {
      toast(error.response.data.error);
    }
  }, []);

  const loginUser = useCallback(async (data) => {
    try {
      const res = await api.post("/user/sign-in", data);
      if (res.response?.data.error) {
        toast(res.response?.data.error);
        return;
      }
      setAccessToken(res.data.data.accessToken);
      setUser(res.data.data);
      toast("User Logged in !!");
      router.push("/dashboard");
    } catch (error) {
      toast(error.response.data.error);
    }
  }, []);

  const logoutUser = useCallback(async () => {
    try {
      const res = await api.get("/user/logout");
      if (res.response?.data.error) {
        toast(res.response?.data.error);
        return;
      }
      setUser(null);
      toast("User Logged out !!");
      router.push("/");
    } catch (error) {
      toast(error.response.data.error);
    }
  }, []);

  const verifyUser = useCallback(async () => {
    try {
      const res = await api.get("/user/auth");
      setUser(res.data.data);
    } catch (error) {
      // toast(error.response.data.error);
    }
  }, []);

  const adminGetAllUsers = useCallback(async () => {
    try {
      const res = await api.get("/admin/");
      if (res.response?.data.error) {
        toast(res.response?.data.error);
        return;
      }
      setAdminUsersData(res.data.data);
    } catch (error) {
      toast(error.response.data.error);
    }
  }, []);

  const adminChangeUserActiveStatus = useCallback(async (userId) => {
    try {
      const res = await api.put("/admin/change-active/" + userId);
      if (res.response?.data.error) {
        toast(res.response?.data.error);
        return;
      }
      setAdminUsersData((prev) =>
        prev.map((ele) =>
          ele._id === res.data.data._id
            ? { ...ele, isActive: res.data.data.isActive }
            : ele
        )
      );
      toast("Status Changed");
    } catch (error) {
      toast(error.response.data.error);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      adminChangeUserActiveStatus,
      adminUsersData,
      adminGetAllUsers,
      verifyUser,
      signUpUser,
      loginUser,
      logoutUser,
      login,
      setLogin,
      accessToken,
    }),
    [
      user,
      adminChangeUserActiveStatus,
      adminUsersData,
      adminGetAllUsers,
      verifyUser,
      signUpUser,
      loginUser,
      logoutUser,
      login,
      setLogin,
      accessToken,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
