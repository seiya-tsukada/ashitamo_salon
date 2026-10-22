import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { CommentItem, ProjectItem } from '../../types';
import { createApplicationComment } from '../../utils/project';
import { CommentThread } from './CommentThread';
import { ProjectOverview } from './ProjectOverview';

interface DetailViewProps {
  project: ProjectItem;
  onBack: () => void;
  onAddComment: (projectId: string, comment: CommentItem) => void;
}

export const DetailView: React.FC<DetailViewProps> = ({ project, onBack, onAddComment }) => {
  const addComment = (comment: CommentItem) => onAddComment(project.id, comment);

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
        <ProjectOverview project={project} onApplyRole={(roleName) => addComment(createApplicationComment(roleName))} />
        <CommentThread comments={project.comments} onAddComment={addComment} />
      </div>
    </div>
  );
};
