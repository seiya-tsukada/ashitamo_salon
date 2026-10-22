import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { ProjectCategory, ProjectItem } from '../../types';
import { NEW_PROJECT_DEFAULTS, PROJECT_CATEGORY_OPTIONS } from '../../constants/project';
import { createDraftProject } from '../../utils/project';
import { Button } from '../ui/Button';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (project: ProjectItem) => void;
}

const LABEL_CLASS = 'block text-xs font-semibold text-stone-700 mb-1';
const FIELD_CLASS =
  'w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-amber-500';

// Stays mounted while closed so a half-written draft survives closing and reopening
export const NewProjectModal: React.FC<NewProjectModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProjectCategory>(NEW_PROJECT_DEFAULTS.category);
  const [lead, setLead] = useState('');
  const [slots, setSlots] = useState(NEW_PROJECT_DEFAULTS.slots);
  const [tags, setTags] = useState(NEW_PROJECT_DEFAULTS.tags);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !lead.trim()) return;

    onCreate(createDraftProject({ title, lead, category, slots, tags }));
    setTitle('');
    setLead('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-md">
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          新規プロジェクトを起案する
        </h3>
        <p className="mt-1 text-xs text-stone-600">
          あなたの「やってみたい」をサロンメンバーに投げかけ、温かな仲間を集めましょう。
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className={LABEL_CLASS}>カテゴリ</label>
            <div className="grid grid-cols-4 gap-2">
              {PROJECT_CATEGORY_OPTIONS.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    category === cat
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
            <label className={LABEL_CLASS}>
              プロジェクト名・タイトル <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="例：写真集『TOKYO UNDERGROUND』制作プロジェクト"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${FIELD_CLASS} focus:bg-white`}
            />
          </div>

          <div>
            <label className={LABEL_CLASS}>
              企画概要・リード文 <span className="text-orange-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="企画の背景、どんな熱狂を起こしたいのか、何を創りたいのかを温かく記載してください。"
              value={lead}
              onChange={(e) => setLead(e.target.value)}
              className={`${FIELD_CLASS} focus:bg-white resize-none`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={LABEL_CLASS}>募集人数（目安）</label>
              <input
                type="number"
                min="1"
                max="50"
                value={slots}
                onChange={(e) => setSlots(e.target.value)}
                className={`${FIELD_CLASS} font-mono`}
              />
            </div>
            <div>
              <label className={LABEL_CLASS}>タグ（カンマ区切り）</label>
              <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className={FIELD_CLASS} />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-500 hover:text-stone-800"
            >
              キャンセル
            </button>
            <Button variant="gradient" type="submit" className="px-6 py-2.5 text-xs sm:text-sm rounded-lg shadow-sm">
              タイムラインに公開する
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
