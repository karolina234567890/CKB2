import { useNavigate } from 'react-router-dom';
import { LevelBadge } from './LevelBadge';

export default function CopilotTooltip({ sources, onClose }) {
  const navigate = useNavigate();

  const handleView = (source) => {
    if (source.topicId && source.section) {
      navigate(`/knowledge-bank#${source.topicId}`);
    }
  };

  return (
    <div
      className="absolute z-50 bg-white border border-gray-200 rounded-xl shadow-xl w-80 right-full mr-3 top-0"
      onMouseLeave={onClose}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-700">Sources used for this insight</p>
      </div>
      <div className="divide-y divide-gray-100">
        {sources.map((src, i) => (
          <div key={i} className="px-4 py-3 flex items-start gap-3">
            <LevelBadge level={src.level} className="mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600 flex-1 leading-relaxed">"{src.quote}"</p>
            {src.fromBrief ? (
              <span className="text-xs text-gray-400 flex-shrink-0 mt-0.5">from brief</span>
            ) : (
              <button
                onClick={() => handleView(src)}
                className="text-xs text-[#1A56A0] hover:underline flex-shrink-0 mt-0.5 font-medium"
              >
                ↗ View
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
