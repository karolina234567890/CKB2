import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { KnowledgeProvider } from './context/KnowledgeContext';
import DesignConsole from './pages/DesignConsole';
import KnowledgeBank from './pages/KnowledgeBank';
import PlanningAgent from './pages/PlanningAgent';
import MediaPlan from './pages/MediaPlan';

export default function App() {
  return (
    <BrowserRouter>
      <KnowledgeProvider>
        <Routes>
          <Route path="/" element={<DesignConsole />} />
          <Route path="/knowledge-bank" element={<KnowledgeBank />} />
          <Route path="/planning-agent" element={<PlanningAgent />} />
          <Route path="/planning-agent/plan/:id" element={<MediaPlan />} />
        </Routes>
      </KnowledgeProvider>
    </BrowserRouter>
  );
}
