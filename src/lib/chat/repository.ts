import { ChatMember, ChatMemberPresence, Message, Topic, TopicStatus } from '../../types';

export interface NewMessageInput {
  conversationId: string;
  body: string;
  replyToId: string | null;
}

export interface NewTopicInput {
  title: string;
  body: string;
}

// Data access for /home. The UI only talks to this interface, so the in-memory mock can be
// swapped for a Supabase implementation (RPC + Realtime) without touching components.
// `author` is passed explicitly for the mock; a server-backed version resolves it from the session.
export interface ChatRepository {
  listMembers(): Promise<ChatMemberPresence[]>;
  // Records that the member is active now. With Supabase the session check already does this
  // (sessions.last_seen_at), so that implementation can be a no-op.
  touchPresence(member: ChatMember): Promise<void>;

  listMessages(conversationId: string): Promise<Message[]>;
  postMessage(input: NewMessageInput, author: ChatMember): Promise<Message>;
  // Called for every new message in the conversation, including the poster's own
  subscribeMessages(conversationId: string, onMessage: (message: Message) => void): () => void;

  listTopics(): Promise<Topic[]>;
  createTopic(input: NewTopicInput, author: ChatMember): Promise<Topic>;
  setTopicStatus(topicId: string, status: TopicStatus): Promise<Topic>;
  // Called whenever a topic is created or changed (status, new comment)
  subscribeTopics(onChange: () => void): () => void;
}
