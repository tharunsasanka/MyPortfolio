import { useEffect, useMemo, useState } from "react";
import {
  HiEnvelope,
  HiEnvelopeOpen,
  HiTrash,
} from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  deleteContactMessage,
  getContactMessages,
  markContactMessageAsRead,
  type ContactMessage,
} from "@/services/contactService";

export function ContactInbox() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const unreadCount = useMemo(() => {
    return messages.filter((message) => !message.isRead).length;
  }, [messages]);

  async function loadMessages() {
    setLoading(true);

    try {
      const data = await getContactMessages();
      setMessages(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function initializeMessages() {
      await loadMessages();
    }

    void initializeMessages();
  }, []);

  async function handleMarkAsRead(message: ContactMessage) {
    if (message.isRead) return;

    await markContactMessageAsRead(message._id);
    await loadMessages();
  }

  async function handleDelete(message: ContactMessage) {
    const confirmed = window.confirm(
      `Are you sure you want to delete message from "${message.name}"?`
    );

    if (!confirmed) return;

    await deleteContactMessage(message._id);
    await loadMessages();
  }

  return (
    <section className="mt-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Contact Inbox
          </p>
          <h2 className="mt-2 text-3xl font-black">Visitor Messages</h2>
          <p className="mt-2 text-muted-foreground">
            Read and manage messages sent from your public contact form.
          </p>
        </div>

        <Badge className="rounded-full bg-primary px-4 py-2 text-primary-foreground">
          {unreadCount} unread
        </Badge>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading messages...</p>
      ) : messages.length === 0 ? (
        <Card className="cyber-card border-border bg-card/70 text-center backdrop-blur-xl">
          <CardContent className="p-8">
            <HiEnvelope className="mx-auto mb-4 text-5xl text-primary" />
            <h3 className="text-2xl font-bold">No messages yet</h3>
            <p className="mt-3 text-muted-foreground">
              New contact form messages will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5">
          {messages.map((message) => (
            <Card
              key={message._id}
              className={`cyber-card border-border backdrop-blur-xl ${
                message.isRead ? "bg-card/60" : "bg-primary/5"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <Badge
                        className={
                          message.isRead
                            ? "bg-muted text-muted-foreground"
                            : "bg-primary text-primary-foreground"
                        }
                      >
                        {message.isRead ? "Read" : "Unread"}
                      </Badge>

                      <Badge variant="outline" className="border-border">
                        {new Date(message.createdAt).toLocaleString()}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold">{message.subject}</h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                      From: {message.name} — {message.email}
                    </p>

                    <p className="mt-5 whitespace-pre-wrap rounded-2xl border border-border bg-background/60 p-4 text-sm leading-6 text-muted-foreground">
                      {message.message}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleMarkAsRead(message)}
                      disabled={message.isRead}
                      className="rounded-full border-border bg-transparent"
                    >
                      <HiEnvelopeOpen className="mr-2" />
                      Mark Read
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleDelete(message)}
                      className="rounded-full border-destructive/40 bg-transparent text-destructive hover:bg-destructive/10 hover:text-destructive"
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
    </section>
  );
}