import React, { useState } from 'react';
import { ProjectItem, CommentItem } from '../types';
import { ArrowLeft, Send, Heart, Users, Check } from 'lucide-react';
import { COMMENT_ROLE_OPTIONS, CURRENT_USER, DEFAULT_COMMENT_ROLE } from '../constants/currentUser';
import { JUST_NOW_LABEL, roleApplicationMessage } from '../constants/project';

interface DetailViewProps {
  project: ProjectItem;
  onBack: () => void;
  onAddComment: (projectId: string, comment: CommentItem) => void;
}

export const DetailView: React.FC<DetailViewProps> = ({
  project,
  onBack,
  onAddComment,
}) => {
  const [commentText, setCommentText] = useState('');
  const [userRoleSelection, setUserRoleSelection] = useState(DEFAULT_COMMENT_ROLE);
  const [appliedRoles, setAppliedRoles] = useState<string[]>([]);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: CommentItem = {
      id: `c-user-${Date.now()}`,
      author: CURRENT_USER.name,
      authorRole: userRoleSelection,
      authorAvatar: CURRENT_USER.avatar,
      content: commentText.trim(),
      createdAt: JUST_NOW_LABEL,
      likes: 1,
    };

    onAddComment(project.id, newComment);
    setCommentText('');
  };

  const handleApplyRole = (roleName: string) => {
    if (appliedRoles.includes(roleName)) return;
    setAppliedRoles([...appliedRoles, roleName]);
    // Applying also posts an announcement to the thread
    const applicationComment: CommentItem = {
      id: `c-apply-${Date.now()}`,
      author: CURRENT_USER.name,
      authorRole: roleName,
      authorAvatar: CURRENT_USER.avatar,
      content: roleApplicationMessage(roleName),
      createdAt: JUST_NOW_LABEL,
      likes: 2,
    };
    onAddComment(project.id, applicationComment);
  };

  const toggleLikeComment = (commentId: string) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 pb-24">
      {/* Sticky back bar */}
      <div className="bg-white/90 border-b border-stone-200/80 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-700 hover:text-orange-600 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>← タイムラインに戻る</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
            <span>{project.category}</span>
            <span>/</span>
            <span>ID: {project.id}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Project overview */}
        <article className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 pb-4 border-b border-stone-100">
            <div className="flex items-center gap-2.5">
              <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 tracking-wider">
                [{project.category}]
              </span>
              <span className="text-stone-300">·</span>
              <span>公開: {project.publishedAt}</span>
              <span className="text-stone-300">·</span>
              <span>締切: {project.recruitmentDeadline}</span>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-stone-700 bg-stone-50 px-3 py-1 rounded-md border border-stone-200">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>
                定員: <strong className="text-amber-700 tabular-nums">{project.currentMembers}</strong> / {project.targetSlots}名
              </span>
            </div>
          </div>

          <h1 className="mt-6 text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
            {project.title}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <img
              src={project.author.avatar}
              alt={project.author.name}
              className="w-10 h-10 rounded-full border border-stone-200 object-cover shadow-xs"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="text-sm font-semibold text-stone-900">
                {project.author.name}
              </div>
              <div className="text-xs text-stone-500 font-mono">
                {project.author.role}
              </div>
            </div>
          </div>

          {/* Cover image */}
          {project.bannerImage && (
            <div className="mt-6 rounded-xl overflow-hidden border border-stone-200 shadow-xs">
              <img
                src={project.bannerImage}
                alt={project.title}
                className="w-full max-h-80 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Project content sections */}
          <div className="mt-8 space-y-6 text-sm sm:text-base text-stone-700 leading-relaxed">
            <div>
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2">
                <span className="text-amber-700 font-mono">01.</span> プロジェクトの背景・問題意識
              </h2>
              <p className="mt-3 text-stone-600 text-sm leading-relaxed">
                {project.fullContent.background}
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2">
                <span className="text-amber-700 font-mono">02.</span> ゴール・達成したい熱狂
              </h2>
              <p className="mt-3 text-stone-600 text-sm leading-relaxed">
                {project.fullContent.purpose}
              </p>
            </div>

            {/* Open roles */}
            <div>
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2">
                <span className="text-amber-700 font-mono">03.</span> 募集している役割・ポジション
              </h2>
              <div className="mt-4 space-y-3">
                {project.fullContent.rolesNeeded.map((r, idx) => {
                  const isApplied = appliedRoles.includes(r.role);
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-stone-50/80 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-stone-900 text-sm">
                            {r.role}
                          </span>
                          <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                            {r.count}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-stone-600">
                          {r.description}
                        </p>
                      </div>

                      <button
                        onClick={() => handleApplyRole(r.role)}
                        disabled={isApplied}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 ${
                          isApplied
                            ? 'bg-stone-200 text-stone-600 cursor-default'
                            : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xs'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-stone-700" />
                            <span>立候補済み</span>
                          </>
                        ) : (
                          <span>この役割に立候補する</span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2">
                <span className="text-amber-700 font-mono">04.</span> 想定スケジュール
              </h2>
              <ul className="mt-3 space-y-2 text-xs sm:text-sm text-stone-600">
                {project.fullContent.schedule.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-mono text-xs mt-0.5">▶</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Budget */}
            <div>
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2">
                <span className="text-amber-700 font-mono">05.</span> 予算・制作リソース
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-stone-600 bg-stone-50 p-3.5 rounded-lg border border-stone-200 font-mono">
                {project.fullContent.resources}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-100 flex flex-wrap gap-2 text-xs text-stone-500">
            {project.tags.map((t) => (
              <span key={t} className="bg-stone-100 px-2.5 py-1 rounded border border-stone-200">
                #{t}
              </span>
            ))}
          </div>
        </article>

        {/* Comment thread */}
        <section className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <span>企画・役割提案スレッド</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold tabular-nums">
                {project.comments.length}
              </span>
            </h3>
            <span className="text-xs text-stone-500">
              アイデアや参加意志を自由に投げかけてください
            </span>
          </div>

          {/* Comment form */}
          <form onSubmit={handleCommentSubmit} className="space-y-3">
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
              <span className="text-[11px] text-stone-500">
                ※ 投稿は即座にスレッドへ反映されます
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>提案する</span>
              </button>
            </div>
          </form>

          {/* Comments */}
          <div className="mt-8 space-y-4 pt-6 border-t border-stone-100">
            {project.comments.map((comment) => {
              const isLiked = likedComments[comment.id];
              const likeCount = (comment.likes || 0) + (isLiked ? 1 : 0);

              return (
                <div
                  key={comment.id}
                  className="p-4 sm:p-5 rounded-xl bg-stone-50/70 border border-stone-200/80 flex items-start gap-3.5 transition-colors hover:border-amber-200"
                >
                  <img
                    src={comment.authorAvatar}
                    alt={comment.author}
                    className="w-9 h-9 rounded-full border border-stone-200 object-cover shrink-0 mt-0.5 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900">
                          {comment.author}
                        </span>
                        <span className="text-[11px] font-mono font-medium text-amber-800">
                          {comment.authorRole}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-400 font-mono">
                        {comment.createdAt}
                      </span>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                      {comment.content}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => toggleLikeComment(comment.id)}
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
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
