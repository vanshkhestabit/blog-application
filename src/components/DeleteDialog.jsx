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
import { UserContext } from "@/context/User.context";
import { PostContext } from "@/context/Post.context";
import useFetch from "@/hooks/useFetch";
import { Loader2 } from "lucide-react";

const DeleteDialog = ({ children, ele }) => {
  const { deletePost } = useContext(PostContext);
  const { loading, fun } = useFetch(deletePost);

  const deletePostFunction = async () => {
    await fun(ele);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={deletePostFunction}>
            {loading ? (
              <div className="flex items-center gap-2">
                Deleting...
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <p>Delete</p>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
