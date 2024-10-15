import { useRouter } from "next/router";

import usePost from "@/hooks/usePost";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import Form from "@/components/Form";
import CommentFeed from "@/components/posts/CommentFeed";
import Spinner from "@/components/Spinner";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Header label="Posts" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Reply"
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
