import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PLANS_US, MOCK_PLANS_GLOBAL } from '../data/mockData';
import CopilotPanel from '../components/CopilotPanel';

const ALL_PLANS = [...MOCK_PLANS_US, ...MOCK_PLANS_GLOBAL];

const NAV_ITEMS = [
  { id: 'details', label: 'Details', indent: 0, active: true },
  { id: 'channel-strategy', label: 'Channel Strategy', indent: 0, isGroup: true },
  { id: 'channel-selection', label: 'Channel Selection', indent: 1 },
  { id: 'channel-allocation', label: 'Channel Allocation', indent: 1 },
  { id: 'in-channel', label: 'In-Channel Strategy', indent: 0, isGroup: true },
  { id: 'partner-selection', label: 'Partner Selection', indent: 1 },
  { id: 'summary', label: 'Summary', indent: 0, isGroup: true },
  { id: 'summary-view', label: 'Summary', indent: 1 },
  { id: 'strategic-flowchart', label: 'Strategic Flowchart', indent: 1 },
];

function FormField({ label, value, placeholder, type = 'text', className = '' }) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1A56A0] focus:ring-2 focus:ring-[#1A56A0]/20"
      />
    </div>
  );
}

function TextAreaField({ label, value, placeholder, rows = 3, className = '' }) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <textarea
        defaultValue={value}
        placeholder={placeholder}
        rows={rows}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 resize-none focus:outline-none focus:border-[#1A56A0] focus:ring-2 focus:ring-[#1A56A0]/20"
      />
    </div>
  );
}

export default function MediaPlan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('details');
  const [copilotOpen, setCopilotOpen] = useState(true);

  const plan = ALL_PLANS.find((p) => p.id === id) || ALL_PLANS[0];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Top bar */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center px-6 gap-4 flex-shrink-0">
        <span className="font-bold text-[#1A56A0] text-base mr-4">Planning Console</span>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <button onClick={() => navigate('/')} className="hover:text-gray-600">Home</button>
          <span>›</span>
          <button onClick={() => navigate('/planning-agent')} className="hover:text-gray-600">Planning Console</button>
          <span>›</span>
          <button onClick={() => navigate('/planning-agent')} className="hover:text-gray-600">Planning Agent</button>
          <span>›</span>
          <span className="text-gray-700 font-medium">{plan.name}</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {!copilotOpen && (
            <button
              onClick={() => setCopilotOpen(true)}
              className="flex items-center gap-2 border border-[#1A56A0] text-[#1A56A0] text-sm px-3 py-1.5 rounded-lg hover:bg-[#EFF6FF] transition-colors"
            >
              <span className="font-bold">✦</span> Planning Agent
            </button>
          )}
          <div className="w-8 h-8 bg-[#1A56A0] rounded-full flex items-center justify-center text-white text-xs font-bold">
            AK
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar nav */}
        <aside className="w-52 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
          <div className="flex-1 pt-4 pb-4 overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => !item.isGroup && setActiveNav(item.id)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors
                  ${item.isGroup ? 'font-semibold text-gray-500 text-xs uppercase tracking-wider mt-3 cursor-default' : ''}
                  ${!item.isGroup && item.indent === 1 ? 'pl-7' : ''}
                  ${!item.isGroup && activeNav === item.id
                    ? 'bg-[#EFF6FF] text-[#1A56A0] font-medium border-r-2 border-[#1A56A0]'
                    : !item.isGroup ? 'text-gray-600 hover:bg-gray-50' : ''
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="border-t border-gray-200 p-4">
            <button className="w-full bg-gray-900 text-white text-xs py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
              ↓ Download Media Plan
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-8">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-6">Media Plan Details</h2>

          <div className="space-y-6 w-full max-w-3xl">
            {/* Client Brief */}
            <section className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Client Brief</h3>
              <TextAreaField
                label="Brief"
                value="Target audience Millennials 18–34, urban, design-conscious. Focus on brand awareness and premium positioning."
                rows={4}
              />
            </section>

            {/* Client Details */}
            <section className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Client Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Client" value="Default Client" />
                <FormField label="Brand" value={plan.brand} />
              </div>
            </section>

            {/* Plan Details */}
            <section className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Plan Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Plan Name" value={plan.name} className="col-span-2" />
                <FormField label="Budget" placeholder="e.g. $500,000" />
                <FormField label="Planning Period" value={plan.period} />
                <TextAreaField label="KPIs" placeholder="e.g. Brand recall +15%, Reach 60%" className="col-span-2" />
              </div>
            </section>

            {/* Target Audience */}
            <section className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Target Audience</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Age Range" value="28–44" />
                <FormField label="Location" value="Urban professionals" />
                <TextAreaField label="Description" value="Design-conscious, household income $90k+, high online activity." className="col-span-2" />
              </div>
            </section>
          </div>
        </main>

        {/* Copilot panel */}
        {copilotOpen && <CopilotPanel onClose={() => setCopilotOpen(false)} />}
      </div>
    </div>
  );
}
