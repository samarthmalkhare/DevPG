import { useCallback, useMemo } from "react";

import axios from "axios";
import { toast } from "sonner";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useDeletePost = ({
  postId,
  userId,
}: {
  postId?: string;
  userId?: string;
}) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const toggleDelete = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (currentUser) {
        request = () => axios.delete(`/api/posts/${postId}`);
      } else {
        request = () => axios.get(`/api/posts/${postId}`);
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success("Post Deleted");
      
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    currentUser,
    postId,
    mutateFetchedPost,
    mutateFetchedPosts,
    loginModal,
  ]);

  return {
    toggleDelete,
  };
};

export default useDeletePost;
