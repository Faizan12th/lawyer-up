'use client';

import React, { useState, useEffect, useRef } from 'react';
// import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    ArrowLeft,
    Phone,
    Video,
    Paperclip,
    Mic,
    Send,
    User,
    Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function ClientChatPage() {
    const [chats, setChats] = useState<any[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loadingChats, setLoadingChats] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch current user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                const data = await res.json();
                if (res.ok) {
                    setCurrentUser(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch user', error);
            }
        };
        fetchUser();
    }, []);

    // Fetch all chats and handle userId param
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await fetch('/api/chats');
                const data = await res.json();
                if (res.ok) {
                    setChats(data.data);

                    // Check for userId param
                    const params = new URLSearchParams(window.location.search);
                    const targetUserId = params.get('userId');

                    if (targetUserId) {
                        // Check if chat exists
                        const existingChat = data.data.find((c: any) =>
                            c.participants.some((p: any) => p._id === targetUserId)
                        );

                        if (existingChat) {
                            setActiveChatId(existingChat._id);
                        } else {
                            // Create new chat
                            try {
                                const createRes = await fetch('/api/chats', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ recipientId: targetUserId }),
                                });
                                const createData = await createRes.json();
                                if (createRes.ok) {
                                    setChats(prev => [createData.data, ...prev]);
                                    setActiveChatId(createData.data._id);
                                }
                            } catch (error) {
                                console.error('Failed to create chat', error);
                            }
                        }
                    } else if (data.data.length > 0) {
                        setActiveChatId(data.data[0]._id);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch chats', error);
            } finally {
                setLoadingChats(false);
            }
        };
        fetchChats();
    }, []);

    // Fetch messages for active chat
    useEffect(() => {
        if (!activeChatId) return;

        const fetchMessages = async () => {
            setLoadingMessages(true);
            try {
                const res = await fetch(`/api/chats/${activeChatId}`);
                const data = await res.json();
                if (res.ok) {
                    setMessages(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch messages', error);
            } finally {
                setLoadingMessages(false);
            }
        };
        fetchMessages();
    }, [activeChatId]);

    // Scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !activeChatId) return;

        try {
            const res = await fetch(`/api/chats/${activeChatId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newMessage }),
            });
            const data = await res.json();
            if (res.ok) {
                setMessages([...messages, data.data]);
                setNewMessage('');
            }
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };

    const activeChat = chats.find(c => c._id === activeChatId);

    const getOtherParticipant = (chat: any) => {
        if (!currentUser || !chat) return null;
        return chat.participants.find((p: any) => p._id !== currentUser._id);
    };

    const otherParticipant = getOtherParticipant(activeChat);

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            {/* Topbar removed */}

            <div className="px-6 py-6 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                    <Link href="/client/dashboard" className="text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <h2 className="text-xl font-semibold">Chat & Consultation</h2>
                </div>
                <p className="text-sm text-muted-foreground -mt-4 mb-6 ml-6">Communicate with your lawyer</p>

                <div className="grid gap-6 lg:grid-cols-3 h-[600px]">
                    {/* Chat History Sidebar */}
                    <Card className="p-4 lg:col-span-1 overflow-y-auto">
                        <h3 className="font-semibold mb-4 px-2">Chat History</h3>
                        {loadingChats ? (
                            <div className="flex justify-center py-4">
                                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {chats.length > 0 ? (
                                    chats.map((chat) => {
                                        const participant = getOtherParticipant(chat);
                                        const name = participant ? participant.name : 'Unknown User';

                                        return (
                                            <div
                                                key={chat._id}
                                                onClick={() => setActiveChatId(chat._id)}
                                                className={`p-3 rounded-lg cursor-pointer transition-colors ${activeChatId === chat._id ? 'bg-gray-100' : 'hover:bg-gray-50'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                        {participant?.image ? (
                                                            <img src={participant.image} alt={name} className="h-full w-full object-cover" />
                                                        ) : (
                                                            <User className="h-5 w-5 text-gray-600" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between items-baseline mb-1">
                                                            <h4 className="font-medium text-sm truncate">{name}</h4>
                                                            <span className="text-xs text-muted-foreground">{new Date(chat.updatedAt).toLocaleDateString()}</span>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground truncate">{chat.lastMessage?.content || 'No messages yet'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-sm text-gray-500 text-center py-4">No chats found.</p>
                                )}
                            </div>
                        )}
                    </Card>

                    {/* Chat Interface */}
                    <Card className="lg:col-span-2 flex flex-col overflow-hidden">
                        {activeChatId ? (
                            <>
                                {/* Chat Header */}
                                <div className="p-4 border-b flex items-center justify-between bg-white">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                            {otherParticipant?.image ? (
                                                <img src={otherParticipant.image} alt={otherParticipant.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <User className="h-5 w-5 text-gray-600" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-sm">{otherParticipant?.name || 'Chat'}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground capitalize">{otherParticipant?.role?.replace('_', ' ') || 'User'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                                            <Phone className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                                            <Video className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Messages Area */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
                                    {loadingMessages ? (
                                        <div className="flex justify-center py-12">
                                            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                                        </div>
                                    ) : (
                                        messages.map((msg) => {
                                            const isMe = currentUser && msg.sender._id === currentUser._id;
                                            return (
                                                <div
                                                    key={msg._id}
                                                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div
                                                        className={`max-w-[75%] rounded-lg p-3 text-sm ${isMe
                                                            ? 'bg-gray-900 text-white rounded-br-none'
                                                            : 'bg-[#EAE8E4] text-gray-900 rounded-bl-none'
                                                            }`}
                                                    >
                                                        <p>{msg.content}</p>
                                                        <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-gray-300' : 'text-gray-500'
                                                            }`}>
                                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <div className="p-4 border-t bg-white">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                                            <Paperclip className="h-5 w-5" />
                                        </button>
                                        <input
                                            type="text"
                                            placeholder="Type your message..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                            className="flex-1 border-none focus:ring-0 bg-transparent text-sm"
                                        />
                                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                                            <Mic className="h-5 w-5" />
                                        </button>
                                        <button onClick={handleSendMessage} className="p-2 bg-gray-900 hover:bg-gray-800 rounded-full text-white">
                                            <Send className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="text-[10px] text-muted-foreground mt-2">
                                        Press Enter to send
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                Select a chat to start messaging
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
