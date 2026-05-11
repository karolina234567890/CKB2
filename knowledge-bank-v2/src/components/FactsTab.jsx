import TopicCard from './TopicCard';
import { useKnowledge } from '../context/KnowledgeContext';

export default function FactsTab({ section, canEdit, highlightedTopicId }) {
  const { knowledge, addFact, updateFact, deleteFact } = useKnowledge();
  const topics = knowledge[section] || [];

  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          section={section}
          canEdit={canEdit}
          highlighted={highlightedTopicId === topic.id}
          onUpdateFact={(topicId, factId, text) => updateFact(section, topicId, factId, text)}
          onDeleteFact={(topicId, factId) => deleteFact(section, topicId, factId)}
          onAddFact={(topicId, fact) => addFact(section, topicId, fact)}
        />
      ))}
    </div>
  );
}
