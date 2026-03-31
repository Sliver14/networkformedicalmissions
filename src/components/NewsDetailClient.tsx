"use client";

import { useState } from "react";
import { Heart, MessageSquare, ArrowRight } from "lucide-react";
import { likeNews, postComment } from "@/app/actions/news";

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
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  const handleLike = async () => {
    if (hasLiked || isLiking) return;
    setIsLiking(true);
    const result = await likeNews(newsId);
    if (result.success) {
      setLikes(result.likes!);
      setHasLiked(true);
    }
    setIsLiking(false);
  };

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

      {/* Comment Form */}
      <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl shadow-gray-200 border border-gray-100">
        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 md:mb-8">Leave a Comment</h3>
        {message && (
          <div className={`p-4 rounded-xl mb-8 font-bold ${message.type === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleComment} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              name="name"
              type="text" 
              placeholder="Your Name" 
              required 
              className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
            />
            <input 
              name="email"
              type="email" 
              placeholder="Email Address" 
              required 
              className="w-full bg-gray-50 border border-gray-200 py-4 px-6 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
            />
          </div>
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
    </div>
  );
};

export default NewsDetailClient;
