import { useState, useRef, useEffect } from 'react';
import { COPILOT_MESSAGES } from '../data/mockData';
import CopilotTooltip from './CopilotTooltip';

function CopilotMessage({ message }) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!tooltipVisible) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setTooltipVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [tooltipVisible]);

  const sourceCount = message.sources.length;

  return (
    <div className="mb-4 last:mb-0">
      <div className="bg-[#EFF6FF] border border-[#1A56A0]/10 rounded-xl px-4 py-3">
        <div className="flex items-start gap-2">
          <span className="text-[#1A56A0] text-xs mt-0.5 flex-shrink-0">✦</span>
          <p className="text-sm text-gray-800 leading-relaxed">{message.text}</p>
        </div>
        <div ref={containerRef} className="relative mt-2 flex justify-end">
          <button
            onClick={() => setTooltipVisible((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs transition-colors ${
              tooltipVisible
                ? 'border-[#1A56A0] text-[#1A56A0] bg-[#EFF6FF]'
                : 'border-gray-200 text-gray-500 bg-white hover:border-[#1A56A0] hover:text-[#1A56A0]'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Based on {sourceCount} source{sourceCount !== 1 ? 's' : ''}
          </button>
          {tooltipVisible && (
            <CopilotTooltip sources={message.sources} />
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
