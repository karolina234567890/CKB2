import { useNavigate } from 'react-router-dom';

const tools = [
  {
    id: 'planning-agent',
    title: 'Planning Agent',
    description: 'AI-powered media plan creation and optimization assistant.',
    icon: '🤖',
    active: true,
    path: '/planning-agent',
  },
  {
    id: 'media-strategy',
    title: 'Media Strategy',
    description: 'Strategic recommendations and channel mix analysis.',
    icon: '📊',
    active: false,
    path: null,
  },
  {
    id: 'knowledge-bank',
    title: 'Knowledge Bank',
    description: 'Manage global, market, client and brand knowledge assets.',
    icon: '🏦',
    active: true,
    path: '/knowledge-bank',
  },
];

export default function DesignConsole() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <h1 className="text-xl font-bold text-[#1A56A0]">Design Console</h1>
      </div>
      <div className="p-10">
        <p className="text-gray-500 mb-8 text-sm">Select a tool to get started.</p>
        <div className="flex flex-wrap gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => tool.active && navigate(tool.path)}
              className={`
                bg-white border border-gray-200 rounded-xl p-6 flex-1 min-w-[220px] max-w-xs shadow-sm transition-all
                ${tool.active
                  ? 'cursor-pointer hover:border-[#1A56A0] hover:shadow-md hover:-translate-y-0.5'
                  : 'opacity-50 cursor-not-allowed'}
              `}
            >
              <div className="text-3xl mb-4">{tool.icon}</div>
              <h2 className={`text-base font-semibold mb-2 ${tool.active ? 'text-[#1A1A1A]' : 'text-gray-400'}`}>
                {tool.title}
              </h2>
              <p className={`text-sm ${tool.active ? 'text-gray-500' : 'text-gray-400'}`}>
                {tool.description}
              </p>
              {!tool.active && (
                <span className="mt-4 inline-block text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded">
                  Coming soon
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
