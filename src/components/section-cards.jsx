"use client";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "@/context/Post.context";
import useFetch from "@/hooks/useFetch";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Post from "./Post";

export function SectionCards() {
  const { getAllPosts, allPosts } = useContext(PostContext);
  const { loading, fun } = useFetch(getAllPosts);

  const [currentPage, setCurrentPage] = useState(0);
  const PAGE_SIZE = 6;
  const arraySize = Math.ceil(allPosts?.length / PAGE_SIZE);
  const startingIndex = currentPage * PAGE_SIZE;
  const endingIndex = currentPage * PAGE_SIZE + PAGE_SIZE;

  const postArr = allPosts.slice(startingIndex, endingIndex);

  useEffect(() => {
    fun();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2">
        Loading... <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 min-h-[55vh] px-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        {postArr &&
          postArr?.map((ele) => {
            return <Post key={ele._id} ele={ele} />;
          })}
      </div>

      <div>
        {allPosts?.length > 0 ? (
          <div className="space-x-2 mt-5 flex justify-center">
            <div
              onClick={() => {
                if (currentPage !== 0) {
                  setCurrentPage((prev) => prev - 1);
                }
              }}
              className={`flex items-center
              text-white ${
                currentPage === 0
                  ? "hover:cursor-not-allowed"
                  : "hover:cursor-pointer"
              } py-1 px-2 flex items-center text-xs lg:text-lg hover:cursor-pointer`}
            >
              <ArrowLeft />
              <span>Back</span>
            </div>
            {[...Array(arraySize)].map((ele, idx) => {
              return (
                <span
                  key={idx}
                  onClick={() => {
                    setCurrentPage(idx);
                  }}
                  className={`text-white ${
                    currentPage === idx && "bg-zinc-800"
                  } border border-zinc-900 py-1 px-2 flex items-center text-xs lg:text-lg hover:cursor-pointer`}
                >
                  {idx + 1}
                </span>
              );
            })}
            <div
              onClick={() => {
                if (currentPage !== arraySize - 1) {
                  setCurrentPage((prev) => prev + 1);
                }
              }}
              className={`flex items-center
              text-white ${
                currentPage === arraySize - 1
                  ? "hover:cursor-not-allowed"
                  : "hover:cursor-pointer"
              } py-1 px-2 flex items-center text-xs lg:text-lg hover:cursor-pointer`}
            >
              <span className={""}>Next</span>
              <ArrowRight />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
