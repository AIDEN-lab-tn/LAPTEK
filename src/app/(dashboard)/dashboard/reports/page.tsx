"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Input,
  Text,
  Dropdown,
  Badge,
  Progress,
} from "@nextui-org/react";
import {Box} from '../../../../components/Dashboard/styles/box';
import {Flex} from '../../../../components/Dashboard/styles/flex';

// Icon Components
const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3V21H21V19H5V3H3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14L12 9L16 13L21 8V16H3V8L7 14Z"/>
  </svg>
);

const DollarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM13.5 6V7.5C14.04 7.5 14.5 7.96 14.5 8.5S14.04 9.5 13.5 9.5V11H12.5V9.5C11.96 9.5 11.5 9.04 11.5 8.5S11.96 7.5 12.5 7.5V6H13.5ZM9.5 8.5C9.5 7.12 10.62 6 12 6V4C9.51 4 7.5 6.01 7.5 8.5S9.51 13 12 13V15C10.62 15 9.5 13.88 9.5 12.5H8C8 14.71 9.79 16.5 12 16.5V18H13V16.5C15.21 16.5 17 14.71 17 12.5S15.21 8.5 13 8.5V6.5H12V8.5Z"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 4C18.21 4 20 5.79 20 8C20 10.21 18.21 12 16 12C13.79 12 12 10.21 12 8C12 5.79 13.79 4 16 4ZM16 14C18.67 14 22 15.34 22 18V20H10V18C10 15.34 13.33 14 16 14ZM8 12C10.21 12 12 10.21 12 8C12 5.79 10.21 4 8 4C5.79 4 4 5.79 4 8C4 10.21 5.79 12 8 12ZM8 14C5.33 14 0 15.34 0 18V20H8V18C8 16.35 8.5 15.03 9.26 14Z"/>
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z"/>
  </svg>
);

const OrdersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
  </svg>
);

const ExportIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 17C11.45 17 11 16.55 11 16V12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12V16C13 16.55 12.55 17 12 17ZM13 9H11V7H13V9Z"/>
  </svg>
);

interface SalesData {
  period: string;
  revenue: number;
  orders: number;
  customers: number;
  avgOrderValue: number;
  growth: number;
}

interface ProductPerformance {
  id: string;
  name: string;
  category: string;
  sold: number;
  revenue: number;
  views: number;
  conversionRate: number;
}

interface CustomerInsight {
  segment: string;
  count: number;
  revenue: number;
  avgOrderValue: number;
  percentage: number;
}

const mockSalesData: SalesData[] = [
  { period: "Today", revenue: 12450.00, orders: 23, customers: 18, avgOrderValue: 541.30, growth: 12.5 },
  { period: "Yesterday", revenue: 11200.00, orders: 21, customers: 17, avgOrderValue: 533.33, growth: -2.1 },
  { period: "This Week", revenue: 78900.00, orders: 142, customers: 98, avgOrderValue: 555.63, growth: 8.7 },
  { period: "Last Week", revenue: 72600.00, orders: 134, customers: 91, avgOrderValue: 541.79, growth: 15.3 },
  { period: "This Month", revenue: 298450.00, orders: 542, customers: 387, avgOrderValue: 550.74, growth: 22.1 },
  { period: "Last Month", revenue: 244300.00, orders: 448, customers: 324, avgOrderValue: 545.31, growth: 18.9 },
];

const mockProductPerformance: ProductPerformance[] = [
  {
    id: "1",
    name: "Gaming Laptop RTX 4080",
    category: "Gaming Laptops",
    sold: 45,
    revenue: 134550.00,
    views: 1250,
    conversionRate: 3.6
  },
  {
    id: "2",
    name: "Desktop Gaming PC i7",
    category: "Gaming PCs",
    sold: 32,
    revenue: 95840.00,
    views: 890,
    conversionRate: 3.6
  },
  {
    id: "3",
    name: "Mechanical RGB Keyboard",
    category: "Accessories",
    sold: 128,
    revenue: 19200.00,
    views: 2150,
    conversionRate: 6.0
  },
  {
    id: "4",
    name: "4K Gaming Monitor 27\"",
    category: "Monitors",
    sold: 67,
    revenue: 40200.00,
    views: 1580,
    conversionRate: 4.2
  },
  {
    id: "5",
    name: "Wireless Gaming Mouse",
    category: "Accessories",
    sold: 89,
    revenue: 8010.00,
    views: 1920,
    conversionRate: 4.6
  },
];

const mockCustomerInsights: CustomerInsight[] = [
  { segment: "High-Value Customers", count: 87, revenue: 157890.00, avgOrderValue: 1815.40, percentage: 35.2 },
  { segment: "Returning Customers", count: 234, revenue: 98670.00, avgOrderValue: 421.67, percentage: 22.1 },
  { segment: "New Customers", count: 156, revenue: 67450.00, avgOrderValue: 432.37, percentage: 15.1 },
  { segment: "At-Risk Customers", count: 43, revenue: 12340.00, avgOrderValue: 287.00, percentage: 2.8 },
];

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  
  const currentData = mockSalesData.find(data => data.period === selectedPeriod) || mockSalesData[4];

  const getTrendColor = (growth: number) => {
    return growth > 0 ? "$success" : "$error";
  };

  const getTrendText = (growth: number) => {
    return growth > 0 ? "↑" : "↓";
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
              Reports & Analytics
            </Text>
          </Box>
          <Text css={{ color: '$accents7', mt: '$2' }}>
            Comprehensive business insights and performance metrics
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
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Revenue</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                ${currentData.revenue.toLocaleString()}
              </Text>
            </Flex>
          </Card>

          <Card css={{ 
            p: '$6', 
            minHeight: '120px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            border: 'none',
            boxShadow: '0 6px 20px rgba(240, 147, 251, 0.15)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(240, 147, 251, 0.2)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Flex direction="column" align="center" css={{ textAlign: 'center' }}>
              <Box css={{ p: '$3', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '$lg', mb: '$3', color: 'white' }}>
                <OrdersIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Orders</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {currentData.orders.toLocaleString()}
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
                <UsersIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Customers</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {currentData.customers.toLocaleString()}
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
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Avg Order Value</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                ${currentData.avgOrderValue.toFixed(0)}
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
                <TrendingUpIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Growth Rate</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {currentData.growth.toFixed(1)}%
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
                <AnalyticsIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Conversion Rate</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                4.2%
              </Text>
            </Flex>
          </Card>
        </Box>

        {/* Filters and Actions */}
        <Card css={{ 
          p: '$8', 
          mb: '$6',
          border: 'none',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          background: '$background'
        }}>
          <Flex justify="between" align="center" wrap="wrap" css={{ gap: '$8' }}>
            <Flex align="center" css={{ gap: '$8', flex: 1 }}>
              <Dropdown>
                <Dropdown.Button auto flat>
                  Period: {selectedPeriod}
                </Dropdown.Button>
                <Dropdown.Menu
                  selectedKeys={new Set([selectedPeriod])}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setSelectedPeriod(selected);
                  }}
                >
                  <Dropdown.Item key="Today">Today</Dropdown.Item>
                  <Dropdown.Item key="Yesterday">Yesterday</Dropdown.Item>
                  <Dropdown.Item key="This Week">This Week</Dropdown.Item>
                  <Dropdown.Item key="Last Week">Last Week</Dropdown.Item>
                  <Dropdown.Item key="This Month">This Month</Dropdown.Item>
                  <Dropdown.Item key="Last Month">Last Month</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Flex>
            <Button css={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              Export Report
            </Button>
          </Flex>
        </Card>

        {/* Charts Section */}
        <Box css={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '$6', mb: '$6' }}>
          <Card css={{ 
            p: 0,
            border: 'none',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            borderRadius: '$xl'
          }}>
            <Card.Header css={{ p: '$6' }}>
              <Text h3 css={{ m: 0, fontSize: '$lg', fontWeight: '$semibold' }}>Sales Trend</Text>
            </Card.Header>
            <Card.Body css={{ p: '$8' }}>
              <Box css={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(102, 126, 234, 0.05)', borderRadius: '$md' }}>
                <Text css={{ color: '$accents7' }}>Sales Chart Placeholder</Text>
              </Box>
              <Text css={{ fontSize: '$sm', color: '$accents7', mt: '$4', textAlign: 'center' }}>
                Revenue over time with growth indicators
              </Text>
            </Card.Body>
          </Card>

          <Card css={{ 
            p: 0,
            border: 'none',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            borderRadius: '$xl'
          }}>
            <Card.Header css={{ p: '$6' }}>
              <Text h3 css={{ m: 0, fontSize: '$lg', fontWeight: '$semibold' }}>Category Performance</Text>
            </Card.Header>
            <Card.Body css={{ p: '$8' }}>
              <Box css={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(102, 126, 234, 0.05)', borderRadius: '$md' }}>
                <Text css={{ color: '$accents7' }}>Donut Chart Placeholder</Text>
              </Box>
              <Text css={{ fontSize: '$sm', color: '$accents7', mt: '$4', textAlign: 'center' }}>
                Revenue breakdown by product categories
              </Text>
            </Card.Body>
          </Card>
        </Box>

        {/* Product Performance */}
        <Card css={{ 
          p: 0, 
          mb: '$6',
          border: 'none',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          borderRadius: '$xl'
        }}>
          <Card.Header css={{ p: '$6' }}>
            <Flex justify="between" align="center">
              <Text h3 css={{ m: 0, fontSize: '$lg', fontWeight: '$semibold' }}>Top Performing Products</Text>
              <Button light size="sm">View All</Button>
            </Flex>
          </Card.Header>
          <Card.Body css={{ p: 0 }}>
            <Box css={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '900px', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th colSpan={6} style={{ padding: 0, border: 'none' }}>
                      <Box css={{ 
                        background: 'rgba(59, 130, 246, 0.05)',
                        m: '$4',
                        borderRadius: '$lg',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <Box css={{ flex: 1.5, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>PRODUCT</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>CATEGORY</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>SOLD</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>REVENUE</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>VIEWS</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>CONVERSION</Box>
                      </Box>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockProductPerformance.map((product) => (
                    <tr key={product.id}>
                      <td colSpan={6} style={{ padding: 0, border: 'none' }}>
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
                            <Text css={{ fontSize: '$sm', fontWeight: '$semibold' }}>{product.name}</Text>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Badge variant="flat" color="primary" size="sm">
                              {product.category}
                            </Badge>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Text css={{ fontSize: '$sm', fontWeight: '$semibold' }}>{product.sold} units</Text>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Text css={{ fontSize: '$sm', fontWeight: '$semibold', color: '$success' }}>
                              ${product.revenue.toLocaleString()}
                            </Text>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Text css={{ fontSize: '$sm' }}>{product.views.toLocaleString()}</Text>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Flex align="center" css={{ gap: '$2' }}>
                              <Text css={{ fontSize: '$sm' }}>{product.conversionRate}%</Text>
                              <Progress
                                color="primary"
                                size="sm"
                                value={product.conversionRate}
                                css={{ width: '60px' }}
                              />
                            </Flex>
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

        {/* Customer Insights */}
        <Card css={{ 
          p: 0,
          border: 'none',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          borderRadius: '$xl'
        }}>
          <Card.Header css={{ p: '$6' }}>
            <Text h3 css={{ m: 0, fontSize: '$lg', fontWeight: '$semibold' }}>Customer Segmentation</Text>
          </Card.Header>
          <Card.Body css={{ p: 0 }}>
            <Box css={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th colSpan={5} style={{ padding: 0, border: 'none' }}>
                      <Box css={{ 
                        background: 'rgba(59, 130, 246, 0.05)',
                        m: '$4',
                        borderRadius: '$lg',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <Box css={{ flex: 1.5, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>SEGMENT</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>CUSTOMERS</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>REVENUE</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>AVG ORDER</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>SHARE</Box>
                      </Box>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockCustomerInsights.map((insight) => (
                    <tr key={insight.segment}>
                      <td colSpan={5} style={{ padding: 0, border: 'none' }}>
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
                            <Text css={{ fontSize: '$sm', fontWeight: '$semibold' }}>{insight.segment}</Text>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Text css={{ fontSize: '$sm' }}>{insight.count}</Text>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Text css={{ fontSize: '$sm', fontWeight: '$semibold', color: '$success' }}>
                              ${insight.revenue.toLocaleString()}
                            </Text>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Text css={{ fontSize: '$sm' }}>${insight.avgOrderValue.toFixed(0)}</Text>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Flex align="center" css={{ gap: '$2' }}>
                              <Text css={{ fontSize: '$sm' }}>{insight.percentage}%</Text>
                              <Progress
                                color="success"
                                size="sm"
                                value={insight.percentage}
                                css={{ width: '80px' }}
                              />
                            </Flex>
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