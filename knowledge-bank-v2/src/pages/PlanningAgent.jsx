import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PLANS_US, MOCK_PLANS_GLOBAL } from '../data/mockData';

const MARKET_OPTIONS = ['United States', 'Global'];

function TopBarPA({ market, setMarket }) {
  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center px-6 gap-4 flex-shrink-0">
      <span className="font-bold text-[#1A56A0] text-base mr-4">Planning Console</span>
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-500">Client:</label>
        <select className="border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none">
          <option>Default Client</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-500">Market:</label>
        <select
          value={market}
          onChange={(e) => setMarket(e.target.value)}
          className="border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#1A56A0]"
        >
          {MARKET_OPTIONS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-500">Project:</label>
        <select className="border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none">
          <option>Select Project</option>
        </select>
      </div>
      <div className="ml-auto flex items-center gap-3 text-gray-400">
        <button title="Notifications" className="hover:text-gray-600">🔔</button>
        <button title="Help" className="hover:text-gray-600">❓</button>
        <div className="w-8 h-8 bg-[#1A56A0] rounded-full flex items-center justify-center text-white text-xs font-bold">
          AK
        </div>
      </div>
    </div>
  );
}

function TrashIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

export default function PlanningAgent() {
  const [market, setMarket] = useState('United States');
  const navigate = useNavigate();

  const isGlobal = market === 'Global';
  const plans = isGlobal ? MOCK_PLANS_GLOBAL : MOCK_PLANS_US;
  const title = isGlobal ? 'Multimarket Media Plan List' : 'Media Plan List';

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <TopBarPA market={market} setMarket={setMarket} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-6 py-2 text-xs text-gray-400 flex gap-2 items-center">
        <button onClick={() => navigate('/')} className="hover:text-[#1A56A0] transition-colors">Planning Console</button>
        <span>›</span>
        <span className="text-gray-700 font-medium">Planning Agent</span>
      </div>

      <div className="flex-1 p-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-[#1A1A1A]">{title}</h1>
          <div className="flex items-center gap-3">
            {!isGlobal && (
              <div className="relative">
                <button className="border border-gray-200 bg-white text-sm px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-gray-50 transition-colors">
                  Client Setting <span className="text-gray-400">▾</span>
                </button>
              </div>
            )}
            <button
              onClick={() => navigate('/knowledge-bank')}
              className="border border-[#1A56A0] text-[#1A56A0] text-sm px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-[#EFF6FF] transition-colors"
            >
              🏦 Knowledge Bank
            </button>
            <button className="bg-[#1A56A0] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#154a8e] transition-colors font-medium">
              + New Plan
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 font-medium text-gray-600">Name</th>
                {isGlobal && <th className="text-left px-5 py-3 font-medium text-gray-600">Markets</th>}
                <th className="text-left px-5 py-3 font-medium text-gray-600">Brand</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">Planning Period</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">Creation Date</th>
                <th className="px-5 py-3 font-medium text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan, i) => (
                <tr
                  key={plan.id}
                  onClick={() => navigate(`/planning-agent/plan/${plan.id}`)}
                  className={`cursor-pointer hover:bg-[#EFF6FF] transition-colors ${
                    i < plans.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <td className="px-5 py-3">
                    <span className="font-medium text-[#1A56A0] hover:underline">{plan.name}</span>
                  </td>
                  {isGlobal && <td className="px-5 py-3 text-gray-500">{plan.markets}</td>}
                  <td className="px-5 py-3 text-gray-700">{plan.brand}</td>
                  <td className="px-5 py-3 text-gray-500">{plan.period}</td>
                  <td className="px-5 py-3 text-gray-500">{plan.created}</td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('Delete plan?');
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50"
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
