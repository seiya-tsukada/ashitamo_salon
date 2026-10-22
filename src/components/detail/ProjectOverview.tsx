import React from 'react';
import { Users } from 'lucide-react';
import { ProjectItem } from '../../types';
import { RoleList } from './RoleList';

interface ProjectOverviewProps {
  project: ProjectItem;
  onApplyRole: (roleName: string) => void;
}

const Section: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({
  number,
  title,
  children,
}) => (
  <div>
    <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2">
      <span className="text-amber-700 font-mono">{number}.</span> {title}
    </h2>
    {children}
  </div>
);

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project, onApplyRole }) => (
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
          定員: <strong className="text-amber-700 tabular-nums">{project.currentMembers}</strong> /{' '}
          {project.targetSlots}名
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
        <div className="text-sm font-semibold text-stone-900">{project.author.name}</div>
        <div className="text-xs text-stone-500 font-mono">{project.author.role}</div>
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

    <div className="mt-8 space-y-6 text-sm sm:text-base text-stone-700 leading-relaxed">
      <Section number="01" title="プロジェクトの背景・問題意識">
        <p className="mt-3 text-stone-600 text-sm leading-relaxed">{project.fullContent.background}</p>
      </Section>

      <Section number="02" title="ゴール・達成したい熱狂">
        <p className="mt-3 text-stone-600 text-sm leading-relaxed">{project.fullContent.purpose}</p>
      </Section>

      <Section number="03" title="募集している役割・ポジション">
        <RoleList roles={project.fullContent.rolesNeeded} onApply={onApplyRole} />
      </Section>

      <Section number="04" title="想定スケジュール">
        <ul className="mt-3 space-y-2 text-xs sm:text-sm text-stone-600">
          {project.fullContent.schedule.map((step, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-amber-600 font-mono text-xs mt-0.5">▶</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section number="05" title="予算・制作リソース">
        <p className="mt-3 text-xs sm:text-sm text-stone-600 bg-stone-50 p-3.5 rounded-lg border border-stone-200 font-mono">
          {project.fullContent.resources}
        </p>
      </Section>
    </div>

    <div className="mt-8 pt-6 border-t border-stone-100 flex flex-wrap gap-2 text-xs text-stone-500">
      {project.tags.map((t) => (
        <span key={t} className="bg-stone-100 px-2.5 py-1 rounded border border-stone-200">
          #{t}
        </span>
      ))}
    </div>
  </article>
);
