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
import {ExportIcon} from '../../../../components/Dashboard/icons/accounts/export-icon';
import {InfoIcon} from '../../../../components/Dashboard/icons/accounts/info-icon';

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
              Reports & Analytics
            </Text>
            <Text css={{ color: '$accents8', mt: '$2' }}>
              Comprehensive business insights and performance metrics
            </Text>
          </Box>
          <Flex css={{ gap: '$4' }}>
            <Dropdown>
              <Dropdown.Button bordered color="primary">
                {selectedPeriod}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Period Selection"
                color="primary"
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
            <Button color="primary" icon={<ExportIcon />}>
              Export Report
            </Button>
          </Flex>
        </Flex>

        {/* Key Metrics */}
        <Box css={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '$8', mb: '$12' }}>
          <Card css={{ p: '$8' }}>
            <Flex justify="between" align="center">
              <Box>
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>Revenue ({selectedPeriod})</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2', color: '$success' }}>
                  ${currentData.revenue.toLocaleString()}
                </Text>
                <Flex align="center" css={{ mt: '$2', gap: '$2' }}>
                  <Text css={{ 
                    fontSize: '$sm', 
                    color: getTrendColor(currentData.growth),
                    fontWeight: '$medium'
                  }}>
                    {getTrendText(currentData.growth)} {Math.abs(currentData.growth)}%
                  </Text>
                  <Text css={{ fontSize: '$sm', color: '$accents7' }}>vs previous period</Text>
                </Flex>
              </Box>
              <Box css={{ p: '$4', background: '$success2', borderRadius: '$lg' }}>
                <ExportIcon />
              </Box>
            </Flex>
          </Card>

          <Card css={{ p: '$8' }}>
            <Flex justify="between" align="center">
              <Box>
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>Orders ({selectedPeriod})</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2', color: '$primary' }}>
                  {currentData.orders.toLocaleString()}
                </Text>
                <Text css={{ fontSize: '$sm', color: '$accents7', mt: '$2' }}>
                  {currentData.customers} unique customers
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
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>Avg Order Value</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2', color: '$secondary' }}>
                  ${currentData.avgOrderValue.toFixed(2)}
                </Text>
                <Text css={{ fontSize: '$sm', color: '$accents7', mt: '$2' }}>
                  Per transaction
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
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>Conversion Rate</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2', color: '$warning' }}>
                  4.2%
                </Text>
                <Text css={{ fontSize: '$sm', color: '$accents7', mt: '$2' }}>
                  Visitors to customers
                </Text>
              </Box>
              <Box css={{ p: '$4', background: '$warning2', borderRadius: '$lg' }}>
                <InfoIcon />
              </Box>
            </Flex>
          </Card>
        </Box>

        {/* Charts Section */}
        <Box css={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '$8', mb: '$12' }}>
          <Card css={{ p: 0 }}>
            <Card.Header>
              <Text h3 css={{ m: 0 }}>Sales Trend</Text>
            </Card.Header>
            <Card.Body css={{ p: '$8' }}>
              <Box css={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '$accents1', borderRadius: '$md' }}>
                <Text css={{ color: '$accents7' }}>Sales Chart Placeholder</Text>
              </Box>
              <Text css={{ fontSize: '$sm', color: '$accents7', mt: '$4', textAlign: 'center' }}>
                Revenue over time with growth indicators
              </Text>
            </Card.Body>
          </Card>

          <Card css={{ p: 0 }}>
            <Card.Header>
              <Text h3 css={{ m: 0 }}>Category Performance</Text>
            </Card.Header>
            <Card.Body css={{ p: '$8' }}>
              <Box css={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '$accents1', borderRadius: '$md' }}>
                <Text css={{ color: '$accents7' }}>Donut Chart Placeholder</Text>
              </Box>
              <Text css={{ fontSize: '$sm', color: '$accents7', mt: '$4', textAlign: 'center' }}>
                Revenue breakdown by product categories
              </Text>
            </Card.Body>
          </Card>
        </Box>

        {/* Product Performance */}
        <Card css={{ p: 0, mb: '$8' }}>
          <Card.Header>
            <Flex justify="between" align="center">
              <Text h3 css={{ m: 0 }}>Top Performing Products</Text>
              <Button bordered size="sm">View All</Button>
            </Flex>
          </Card.Header>
          <Card.Body css={{ p: 0 }}>
            <Box css={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nextui-colors-border)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>PRODUCT</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>CATEGORY</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>UNITS SOLD</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>REVENUE</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>VIEWS</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>CONVERSION</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProductPerformance.map((product) => (
                    <tr key={product.id} style={{ borderBottom: '1px solid var(--nextui-colors-border)' }}>
                      <td style={{ padding: '12px' }}>
                        <Text css={{ fontWeight: '$medium' }}>{product.name}</Text>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Badge color="primary" variant="flat" size="sm">
                          {product.category}
                        </Badge>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Text css={{ fontWeight: '$medium' }}>{product.sold}</Text>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Text css={{ fontWeight: '$medium', color: '$success' }}>
                          ${product.revenue.toLocaleString()}
                        </Text>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Text>{product.views.toLocaleString()}</Text>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Flex align="center" css={{ gap: '$2' }}>
                          <Text css={{ fontSize: '$sm' }}>{product.conversionRate}%</Text>
                          <Progress
                            color="primary"
                            size="sm"
                            value={product.conversionRate}
                            css={{ width: '60px' }}
                          />
                        </Flex>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Card.Body>
        </Card>

        {/* Customer Insights */}
        <Card css={{ p: 0 }}>
          <Card.Header>
            <Text h3 css={{ m: 0 }}>Customer Segmentation</Text>
          </Card.Header>
          <Card.Body css={{ p: 0 }}>
            <Box css={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--nextui-colors-border)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>SEGMENT</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>CUSTOMERS</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>REVENUE</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>AVG ORDER VALUE</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>REVENUE SHARE</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCustomerInsights.map((insight) => (
                    <tr key={insight.segment} style={{ borderBottom: '1px solid var(--nextui-colors-border)' }}>
                      <td style={{ padding: '12px' }}>
                        <Text css={{ fontWeight: '$medium' }}>{insight.segment}</Text>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Text>{insight.count}</Text>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Text css={{ fontWeight: '$medium', color: '$success' }}>
                          ${insight.revenue.toLocaleString()}
                        </Text>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Text>${insight.avgOrderValue.toFixed(2)}</Text>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Flex align="center" css={{ gap: '$2' }}>
                          <Text css={{ fontSize: '$sm' }}>{insight.percentage}%</Text>
                          <Progress
                            color="success"
                            size="sm"
                            value={insight.percentage}
                            css={{ width: '80px' }}
                          />
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