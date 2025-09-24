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

const ShoppingCartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 18C5.9 18 5 18.9 5 20C5 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.24 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5H5.21L4.27 3H1ZM17 18C15.9 18 15 18.9 15 20C15 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z"/>
  </svg>
);

const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 8H17V4H3C1.9 4 1 4.9 1 6V17H3C3 18.66 4.34 20 6 20C7.66 20 9 18.66 9 17H15C15 18.66 16.34 20 18 20C19.66 20 21 18.66 21 17H23V12L20 8ZM19.5 9.5L21.46 12H17V9.5H19.5ZM6 18.5C5.17 18.5 4.5 17.83 4.5 17C4.5 16.17 5.17 15.5 6 15.5C6.83 15.5 7.5 16.17 7.5 17C7.5 17.83 6.83 18.5 6 18.5ZM18 18.5C17.17 18.5 16.5 17.83 16.5 17C16.5 16.17 17.17 15.5 18 15.5C18.83 15.5 19.5 16.17 19.5 17C19.5 17.83 18.83 18.5 18 18.5Z"/>
  </svg>
);

const DollarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 15H9C9 16.08 10.37 17 12 17C13.63 17 15 16.08 15 15C15 13.9 13.96 13.5 11.76 12.97C9.64 12.44 7 11.78 7 9C7 7.21 8.47 5.69 10.5 5.18V3H13.5V5.18C15.53 5.69 17 7.21 17 9H15C15 7.92 13.63 7 12 7C10.37 7 9 7.92 9 9C9 10.1 10.04 10.5 12.24 11.03C14.36 11.56 17 12.22 17 15C17 16.79 15.53 18.31 13.5 18.82V21H10.5V18.82C8.47 18.31 7 16.79 7 15Z"/>
  </svg>
);

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "canceled";
  total: number;
  items: number;
  paymentMethod: string;
  shippingAddress: string;
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    customer: {
      name: "John Smith",
      email: "john@example.com",
      phone: "+1234567890",
    },
    date: "2024-09-24",
    status: "processing",
    total: 2499.99,
    items: 3,
    paymentMethod: "Credit Card",
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    customer: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1987654321",
    },
    date: "2024-09-24",
    status: "shipped",
    total: 1899.50,
    items: 2,
    paymentMethod: "PayPal",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    customer: {
      name: "Mike Wilson",
      email: "mike@example.com",
      phone: "+1122334455",
    },
    date: "2024-09-23",
    status: "delivered",
    total: 3299.00,
    items: 4,
    paymentMethod: "Bank Transfer",
    shippingAddress: "789 Pine Rd, Chicago, IL 60601",
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    customer: {
      name: "Emma Davis",
      email: "emma@example.com",
      phone: "+1555666777",
    },
    date: "2024-09-23",
    status: "pending",
    total: 799.99,
    items: 1,
    paymentMethod: "Credit Card",
    shippingAddress: "321 Elm St, Miami, FL 33101",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": return "warning";
    case "processing": return "primary";
    case "shipped": return "secondary";
    case "delivered": return "success";
    case "canceled": return "error";
    default: return "default";
  }
};

export default function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
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
                Orders Management
              </Text>
            </Box>
            <Text css={{ 
              color: '$accents8', 
              mt: '$4',
              fontSize: '$lg',
              fontWeight: '$medium'
            }}>
              Manage and track customer orders
            </Text>
          </Box>
          <Button auto color="primary" css={{ fontWeight: '$medium' }}>
            Create Order
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
                <ShoppingCartIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Total Orders</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {orderStats.total}
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
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Pending</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {orderStats.pending}
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
                <InfoIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Processing</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {orderStats.processing}
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
                <TruckIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Delivered</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {orderStats.delivered}
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
                <TruckIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Shipped</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {orderStats.shipped}
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
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Revenue</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                ${orderStats.totalRevenue.toLocaleString()}
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
                placeholder="Search orders..."
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
                  {statusFilter || "All Statuses"}
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
                  <Dropdown.Item key="all">All Statuses</Dropdown.Item>
                  <Dropdown.Item key="pending">Pending</Dropdown.Item>
                  <Dropdown.Item key="processing">Processing</Dropdown.Item>
                  <Dropdown.Item key="shipped">Shipped</Dropdown.Item>
                  <Dropdown.Item key="delivered">Delivered</Dropdown.Item>
                  <Dropdown.Item key="canceled">Canceled</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Flex>
            <Button 
              color="primary"
              icon={<ExportIcon />}
              css={{
                border: 'none',
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

        {/* Orders Table */}
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
            <Text h3 css={{ m: 0, fontSize: '$lg', fontWeight: '$semibold' }}>Orders Directory</Text>
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
                    <th colSpan={7} style={{ padding: 0, border: 'none' }}>
                      <Box css={{ 
                        background: 'rgba(59, 130, 246, 0.05)',
                        m: '$4',
                        borderRadius: '$lg',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>ORDER</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>CUSTOMER</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>DATE</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>STATUS</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>ITEMS</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>TOTAL</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>ACTIONS</Box>
                      </Box>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={order.id}>
                      <td colSpan={7} style={{ padding: 0, border: 'none' }}>
                        <Box css={{
                          display: 'flex',
                          alignItems: 'center',
                          m: '$4',
                          p: '$4',
                          borderRadius: '$lg',
                          background: 'rgba(255, 255, 255, 0.8)',
                          border: '1px solid rgba(0, 0, 0, 0.05)',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            background: 'rgba(59, 130, 246, 0.05)',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                          }
                        }}>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Text css={{ fontSize: '$sm', fontWeight: '$semibold', color: '$primary' }}>#{order.orderNumber}</Text>
                            <Text css={{ fontSize: '$xs', color: '$accents6' }}>{order.paymentMethod}</Text>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Box css={{ display: 'flex', alignItems: 'center', gap: '$3' }}>
                              <Avatar size="sm" text={order.customer.name.charAt(0)} />
                              <Box>
                                <Text css={{ fontSize: '$sm', fontWeight: '$medium' }}>{order.customer.name}</Text>
                                <Text css={{ fontSize: '$xs', color: '$accents6' }}>{order.customer.email}</Text>
                              </Box>
                            </Box>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Text css={{ fontSize: '$sm', color: '$accents8' }}>{order.date}</Text>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Badge color={getStatusColor(order.status)} variant="flat" size="sm">
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Text css={{ fontSize: '$sm' }}>{order.items} items</Text>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Text css={{ fontSize: '$sm', fontWeight: '$semibold', color: '$success' }}>${order.total.toFixed(2)}</Text>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px', display: 'flex', gap: '$2', justifyContent: 'flex-end' }}>
                            <Button auto light size="sm" css={{ minWidth: 'auto', p: '$2' }}>
                              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                              </svg>
                            </Button>
                            <Button auto light size="sm" css={{ minWidth: 'auto', p: '$2' }}>
                              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                              </svg>
                            </Button>
                          </Box>
                        </Box>
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