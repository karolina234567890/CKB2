import { useState } from 'react';
import { PriorityBadge } from './LevelBadge';

export default function FactItem({ fact, canEdit, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(fact.text);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(fact.id, editText.trim());
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setEditText(fact.text);
    setEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Delete this fact?')) {
      onDelete(fact.id);
    }
  };

  return (
    <div className="flex items-start gap-3 py-3 px-4 hover:bg-gray-50 rounded-lg group">
      <input
        type="checkbox"
        defaultChecked
        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1A56A0] cursor-pointer flex-shrink-0"
        readOnly
      />
      <div className="flex-1 min-w-0">
        {editing ? (
          <div className="space-y-2">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full border border-[#1A56A0] rounded-lg px-3 py-2 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-[#1A56A0]/30"
              rows={3}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="text-xs bg-[#1A56A0] text-white px-3 py-1 rounded-lg hover:bg-[#154a8e] transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="text-xs text-gray-500 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-800 leading-relaxed">{fact.text}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <PriorityBadge priority={fact.priority} />
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                {fact.source}
              </span>
              {fact.tags.map((tag) => (
                <span key={tag} className="text-xs text-[#1A56A0] bg-[#EFF6FF] px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
      {canEdit && !editing && (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => setEditing(true)}
            className="text-xs text-[#1A56A0] px-2 py-1 rounded hover:bg-[#EFF6FF] transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-xs text-red-400 px-2 py-1 rounded hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
