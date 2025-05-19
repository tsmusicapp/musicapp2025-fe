"use client";
import React, { useState, useEffect } from "react";
import { ChartPieIcon } from "@heroicons/react/24/solid";
import { Button, Textarea } from "@material-tailwind/react";
import Comment from "./comment";
import { getAuthToken } from "@/utils/auth";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  updateMusicAsset,
} from "@/redux/features/offer/offerSlice";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/checkAuth";
import { toast } from "react-hot-toast";
import { API_URL } from "@/utils/env_var";
import { LoginModal } from "../modals/AuthModal";

interface ContentRightSideAssetsProps {
  musicData: any;
}

function ContentRightSideAssets({ musicData }: ContentRightSideAssetsProps) {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localComments, setLocalComments] = useState<any[]>([]);
  const selectedId = useSelector((state: RootState) => state.offer.selectedId);
  const dispatch = useDispatch();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    if (musicData?.comments) {
      setLocalComments(musicData.comments);
    }
  }, [musicData]);

  const fetchUpdatedMusicAsset = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/music-asset/${selectedId}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      if (response.ok) {
        const updatedData = await response.json();
        dispatch(updateMusicAsset(updatedData));
        setLocalComments(updatedData.comments || []);
      }
    } catch (error) {
      console.error("Error fetching updated music asset:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !selectedId || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/v1/music-asset/comment/${selectedId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ comment: commentText }),
      });

      if (response.status === 201) {
        const newComment = await response.json();
        const newCommentObj = {
          _id: newComment._id || Date.now().toString(),
          userId: newComment.userId,
          comment: commentText,
          createdAt: new Date().toISOString(),
        };
        setLocalComments((prev) => [newCommentObj, ...prev]);
        await fetchUpdatedMusicAsset();
        setCommentText("");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

const handleGetTouch = () => {
  if (isAuthenticated()) {
    window.location.href = "http://localhost:3001/chat";
  } else {
    setLoginModalOpen(true); // Show login modal
  }
};


  return (
    <div className="flex flex-col w-full max-w-2xl p-6 gap-6 border-2 border-black rounded-xl overflow-y-auto bg-white">

      {/* Description Section */}
      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-gray-800">Description</h2>
        <p className="text-xs text-justify text-gray-700 leading-relaxed max-h-[12rem] overflow-y-auto">
          {musicData?.description || "No description provided."}
        </p>
      </section>

      {/* CTA Button */}
      <div className="flex justify-end">
        <button
          onClick={handleGetTouch}
          className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition duration-200"
        >
          Get in Touch
        </button>
      </div>

      {/* Comment Box */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-gray-800">Add Comment</h2>
        <div className="flex items-start gap-2">
          <ChartPieIcon className="h-6 w-6 text-blue-600 mt-1" />
          <Textarea
            label="What are your thoughts on this project?"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="text-sm text-black"
          />
        </div>

        <div className="flex justify-end">
          <Button
            variant="outlined"
            size="sm"
            className="bg-blue-800 text-white text-xs px-6 py-1 rounded-md disabled:opacity-50"
            onClick={
              isAuthenticated()
                ? handleCommentSubmit
                : () => toast.error("Please sign in first.")
            }
            disabled={isSubmitting || !commentText.trim()}
          >
            {isSubmitting ? "Submitting..." : "Post Comment"}
          </Button>
        </div>
      </section>

      {/* Comments Section */}
      <section className="flex flex-col gap-4 max-h-[20rem] overflow-y-auto pr-2">
        {Array.isArray(localComments) && localComments.length > 0 ? (
          localComments.map((comment) => (
            <Comment
              key={comment._id}
              userId={comment.userId}
              userName="Unknown User"
              comment={comment.comment}
              createdAt={comment.createdAt}
              profilePicture={null}
            />
          ))
        ) : (
          <p className="text-xs text-gray-500 italic text-center">
            No comments yet.
          </p>
        )}
      </section>
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={() => setLoginModalOpen(false)}
            />
    </div>
  );
}

export default ContentRightSideAssets;
