import React, { useContext } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PostContext } from "@/context/Post.context";
import useFetch from "@/hooks/useFetch";
import { Loader2 } from "lucide-react";
import { postSchema } from "@/schema/postSchema";

const UpdateDialog = ({
  children,
  ele,
  postTitle,
  postContent,
  setEditPost,
  setErrors,
  setFormData,
}) => {
  const { updatePost } = useContext(PostContext);
  const { loading, fun } = useFetch(updatePost);

  const updatePostFunction = async () => {
    const errorsObj = postSchema(postTitle, postContent);
    setErrors(errorsObj);
    if (Object.keys(errorsObj).length === 0) {
      try {
        await fun(ele, postTitle, postContent);
        setEditPost(false);
      } catch (error) {}
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently update your
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setFormData({
                postTitle: ele.postTitle,
                postContent: ele.postContent,
              });
              setErrors({});
              setEditPost(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={updatePostFunction}>
            {loading ? (
              <div className="flex items-center gap-2">
                Updating...
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <p>Update</p>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateDialog;
