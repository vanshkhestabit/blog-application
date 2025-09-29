"use client";
import api from "@/lib/axiosInstance";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { UserContext } from "./User.context";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [publicPosts, setPublicPosts] = useState([]);

  const getAllPublicPosts = useCallback(async () => {
    try {
      const res = await api.get("/post/all-post");
      if (res.response?.data.error) {
        toast(res.response?.data.error);
        return;
      }
      setPublicPosts(res.data.data);
    } catch (error) {
      toast(error.response.data.error);
    }
  }, []);

  const getAllPosts = useCallback(async () => {
    try {
      const res = await api.get("/post");
      if (res.response?.data.error) {
        toast(res.response?.data.error);
        return;
      }
      setAllPosts(res.data.data);
    } catch (error) {
      toast(error.response.data.error);
    }
  }, []);

  const createPost = useCallback(async (postContent, postTitle) => {
    try {
      const res = await api.post(`/post/add`, { postContent, postTitle });
      if (res.response?.data.error) {
        toast(res.response?.data.error);
        return;
      }
      setAllPosts((prev) => [res.data.data, ...prev]);
      toast(res.data.message);
    } catch (error) {
      toast(error.response.data.error);
    }
  }, []);

  const updatePost = useCallback(async (post, newPostTitle, newPostContent) => {
    try {
      if (
        newPostTitle === post.postTitle &&
        newPostContent === post.postContent
      ) {
        toast("Nothing to Update");
        return;
      }
      const res = await api.put(`/post/update/${post._id}`, {
        postContent: newPostContent,
        postTitle: newPostTitle,
      });
      if (res.response?.data.error) {
        toast(res.response?.data.error);
        return;
      }

      setAllPosts((prev) =>
        prev.map((ele) => {
          if (res.data.data._id === ele._id) {
            return res.data.data;
          }
          return ele;
        })
      );
      toast(res.data.message);
    } catch (error) {
      toast(error.response.data.error);
    }
  }, []);

  const deletePost = useCallback(async (post) => {
    try {
      const res = await api.delete(`/post/delete/${post._id}`);
      if (res.response?.data.error) {
        toast(res.response?.data.error);
        return;
      }
      setAllPosts((prev) => prev.filter((ele) => ele._id !== post._id));
      toast("Post Deleted Successfully");
    } catch (error) {
      toast(error.response.data.error);
    }
  }, []);

  const value = useMemo(
    () => ({
      allPosts,
      getAllPosts,
      createPost,
      updatePost,
      deletePost,
      publicPosts,
      getAllPublicPosts,
    }),
    [
      allPosts,
      getAllPosts,
      createPost,
      updatePost,
      deletePost,
      publicPosts,
      getAllPublicPosts,
    ]
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
