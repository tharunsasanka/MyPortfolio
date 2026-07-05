import { useEffect, useMemo, useState } from "react";
import {
  HiEnvelope,
  HiEnvelopeOpen,
  HiEye,
  HiTrash,
  HiXMark,
} from "react-icons/hi2";
import {
  deleteContactMessage,
  getContactMessages,
  markContactMessageAsRead,
  markContactMessageAsUnread,
  type ContactMessage,
} from "@/services/contactService";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type InboxFilter = "all" | "unread" | "read";

export function ContactInbox() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [activeFilter, setActiveFilter] = useState<InboxFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [messageText, setMessageText] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  const unreadCount = messages.filter((message) => !message.isRead).length;
  const readCount = messages.filter((message) => message.isRead).length;

  const filteredMessages = useMemo(() => {
    if (activeFilter === "unread") {
      return messages.filter((message) => !message.isRead);
    }

    if (activeFilter === "read") {
      return messages.filter((message) => message.isRead);
    }

    return messages;
  }, [activeFilter, messages]);

  async function loadMessages() {
    try {
      setIsLoading(true);
      setMessageText("");

      const data = await getContactMessages();
      setMessages(data);
    } catch {
      setMessageType("error");
      setMessageText("Failed to load contact messages.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setMessageText("");

        const data = await getContactMessages();
        setMessages(data);
      } catch {
        setMessageType("error");
        setMessageText("Failed to load contact messages.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  async function handleViewMessage(message: ContactMessage) {
    setSelectedMessage(message);

    if (!message.isRead) {
      try {
        await markContactMessageAsRead(message._id);

        setMessages((current) =>
          current.map((item) =>
            item._id === message._id ? { ...item, isRead: true } : item
          )
        );

        setSelectedMessage({
          ...message,
          isRead: true,
        });
      } catch {
        setMessageType("error");
        setMessageText("Failed to mark message as read.");
      }
    }
  }

  async function handleToggleRead(message: ContactMessage) {
    try {
      if (message.isRead) {
        await markContactMessageAsUnread(message._id);

        setMessages((current) =>
          current.map((item) =>
            item._id === message._id ? { ...item, isRead: false } : item
          )
        );

        if (selectedMessage?._id === message._id) {
          setSelectedMessage({
            ...message,
            isRead: false,
          });
        }

        setMessageType("success");
        setMessageText("Message marked as unread.");
      } else {
        await markContactMessageAsRead(message._id);

        setMessages((current) =>
          current.map((item) =>
            item._id === message._id ? { ...item, isRead: true } : item
          )
        );

        if (selectedMessage?._id === message._id) {
          setSelectedMessage({
            ...message,
            isRead: true,
          });
        }

        setMessageType("success");
        setMessageText("Message marked as read.");
      }
    } catch {
      setMessageType("error");
      setMessageText("Failed to update message status.");
    }
  }

  async function handleDeleteMessage(message: ContactMessage) {
    const confirmed = window.confirm(
      `Delete message from ${message.name}? This cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await deleteContactMessage(message._id);

      setMessages((current) =>
        current.filter((item) => item._id !== message._id)
      );

      if (selectedMessage?._id === message._id) {
        setSelectedMessage(null);
      }

      setMessageType("success");
      setMessageText("Message deleted successfully.");
    } catch {
      setMessageType("error");
      setMessageText("Failed to delete message.");
    }
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  }

  const filterTabs = [
    {
      id: "all" as const,
      label: "All",
      count: messages.length,
    },
    {
      id: "unread" as const,
      label: "Unread",
      count: unreadCount,
    },
    {
      id: "read" as const,
      label: "Read",
      count: readCount,
    },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black">Contact Inbox</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            View, read, unread, and delete visitor messages.
          </p>
        </div>

        <Button
          type="button"
          onClick={loadMessages}
          variant="outline"
          className="rounded-full border-border bg-transparent"
        >
          Refresh Inbox
        </Button>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <InboxStatCard
          title="Total Messages"
          value={messages.length}
          icon={<HiEnvelope />}
        />

        <InboxStatCard
          title="Unread"
          value={unreadCount}
          icon={<HiEnvelope />}
        />

        <InboxStatCard
          title="Read"
          value={readCount}
          icon={<HiEnvelopeOpen />}
        />
      </div>

      {messageText && (
        <div
          className={`mb-5 rounded-2xl border px-4 py-3 text-sm font-semibold ${
            messageType === "success"
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-destructive/30 bg-destructive/10 text-destructive"
          }`}
        >
          {messageText}
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-3">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background/40 text-muted-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <Card className="border-border bg-card/70">
          <CardContent className="p-6 text-muted-foreground">
            Loading messages...
          </CardContent>
        </Card>
      ) : filteredMessages.length === 0 ? (
        <Card className="border-border bg-card/70">
          <CardContent className="p-8 text-center text-muted-foreground">
            No messages found.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5">
          {filteredMessages.map((message) => (
            <Card
              key={message._id}
              className={`border-border bg-card/70 transition hover:border-primary/40 ${
                !message.isRead ? "shadow-[0_0_35px_rgba(0,255,136,0.08)]" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-black">{message.subject}</h3>

                      {!message.isRead && (
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-black text-primary-foreground">
                          New
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      From{" "}
                      <span className="font-semibold text-foreground">
                        {message.name}
                      </span>{" "}
                      · {message.email}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDate(message.createdAt)}
                    </p>

                    <p className="mt-4 line-clamp-2 leading-7 text-muted-foreground">
                      {message.message}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      onClick={() => handleViewMessage(message)}
                      variant="outline"
                      className="rounded-full border-border bg-transparent"
                    >
                      <HiEye className="mr-2" />
                      View
                    </Button>

                    <Button
                      type="button"
                      onClick={() => handleToggleRead(message)}
                      variant="outline"
                      className="rounded-full border-border bg-transparent"
                    >
                      {message.isRead ? (
                        <>
                          <HiEnvelope className="mr-2" />
                          Unread
                        </>
                      ) : (
                        <>
                          <HiEnvelopeOpen className="mr-2" />
                          Read
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      onClick={() => handleDeleteMessage(message)}
                      variant="outline"
                      className="rounded-full border-destructive/40 bg-transparent text-destructive hover:bg-destructive/10"
                    >
                      <HiTrash className="mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <Card className="max-h-[88vh] w-full max-w-3xl overflow-hidden border-border bg-card">
            <CardContent className="p-0">
              <div className="flex items-start justify-between gap-4 border-b border-border p-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                    Message Details
                  </p>

                  <h3 className="mt-3 text-2xl font-black">
                    {selectedMessage.subject}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {formatDate(selectedMessage.createdAt)}
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  variant="outline"
                  size="icon"
                  className="rounded-full border-border bg-transparent"
                >
                  <HiXMark />
                </Button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <InfoBox label="Name" value={selectedMessage.name} />
                  <InfoBox label="Email" value={selectedMessage.email} />
                </div>

                <div className="mt-6 rounded-3xl border border-border bg-background/40 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Message
                  </p>

                  <p className="mt-4 whitespace-pre-wrap leading-8 text-foreground">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap justify-end gap-3">
                  <Button
                    type="button"
                    onClick={() => {
                      window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`;
                    }}
                    className="rounded-full"
                  >
                    <HiEnvelope className="mr-2" />
                    Reply by Email
                  </Button>

                  <Button
                    type="button"
                    onClick={() => handleToggleRead(selectedMessage)}
                    variant="outline"
                    className="rounded-full border-border bg-transparent"
                  >
                    {selectedMessage.isRead ? "Mark as Unread" : "Mark as Read"}
                  </Button>

                  <Button
                    type="button"
                    onClick={() => handleDeleteMessage(selectedMessage)}
                    variant="outline"
                    className="rounded-full border-destructive/40 bg-transparent text-destructive hover:bg-destructive/10"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

type InboxStatCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

function InboxStatCard({ title, value, icon }: InboxStatCardProps) {
  return (
    <Card className="cyber-card border-border bg-card/70">
      <CardContent className="flex items-center justify-between gap-4 p-5">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{title}</p>
          <h3 className="mt-2 text-3xl font-black text-primary">{value}</h3>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-2xl text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

type InfoBoxProps = {
  label: string;
  value: string;
};

function InfoBox({ label, value }: InfoBoxProps) {
  return (
    <div className="rounded-3xl border border-border bg-background/40 p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </p>

      <p className="mt-3 break-all font-semibold text-foreground">{value}</p>
    </div>
  );
}