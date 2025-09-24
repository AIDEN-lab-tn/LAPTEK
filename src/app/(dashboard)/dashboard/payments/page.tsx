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

// Icon Components
const DollarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM13.5 6V7.5C14.04 7.5 14.5 7.96 14.5 8.5S14.04 9.5 13.5 9.5V11H12.5V9.5C11.96 9.5 11.5 9.04 11.5 8.5S11.96 7.5 12.5 7.5V6H13.5ZM9.5 8.5C9.5 7.12 10.62 6 12 6V4C9.51 4 7.5 6.01 7.5 8.5S9.51 13 12 13V15C10.62 15 9.5 13.88 9.5 12.5H8C8 14.71 9.79 16.5 12 16.5V18H13V16.5C15.21 16.5 17 14.71 17 12.5S15.21 8.5 13 8.5V6.5H12V8.5Z"/>
  </svg>
);

const CreditCardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M20,18H4V12H20V18M20,8H4V6H20V8Z"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14L12 9L16 13L21 8V16H3V8L7 14Z"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z"/>
  </svg>
);

interface Transaction {
  id: string;
  transactionId: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
  };
  date: string;
  amount: number;
  fee: number;
  netAmount: number;
  paymentMethod: string;
  gateway: string;
  status: "completed" | "pending" | "failed" | "refunded" | "disputed";
  type: "payment" | "refund" | "chargeback";
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    transactionId: "TXN-20240924-001",
    orderNumber: "ORD-2024-001",
    customer: {
      name: "John Smith",
      email: "john@example.com",
    },
    date: "2024-09-24T10:30:00Z",
    amount: 2499.99,
    fee: 72.50,
    netAmount: 2427.49,
    paymentMethod: "Visa ****1234",
    gateway: "Stripe",
    status: "completed",
    type: "payment",
  },
  {
    id: "2",
    transactionId: "TXN-20240924-002",
    orderNumber: "ORD-2024-002",
    customer: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
    },
    date: "2024-09-24T14:15:00Z",
    amount: 1899.50,
    fee: 55.09,
    netAmount: 1844.41,
    paymentMethod: "PayPal",
    gateway: "PayPal",
    status: "completed",
    type: "payment",
  },
  {
    id: "3",
    transactionId: "TXN-20240923-001",
    orderNumber: "ORD-2024-003",
    customer: {
      name: "Mike Wilson",
      email: "mike@example.com",
    },
    date: "2024-09-23T09:45:00Z",
    amount: 3299.00,
    fee: 95.67,
    netAmount: 3203.33,
    paymentMethod: "Bank Transfer",
    gateway: "Wise",
    status: "completed",
    type: "payment",
  },
  {
    id: "4",
    transactionId: "REF-20240923-001",
    orderNumber: "ORD-2024-001",
    customer: {
      name: "John Smith",
      email: "john@example.com",
    },
    date: "2024-09-23T16:20:00Z",
    amount: 299.99,
    fee: -8.70,
    netAmount: -308.69,
    paymentMethod: "Visa ****1234",
    gateway: "Stripe",
    status: "completed",
    type: "refund",
  },
  {
    id: "5",
    transactionId: "TXN-20240922-001",
    orderNumber: "ORD-2024-004",
    customer: {
      name: "Emma Davis",
      email: "emma@example.com",
    },
    date: "2024-09-22T11:10:00Z",
    amount: 799.99,
    fee: 23.20,
    netAmount: 776.79,
    paymentMethod: "Mastercard ****5678",
    gateway: "Stripe",
    status: "disputed",
    type: "payment",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "success";
    case "pending": return "warning";
    case "failed": return "error";
    case "refunded": return "default";
    case "disputed": return "error";
    default: return "default";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "payment": return "primary";
    case "refund": return "warning";
    case "chargeback": return "error";
    default: return "default";
  }
};

export default function PaymentsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Mock data for payments
  const paymentStats = {
    totalTransactions: 2456,
    totalRevenue: 125480,
    pendingAmount: 8950,
    successfulTransactions: 2398,
    failedTransactions: 58,
    totalFees: 4567
  };

  const transactions = [
    {
      id: 1,
      transactionId: "TXN-001234",
      orderNumber: "ORD-2024-001",
      customer: { name: "Alex Johnson", email: "alex@example.com" },
      amount: 299.99,
      fee: 8.99,
      netAmount: 291.00,
      status: "completed",
      paymentMethod: "Credit Card",
      gateway: "Stripe",
      date: "2024-01-15"
    },
    {
      id: 2,
      transactionId: "TXN-001235",
      orderNumber: "ORD-2024-002",
      customer: { name: "Sarah Connor", email: "sarah@example.com" },
      amount: 149.99,
      fee: 4.49,
      netAmount: 145.50,
      status: "pending",
      paymentMethod: "PayPal",
      gateway: "PayPal",
      date: "2024-01-14"
    },
    {
      id: 3,
      transactionId: "TXN-001236",
      orderNumber: "ORD-2024-003",
      customer: { name: "Mike Smith", email: "mike@example.com" },
      amount: 89.99,
      fee: 2.69,
      netAmount: 87.30,
      status: "failed",
      paymentMethod: "Credit Card",
      gateway: "Stripe",
      date: "2024-01-13"
    },
    {
      id: 4,
      transactionId: "TXN-001237",
      orderNumber: "ORD-2024-004",
      customer: { name: "Emma Davis", email: "emma@example.com" },
      amount: 599.99,
      fee: 17.99,
      netAmount: 582.00,
      status: "completed",
      paymentMethod: "Bank Transfer",
      gateway: "Wise",
      date: "2024-01-12"
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    const matchesType = typeFilter === "all" || transaction.paymentMethod.toLowerCase().includes(typeFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box css={{ p: '$6', maxWidth: '100%' }}>
      <Flex direction="column" css={{ gap: '$6' }}>
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
              Payments Management
            </Text>
          </Box>
          <Text css={{ color: '$accents7', mt: '$2' }}>
            Track transactions, refunds, and payment processing
          </Text>
        </Box>

        {/* Stats Cards */}
        <Box css={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '$6',
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
                <DollarIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Total Transactions</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {paymentStats.totalTransactions.toLocaleString()}
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
                <TrendingUpIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Total Revenue</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                ${paymentStats.totalRevenue.toLocaleString()}
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
                <ClockIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Pending Amount</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                ${paymentStats.pendingAmount.toLocaleString()}
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
                <CheckCircleIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Successful</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {paymentStats.successfulTransactions}
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
                <WarningIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Failed</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {paymentStats.failedTransactions}
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
                <CreditCardIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Total Fees</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                ${paymentStats.totalFees.toLocaleString()}
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
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                css={{ 
                  flex: 1,
                  maxWidth: '400px',
                  '& .nextui-input': {
                    background: '$background',
                    border: '2px solid $border',
                    borderRadius: '$lg',
                    '&:focus-within': {
                      borderColor: '$primary',
                      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)'
                    }
                  },
                  '& input': {
                    fontSize: '$sm'
                  }
                }}
              />
              <Dropdown>
                <Dropdown.Button auto flat>
                  Status: {statusFilter === "all" ? "All" : statusFilter}
                </Dropdown.Button>
                <Dropdown.Menu
                  selectedKeys={new Set([statusFilter])}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setStatusFilter(selected);
                  }}
                >
                  <Dropdown.Item key="all">All</Dropdown.Item>
                  <Dropdown.Item key="completed">Completed</Dropdown.Item>
                  <Dropdown.Item key="pending">Pending</Dropdown.Item>
                  <Dropdown.Item key="failed">Failed</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Button auto flat>
                  Type: {typeFilter === "all" ? "All" : typeFilter}
                </Dropdown.Button>
                <Dropdown.Menu
                  selectedKeys={new Set([typeFilter])}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setTypeFilter(selected);
                  }}
                >
                  <Dropdown.Item key="all">All</Dropdown.Item>
                  <Dropdown.Item key="credit">Credit Card</Dropdown.Item>
                  <Dropdown.Item key="paypal">PayPal</Dropdown.Item>
                  <Dropdown.Item key="bank">Bank Transfer</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Flex>
            <Button css={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              Export Data
            </Button>
          </Flex>
        </Card>

        {/* Transactions Table */}
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
            <Text h3 css={{ m: 0, fontSize: '$lg', fontWeight: '$semibold' }}>Transactions Directory</Text>
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
              <table style={{ width: '100%', minWidth: '900px', borderCollapse: 'separate', borderSpacing: 0 }}>
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
                        <Box css={{ flex: 1.5, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>TRANSACTION</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>CUSTOMER</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>DATE</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>STATUS</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>AMOUNT</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>NET</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>ACTIONS</Box>
                      </Box>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction, index) => (
                    <tr key={transaction.id}>
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
                          <Box css={{ flex: 1.5, padding: '0 12px' }}>
                            <Text css={{ fontSize: '$sm', fontWeight: '$semibold', color: '$primary' }}>#{transaction.transactionId}</Text>
                            <Text css={{ fontSize: '$xs', color: '$accents6' }}>{transaction.orderNumber}</Text>
                            <Text css={{ fontSize: '$xs', color: '$accents6' }}>{transaction.paymentMethod} • {transaction.gateway}</Text>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Box css={{ display: 'flex', alignItems: 'center', gap: '$3' }}>
                              <Avatar size="sm" text={transaction.customer.name.charAt(0)} />
                              <Box>
                                <Text css={{ fontSize: '$sm', fontWeight: '$medium' }}>{transaction.customer.name}</Text>
                                <Text css={{ fontSize: '$xs', color: '$accents6' }}>{transaction.customer.email}</Text>
                              </Box>
                            </Box>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Text css={{ fontSize: '$sm', color: '$accents8' }}>{transaction.date}</Text>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Badge color={getStatusColor(transaction.status)} variant="flat" size="sm">
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </Badge>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Text css={{ fontSize: '$sm', fontWeight: '$semibold' }}>${transaction.amount.toFixed(2)}</Text>
                            <Text css={{ fontSize: '$xs', color: '$accents6' }}>Fee: ${transaction.fee.toFixed(2)}</Text>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Text css={{ fontSize: '$sm', fontWeight: '$semibold', color: '$success' }}>${transaction.netAmount.toFixed(2)}</Text>
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