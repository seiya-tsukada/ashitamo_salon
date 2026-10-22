import React, { useState } from 'react';
import { ProjectItem, CategoryType, ProjectCategory } from '../types';
import { Plus, Search, Users, ArrowRight, Sparkles, Heart, X } from 'lucide-react';
import { CURRENT_USER } from '../constants/currentUser';
import {
  ALL_CATEGORIES,
  CATEGORY_FILTERS,
  JUST_NOW_LABEL,
  NEW_PROJECT_DEFAULTS,
  PROJECT_CATEGORY_OPTIONS,
} from '../constants/project';

interface HomeViewProps {
  projects: ProjectItem[];
  onSelectProject: (projectId: string) => void;
  onNavigateToAdmin: () => void;
  onCreateProject: (newProject: ProjectItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  projects,
  onSelectProject,
  onNavigateToAdmin,
  onCreateProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>(ALL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state for creating a new project
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ProjectCategory>(NEW_PROJECT_DEFAULTS.category);
  const [newLead, setNewLead] = useState('');
  const [newSlots, setNewSlots] = useState(NEW_PROJECT_DEFAULTS.slots);
  const [newTags, setNewTags] = useState(NEW_PROJECT_DEFAULTS.tags);

  const query = searchQuery.toLowerCase();
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === ALL_CATEGORIES || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(query) ||
      project.lead.toLowerCase().includes(query) ||
      project.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      project.author.name.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLead.trim()) return;

    const now = Date.now();
    const slots = parseInt(newSlots);
    const author = {
      name: CURRENT_USER.name,
      role: CURRENT_USER.role,
      avatar: CURRENT_USER.avatar,
    };

    const created: ProjectItem = {
      id: `proj-${now}`,
      category: newCategory,
      title: newTitle.trim(),
      lead: newLead.trim(),
      author,
      publishedAt: JUST_NOW_LABEL,
      recruitmentDeadline: NEW_PROJECT_DEFAULTS.recruitmentDeadline,
      targetSlots: slots || NEW_PROJECT_DEFAULTS.fallbackSlots,
      currentMembers: 1,
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      fullContent: {
        background: newLead.trim(),
        purpose: NEW_PROJECT_DEFAULTS.purpose,
        rolesNeeded: [
          { role: 'プロジェクト共同リーダー', count: '1名', description: '進捗管理と企画ディレクション', filled: false },
          { role: 'クリエイティブ制作メンバー', count: `${slots - 1 || NEW_PROJECT_DEFAULTS.fallbackCreativeSlots}名`, description: '実制作・デザイン・実装', filled: false }
        ],
        schedule: [...NEW_PROJECT_DEFAULTS.schedule],
        resources: NEW_PROJECT_DEFAULTS.resources,
      },
      comments: [
        {
          id: `c-init-${now}`,
          author: author.name,
          authorRole: author.role,
          authorAvatar: author.avatar,
          content: NEW_PROJECT_DEFAULTS.initialComment,
          createdAt: JUST_NOW_LABEL,
          likes: 1,
        },
      ]
    };

    onCreateProject(created);
    setNewTitle('');
    setNewLead('');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50/80 via-orange-50/50 to-amber-50/80 border-b border-stone-200/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 mb-2">
                <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                <span>ACTIVE CO-CREATION GUILD</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
                プロジェクト・タイムライン
              </h1>
              <p className="mt-1 text-sm text-stone-600">
                温かな仲間とともに新しい熱狂を仕掛ける、現在進行形の募集一覧。
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>新規プロジェクトを起案する</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          {/* Category tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100/90 border border-stone-200 rounded-xl overflow-x-auto">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="プロジェクトやタグで検索..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors shadow-xs"
            />
          </div>
        </div>

        {/* Result count */}
        <div className="py-4 flex items-center justify-between text-xs text-stone-500">
          <div>
            表示中: <span className="font-mono text-stone-900 tabular-nums font-bold">{filteredProjects.length}</span> 件のプロジェクト
          </div>
          <div className="text-stone-500 text-[11px]">
            ※ カードをクリックすると詳細・企画提案スレッドへ移動します
          </div>
        </div>

        {/* Project cards */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-stone-200 rounded-2xl bg-white shadow-xs">
            <p className="text-sm text-stone-600">該当するプロジェクトが見つかりませんでした。</p>
            <button
              onClick={() => {
                setActiveCategory(ALL_CATEGORIES);
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-orange-600 underline cursor-pointer"
            >
              フィルターをリセット
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => onSelectProject(project.id)}
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

                  <p className="mt-3 text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                    {project.lead}
                  </p>
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
                        <div className="text-xs font-semibold text-stone-900 leading-tight">
                          {project.author.name}
                        </div>
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
            ))}
          </div>
        )}
      </div>

      {/* New project modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              新規プロジェクトを起案する
            </h3>
            <p className="mt-1 text-xs text-stone-600">
              あなたの「やってみたい」をサロンメンバーに投げかけ、温かな仲間を集めましょう。
            </p>

            <form onSubmit={handleCreateSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  カテゴリ
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {PROJECT_CATEGORY_OPTIONS.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setNewCategory(cat)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        newCategory === cat
                          ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  プロジェクト名・タイトル <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="例：写真集『TOKYO UNDERGROUND』制作プロジェクト"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  企画概要・リード文 <span className="text-orange-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="企画の背景、どんな熱狂を起こしたいのか、何を創りたいのかを温かく記載してください。"
                  value={newLead}
                  onChange={(e) => setNewLead(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-amber-500 focus:bg-white resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    募集人数（目安）
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={newSlots}
                    onChange={(e) => setNewSlots(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    タグ（カンマ区切り）
                  </label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-500 hover:text-stone-800"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  タイムラインに公開する
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
