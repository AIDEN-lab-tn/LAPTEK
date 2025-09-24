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
} from "@nextui-org/react";
import {Box} from '../../../../components/Dashboard/styles/box';
import {Flex} from '../../../../components/Dashboard/styles/flex';

// Simple icon components
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 17C11.45 17 11 16.55 11 16V12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12V16C13 16.55 12.55 17 12 17ZM13 9H11V7H13V9Z"/>
  </svg>
);

const ExportIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 9H16C16.55 9 17 8.55 17 8C17 7.45 16.55 7 16 7H12C11.45 7 11 7.45 11 8C11 8.55 11.45 9 12 9ZM12 13H16C16.55 13 17 12.55 17 12C17 11.45 16.55 11 16 11H12C11.45 11 11 11.45 11 12C11 12.55 11.45 13 12 13ZM12 17H16C16.55 17 17 16.55 17 16C17 15.45 16.55 15 16 15H12C11.45 15 11 15.45 11 16C11 16.55 11.45 17 12 17ZM7 7H9V9H7V7ZM7 11H9V13H7V11ZM7 15H9V17H7V15ZM20 3H4C3.45 3 3 3.45 3 4V20C3 20.55 3.45 21 4 21H20C20.55 21 21 20.55 21 20V4C21 3.45 20.55 3 20 3ZM19 19H5V5H19V19Z"/>
  </svg>
);

const DotsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 4C18.21 4 20 5.79 20 8C20 10.21 18.21 12 16 12C13.79 12 12 10.21 12 8C12 5.79 13.79 4 16 4ZM16 14C18.67 14 22 15.34 22 18V20H10V18C10 15.34 13.33 14 16 14ZM8 12C10.21 12 12 10.21 12 8C12 5.79 10.21 4 8 4C5.79 4 4 5.79 4 8C4 10.21 5.79 12 8 12ZM8 14C5.33 14 0 15.34 0 18V20H8V18C8 16.35 8.5 15.03 9.26 14Z"/>
  </svg>
);

const DollarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 15H9C9 16.08 10.37 17 12 17C13.63 17 15 16.08 15 15C15 13.9 13.96 13.5 11.76 12.97C9.64 12.44 7 11.78 7 9C7 7.21 8.47 5.69 10.5 5.18V3H13.5V5.18C15.53 5.69 17 7.21 17 9H15C15 7.92 13.63 7 12 7C10.37 7 9 7.92 9 9C9 10.1 10.04 10.5 12.24 11.03C14.36 11.56 17 12.22 17 15C17 16.79 15.53 18.31 13.5 18.82V21H10.5V18.82C8.47 18.31 7 16.79 7 15Z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
  </svg>
);

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: "active" | "inactive" | "vip";
  segment: "new" | "returning" | "high-value" | "at-risk";
  address: {
    street: string;
    city: string;
    country: string;
  };
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1234567890",
    avatar: "https://i.pravatar.cc/150?u=john",
    joinDate: "2024-01-15",
    totalOrders: 12,
    totalSpent: 4299.99,
    lastOrderDate: "2024-09-24",
    status: "active",
    segment: "high-value",
    address: {
      street: "123 Main St",
      city: "New York, NY",
      country: "USA",
    },
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1987654321",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    joinDate: "2024-03-20",
    totalOrders: 8,
    totalSpent: 2899.50,
    lastOrderDate: "2024-09-22",
    status: "active",
    segment: "returning",
    address: {
      street: "456 Oak Ave",
      city: "Los Angeles, CA",
      country: "USA",
    },
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike@example.com",
    phone: "+1122334455",
    avatar: "https://i.pravatar.cc/150?u=mike",
    joinDate: "2024-06-10",
    totalOrders: 3,
    totalSpent: 1599.00,
    lastOrderDate: "2024-09-20",
    status: "active",
    segment: "new",
    address: {
      street: "789 Pine Rd",
      city: "Chicago, IL",
      country: "USA",
    },
  },
  {
    id: "4",
    name: "Emma Davis",
    email: "emma@example.com",
    phone: "+1555666777",
    avatar: "https://i.pravatar.cc/150?u=emma",
    joinDate: "2023-11-05",
    totalOrders: 15,
    totalSpent: 6799.99,
    lastOrderDate: "2024-09-18",
    status: "vip",
    segment: "high-value",
    address: {
      street: "321 Elm St",
      city: "Miami, FL",
      country: "USA",
    },
  },
  {
    id: "5",
    name: "Robert Brown",
    email: "robert@example.com",
    phone: "+1777888999",
    avatar: "https://i.pravatar.cc/150?u=robert",
    joinDate: "2023-08-12",
    totalOrders: 5,
    totalSpent: 999.99,
    lastOrderDate: "2024-07-15",
    status: "inactive",
    segment: "at-risk",
    address: {
      street: "654 Maple Dr",
      city: "Seattle, WA",
      country: "USA",
    },
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "success";
    case "inactive": return "error";
    case "vip": return "secondary";
    default: return "default";
  }
};

const getSegmentColor = (segment: string) => {
  switch (segment) {
    case "new": return "primary";
    case "returning": return "success";
    case "high-value": return "warning";
    case "at-risk": return "error";
    default: return "default";
  }
};

export default function CustomersPage() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "" || customer.status === statusFilter;
    const matchesSegment = segmentFilter === "" || customer.segment === segmentFilter;
    
    return matchesSearch && matchesStatus && matchesSegment;
  });

  const customerStats = {
    total: customers.length,
    active: customers.filter(c => c.status === "active").length,
    vip: customers.filter(c => c.status === "vip").length,
    highValue: customers.filter(c => c.segment === "high-value").length,
    totalRevenue: customers.reduce((sum, customer) => sum + customer.totalSpent, 0),
    avgOrderValue: customers.reduce((sum, customer) => sum + customer.totalSpent, 0) / 
                   customers.reduce((sum, customer) => sum + customer.totalOrders, 0),
  };

  return (
    <Box css={{ overflow: 'hidden', height: '100%', background: '$background', display: 'flex', flexDirection: 'column' }}>
      <Flex
        css={{
          flex: 1,
          pt: '$8',
          pb: '$8',
          px: '$8',
          '@sm': {
            pt: '$10',
            pb: '$10',
            px: '$12',
          },
          '@md': {
            pt: '$12',
            pb: '$12',
            px: '$16',
          },
        }}
        justify={'center'}
        direction={'column'}
      >
        {/* Header */}
        <Flex justify="between" align="center" css={{ mb: '$8' }}>
          <Box>
            <Box css={{ 
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
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
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
                borderRadius: '2px',
                opacity: 0.3
              }
            }}>
              <Text h1 css={{ 
                m: 0, 
                fontSize: '$3xl', 
                fontWeight: '$bold',
                letterSpacing: '-0.02em'
              }}>
                Customer Management
              </Text>
            </Box>
            <Text css={{ 
              color: '$accents8', 
              mt: '$4',
              fontSize: '$lg',
              fontWeight: '$medium'
            }}>
              Manage customer relationships and insights
            </Text>
          </Box>
          <Button auto color="primary" css={{ fontWeight: '$medium' }}>
            Add Customer
          </Button>
        </Flex>

        {/* Stats Cards */}
        <Box css={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '$6', mb: '$8' }}>
          <Card css={{ 
            p: '$6', 
            minHeight: '120px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
            border: 'none',
            boxShadow: '0 6px 20px rgba(59, 130, 246, 0.15)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(59, 130, 246, 0.2)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Flex direction="column" align="center" css={{ textAlign: 'center' }}>
              <Box css={{ p: '$3', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '$lg', mb: '$3', color: 'white' }}>
                <UsersIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Total Customers</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {customerStats.total}
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
                <UsersIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Active</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {customerStats.active}
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
                <StarIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>VIP Customers</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {customerStats.vip}
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
                <StarIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>High Value</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {customerStats.highValue}
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
                <DollarIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Total Revenue</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                ${customerStats.totalRevenue.toLocaleString()}
              </Text>
            </Flex>
          </Card>

          <Card css={{ 
            p: '$6', 
            minHeight: '120px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            border: 'none',
            boxShadow: '0 6px 20px rgba(59, 130, 246, 0.15)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(59, 130, 246, 0.2)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Flex direction="column" align="center" css={{ textAlign: 'center' }}>
              <Box css={{ p: '$3', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '$lg', mb: '$3', color: 'white' }}>
                <DollarIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Avg Order Value</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                ${customerStats.avgOrderValue.toFixed(0)}
              </Text>
            </Flex>
          </Card>
        </Box>

        {/* Filters and Search */}
        <Card css={{ 
          p: '$8', 
          mb: '$6',
          border: 'none',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          background: '$background'
        }}>
          <Flex justify="between" align="center" wrap="wrap" css={{ gap: '$8' }}>
            <Flex align="center" css={{ gap: '$8', flex: 1 }}>
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                css={{ 
                  maxWidth: '350px',
                  '& .nextui-input-wrapper': {
                    border: '1px solid #e4e4e7',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    background: '#ffffff',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: '#3b82f6'
                    }
                  },
                  '& .nextui-input': {
                    background: 'transparent'
                  },
                  '& .nextui-input-wrapper--focus': {
                    borderColor: '#3b82f6',
                    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)'
                  }
                }}
              />
              <Dropdown>
                <Dropdown.Button flat color="primary">
                  {statusFilter || "All Status"}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Status Filter"
                  color="primary"
                  disallowEmptySelection={false}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setStatusFilter(selected === "all" ? "" : selected);
                  }}
                >
                  <Dropdown.Item key="all">All Status</Dropdown.Item>
                  <Dropdown.Item key="active">Active</Dropdown.Item>
                  <Dropdown.Item key="inactive">Inactive</Dropdown.Item>
                  <Dropdown.Item key="vip">VIP</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Button flat color="secondary">
                  {segmentFilter || "All Segments"}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Segment Filter"
                  color="secondary"
                  disallowEmptySelection={false}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setSegmentFilter(selected === "all" ? "" : selected);
                  }}
                >
                  <Dropdown.Item key="all">All Segments</Dropdown.Item>
                  <Dropdown.Item key="new">New</Dropdown.Item>
                  <Dropdown.Item key="returning">Returning</Dropdown.Item>
                  <Dropdown.Item key="high-value">High Value</Dropdown.Item>
                  <Dropdown.Item key="at-risk">At Risk</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Flex>
            <Button 
              auto
              color="primary"
              icon={<ExportIcon />}
              css={{
                border: 'none',
                minWidth: '100px',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)'
                }
              }}
            >
              Export
            </Button>
          </Flex>
        </Card>

        {/* Customers Table */}
        <Card css={{ 
          p: 0,
          border: 'none',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          borderRadius: '$xl',
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Card.Header css={{ p: '$6' }}>
            <Text h3 css={{ m: 0, fontSize: '$lg', fontWeight: '$semibold' }}>Customer Directory</Text>
          </Card.Header>
          <Card.Body css={{ p: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box css={{ 
              overflowX: 'auto',
              overflowY: 'auto',
              flex: 1,
              '&::-webkit-scrollbar': {
                height: '8px'
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent'
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#e4e4e7',
                borderRadius: '4px'
              }
            }}>
              <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th colSpan={8} style={{ padding: 0, border: 'none' }}>
                      <Box css={{ 
                        background: 'rgba(59, 130, 246, 0.05)',
                        m: '$4',
                        borderRadius: '$lg',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>CUSTOMER</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>CONTACT</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>STATUS</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>SEGMENT</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>ORDERS</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>TOTAL SPENT</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>LAST ORDER</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>ACTIONS</Box>
                      </Box>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer, index) => (
                    <tr 
                      key={customer.id} 
                      style={{ 
                        borderBottom: 'none',
                        backgroundColor: index % 2 === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.02)',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.02)';
                      }}
                    >
                      <td style={{ padding: '16px' }}>
                        <Flex align="center" css={{ gap: '$4' }}>
                          <Avatar 
                            src={customer.avatar}
                            size="sm"
                            alt={customer.name}
                          />
                          <Box>
                            <Text css={{ fontWeight: '$medium' }}>{customer.name}</Text>
                            <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                              Joined {customer.joinDate}
                            </Text>
                          </Box>
                        </Flex>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <Box>
                          <Text css={{ fontSize: '$sm', fontWeight: '$medium' }}>{customer.email}</Text>
                          <Text css={{ fontSize: '$xs', color: '$accents6' }}>
                            {customer.phone}
                          </Text>
                        </Box>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <Badge color={getStatusColor(customer.status)} variant="flat" size="sm">
                          {customer.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <Badge color={getSegmentColor(customer.segment)} variant="flat" size="sm">
                          {customer.segment.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <Text css={{ fontWeight: '$semibold', fontSize: '$sm' }}>{customer.totalOrders}</Text>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <Text css={{ fontWeight: '$semibold', fontSize: '$sm', color: '$success' }}>${customer.totalSpent.toFixed(2)}</Text>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <Text css={{ fontSize: '$sm', color: '$accents6' }}>{customer.lastOrderDate}</Text>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <Flex css={{ gap: '$3' }}>
                          <Button 
                            auto 
                            light 
                            size="sm" 
                            icon={<InfoIcon />}
                            css={{
                              minWidth: 'auto',
                              '&:hover': {
                                background: '$primary2'
                              }
                            }}
                          />
                          <Dropdown>
                            <Dropdown.Button 
                              auto 
                              light 
                              size="sm" 
                              icon={<DotsIcon />}
                              css={{
                                minWidth: 'auto',
                                '&:hover': {
                                  background: '$accents2'
                                }
                              }}
                            />
                            <Dropdown.Menu aria-label="Customer Actions">
                              <Dropdown.Item>View Profile</Dropdown.Item>
                              <Dropdown.Item>Order History</Dropdown.Item>
                              <Dropdown.Item>Send Email</Dropdown.Item>
                              <Dropdown.Item>Edit Customer</Dropdown.Item>
                              <Dropdown.Item color="error">Deactivate</Dropdown.Item>
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
      </Flex>
    </Box>
  );
}