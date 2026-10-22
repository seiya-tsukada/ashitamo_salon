import React, { useState } from 'react';
import { Heart, Plus } from 'lucide-react';
import { CategoryType, ProjectItem } from '../../types';
import { ALL_CATEGORIES, CATEGORY_FILTERS } from '../../constants/project';
import { Button } from '../ui/Button';
import { SearchInput } from '../ui/SearchInput';
import { NewProjectModal } from './NewProjectModal';
import { ProjectCard } from './ProjectCard';

interface HomeViewProps {
  projects: ProjectItem[];
  onSelectProject: (projectId: string) => void;
  onCreateProject: (newProject: ProjectItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ projects, onSelectProject, onCreateProject }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>(ALL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const query = searchQuery.toLowerCase();
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === ALL_CATEGORIES || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(query) ||
      project.lead.toLowerCase().includes(query) ||
      project.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      project.author.name.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const resetFilters = () => {
    setActiveCategory(ALL_CATEGORIES);
    setSearchQuery('');
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
              <Button
                variant="gradient"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm rounded-xl shadow-sm hover:shadow-md whitespace-nowrap"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>新規プロジェクトを起案する</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
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

          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="プロジェクトやタグで検索..."
            className="w-full sm:w-72"
            iconClassName="w-4 h-4"
            inputClassName="w-full pl-9 pr-4 py-2 bg-white rounded-xl focus:ring-1 focus:ring-amber-500 transition-colors shadow-xs"
          />
        </div>

        {/* Result count */}
        <div className="py-4 flex items-center justify-between text-xs text-stone-500">
          <div>
            表示中: <span className="font-mono text-stone-900 tabular-nums font-bold">{filteredProjects.length}</span>{' '}
            件のプロジェクト
          </div>
          <div className="text-stone-500 text-[11px]">※ カードをクリックすると詳細・企画提案スレッドへ移動します</div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-stone-200 rounded-2xl bg-white shadow-xs">
            <p className="text-sm text-stone-600">該当するプロジェクトが見つかりませんでした。</p>
            <button onClick={resetFilters} className="mt-3 text-xs text-orange-600 underline cursor-pointer">
              フィルターをリセット
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onSelect={onSelectProject} />
            ))}
          </div>
        )}
      </div>

      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={onCreateProject} />
    </div>
  );
};
