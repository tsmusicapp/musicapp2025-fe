"use client";
import { RootState } from "@/redux/store";
import { API_URL } from "@/utils/env_var";
import { ChartPieIcon } from "@heroicons/react/24/solid";
import { Button, Textarea } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Comment from "./comment";
import { useLocalStorage } from "@/context/LocalStorageContext";

interface CommentType {
  _id: string;
  userId: string;
  comment: string;
  userName: string;
  createdAt: string;
}

interface ContentMusicPlayerV2Props {
  musicDetailInfo: any;
  source: any;
}

function ContentRightSideV2({ musicDetailInfo, source }: ContentMusicPlayerV2Props) {
  const selectedId = useSelector((state: RootState) => state.offer.selectedId);
  const [musicDetail, setMusicDetail] = useState<any>(null);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getItem } = useLocalStorage();
  const [auth, setAuth] = useState<any>(getItem("auth", null));
  useEffect(() => {
    setMusicDetail(musicDetailInfo);
  }, [musicDetailInfo]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !selectedId || isSubmitting) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      toast.error("Please log in to comment");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${API_URL}/v1/comments/${selectedId}?type=${source}`,
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
        const responseData = await response.json();
        const newComment = {
          _id: Date.now().toString(), // Temporary ID since API doesn't return _id
          userId: responseData.comment.userId,
          comment: responseData.comment.comment,
          userName: responseData.comment.userName,
          createdAt: responseData.comment.createdAt,
        };

        // Prepend the new comment to the existing comments array
        setMusicDetail((prev: any) => ({
          ...prev,
          comments: [newComment, ...(prev?.comments || [])],
        }));

        setCommentText("");
      } else {
        throw new Error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Failed to submit comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col py-4 px-6 gap-4 w-full max-w-[38rem] overflow-hidden border border-black/10 rounded-xl">
      {musicDetail?.isLyric === true || musicDetail?.isLyric === "true" ? (
        <div className="flex flex-col gap-2 mt-2">
          <p className="text-sm font-notoSemibold">Lyric</p>
          <p
            className="text-xs text-justify tracking-wide break-words pr-2"
            dangerouslySetInnerHTML={{
              __html: musicDetail?.musicLyric,
            }}
          ></p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 mt-2">
          <p className="text-sm font-notoSemibold">Describe</p>
          <p className="text-xs text-justify tracking-wide break-words pr-2">
            {musicDetail?.description || "No description available."}
          </p>
        </div>
      )}

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
      <div className="flex flex-col gap-4 ml-10">
        {Array.isArray(musicDetail?.comments) &&
          musicDetail.comments.map((comment: CommentType) => (
            <Comment
              key={comment._id}
              userId={comment.userId}
              userName={comment.userName}
              comment={comment.comment}
              createdAt={comment.createdAt}
              profilePicture={musicDetailInfo.profilePicture || "https://docs.material-tailwind.com/img/face-4.jpg"}
            />
          ))}
      </div>
    </div>
  );
}

export default ContentRightSideV2;