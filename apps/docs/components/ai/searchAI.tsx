'use client';
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  type SyntheticEvent,
  use,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Loader2, MessageCircleIcon, RefreshCw, Send, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { type UIMessage, useChat, type UseChatHelpers } from '@ai-sdk/react';
import type { ProvideLinksToolSchema } from '@/lib/chat/inkeep-qa-schema';
import type { z } from 'zod';
import { DefaultChatTransport } from 'ai';
import { Markdown } from './markdown';
import { Presence } from '@radix-ui/react-presence';
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai/sources';

import { iconResolver } from "@/lib/iconResolver";

const Context = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  chat: UseChatHelpers<UIMessage>;
} | null>(null);

function useChatContext() {
  return use(Context)!.chat;
}

function Header() {
  const { setOpen } = use(Context)!;

  return (
    <div className="sticky top-0 flex items-start gap-2 z-10 pb-2">
      <div className="flex-1 p-3 border rounded-xl bg-fd-card/50 backdrop-blur-md text-fd-card-foreground shadow-sm border-white/5">
        <p className="text-sm font-bold mb-1 flex items-center gap-2">
          {iconResolver("logo-mesh/black/logo-mesh-vector.svg", "size-4 dark:invert")}
          Mesh AI
        </p>
        <p className="text-xs text-fd-muted-foreground">
          AI can be inaccurate, please verify the information.
        </p>
      </div>
      <button
        aria-label="Close"
        tabIndex={-1}
        className={cn(
          buttonVariants({
            size: 'icon-sm',
            color: 'secondary',
            className: 'rounded-full bg-fd-secondary/50 backdrop-blur-md border-white/5',
          }),
        )}
        onClick={() => setOpen(false)}
      >
        <X />
      </button>
    </div>
  );
}

function SearchAIActions() {
  const { messages, status, setMessages, regenerate } = useChatContext();
  const isLoading = status === 'streaming';

  if (messages.length === 0) return null;

  return (
    <>
      {!isLoading && messages.at(-1)?.role === 'assistant' && (
        <button
          type="button"
          className={cn(
            buttonVariants({
              color: 'secondary',
              size: 'sm',
              className: 'rounded-full gap-1.5',
            }),
          )}
          onClick={() => regenerate()}
        >
          <RefreshCw className="size-4" />
          Retry
        </button>
      )}
      <button
        type="button"
        className={cn(
          buttonVariants({
            color: 'secondary',
            size: 'sm',
            className: 'rounded-full',
          }),
        )}
        onClick={() => {
          setMessages([]);
          localStorage.removeItem("mesh-ai-chat-history");
        }}
      >
        Clear Chat
      </button>
    </>
  );
}

const StorageKeyInput = '__ai_search_input';
function SearchAIInput(props: ComponentProps<'form'>) {
  const { status, sendMessage, stop } = useChatContext();
  const [input, setInput] = useState(
    () => (typeof window !== 'undefined' ? localStorage.getItem(StorageKeyInput) ?? '' : ''),
  );
  const isLoading = status === 'streaming' || status === 'submitted';
  const onStart = (e?: SyntheticEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    void sendMessage({ text: input });
    setInput('');
  };

  useEffect(() => {
    localStorage.setItem(StorageKeyInput, input);
  }, [input]);

  useEffect(() => {
    if (isLoading) document.getElementById('nd-ai-input')?.focus();
  }, [isLoading]);

  return (
    <form
      {...props}
      className={cn('flex items-start pe-2', props.className)}
      onSubmit={onStart}
    >
      <Input
        value={input}
        placeholder={isLoading ? 'Mesh AI is answering...' : 'Ask Mesh AI something'}
        autoFocus
        className="p-3"
        disabled={status === 'streaming' || status === 'submitted'}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(event) => {
          if (!event.shiftKey && event.key === 'Enter') {
            onStart(event);
          }
        }}
      />
      {isLoading ? (
        <button
          key="bn"
          type="button"
          className={cn(
            buttonVariants({
              color: 'secondary',
              className: 'transition-all rounded-full mt-2 gap-2',
            }),
          )}
          onClick={stop}
        >
          <Loader2 className="size-4 animate-spin text-fd-muted-foreground" />
          Abort Answer
        </button>
      ) : (
        <button
          key="bn"
          type="submit"
          className={cn(
            buttonVariants({
              color: 'ghost',
              size: 'icon-sm',
              className: 'transition-all rounded-full mt-2',
            }),
          )}
          disabled={input.length === 0}
        >
          <Send className="size-4" />
        </button>
      )}
    </form>
  );
}

function List(props: Omit<ComponentProps<'div'>, 'dir'>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    function callback() {
      const container = containerRef.current;
      if (!container) return;

      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'instant',
      });
    }

    const observer = new ResizeObserver(callback);
    callback();

    const element = containerRef.current?.firstElementChild;

    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      {...props}
      className={cn(
        'fd-scroll-container overflow-y-auto min-w-0 flex flex-col',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}

function Input(props: ComponentProps<'textarea'>) {
  const ref = useRef<HTMLDivElement>(null);
  const shared = cn('col-start-1 row-start-1', props.className);

  return (
    <div className="grid flex-1">
      <textarea
        id="nd-ai-input"
        {...props}
        className={cn(
          'resize-none bg-transparent placeholder:text-fd-muted-foreground focus-visible:outline-none',
          shared,
        )}
      />
      <div ref={ref} className={cn(shared, 'break-all invisible')}>
        {`${props.value?.toString() ?? ''}\n`}
      </div>
    </div>
  );
}

const roleName: Record<string, string> = {
  user: 'You',
  assistant: 'Mesh AI',
};

function Message({
  message,
  isStreaming,
  ...props
}: { message: UIMessage; isStreaming?: boolean } & ComponentProps<'div'>) {
  const [showAllSources, setShowAllSources] = useState(false);
  const INITIAL_SOURCES_COUNT = 3;
  
  let markdown = '';
  let links: z.infer<typeof ProvideLinksToolSchema>['links'] = [];
  let sources: Array<{ url: string; title?: string; sourceId: string }> = [];

  for (const part of message.parts ?? []) {
    if (part.type === 'text') {
      markdown += part.text;
      continue;
    }

    if (part.type === 'tool-provideLinks' && part.input) {
      links = (part.input as z.infer<typeof ProvideLinksToolSchema>).links;
    }

    // Handle source-url type from old code
    if (part.type === 'source-url') {
      sources.push({
        url: (part as any).url,
        title: (part as any).title,
        sourceId: (part as any).sourceId
      });
    }
  }

  // Combine all sources into a single array
  const allSources: Array<{ url: string; title: string; label?: string; sourceId?: string }> = [];
  
  // Add links from tool-provideLinks
  if (links && links.length > 0) {
    links.forEach((item) => {
      allSources.push({
        url: item.url,
        title: item.title || 'Source',
        label: item.label || undefined,
      });
    });
  }
  
  // Add source-url sources
  sources.forEach((source, i) => {
    allSources.push({
      url: source.url,
      title: source.title || 'Source',
      sourceId: source.sourceId,
      label: `Reference ${i + 1}`,
    });
  });

  // Only show sources if message is not currently streaming (i.e., completed)
  const showSources = !isStreaming && allSources.length > 0;
  const hasMoreSources = allSources.length > INITIAL_SOURCES_COUNT;
  const displayedSources = showAllSources 
    ? allSources 
    : allSources.slice(0, INITIAL_SOURCES_COUNT);
  const remainingCount = allSources.length - INITIAL_SOURCES_COUNT;

  return (
    <div {...props}>
      <p
        className={cn(
          'mb-2 text-sm inline-flex items-center gap-1.5 bg-fd-secondary/50 backdrop-blur-md border text-fd-secondary-foreground rounded-md py-1 px-2 font-medium shadow-sm',
        )}
      >
        {message.role === 'assistant' && (
          iconResolver("logo-mesh/black/logo-mesh-vector.svg", "size-4 dark:invert")
        )}
        {roleName[message.role] ?? 'unknown'}
      </p>
      <div className="prose text-sm max-w-none">
        <Markdown text={markdown} />
      </div>
      {showSources && (
        <div className="mt-4">
          <Sources>
            <SourcesTrigger count={allSources.length} />
            <SourcesContent className="flex flex-row flex-wrap items-center gap-2">
              {displayedSources.map((source, i) => (
                <Source
                  key={source.sourceId || `source-${i}`}
                  href={source.url}
                  title={source.title}
                  className="block text-xs rounded-xl border bg-fd-card/50 backdrop-blur-md p-3 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground min-w-[140px] shadow-sm"
                >
                  <div className="flex flex-col">
                    <p className="font-bold line-clamp-1">{source.title}</p>
                    {source.label && (
                      <p className="text-fd-muted-foreground mt-0.5 text-xs">{source.label}</p>
                    )}
                  </div>
                </Source>
              ))}
              {hasMoreSources && !showAllSources && (
                <button
                  onClick={() => setShowAllSources(true)}
                  className="flex items-center justify-center text-xs rounded-xl border bg-fd-card/50 backdrop-blur-md p-3 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground min-w-[140px] shadow-sm appearance-none outline-none"
                  style={{ minHeight: '60px' }}
                >
                  <p className="font-bold text-center">Show {remainingCount} more {remainingCount === 1 ? 'source' : 'sources'}</p>
                </button>
              )}
              {hasMoreSources && showAllSources && (
                <button
                  onClick={() => setShowAllSources(false)}
                  className="flex items-center justify-center text-xs rounded-xl border bg-fd-card/50 backdrop-blur-md p-3 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground min-w-[140px] shadow-sm appearance-none outline-none"
                  style={{ minHeight: '60px' }}
                >
                  <p className="font-bold text-center">Show less</p>
                </button>
              )}
            </SourcesContent>
          </Sources>
        </div>
      )}
    </div>
  );
}

function getInitialChatHistory(): UIMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const chatMessages = localStorage.getItem("mesh-ai-chat-history");
    if (chatMessages) {
      return JSON.parse(chatMessages);
    }
  } catch (e) {
    console.error(`Failed to retrieve chat messages from localStorage: ${e}`)
  }
  return []
}

export function AISearch({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const chat = useChat({
    id: 'search',
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
    messages: getInitialChatHistory(),
  });

  useEffect(() => {
    if (chat.messages.length > 0) {
      localStorage.setItem("mesh-ai-chat-history", JSON.stringify(chat.messages));
    }
  }, [chat.messages]);

  return (
    <Context value={useMemo(() => ({ chat, open, setOpen }), [chat, open])}>
      {children}
    </Context>
  );
}

export function AISearchTrigger({ className, children, ...props }: ComponentProps<'button'>) {
  const { open, setOpen } = use(Context)!;

  return (
    <button
      className={cn(
        buttonVariants({
          color: 'secondary',
        }),
        'fixed bottom-4 gap-3 end-[calc(theme(spacing.4)+var(--removed-body-scroll-bar-size,0px))] text-fd-muted-foreground rounded-2xl shadow-lg z-20 transition-[translate,opacity]',
        open && 'translate-y-10 opacity-0',
        className
      )}
      onClick={() => setOpen(true)}
      {...props}
    >
      {children || (
        <>
          <MessageCircleIcon className="size-4.5" />
          Ask AI
        </>
      )}
    </button>
  );
}

export function AISearchPanel({ className }: { className?: string }) {
  const { open, setOpen } = use(Context)!;
  const chat = useChatContext();

  const onKeyPress = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      setOpen(false);
      e.preventDefault();
    }

    if (e.key === '/' && (e.metaKey || e.ctrlKey) && !open) {
      setOpen(true);
      e.preventDefault();
    }
  });

  useEffect(() => {
    window.addEventListener('keydown', onKeyPress);
    return () => window.removeEventListener('keydown', onKeyPress);
  }, []);

  return (
    <>
      <style>
        {`
        @keyframes ask-ai-open {
          from {
            width: 0px;
          }
          to {
            width: var(--ai-chat-width);
          }
        }
        @keyframes ask-ai-close {
          from {
            width: var(--ai-chat-width);
          }
          to {
            width: 0px;
          }
        }`}
      </style>
      <Presence present={open}>
        <div
          data-state={open ? 'open' : 'closed'}
          className="fixed inset-0 z-30 backdrop-blur-xs bg-fd-overlay data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fd-fade-out lg:hidden"
          onClick={() => setOpen(false)}
        />
      </Presence>
      <Presence present={open}>
        <div
          className={cn(
            'overflow-hidden z-30 bg-fd-popover/40 backdrop-blur-2xl text-fd-popover-foreground [--ai-chat-width:400px] xl:[--ai-chat-width:460px]',
            'max-lg:fixed max-lg:inset-x-2 max-lg:top-4 max-lg:border max-lg:rounded-2xl max-lg:shadow-xl',
            'lg:fixed lg:right-0 lg:top-0 lg:h-dvh lg:border-s lg:shadow-2xl lg:z-50',
            'lg:in-[#nd-docs-layout]:sticky lg:in-[#nd-docs-layout]:top-0 lg:in-[#nd-docs-layout]:h-dvh lg:in-[#nd-docs-layout]:border-s lg:in-[#nd-docs-layout]:rounded-none lg:in-[#nd-docs-layout]:shadow-none lg:in-[#nd-docs-layout]:right-0 lg:in-[#nd-docs-layout]:bottom-0 lg:in-[#nd-docs-layout]:ms-auto lg:in-[#nd-docs-layout]:[grid-area:toc] lg:in-[#nd-docs-layout]:bg-fd-popover lg:in-[#nd-docs-layout]:backdrop-blur-none',
            'lg:in-[#nd-notebook-layout]:row-span-full lg:in-[#nd-notebook-layout]:col-start-5',
            open
              ? 'animate-fd-dialog-in lg:animate-[ask-ai-open_200ms]'
              : 'animate-fd-dialog-out lg:animate-[ask-ai-close_200ms]',
            className
          )}
        >
          <div className="flex flex-col p-2 size-full max-lg:max-h-[80dvh] lg:w-(--ai-chat-width) xl:p-4">
            <Header />
            <List
              className="px-3 py-4 flex-1 overscroll-contain"
              style={{
                maskImage:
                  'linear-gradient(to bottom, transparent, white 1rem, white calc(100% - 1rem), transparent 100%)',
              }}
            >
              <div className="flex flex-col gap-4">
                {chat.messages
                  .filter((msg) => msg.role !== 'system')
                  .map((item, index, array) => (
                    <Message
                      key={item.id}
                      message={item}
                      isStreaming={index === array.length - 1 && (chat.status === 'streaming' || chat.status === 'submitted')}
                    />
                  ))}
              </div>
            </List>
            <div className="rounded-xl border bg-fd-card/50 backdrop-blur-md text-fd-card-foreground has-focus-visible:ring-2 has-focus-visible:ring-fd-ring shadow-sm mt-2">
              <SearchAIInput />
              <div className="flex items-center gap-1.5 p-1 empty:hidden">
                <SearchAIActions />
              </div>
            </div>
          </div>
        </div>
      </Presence>
    </>
  );
}