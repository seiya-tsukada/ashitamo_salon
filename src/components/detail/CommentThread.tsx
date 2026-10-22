import React, { useState } from 'react';
import { Heart, Send } from 'lucide-react';
import { CommentItem } from '../../types';
import { COMMENT_ROLE_OPTIONS, DEFAULT_COMMENT_ROLE } from '../../constants/currentUser';
import { createUserComment } from '../../utils/project';
import { Button } from '../ui/Button';

interface CommentThreadProps {
  comments: CommentItem[];
  onAddComment: (comment: CommentItem) => void;
}

interface CommentCardProps {
  comment: CommentItem;
  isLiked: boolean;
  onToggleLike: () => void;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, isLiked, onToggleLike }) => {
  const likeCount = (comment.likes || 0) + (isLiked ? 1 : 0);

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-stone-50/70 border border-stone-200/80 flex items-start gap-3.5 transition-colors hover:border-amber-200">
      <img
        src={comment.authorAvatar}
        alt={comment.author}
        className="w-9 h-9 rounded-full border border-stone-200 object-cover shrink-0 mt-0.5 shadow-xs"
        referrerPolicy="no-referrer"
      />
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-900">{comment.author}</span>
            <span className="text-[11px] font-mono font-medium text-amber-800">{comment.authorRole}</span>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">{comment.createdAt}</span>
        </div>

        <p className="mt-2 text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">{comment.content}</p>

        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={onToggleLike}
            className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              isLiked
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'text-stone-500 hover:text-stone-700 bg-white border border-stone-200'
            }`}
          >
            <Heart className={`w-3 h-3 ${isLiked ? 'fill-rose-500' : ''}`} />
            <span className="font-mono tabular-nums">{likeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const CommentThread: React.FC<CommentThreadProps> = ({ comments, onAddComment }) => {
  const [commentText, setCommentText] = useState('');
  const [userRoleSelection, setUserRoleSelection] = useState(DEFAULT_COMMENT_ROLE);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(createUserComment(userRoleSelection, commentText));
    setCommentText('');
  };

  const toggleLike = (commentId: string) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <section className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
          <span>企画・役割提案スレッド</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold tabular-nums">
            {comments.length}
          </span>
        </h3>
        <span className="text-xs text-stone-500">アイデアや参加意志を自由に投げかけてください</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-stone-600">
          <span>投稿者の立場:</span>
          <select
            value={userRoleSelection}
            onChange={(e) => setUserRoleSelection(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded px-2.5 py-1 text-xs text-stone-800 focus:outline-none focus:border-amber-500"
          >
            {COMMENT_ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <textarea
            required
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="企画に対する具体的なアイデア、担当可能な作業、質問など温かな提案をどうぞ..."
            className="w-full p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors resize-none shadow-xs"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-stone-500">※ 投稿は即座にスレッドへ反映されます</span>
          <Button
            variant="gradient"
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm rounded-xl shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>提案する</span>
          </Button>
        </div>
      </form>

      <div className="mt-8 space-y-4 pt-6 border-t border-stone-100">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            isLiked={!!likedComments[comment.id]}
            onToggleLike={() => toggleLike(comment.id)}
          />
        ))}
      </div>
    </section>
  );
};
