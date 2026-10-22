import React from 'react';
import { LPActivity } from '../../data/lpActivities';

export const ActivityCard: React.FC<{ activity: LPActivity }> = ({ activity }) => (
  <div className="group rounded-2xl bg-white border border-stone-200/80 shadow-md shadow-stone-200/40 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:border-amber-300">
    <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
      <img
        src={activity.image}
        alt={activity.imageAlt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-white/90 border border-stone-200 text-[11px] font-mono font-bold text-amber-800 backdrop-blur-sm shadow-xs">
        {activity.label}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
          {activity.title}
        </h3>
        <p className="mt-3 text-sm text-stone-600 leading-relaxed">{activity.description}</p>
      </div>
      <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
        <span>進行中プロジェクト</span>
        <span className="font-semibold text-stone-800">{activity.currentProject}</span>
      </div>
    </div>
  </div>
);
