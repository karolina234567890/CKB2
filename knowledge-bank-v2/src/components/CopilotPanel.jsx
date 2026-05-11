import { useState } from 'react';
import { COPILOT_MESSAGES } from '../data/mockData';
import CopilotTooltip from './CopilotTooltip';

function CopilotMessage({ message }) {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className="mb-4 last:mb-0">
      <div className="bg-[#EFF6FF] border border-[#1A56A0]/10 rounded-xl px-4 py-3 flex items-start gap-2">
        <span className="text-[#1A56A0] text-xs mt-0.5 flex-shrink-0">✦</span>
        <p className="text-sm text-gray-800 leading-relaxed flex-1">{message.text}</p>
        <div
          className="relative flex-shrink-0"
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          <button
            className="w-5 h-5 rounded-full border border-gray-300 text-gray-400 hover:text-[#1A56A0] hover:border-[#1A56A0] transition-colors flex items-center justify-center text-xs font-bold leading-none mt-0.5"
            title="View sources"
          >
            i
          </button>
          {tooltipVisible && (
            <CopilotTooltip
              sources={message.sources}
              onClose={() => setTooltipVisible(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function CopilotPanel({ onClose }) {
  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col flex-shrink-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[#1A56A0] font-bold">✦</span>
          <span className="text-sm font-semibold text-gray-900">Planning Agent</span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5">
        <p className="text-xs text-gray-400 mb-4 text-center">
          AI insights based on your Knowledge Bank
        </p>
        {COPILOT_MESSAGES.map((msg) => (
          <CopilotMessage key={msg.id} message={msg} />
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-[#1A56A0] transition-colors">
          <input
            type="text"
            placeholder="Ask Planning Agent…"
            className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
          />
          <button className="text-[#1A56A0] hover:text-[#154a8e] transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
