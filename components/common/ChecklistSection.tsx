import React, { useState } from 'react';
import { Category, Task } from '../../types';
import { ChevronDown, ChevronUp, CheckCircle2, Circle, AlertCircle, ExternalLink } from 'lucide-react';

interface ChecklistSectionProps {
  category: Category;
  onToggleTask: (taskId: string, categoryId: string) => void;
}

const ChecklistSection: React.FC<ChecklistSectionProps> = ({ category, onToggleTask }) => {
  const [isOpen, setIsOpen] = useState(false);

  const completedCount = category.tasks.filter(t => t.completed).length;
  const totalCount = category.tasks.length;
  const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  return (
    <div className="bg-white border border-slate-200 rounded-lg mb-4 overflow-hidden shadow-sm">
      <div
        className="flex items-center justify-between p-4 cursor-pointer bg-white hover:bg-slate-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <button className="text-slate-500">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <div>
            <h3 className="font-semibold text-slate-800">{category.title}</h3>
            <p className="text-sm text-slate-500">{category.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <span className="text-sm font-medium text-slate-700">{completedCount}/{totalCount}</span>
            <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-100">
          {category.tasks.map((task) => {
            const isCritical = task.impact === 'Critical';
            // Determine card styles - SIMPLIFIED as per user request
            let cardStyle = "bg-white border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md";
            if (task.completed) {
              cardStyle = "bg-slate-50 border-slate-100 opacity-60";
            }

            // Badge Styles - Simplified
            let badgeStyle = "bg-slate-100 text-slate-500";
            if (isCritical && !task.completed) {
              badgeStyle = "bg-red-50 text-red-600 border border-red-100"; // Keep subtle badge for critical
            } else if (!task.completed) {
              badgeStyle = "bg-blue-50 text-blue-600 border border-blue-100";
            }

            return (
              <div
                key={task.id}
                onClick={() => onToggleTask(task.id, category.id)}
                className={`flex flex-col p-4 rounded-xl border mb-3 mx-4 transition-all cursor-pointer group ${cardStyle}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${badgeStyle}`}>
                    {task.impact} Priority
                  </span>
                  {task.resourceUrl && (
                    <a href={task.resourceUrl} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 bg-white/50 p-1 rounded hover:bg-white transition-colors">
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors shadow-sm ${task.completed ? 'bg-slate-300 text-white' : 'bg-white border border-slate-300 text-slate-400 group-hover:border-blue-500 group-hover:text-blue-500'}`}>
                    {task.completed && <CheckCircle2 size={14} />}
                  </div>

                  <div className="flex-1">
                    <p className={`text-sm font-bold leading-tight ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                      {task.question}
                    </p>
                    {task.description && <p className="text-xs text-slate-500 mt-1.5">{task.description}</p>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default ChecklistSection;