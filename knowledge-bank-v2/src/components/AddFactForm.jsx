import { useState } from 'react';

export default function AddFactForm({ topicId, section, onAdd, onCancel }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd({
      id: `fact-${Date.now()}`,
      text: text.trim(),
      priority,
      source: 'manual',
      tags: [],
    });
    setText('');
    setPriority('Medium');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 mx-4 p-4 bg-[#EFF6FF] border border-[#1A56A0]/20 rounded-lg space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter fact text…"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-[#1A56A0] focus:ring-2 focus:ring-[#1A56A0]/20"
        rows={3}
        autoFocus
      />
      <div className="flex items-center gap-3">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#1A56A0]"
        >
          <option value="High">High priority</option>
          <option value="Medium">Medium priority</option>
          <option value="Low">Low priority</option>
        </select>
        <div className="flex gap-2 ml-auto">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-sm bg-[#1A56A0] text-white px-3 py-1.5 rounded-lg hover:bg-[#154a8e] transition-colors"
          >
            Add fact
          </button>
        </div>
      </div>
    </form>
  );
}
