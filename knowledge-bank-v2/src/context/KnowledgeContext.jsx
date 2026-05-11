import { createContext, useContext, useState } from 'react';
import { INITIAL_KNOWLEDGE } from '../data/mockData';

const KnowledgeContext = createContext(null);

export function KnowledgeProvider({ children }) {
  const [knowledge, setKnowledge] = useState(INITIAL_KNOWLEDGE);

  const addFact = (section, topicId, fact) => {
    setKnowledge((prev) => ({
      ...prev,
      [section]: prev[section].map((topic) =>
        topic.id === topicId
          ? { ...topic, facts: [...topic.facts, fact] }
          : topic
      ),
    }));
  };

  const updateFact = (section, topicId, factId, newText) => {
    setKnowledge((prev) => ({
      ...prev,
      [section]: prev[section].map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              facts: topic.facts.map((f) =>
                f.id === factId ? { ...f, text: newText } : f
              ),
            }
          : topic
      ),
    }));
  };

  const deleteFact = (section, topicId, factId) => {
    setKnowledge((prev) => ({
      ...prev,
      [section]: prev[section].map((topic) =>
        topic.id === topicId
          ? { ...topic, facts: topic.facts.filter((f) => f.id !== factId) }
          : topic
      ),
    }));
  };

  return (
    <KnowledgeContext.Provider value={{ knowledge, addFact, updateFact, deleteFact }}>
      {children}
    </KnowledgeContext.Provider>
  );
}

export const useKnowledge = () => useContext(KnowledgeContext);
