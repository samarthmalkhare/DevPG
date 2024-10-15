import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import axios from "axios";
import Button from "./Button";
import Avatar from "./Avatar";
import usePost from "@/hooks/usePost";
import useDeletePost from "@/hooks/useDeletePost";

interface FormPorps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormPorps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : `/api/posts`;

      await axios.post(url, { body });

      toast.success("Post Created");

      setBody("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isComment, postId, mutatePost]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [body]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              rows={1}
              className="
                disabled:opacity-80
                peer
                w-full
                mt-3
                bg-black
                ring-0
                resize-none
                outline-none
                text-[20px]
                placeholder-neutral-500
                text-white
              "
              placeholder={placeholder}
              ref={textAreaRef}
            ></textarea>
            <hr
              className="
                opacity-0
                peer-focus:opacity-100
                h-[1px]
                w-full
                border-neutral-800
                transition
              "
            />
            <div className="mt-4 flex flex-row justify-end ">
              <Button
                disabled={isLoading || !body}
                onClick={onSubmit}
                label="Post"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Welcome to DevHub
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button secondary label="Register" onClick={registerModal.onOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
