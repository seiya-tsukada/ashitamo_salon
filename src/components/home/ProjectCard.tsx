import React from 'react';
import { ArrowRight, Users } from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => (
  <article
    onClick={() => onSelect(project.id)}
    className="group relative rounded-2xl bg-white border border-stone-200/90 p-6 flex flex-col justify-between hover:border-amber-300 hover:shadow-lg transition-all duration-200 cursor-pointer shadow-sm"
  >
    {/* Category, date, slots */}
    <div>
      <div className="flex items-center justify-between gap-3 text-xs text-stone-500 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80 tracking-wider">
            [{project.category}]
          </span>
          <span className="text-stone-300">·</span>
          <span>{project.publishedAt}</span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
          <Users className="w-3.5 h-3.5 text-stone-500" />
          <span className="text-stone-800 font-bold tabular-nums">
            {project.currentMembers}/{project.targetSlots}名
          </span>
        </div>
      </div>

      <h2 className="text-lg sm:text-xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors leading-snug">
        {project.title}
      </h2>

      <p className="mt-3 text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">{project.lead}</p>
    </div>

    {/* Tags and author */}
    <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-stone-500">
        {project.tags.map((tag) => (
          <span key={tag} className="hover:text-orange-600 transition-colors">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          <img
            src={project.author.avatar}
            alt={project.author.name}
            className="w-7 h-7 rounded-full border border-stone-200 object-cover shadow-xs"
            referrerPolicy="no-referrer"
          />
          <div className="text-left">
            <div className="text-xs font-semibold text-stone-900 leading-tight">{project.author.name}</div>
            <div className="text-[10px] text-stone-500 leading-tight truncate max-w-[150px] sm:max-w-[200px]">
              {project.author.role}
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 group-hover:text-orange-600 group-hover:translate-x-1 transition-all">
          <span>詳細・提案</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  </article>
);
