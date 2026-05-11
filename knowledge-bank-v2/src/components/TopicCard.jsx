import { useState, useRef, useEffect } from 'react';
import FactItem from './FactItem';
import AddFactForm from './AddFactForm';

function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const TOPIC_ICONS = {
  'Brand Positioning': '🎯',
  'Target Audience': '👥',
  'Media Mix Preferences': '📡',
};

export default function TopicCard({ topic, section, canEdit, onUpdateFact, onDeleteFact, onAddFact, highlighted }) {
  const [open, setOpen] = useState(true);
  const [addingFact, setAddingFact] = useState(false);
  const cardRef = useRef(null);

  const hasHighPriority = topic.facts.some((f) => f.priority === 'High');
  const icon = TOPIC_ICONS[topic.name] || '📌';

  useEffect(() => {
    if (highlighted && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      cardRef.current.classList.add('topic-highlight');
      const timer = setTimeout(() => {
        cardRef.current?.classList.remove('topic-highlight');
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [highlighted]);

  const handleAdd = (fact) => {
    onAddFact(topic.id, fact);
    setAddingFact(false);
  };

  return (
    <div
      ref={cardRef}
      id={topic.id}
      className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
    >
      <div
        className="flex items-start gap-3 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-xl mt-0.5 flex-shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-900 text-sm">{topic.name}</span>
            {hasHighPriority && (
              <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" title="Contains High priority fact" />
            )}
            <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">
              {topic.facts.length}/{topic.facts.length} facts
            </span>
            <ChevronIcon open={open} />
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{topic.subtitle}</p>
          {open && (
            <div className="mt-2 flex items-start gap-1.5">
              <span className="text-[#1A56A0] text-xs flex-shrink-0 mt-0.5">✦</span>
              <p className="text-xs text-gray-500 leading-relaxed">
                <span className="font-medium text-gray-600">AI summary: </span>
                {topic.aiSummary}
              </p>
            </div>
          )}
        </div>
      </div>

      {open && (
        <>
          <div className="border-t border-gray-100">
            {topic.facts.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">No facts yet.</p>
            )}
            {topic.facts.map((fact) => (
              <FactItem
                key={fact.id}
                fact={fact}
                canEdit={canEdit}
                onUpdate={(fid, text) => onUpdateFact(topic.id, fid, text)}
                onDelete={(fid) => onDeleteFact(topic.id, fid)}
              />
            ))}
          </div>

          {canEdit && (
            <div className="border-t border-gray-100 px-5 py-3">
              {addingFact ? (
                <AddFactForm
                  topicId={topic.id}
                  section={section}
                  onAdd={handleAdd}
                  onCancel={() => setAddingFact(false)}
                />
              ) : (
                <button
                  onClick={() => setAddingFact(true)}
                  className="text-sm text-[#1A56A0] hover:text-[#154a8e] font-medium flex items-center gap-1 transition-colors"
                >
                  <span className="text-base leading-none">+</span> Add fact to this topic
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
