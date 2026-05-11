import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import FilesTab from '../components/FilesTab';
import FactsTab from '../components/FactsTab';

const SECTIONS = [
  { id: 'global', label: 'Global', icon: '🌐' },
  { id: 'market', label: 'Market', icon: '🗺️' },
  { id: 'client', label: 'Client', icon: '🏢' },
  { id: 'brand', label: 'Brand', icon: '✨' },
];

const MARKET_OPTIONS = ['United States', 'United Kingdom', 'Germany', 'France', 'Poland'];

const CAN_EDIT = {
  global: true,
  market: true,
  client: true,
  brand: false,
};

const TABS = ['Facts', 'Files'];

export default function KnowledgeBank() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('global');
  const [activeTab, setActiveTab] = useState('Facts');
  const [selectedMarket, setSelectedMarket] = useState('United States');

  useEffect(() => {
    const hash = location.hash?.slice(1);
    if (!hash) return;

    const sectionMatch = SECTIONS.find((s) => hash.startsWith(`${s.id}-`));
    if (sectionMatch) {
      setActiveSection(sectionMatch.id);
      setActiveTab('Facts');
    }
  }, [location.hash]);

  const canEdit = CAN_EDIT[activeSection];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <TopBar
        breadcrumbs={[
          { label: 'Design Console', to: '/' },
          { label: 'Knowledge Bank' },
        ]}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-gray-200 flex-shrink-0 pt-4">
          <p className="px-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Sections</p>
          <nav>
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSection(sec.id);
                  navigate('/knowledge-bank', { replace: true });
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left ${
                  activeSection === sec.id
                    ? 'bg-[#EFF6FF] text-[#1A56A0] font-medium border-r-2 border-[#1A56A0]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{sec.icon}</span>
                {sec.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-bold text-[#1A1A1A]">
                  {SECTIONS.find((s) => s.id === activeSection)?.label} Knowledge
                </h1>
                {!canEdit && (
                  <p className="text-xs text-gray-400 mt-0.5">View only</p>
                )}
              </div>
              {activeSection === 'market' && (
                <select
                  value={selectedMarket}
                  onChange={(e) => setSelectedMarket(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1A56A0] bg-white"
                >
                  {MARKET_OPTIONS.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 border-b border-gray-200">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                    activeTab === tab
                      ? 'border-[#1A56A0] text-[#1A56A0]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content */}
            {activeTab === 'Facts' && (
              <FactsTab section={activeSection} canEdit={canEdit} />
            )}
            {activeTab === 'Files' && (
              <FilesTab canEdit={canEdit} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
