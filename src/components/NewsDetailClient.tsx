"use client";

import { useState, useEffect } from "react";
import { Heart, MessageSquare, ArrowRight, Lock } from "lucide-react";
import { likeNews, postComment, incrementViews } from "@/app/actions/news";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Comment {
  id: number;
  name: string;
  content: string;
  createdAt: Date;
}

interface NewsDetailClientProps {
  newsId: number;
  initialLikes: number;
  comments: Comment[];
}

const NewsDetailClient = ({ newsId, initialLikes, comments }: NewsDetailClientProps) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  useEffect(() => {
    // Record view count once component mounts (handled via cookies in server action)
    incrementViews(newsId);
  }, [newsId]);

  const handleLike = async () => {
    if (hasLiked || isLiking) return;
    setIsLiking(true);
    const result = await likeNews(newsId);
    if (result.success) {
      setLikes(result.likes!);
      setHasLiked(true);
    } else if (result.message === "Already liked") {
      setHasLiked(true); // Update local state so the button reflects they already liked it
    }
    setIsLiking(false);
  };

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) return;
    
    setIsSubmitting(true);
    setMessage(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await postComment(newsId, formData);
    
    if (result.success) {
      setMessage({ type: "success", text: result.message! });
      (e.target as HTMLFormElement).reset();
    } else {
      setMessage({ type: "error", text: result.message! });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Interaction Bar */}
      <div className="flex items-center gap-6 md:gap-8 py-4 md:py-6 border-y border-gray-100 font-bold text-gray-500 text-sm md:text-base">
        <button 
          onClick={handleLike}
          disabled={hasLiked || isLiking}
          className={`flex items-center gap-2 transition-all ${hasLiked ? "text-pink-500" : "hover:text-pink-500"}`}
        >
          <Heart size={20} className={hasLiked ? "fill-current" : ""} />
          <span>{likes} Likes</span>
        </button>
        <div className="flex items-center gap-2">
          <MessageSquare size={20} className="text-cyan-500" />
          <span>{comments.length} Comments</span>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-8 md:space-y-10">
        <h3 className="text-2xl md:text-3xl font-black text-gray-900">{comments.length} Comments</h3>
        <div className="space-y-6 md:space-y-8">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-6 md:p-8 rounded-3xl space-y-3 md:space-y-4 border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center gap-2 sm:gap-0">
                <h4 className="text-base md:text-lg font-black text-gray-900">{comment.name}</h4>
                <span className="text-xs md:text-sm text-gray-400 font-bold">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{comment.content}</p>
            </div>
          ))}
          {comments.length === 0 && <p className="text-gray-400 italic text-sm md:text-base">No comments yet. Be the first to share your thoughts!</p>}
        </div>
      </div>

      {/* Comment Form / Login Prompt */}
      {session ? (
        <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl shadow-gray-200 border border-gray-100">
          <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 md:mb-8">Leave a Comment</h3>
          {message && (
            <div className={`p-4 rounded-xl mb-8 font-bold ${message.type === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
              {message.text}
            </div>
          )}
          <form onSubmit={handleComment} className="space-y-6">
            <p className="text-sm text-gray-500 font-bold">Posting as <span className="text-cyan-500">{session.user?.name || session.user?.email}</span></p>
            <textarea 
              name="content"
              placeholder="Write a Comment" 
              required 
              rows={5}
              className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all resize-none"
            ></textarea>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-cyan-500 text-white py-5 rounded-xl font-black hover:bg-cyan-600 transition-all flex items-center justify-center shadow-xl shadow-cyan-100"
            >
              {isSubmitting ? "Posting..." : <><ArrowRight className="mr-2" size={20} /> Submit Comment</>}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-3xl p-10 md:p-16 text-center border-2 border-dashed border-gray-200 space-y-6">
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg text-cyan-500">
            <Lock size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-gray-900">Want to join the conversation?</h3>
            <p className="text-gray-600 max-w-md mx-auto">Please login to your account to post a comment and share your thoughts with the community.</p>
          </div>
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 bg-cyan-500 text-white px-10 py-4 rounded-xl font-black hover:bg-cyan-600 transition-all shadow-xl shadow-cyan-100"
          >
            Login to Comment <ArrowRight size={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default NewsDetailClient;
