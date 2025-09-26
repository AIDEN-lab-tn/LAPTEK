"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Input,
  Text,
  Dropdown,
  Badge,
  Avatar,
  Textarea,
} from "@nextui-org/react";
import {Box} from '../../../../components/Dashboard/styles/box';
import {Flex} from '../../../../components/Dashboard/styles/flex';

// Icon Components
const MessageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"/>
    <path d="M7 9H17V11H7V9ZM7 12H15V14H7V12ZM7 6H17V8H7V6Z"/>
  </svg>
);

const BotIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H9L3 7V9C3 10.1 3.9 11 5 11V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V11C20.1 11 21 10.1 21 9ZM11 19H7V11H11V19ZM17 19H13V11H17V19Z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"/>
  </svg>
);

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messageCount: number;
  status: "active" | "archived" | "starred";
  customer: {
    name: string;
    email: string;
    avatar: string;
  };
}

interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  sender: "user" | "ai" | "agent";
  type: "text" | "image" | "file";
}

const mockChatSessions: ChatSession[] = [
  {
    id: "1",
    title: "Product Recommendation Help",
    lastMessage: "Thank you for the gaming laptop suggestions!",
    timestamp: "2024-01-15T10:30:00Z",
    messageCount: 12,
    status: "active",
    customer: {
      name: "John Smith",
      email: "john@example.com",
      avatar: "https://i.pravatar.cc/150?u=john",
    },
  },
  {
    id: "2",
    title: "Order Status Inquiry",
    lastMessage: "When will my order be shipped?",
    timestamp: "2024-01-15T09:15:00Z",
    messageCount: 8,
    status: "active",
    customer: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
  },
  {
    id: "3",
    title: "Technical Support",
    lastMessage: "The AI helped me troubleshoot the issue perfectly.",
    timestamp: "2024-01-14T16:45:00Z",
    messageCount: 15,
    status: "starred",
    customer: {
      name: "Mike Wilson",
      email: "mike@example.com",
      avatar: "https://i.pravatar.cc/150?u=mike",
    },
  },
];

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    content: "Hi! I'm looking for a gaming laptop under $2000. Can you help me?",
    timestamp: "2024-01-15T10:15:00Z",
    sender: "user",
    type: "text",
  },
  {
    id: "2",
    content: "I'd be happy to help you find the perfect gaming laptop! Based on your budget of $2000, I can recommend several excellent options. What games do you primarily play, and do you have any specific requirements for screen size or portability?",
    timestamp: "2024-01-15T10:16:00Z",
    sender: "ai",
    type: "text",
  },
  {
    id: "3",
    content: "I mainly play AAA games like Cyberpunk 2077 and Call of Duty. I prefer a 15-17 inch screen.",
    timestamp: "2024-01-15T10:18:00Z",
    sender: "user",
    type: "text",
  },
  {
    id: "4",
    content: "Perfect! For AAA gaming, I recommend these options:\n\n1. **ASUS ROG Strix G15** - $1,799\n   - RTX 4060, AMD Ryzen 7, 16GB RAM\n   - 15.6\" 144Hz display\n\n2. **MSI Katana 15** - $1,899\n   - RTX 4070, Intel i7, 16GB RAM\n   - 15.6\" 144Hz display\n\nBoth will handle Cyberpunk 2077 and COD excellently at high settings. Would you like more details about either option?",
    timestamp: "2024-01-15T10:20:00Z",
    sender: "ai",
    type: "text",
  },
  {
    id: "5",
    content: "The ASUS ROG Strix G15 sounds perfect! Can you tell me more about the warranty and shipping options?",
    timestamp: "2024-01-15T10:25:00Z",
    sender: "user",
    type: "text",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "success";
    case "archived": return "default";
    case "starred": return "warning";
    default: return "default";
  }
};

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function ChatHistoriesPage() {
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(mockChatSessions[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newMessage, setNewMessage] = useState("");

  const filteredSessions = mockChatSessions.filter((session) => {
    const matchesSearch = 
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || session.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const chatStats = {
    totalSessions: mockChatSessions.length,
    activeSessions: mockChatSessions.filter(s => s.status === "active").length,
    starredSessions: mockChatSessions.filter(s => s.status === "starred").length,
    avgResponseTime: "2.3 min",
    satisfactionRate: "96%",
    aiResolutionRate: "78%",
  };

  return (
    <Box css={{ p: '$6', maxWidth: '100%', height: '100vh' }}>
      <Flex direction="column" css={{ gap: '$6', height: '100%' }}>
        {/* Page Header */}
        <Box>
          <Box css={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-4px',
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '2px'
            }
          }}>
            <Text h1 css={{ 
              fontSize: '$3xl', 
              fontWeight: '$bold', 
              m: 0,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              AI Chat Histories
            </Text>
          </Box>
          <Text css={{ color: '$accents7', mt: '$2' }}>
            Manage customer conversations and AI interactions
          </Text>
        </Box>

        {/* Stats Cards */}
        <Box css={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '$6',
          mb: '$6',
          '@sm': {
            gridTemplateColumns: 'repeat(2, 1fr)'
          },
          '@md': {
            gridTemplateColumns: 'repeat(3, 1fr)'
          },
          '@lg': {
            gridTemplateColumns: 'repeat(6, 1fr)'
          }
        }}>
          <Card css={{ 
            p: '$6', 
            minHeight: '120px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.15)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Flex direction="column" align="center" css={{ textAlign: 'center' }}>
              <Box css={{ p: '$3', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '$lg', mb: '$3', color: 'white' }}>
                <MessageIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Total Sessions</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {chatStats.totalSessions}
              </Text>
            </Flex>
          </Card>

          <Card css={{ 
            p: '$6', 
            minHeight: '120px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            border: 'none',
            boxShadow: '0 6px 20px rgba(16, 185, 129, 0.15)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(16, 185, 129, 0.2)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Flex direction="column" align="center" css={{ textAlign: 'center' }}>
              <Box css={{ p: '$3', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '$lg', mb: '$3', color: 'white' }}>
                <MessageIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Active Chats</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {chatStats.activeSessions}
              </Text>
            </Flex>
          </Card>

          <Card css={{ 
            p: '$6', 
            minHeight: '120px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            border: 'none',
            boxShadow: '0 6px 20px rgba(245, 158, 11, 0.15)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(245, 158, 11, 0.2)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Flex direction="column" align="center" css={{ textAlign: 'center' }}>
              <Box css={{ p: '$3', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '$lg', mb: '$3', color: 'white' }}>
                <BotIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>AI Resolution</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {chatStats.aiResolutionRate}
              </Text>
            </Flex>
          </Card>

          <Card css={{ 
            p: '$6', 
            minHeight: '120px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            border: 'none',
            boxShadow: '0 6px 20px rgba(139, 92, 246, 0.15)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.2)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Flex direction="column" align="center" css={{ textAlign: 'center' }}>
              <Box css={{ p: '$3', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '$lg', mb: '$3', color: 'white' }}>
                <UserIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Starred Chats</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {chatStats.starredSessions}
              </Text>
            </Flex>
          </Card>

          <Card css={{ 
            p: '$6', 
            minHeight: '120px',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            border: 'none',
            boxShadow: '0 6px 20px rgba(79, 172, 254, 0.15)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(79, 172, 254, 0.2)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Flex direction="column" align="center" css={{ textAlign: 'center' }}>
              <Box css={{ p: '$3', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '$lg', mb: '$3', color: 'white' }}>
                <MessageIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Avg Response</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {chatStats.avgResponseTime}
              </Text>
            </Flex>
          </Card>

          <Card css={{ 
            p: '$6', 
            minHeight: '120px',
            background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            border: 'none',
            boxShadow: '0 6px 20px rgba(168, 237, 234, 0.15)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(168, 237, 234, 0.2)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Flex direction="column" align="center" css={{ textAlign: 'center' }}>
              <Box css={{ p: '$3', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '$lg', mb: '$3', color: 'white' }}>
                <UserIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Satisfaction</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {chatStats.satisfactionRate}
              </Text>
            </Flex>
          </Card>
        </Box>

        {/* Main Chat Interface */}
        <Box css={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '$6', flex: 1, height: 'calc(100vh - 400px)' }}>
          {/* Chat Sessions List */}
          <Card css={{ 
            p: 0,
            border: 'none',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            borderRadius: '$xl',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Card.Header css={{ p: '$6', borderBottom: '1px solid $border' }}>
              <Flex justify="between" align="center" css={{ width: '100%' }}>
                <Text h3 css={{ m: 0, fontSize: '$lg', fontWeight: '$semibold' }}>Chat Sessions</Text>
                <Dropdown>
                  <Dropdown.Button flat size="sm">
                    {statusFilter === "all" ? "All Status" : statusFilter}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as string;
                      setStatusFilter(selected);
                    }}
                  >
                    <Dropdown.Item key="all">All Status</Dropdown.Item>
                    <Dropdown.Item key="active">Active</Dropdown.Item>
                    <Dropdown.Item key="archived">Archived</Dropdown.Item>
                    <Dropdown.Item key="starred">Starred</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Flex>
            </Card.Header>
            
            <Box css={{ p: '$4' }}>
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                contentLeft={<SearchIcon />}
                css={{ width: '100%' }}
              />
            </Box>

            <Card.Body css={{ p: 0, flex: 1, overflowY: 'auto' }}>
              {filteredSessions.map((session) => (
                <Box
                  key={session.id}
                  css={{
                    p: '$4',
                    borderBottom: '1px solid $border',
                    cursor: 'pointer',
                    background: selectedSession?.id === session.id ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                    '&:hover': {
                      background: 'rgba(59, 130, 246, 0.08)'
                    }
                  }}
                  onClick={() => setSelectedSession(session)}
                >
                  <Flex align="center" css={{ gap: '$3', mb: '$2' }}>
                    <Avatar src={session.customer.avatar} size="sm" />
                    <Box css={{ flex: 1 }}>
                      <Flex justify="between" align="center">
                        <Text css={{ fontWeight: '$semibold', fontSize: '$sm' }}>
                          {session.customer.name}
                        </Text>
                        <Badge color={getStatusColor(session.status)} variant="flat" size="sm">
                          {session.status}
                        </Badge>
                      </Flex>
                      <Text css={{ fontSize: '$xs', color: '$accents6' }}>
                        {session.title}
                      </Text>
                    </Box>
                  </Flex>
                  <Text css={{ fontSize: '$xs', color: '$accents7', mb: '$2' }}>
                    {session.lastMessage}
                  </Text>
                  <Flex justify="between" align="center">
                    <Text css={{ fontSize: '$xs', color: '$accents6' }}>
                      {formatTime(session.timestamp)}
                    </Text>
                    <Badge variant="flat" size="sm">
                      {session.messageCount} messages
                    </Badge>
                  </Flex>
                </Box>
              ))}
            </Card.Body>
          </Card>

          {/* Chat Messages */}
          <Card css={{ 
            p: 0,
            border: 'none',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            borderRadius: '$xl',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {selectedSession ? (
              <>
                <Card.Header css={{ p: '$6', borderBottom: '1px solid $border' }}>
                  <Flex align="center" css={{ gap: '$3' }}>
                    <Avatar src={selectedSession.customer.avatar} size="md" />
                    <Box>
                      <Text css={{ fontWeight: '$semibold' }}>{selectedSession.customer.name}</Text>
                      <Text css={{ fontSize: '$sm', color: '$accents6' }}>{selectedSession.title}</Text>
                    </Box>
                  </Flex>
                </Card.Header>

                <Card.Body css={{ p: '$6', flex: 1, overflowY: 'auto' }}>
                  <Box css={{ display: 'flex', flexDirection: 'column', gap: '$4' }}>
                    {mockMessages.map((message) => (
                      <Box
                        key={message.id}
                        css={{
                          display: 'flex',
                          justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                        }}
                      >
                        <Box
                          css={{
                            maxWidth: '70%',
                            p: '$4',
                            borderRadius: '$lg',
                            background: message.sender === 'user' 
                              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                              : message.sender === 'ai'
                              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                              : '$accents2',
                            color: message.sender === 'user' || message.sender === 'ai' ? 'white' : '$accents9'
                          }}
                        >
                          <Text css={{ 
                            fontSize: '$sm', 
                            lineHeight: '1.5',
                            whiteSpace: 'pre-line'
                          }}>
                            {message.content}
                          </Text>
                          <Text css={{ 
                            fontSize: '$xs', 
                            opacity: 0.8, 
                            mt: '$2',
                            textAlign: 'right'
                          }}>
                            {formatTime(message.timestamp)}
                          </Text>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Card.Body>

                <Box css={{ p: '$6', borderTop: '1px solid $border' }}>
                  <Flex css={{ gap: '$3' }}>
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      css={{ flex: 1 }}
                      minRows={1}
                      maxRows={3}
                    />
                    <Button 
                      auto 
                      css={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white'
                      }}
                    >
                      Send
                    </Button>
                  </Flex>
                </Box>
              </>
            ) : (
              <Flex align="center" justify="center" css={{ height: '100%' }}>
                <Text css={{ color: '$accents7' }}>Select a conversation to view messages</Text>
              </Flex>
            )}
          </Card>
        </Box>
      </Flex>
    </Box>
  );
}