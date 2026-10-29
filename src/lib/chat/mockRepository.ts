import { MOCK_CHANNELS, MOCK_MESSAGES, MOCK_TOPICS } from '../../data/mockChat';
import { Message, Topic } from '../../types';
import { ChatRepository } from './repository';

// In-memory implementation used until the Supabase tables exist. State lives for the page session.
export const createMockChatRepository = (): ChatRepository => {
  const channels = structuredClone(MOCK_CHANNELS);
  const messages = structuredClone(MOCK_MESSAGES);
  const topics = structuredClone(MOCK_TOPICS);
  const messageListeners = new Map<string, Set<(message: Message) => void>>();
  const topicListeners = new Set<() => void>();

  const newId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;

  const findTopic = (topicId: string): Topic => {
    const topic = topics.find((t) => t.id === topicId);
    if (!topic) throw new Error(`Topic not found: ${topicId}`);
    return topic;
  };

  const notifyTopics = () => topicListeners.forEach((listener) => listener());

  return {
    listChannels: async () => [...channels],

    listMessages: async (conversationId) => messages.filter((m) => m.conversationId === conversationId),

    postMessage: async ({ conversationId, body, replyToId }, author) => {
      const message: Message = {
        id: newId('msg'),
        conversationId,
        author,
        body,
        replyToId,
        createdAt: new Date().toISOString(),
      };
      messages.push(message);
      messageListeners.get(conversationId)?.forEach((listener) => listener(message));

      const topic = topics.find((t) => t.id === conversationId);
      if (topic) {
        topic.commentCount += 1;
        topic.updatedAt = message.createdAt;
        notifyTopics();
      }
      return message;
    },

    subscribeMessages: (conversationId, onMessage) => {
      const listeners = messageListeners.get(conversationId) ?? new Set();
      listeners.add(onMessage);
      messageListeners.set(conversationId, listeners);
      return () => listeners.delete(onMessage);
    },

    listTopics: async () => topics.map((t) => ({ ...t })),

    createTopic: async ({ title, body }, author) => {
      const now = new Date().toISOString();
      const topic: Topic = {
        id: newId('topic'),
        title,
        body,
        author,
        status: 'open',
        createdAt: now,
        updatedAt: now,
        commentCount: 0,
      };
      topics.unshift(topic);
      notifyTopics();
      return { ...topic };
    },

    setTopicStatus: async (topicId, status) => {
      const topic = findTopic(topicId);
      topic.status = status;
      topic.updatedAt = new Date().toISOString();
      notifyTopics();
      return { ...topic };
    },

    subscribeTopics: (onChange) => {
      topicListeners.add(onChange);
      return () => topicListeners.delete(onChange);
    },
  };
};
