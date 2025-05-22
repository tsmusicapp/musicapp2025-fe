"use client";
import React, { useEffect, useState } from "react";
import { ChartPieIcon } from "@heroicons/react/24/solid";
import { Button, Textarea } from "@material-tailwind/react";
import Comment from "./comment";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CategoriesService } from "@/services/categories.service";
import { useRouter } from "next/navigation";
import { API_URL } from "@/utils/env_var";

interface CommentType {
  _id: string;
  userId: string;
  comment: string;
  createdAt: string;
}

interface ContentMusicPlayerV2Props {
  musicDetailInfo: any;
}

function ContentRightSideV2({ musicDetailInfo }: ContentMusicPlayerV2Props) {
  console.log("ContentRightSideV2 rendered", musicDetailInfo);
  const selectedId = useSelector((state: RootState) => state.offer.selectedId);
  const [musicDetail, setMusicDetail] = useState<any>(null);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    setMusicDetail(musicDetailInfo);
  }, [musicDetailInfo]);
  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !selectedId || isSubmitting) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${API_URL}/v1/music/comment/${selectedId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            comment: commentText,
          }),
        }
      );

      if (response.status === 201) {
        setCommentText("");
      } else {
        throw new Error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col py-4 px-6 gap-4 w-full max-w-[38rem] overflow-hidden border-2 border-black rounded-xl">
      {/* Description */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-notoSemibold">Describe</p>
        <p className="max-h-[12rem] text-xs text-justify tracking-wide break-words overflow-y-auto pr-2">
          {musicDetail?.description}
        </p>
      </div>

      {/* Comment Input */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-notoSemibold">Comment</p>
        <div className="flex flex-row gap-2">
          <ChartPieIcon color="blue" className="h-8 w-8 shrink-0" />
          <Textarea
            className="text-xs !text-black flex-1"
            label="What are your thoughts about this project?"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Button
            variant="outlined"
            size="sm"
            className="normal-case text-white text-[0.6rem] bg-blue-800 py-1 px-10 w-[10rem]"
            onClick={handleCommentSubmit}
            disabled={isSubmitting || !commentText.trim()}
          >
            {isSubmitting ? "Submitting..." : "Enter Comment"}
          </Button>
        </div>
      </div>

      {/* Comment List */}
      <div className="flex flex-col gap-4 ml-10 max-h-[12rem] overflow-y-auto pr-2">
        {Array.isArray(musicDetail?.comments) &&
          musicDetail.comments.map((comment: CommentType) => (
            <Comment
              key={comment._id}
              userId={comment.userId}
              userName="Unknown User"
              comment={comment.comment}
              createdAt={comment.createdAt}
              profilePicture={null}
            />
          ))}
      </div>
    </div>
  );
}

export default ContentRightSideV2;
