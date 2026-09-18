"use client";

import { useMemo, useState } from 'react';

type Sender = 'user' | 'ai';

type Message = {
  id: number;
  sender: Sender;
  text: string;
  time: string;
};

type Conversation = {
  id: number;
  name: string;
  preview: string;
  online: boolean;
  accent: string;
  messages: Message[];
};

const mockReplies = [
  'Absolutely — I can help with that. Here is a clear approach to move forward.',
  'That sounds good. Let’s break it into a few manageable steps and tackle it efficiently.',
  'I’ve got it. I’ll keep the plan simple, actionable, and easy to follow.',
  'Nice idea. We can refine it and make sure the experience feels smooth and polished.',
  'This is a solid direction. I’d recommend focusing on the highest-impact details first.',
];

const initialConversations: Conversation[] = [
  {
    id: 1,
    name: 'Alicia Chen',
    preview: 'Can you review the onboarding flow?',
    online: true,
    accent: 'from-violet-500 to-indigo-500',
    messages: [
      { id: 1, sender: 'ai', text: 'Hi! I reviewed the onboarding flow and I think it is almost there.', time: '9:41 AM' },
      { id: 2, sender: 'user', text: 'Could you give me suggestions to make it more intuitive?', time: '9:42 AM' },
      { id: 3, sender: 'ai', text: 'Yes — simplify the first step, reduce choices, and add a clear call to action.', time: '9:43 AM' },
    ],
  },
  {
    id: 2,
    name: 'Product Team',
    preview: 'The new feature is ready for feedback.',
    online: true,
    accent: 'from-emerald-500 to-teal-500',
    messages: [
      { id: 1, sender: 'ai', text: 'The feature is ready for review. Please share feedback on usability.', time: 'Yesterday' },
      { id: 2, sender: 'user', text: 'Looks promising. I will review the dashboard section first.', time: 'Yesterday' },
    ],
  },
  {
    id: 3,
    name: 'Marketing Hub',
    preview: 'Campaign assets were uploaded successfully.',
    online: false,
    accent: 'from-amber-500 to-orange-500',
    messages: [
      { id: 1, sender: 'ai', text: 'Campaign assets are uploaded and ready to review.', time: 'Mon' },
      { id: 2, sender: 'user', text: 'Perfect, please share the final version for approval.', time: 'Mon' },
    ],
  },
  {
    id: 4,
    name: 'Design Review',
    preview: 'Need feedback on the landing page variations.',
    online: true,
    accent: 'from-pink-500 to-rose-500',
    messages: [
      { id: 1, sender: 'ai', text: 'I like the direction, but the CTA feels slightly crowded.', time: 'Tue' },
      { id: 2, sender: 'user', text: 'Thanks. I’ll simplify the hierarchy and test the new layout.', time: 'Tue' },
    ],
  },
];

export default function HomePage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState(1);
  const [input, setInput] = useState('');
  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeConversationId) ?? conversations[0],
    [activeConversationId, conversations],
  );

  const handleSendMessage = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: trimmedInput,
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    };

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === activeConversationId
          ? {
              ...conversation,
              preview: trimmedInput,
              messages: [...conversation.messages, userMessage],
            }
          : conversation,
      ),
    );

    setInput('');

    const replyText = mockReplies[Math.floor(Math.random() * mockReplies.length)];

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      };

      setConversations((previous) =>
        previous.map((conversation) =>
          conversation.id === activeConversationId
            ? {
                ...conversation,
                preview: replyText,
                messages: [...conversation.messages, aiMessage],
              }
            : conversation,
        ),
      );
    }, 650);
  };

  return (
    <main className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto flex min-h-screen max-w-[1600px]">
          <aside
            className={[
              'fixed inset-y-0 left-0 z-40 w-[300px] border-r border-slate-200 bg-white/80 p-4 backdrop-blur-xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900/90 md:relative md:translate-x-0',
              sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
            ].join(' ')}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Workspace</p>
                <h1 className="mt-1 text-2xl font-bold">ChatFlow</h1>
              </div>
              <button
                type="button"
                onClick={() => setIsDark((current) => !current)}
                className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700"
                aria-label="Toggle theme"
              >
                {isDark ? '☀️' : '🌙'}
              </button>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/70">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 text-lg font-bold text-white">
                M
              </div>
              <div>
                <p className="text-sm font-semibold">Maya Stone</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Product Designer</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Messages</h2>
              <button
                type="button"
                className="rounded-full bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600"
              >
                New chat
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {conversations.map((conversation) => {
                const isActive = conversation.id === activeConversationId;
                return (
                  <button
                    type="button"
                    key={conversation.id}
                    onClick={() => {
                      setActiveConversationId(conversation.id);
                      setSidebarOpen(false);
                    }}
                    className={[
                      'flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition',
                      isActive
                        ? 'border-brand-200 bg-brand-50 shadow-sm dark:border-brand-500/30 dark:bg-brand-500/10'
                        : 'border-transparent bg-transparent hover:border-slate-200 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-800/60',
                    ].join(' ')}
                  >
                    <div className={`relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${conversation.accent} text-sm font-bold text-white`}>
                      {conversation.name
                        .split(' ')
                        .map((word) => word[0])
                        .slice(0, 2)
                        .join('')}
                      {conversation.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-semibold">{conversation.name}</p>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">2m</span>
                      </div>
                      <p className="truncate text-sm text-slate-500 dark:text-slate-400">{conversation.preview}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="flex flex-1 flex-col">
            <header className="flex items-center justify-between border-b border-slate-200 bg-white/70 px-4 py-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 md:px-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSidebarOpen((current) => !current)}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-700 md:hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  ☰
                </button>

                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${activeConversation.accent} text-sm font-bold text-white`}>
                  {activeConversation.name
                    .split(' ')
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join('')}
                </div>

                <div>
                  <h2 className="text-lg font-semibold">{activeConversation.name}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeConversation.online ? 'Online now' : 'Last active 1h ago'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  View profile
                </button>
                <button
                  type="button"
                  className="rounded-xl bg-brand-500 px-3 py-2 text-sm font-medium text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600"
                >
                  Schedule call
                </button>
              </div>
            </header>

            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 space-y-5 overflow-y-auto bg-gradient-to-b from-slate-50 to-white p-4 dark:from-slate-950 dark:to-slate-900 md:p-6">
                {activeConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}
                  >
                    <div
                      className={[
                        'max-w-[80%] rounded-2xl px-4 py-3 shadow-sm md:max-w-[70%]',
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-brand-500 to-indigo-500 text-white'
                          : 'border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100',
                      ].join(' ')}
                    >
                      <p className="text-sm leading-6">{message.text}</p>
                      <p
                        className={[
                          'mt-2 text-[10px] font-medium',
                          message.sender === 'user' ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500',
                        ].join(' ')}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 bg-white/80 p-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 md:p-4">
                <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-inner dark:border-slate-700 dark:bg-slate-800">
                  <button type="button" className="rounded-xl bg-slate-200 p-2 text-lg dark:bg-slate-700">
                    +
                  </button>

                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    rows={1}
                    placeholder="Type your message..."
                    className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                  />

                  <button
                    type="button"
                    onClick={handleSendMessage}
                    className="rounded-xl bg-gradient-to-r from-brand-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:from-brand-600 hover:to-violet-600"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
