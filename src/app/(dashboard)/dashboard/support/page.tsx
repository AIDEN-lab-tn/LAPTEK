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
    <Box css={{ overflow: 'hidden', height: '100%', background: '$background' }}>
      <Flex
        css={{
          pt: '$12',
          px: '$12',
          '@sm': {
            pt: '$16',
            px: '$16',
          },
          '@md': {
            pt: '$16',
            px: '$24',
          },
        }}
        justify={'center'}
        direction={'column'}
      >
        {/* Header */}
        <Flex justify="between" align="center" css={{ mb: '$12' }}>
          <Box>
            <Text h1 css={{ m: 0, fontSize: '$2xl', fontWeight: '$bold' }}>
              Customer Support
            </Text>
            <Text css={{ color: '$accents8', mt: '$2' }}>
              Manage customer inquiries and support tickets
            </Text>
          </Box>
          <Button auto color="primary" css={{ fontWeight: '$medium' }}>
            Create Ticket
          </Button>
        </Flex>

        {/* Stats Cards */}
        <Box css={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '$8', mb: '$12' }}>
          <Card css={{ p: '$8' }}>
            <Flex justify="between" align="center">
              <Box>
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>Total Tickets</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2' }}>
                  {supportStats.totalTickets}
                </Text>
              </Box>
              <Box css={{ p: '$4', background: '$blue2', borderRadius: '$lg' }}>
                <InfoIcon />
              </Box>
            </Flex>
          </Card>

          <Card css={{ p: '$8' }}>
            <Flex justify="between" align="center">
              <Box>
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>Open</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2', color: '$warning' }}>
                  {supportStats.openTickets}
                </Text>
              </Box>
              <Box css={{ p: '$4', background: '$warning2', borderRadius: '$lg' }}>
                <InfoIcon />
              </Box>
            </Flex>
          </Card>

          <Card css={{ p: '$8' }}>
            <Flex justify="between" align="center">
              <Box>
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>In Progress</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2', color: '$primary' }}>
                  {supportStats.inProgressTickets}
                </Text>
              </Box>
              <Box css={{ p: '$4', background: '$primary2', borderRadius: '$lg' }}>
                <InfoIcon />
              </Box>
            </Flex>
          </Card>

          <Card css={{ p: '$8' }}>
            <Flex justify="between" align="center">
              <Box>
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>Resolved</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2', color: '$success' }}>
                  {supportStats.resolvedTickets}
                </Text>
              </Box>
              <Box css={{ p: '$4', background: '$success2', borderRadius: '$lg' }}>
                <InfoIcon />
              </Box>
            </Flex>
          </Card>

          <Card css={{ p: '$8' }}>
            <Flex justify="between" align="center">
              <Box>
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>Avg Response</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2', color: '$secondary' }}>
                  {supportStats.avgResponseTime}
                </Text>
              </Box>
              <Box css={{ p: '$4', background: '$secondary2', borderRadius: '$lg' }}>
                <InfoIcon />
              </Box>
            </Flex>
          </Card>

          <Card css={{ p: '$8' }}>
            <Flex justify="between" align="center">
              <Box>
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>Satisfaction</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2', color: '$success' }}>
                  {supportStats.satisfactionRate}
                </Text>
              </Box>
              <Box css={{ p: '$4', background: '$success2', borderRadius: '$lg' }}>
                <InfoIcon />
              </Box>
            </Flex>
          </Card>
        </Box>

        {/* Tab Navigation */}
        <Card css={{ p: '$4', mb: '$8' }}>
          <Flex css={{ gap: '$4' }}>
            <Button 
              auto 
              color={activeTab === "tickets" ? "primary" : "default"}
              variant={activeTab === "tickets" ? "solid" : "light"}
              onPress={() => setActiveTab("tickets")}
            >
              Support Tickets
            </Button>
            <Button 
              auto 
              color={activeTab === "messages" ? "primary" : "default"}
              variant={activeTab === "messages" ? "solid" : "light"}
              onPress={() => setActiveTab("messages")}
            >
              Messages
            </Button>
            <Button 
              auto 
              color={activeTab === "faq" ? "primary" : "default"}
              variant={activeTab === "faq" ? "solid" : "light"}
              onPress={() => setActiveTab("faq")}
            >
              FAQ Management
            </Button>
          </Flex>
        </Card>

        {/* Tickets Tab */}
        {activeTab === "tickets" && (
          <Card css={{ p: 0 }}>
            <Card.Header>
              <Text h3 css={{ m: 0 }}>Support Tickets</Text>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
              <Box css={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--nextui-colors-border)' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>TICKET</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>CUSTOMER</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>SUBJECT</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>PRIORITY</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>STATUS</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>ASSIGNED</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket) => (
                      <tr key={ticket.id} style={{ borderBottom: '1px solid var(--nextui-colors-border)' }}>
                        <td style={{ padding: '12px' }}>
                          <Box>
                            <Text css={{ fontWeight: '$medium' }}>{ticket.ticketNumber}</Text>
                            <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                              {new Date(ticket.createdDate).toLocaleDateString()}
                            </Text>
                          </Box>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Box>
                            <Text css={{ fontWeight: '$medium' }}>{ticket.customer.name}</Text>
                            <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                              {ticket.customer.email}
                            </Text>
                          </Box>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Text css={{ maxWidth: '200px' }}>{ticket.subject}</Text>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Badge color={getPriorityColor(ticket.priority)} variant="flat" size="sm">
                            {ticket.priority.toUpperCase()}
                          </Badge>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Badge color={getStatusColor(ticket.status)} variant="flat" size="sm">
                            {ticket.status.toUpperCase().replace('-', ' ')}
                          </Badge>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Text css={{ fontSize: '$sm' }}>
                            {ticket.assignedTo || "Unassigned"}
                          </Text>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Flex css={{ gap: '$2' }}>
                            <Button auto light size="sm" icon={<InfoIcon />} />
                            <Dropdown>
                              <Dropdown.Button auto light size="sm" icon={<DotsIcon />} />
                              <Dropdown.Menu aria-label="Ticket Actions">
                                <Dropdown.Item>View Details</Dropdown.Item>
                                <Dropdown.Item>Assign Agent</Dropdown.Item>
                                <Dropdown.Item>Change Priority</Dropdown.Item>
                                <Dropdown.Item>Add Note</Dropdown.Item>
                                <Dropdown.Item color="success">Resolve</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Flex>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Card.Body>
          </Card>
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