import { useCallback, useEffect, useState } from 'react';
import { chatRepository } from '../lib/chat';
import { ChatMember, ChatMemberPresence, Message, Topic, TopicStatus } from '../types';

// Salon members with their last activity; marks `me` as active first
export const useMembers = (me: ChatMember) => {
  const [members, setMembers] = useState<ChatMemberPresence[]>([]);

  useEffect(() => {
    let isActive = true;
    chatRepository
      .touchPresence(me)
      .then(() => chatRepository.listMembers())
      .then((list) => {
        if (isActive) setMembers(list);
      });
    return () => {
      isActive = false;
    };
  }, [me]);

  return members;
};

// Messages of the main chat or a topic, kept live through the repository subscription
export const useMessages = (conversationId: string, me: ChatMember) => {
  // Keyed by conversation so switching conversations shows loading instead of the previous list
  const [loaded, setLoaded] = useState<{ conversationId: string; messages: Message[] } | null>(null);

  useEffect(() => {
    let isActive = true;
    const append = (message: Message) =>
      setLoaded((prev) =>
        prev && prev.conversationId === conversationId && !prev.messages.some((m) => m.id === message.id)
          ? { conversationId, messages: [...prev.messages, message] }
          : prev,
      );
    const unsubscribe = chatRepository.subscribeMessages(conversationId, append);
    chatRepository.listMessages(conversationId).then((messages) => {
      if (isActive) setLoaded({ conversationId, messages });
    });
    return () => {
      isActive = false;
      unsubscribe();
    };
  }, [conversationId]);

  const send = useCallback(
    (body: string, replyToId: string | null) =>
      chatRepository.postMessage({ conversationId, body, replyToId }, me).then(() => undefined),
    [conversationId, me],
  );

  const isLoading = loaded?.conversationId !== conversationId;
  return { messages: isLoading ? [] : loaded.messages, isLoading, send };
};

export const useTopics = (me: ChatMember) => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    let isActive = true;
    const load = () =>
      chatRepository.listTopics().then((list) => {
        if (isActive) setTopics(list);
      });
    const unsubscribe = chatRepository.subscribeTopics(load);
    load();
    return () => {
      isActive = false;
      unsubscribe();
    };
  }, []);

  const createTopic = useCallback(
    (title: string, body: string) => chatRepository.createTopic({ title, body }, me),
    [me],
  );

  const setTopicStatus = useCallback(
    (topicId: string, status: TopicStatus) => chatRepository.setTopicStatus(topicId, status),
    [],
  );

  return { topics, createTopic, setTopicStatus };
};
