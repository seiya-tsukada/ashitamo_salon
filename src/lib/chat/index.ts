import { createMockChatRepository } from './mockRepository';
import { ChatRepository } from './repository';

// Swap this for a Supabase-backed implementation once the chat tables exist
export const chatRepository: ChatRepository = createMockChatRepository();

export type { ChatRepository, NewMessageInput, NewTopicInput } from './repository';
