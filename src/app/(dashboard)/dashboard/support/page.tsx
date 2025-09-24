"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Input,
  Text,
  Dropdown,
  Badge,
  Textarea,
} from "@nextui-org/react";
import {Box} from '../../../../components/Dashboard/styles/box';
import {Flex} from '../../../../components/Dashboard/styles/flex';
import {InfoIcon} from '../../../../components/Dashboard/icons/accounts/info-icon';
import {DotsIcon} from '../../../../components/Dashboard/icons/accounts/dots-icon';

interface SupportTicket {
  id: string;
  ticketNumber: string;
  customer: {
    name: string;
    email: string;
  };
  subject: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: "technical" | "billing" | "shipping" | "product" | "other";
  createdDate: string;
  lastUpdate: string;
  assignedTo?: string;
}

const mockTickets: SupportTicket[] = [
  {
    id: "1",
    ticketNumber: "TICK-2024-001",
    customer: {
      name: "John Smith",
      email: "john@example.com",
    },
    subject: "Gaming laptop not booting after update",
    status: "open",
    priority: "high",
    category: "technical",
    createdDate: "2024-09-24T10:30:00Z",
    lastUpdate: "2024-09-24T10:30:00Z",
  },
  {
    id: "2",
    ticketNumber: "TICK-2024-002",
    customer: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
    },
    subject: "Refund request for defective keyboard",
    status: "in-progress",
    priority: "medium",
    category: "billing",
    createdDate: "2024-09-23T14:15:00Z",
    lastUpdate: "2024-09-24T09:20:00Z",
    assignedTo: "Agent Mike",
  },
  {
    id: "3",
    ticketNumber: "TICK-2024-003",
    customer: {
      name: "Mike Wilson",
      email: "mike@example.com",
    },
    subject: "Delayed shipping notification",
    status: "resolved",
    priority: "low",
    category: "shipping",
    createdDate: "2024-09-22T09:45:00Z",
    lastUpdate: "2024-09-23T16:30:00Z",
    assignedTo: "Agent Jane",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "open": return "warning";
    case "in-progress": return "primary";
    case "resolved": return "success";
    case "closed": return "default";
    default: return "default";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent": return "error";
    case "high": return "warning";
    case "medium": return "primary";
    case "low": return "success";
    default: return "default";
  }
};

export default function SupportPage() {
  const [tickets] = useState<SupportTicket[]>(mockTickets);
  const [activeTab, setActiveTab] = useState<"tickets" | "messages" | "faq">("tickets");

  const supportStats = {
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => t.status === "open").length,
    inProgressTickets: tickets.filter(t => t.status === "in-progress").length,
    resolvedTickets: tickets.filter(t => t.status === "resolved").length,
    avgResponseTime: "2.5 hours",
    satisfactionRate: "94%",
  };

  return (
    <Box css={{ p: '$6', maxWidth: '100%' }}>
      <Flex direction="column" css={{ gap: '$6' }}>
        {/* Page Header */}
        <Box css={{ mb: '$6' }}>
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
              Customer Support
            </Text>
          </Box>
          <Text css={{ color: '$accents7', mt: '$2' }}>
            Manage customer inquiries and support tickets
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
                <InfoIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Total Tickets</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {supportStats.totalTickets}
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
                <InfoIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Open Tickets</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {supportStats.openTickets}
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
                <InfoIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>In Progress</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {supportStats.inProgressTickets}
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
                <InfoIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Resolved</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {supportStats.resolvedTickets}
              </Text>
            </Flex>
          </Card>

          <Card css={{ 
            p: '$6', 
            minHeight: '120px',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
            border: 'none',
            boxShadow: '0 6px 20px rgba(255, 107, 107, 0.15)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(255, 107, 107, 0.2)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Flex direction="column" align="center" css={{ textAlign: 'center' }}>
              <Box css={{ p: '$3', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '$lg', mb: '$3', color: 'white' }}>
                <InfoIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Avg Response</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {supportStats.avgResponseTime}
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
                <InfoIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Satisfaction</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {supportStats.satisfactionRate}
              </Text>
            </Flex>
          </Card>
        </Box>

        {/* Tab Navigation */}
        <Card css={{ 
          p: '$6', 
          mb: '$4',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.1)'
        }}>
          <Flex justify="between" align="center" css={{ mb: '$4' }}>
            <Text css={{ 
              fontSize: '$lg', 
              fontWeight: '$bold',
              color: 'white'
            }}>
              Support Dashboard
            </Text>
            <Button auto css={{ 
              background: 'rgba(255, 255, 255, 0.2)', 
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)'
              }
            }}>
              Create Ticket
            </Button>
          </Flex>
          
          <Flex css={{ gap: '$3' }}>
            <Button 
              auto 
              flat
              css={{
                background: activeTab === "tickets" ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}
              onPress={() => setActiveTab("tickets")}
            >
              Support Tickets
            </Button>
            <Button 
              auto 
              flat
              css={{
                background: activeTab === "messages" ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}
              onPress={() => setActiveTab("messages")}
            >
              Messages
            </Button>
            <Button 
              auto 
              flat
              css={{
                background: activeTab === "faq" ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}
              onPress={() => setActiveTab("faq")}
            >
              FAQ Management
            </Button>
          </Flex>
        </Card>

        {/* Tickets Tab */}
        {activeTab === "tickets" && (
          <Box css={{ display: 'flex', flexDirection: 'column', gap: '$3' }}>
            {tickets.map((ticket) => (
              <Card key={ticket.id} css={{
                p: '$4',
                borderRadius: '$xl',
                border: '1px solid $border',
                background: '$backgroundContrast',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                }
              }}>
                <Flex css={{ width: '100%', gap: '$4' }}>
                  {/* Ticket Info */}
                  <Flex align="center" css={{ gap: '$3', flex: '2' }}>
                    <Box css={{
                      p: '$3',
                      borderRadius: '$lg',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white'
                    }}>
                      <InfoIcon />
                    </Box>
                    <Box>
                      <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>{ticket.ticketNumber}</Text>
                      <Text css={{ color: '$accents7', fontSize: '$xs' }}>
                        {new Date(ticket.createdDate).toLocaleDateString()}
                      </Text>
                    </Box>
                  </Flex>
                  
                  {/* Customer */}
                  <Flex direction="column" css={{ flex: '1.5' }}>
                    <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>{ticket.customer.name}</Text>
                    <Text css={{ color: '$accents7', fontSize: '$xs' }}>{ticket.customer.email}</Text>
                  </Flex>
                  
                  {/* Subject */}
                  <Flex direction="column" css={{ flex: '2' }}>
                    <Text css={{ fontWeight: '$semibold', fontSize: '$sm' }}>{ticket.subject}</Text>
                    <Text css={{ color: '$accents7', fontSize: '$xs' }}>Subject</Text>
                  </Flex>
                  
                  {/* Priority */}
                  <Flex align="center" css={{ flex: '1' }}>
                    <Badge color={getPriorityColor(ticket.priority)} variant="flat" size="sm">
                      {ticket.priority.toUpperCase()}
                    </Badge>
                  </Flex>
                  
                  {/* Status */}
                  <Flex align="center" css={{ flex: '1' }}>
                    <Badge color={getStatusColor(ticket.status)} variant="flat" size="sm">
                      {ticket.status.toUpperCase().replace('-', ' ')}
                    </Badge>
                  </Flex>
                  
                  {/* Assigned Agent */}
                  <Flex direction="column" align="end" css={{ flex: '1' }}>
                    <Text css={{ fontWeight: '$semibold', fontSize: '$sm' }}>
                      {ticket.assignedTo || "Unassigned"}
                    </Text>
                    <Text css={{ color: '$accents7', fontSize: '$xs' }}>Assigned To</Text>
                  </Flex>
                  
                  {/* Actions */}
                  <Flex css={{ gap: '$2', flex: '0.5' }}>
                    <Button auto light size="sm" css={{ minWidth: 'auto', p: '$2' }}>
                      <InfoIcon />
                    </Button>
                    <Dropdown>
                      <Dropdown.Button auto light size="sm" css={{ minWidth: 'auto', p: '$2' }}>
                        <DotsIcon />
                      </Dropdown.Button>
                      <Dropdown.Menu aria-label="Ticket Actions">
                        <Dropdown.Item>View Details</Dropdown.Item>
                        <Dropdown.Item>Assign Agent</Dropdown.Item>
                        <Dropdown.Item>Change Priority</Dropdown.Item>
                        <Dropdown.Item>Add Note</Dropdown.Item>
                        <Dropdown.Item color="success">Resolve</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Box>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <Card css={{ p: '$8' }}>
            <Text h3 css={{ mb: '$6' }}>Contact Messages</Text>
            <Text css={{ color: '$accents7', textAlign: 'center', py: '$12' }}>
              No new contact messages. This section will display customer inquiries from your website's contact form.
            </Text>
          </Card>
        )}

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <Card css={{ p: '$8' }}>
            <Flex justify="between" align="center" css={{ mb: '$6' }}>
              <Text h3 css={{ m: 0 }}>FAQ Management</Text>
              <Button color="primary">Add FAQ</Button>
            </Flex>
            <Text css={{ color: '$accents7', textAlign: 'center', py: '$12' }}>
              Manage frequently asked questions to help customers find answers quickly.
            </Text>
          </Card>
        )}
      </Flex>
    </Box>
  );
}