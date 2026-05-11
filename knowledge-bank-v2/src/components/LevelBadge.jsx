const LEVEL_STYLES = {
  Global: 'bg-[#D5F0E8] text-[#0F6E56]',
  Market: 'bg-[#DBEAFE] text-[#1D4ED8]',
  Client: 'bg-[#F3E8FF] text-[#7E22CE]',
  Brand: 'bg-[#FEF3C7] text-[#B45309]',
  'Media Plan': 'bg-[#FCE7F3] text-[#9D174D]',
};

const PRIORITY_STYLES = {
  High: 'bg-[#FEE2E2] text-[#991B1B]',
  Medium: 'bg-[#FEF3C7] text-[#92400E]',
  Low: 'bg-[#F3F4F6] text-[#374151]',
};

export function LevelBadge({ level, className = '' }) {
  const style = LEVEL_STYLES[level] || 'bg-gray-100 text-gray-600';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${style} ${className}`}>
      {level}
    </span>
  );
}

export function PriorityBadge({ priority, className = '' }) {
  const style = PRIORITY_STYLES[priority] || 'bg-gray-100 text-gray-600';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${style} ${className}`}>
      {priority}
    </span>
  );
}
