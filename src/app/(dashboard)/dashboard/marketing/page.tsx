"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Input,
  Text,
  Dropdown,
  Badge,
  Switch,
  Textarea,
} from "@nextui-org/react";
import {Box} from '../../../../components/Dashboard/styles/box';
import {Flex} from '../../../../components/Dashboard/styles/flex';
import {ExportIcon} from '../../../../components/Dashboard/icons/accounts/export-icon';
import {InfoIcon} from '../../../../components/Dashboard/icons/accounts/info-icon';
import {DotsIcon} from '../../../../components/Dashboard/icons/accounts/dots-icon';

interface Campaign {
  id: string;
  name: string;
  type: "discount" | "banner" | "email" | "social";
  status: "active" | "paused" | "scheduled" | "ended";
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrder: number;
  usageLimit: number;
  usageCount: number;
  status: "active" | "inactive" | "expired";
  startDate: string;
  endDate: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Black Friday Gaming Sale",
    type: "banner",
    status: "active",
    startDate: "2024-11-25",
    endDate: "2024-11-29",
    budget: 5000.00,
    spent: 2340.50,
    impressions: 125000,
    clicks: 3200,
    conversions: 89,
    revenue: 28790.00,
  },
  {
    id: "2",
    name: "New Customer Welcome",
    type: "email",
    status: "active",
    startDate: "2024-09-01",
    endDate: "2024-12-31",
    budget: 2000.00,
    spent: 890.25,
    impressions: 45000,
    clicks: 2100,
    conversions: 156,
    revenue: 15670.00,
  },
  {
    id: "3",
    name: "Gaming Laptop Promotion",
    type: "social",
    status: "paused",
    startDate: "2024-09-15",
    endDate: "2024-10-15",
    budget: 3000.00,
    spent: 1567.80,
    impressions: 78000,
    clicks: 1850,
    conversions: 42,
    revenue: 12580.00,
  },
];

const mockCoupons: Coupon[] = [
  {
    id: "1",
    code: "GAMING20",
    type: "percentage",
    value: 20,
    minOrder: 500,
    usageLimit: 1000,
    usageCount: 234,
    status: "active",
    startDate: "2024-09-01",
    endDate: "2024-12-31",
  },
  {
    id: "2",
    code: "NEWBIE50",
    type: "fixed",
    value: 50,
    minOrder: 200,
    usageLimit: 500,
    usageCount: 67,
    status: "active",
    startDate: "2024-09-01",
    endDate: "2024-12-31",
  },
  {
    id: "3",
    code: "BLACKFRIDAY30",
    type: "percentage",
    value: 30,
    minOrder: 1000,
    usageLimit: 2000,
    usageCount: 1450,
    status: "active",
    startDate: "2024-11-25",
    endDate: "2024-11-29",
  },
  {
    id: "4",
    code: "SUMMER15",
    type: "percentage",
    value: 15,
    minOrder: 300,
    usageLimit: 800,
    usageCount: 798,
    status: "expired",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "success";
    case "paused": return "warning";
    case "scheduled": return "primary";
    case "ended": case "expired": return "default";
    case "inactive": return "error";
    default: return "default";
  }
};

const getCampaignTypeColor = (type: string) => {
  switch (type) {
    case "discount": return "warning";
    case "banner": return "primary";
    case "email": return "secondary";
    case "social": return "success";
    default: return "default";
  }
};

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState<"campaigns" | "coupons" | "analytics">("campaigns");
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [coupons] = useState<Coupon[]>(mockCoupons);

  const marketingStats = {
    totalBudget: campaigns.reduce((sum, campaign) => sum + campaign.budget, 0),
    totalSpent: campaigns.reduce((sum, campaign) => sum + campaign.spent, 0),
    totalRevenue: campaigns.reduce((sum, campaign) => sum + campaign.revenue, 0),
    activeCampaigns: campaigns.filter(c => c.status === "active").length,
    activeCoupons: coupons.filter(c => c.status === "active").length,
    couponUsage: coupons.reduce((sum, coupon) => sum + coupon.usageCount, 0),
  };

  const getRoi = () => {
    return marketingStats.totalSpent > 0 ? 
      ((marketingStats.totalRevenue - marketingStats.totalSpent) / marketingStats.totalSpent * 100) : 0;
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
              Marketing Management
            </Text>
            <Text css={{ color: '$accents8', mt: '$2' }}>
              Manage campaigns, promotions, and marketing analytics
            </Text>
          </Box>
          <Flex css={{ gap: '$4' }}>
            <Button bordered color="secondary">
              Create Coupon
            </Button>
            <Button auto color="primary" css={{ fontWeight: '$medium' }}>
              New Campaign
            </Button>
          </Flex>
        </Flex>

        {/* Stats Cards */}
        <Box css={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '$8', mb: '$12' }}>
          <Card css={{ p: '$8' }}>
            <Flex justify="between" align="center">
              <Box>
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>Marketing ROI</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2', color: '$success' }}>
                  {getRoi().toFixed(1)}%
                </Text>
              </Box>
              <Box css={{ p: '$4', background: '$success2', borderRadius: '$lg' }}>
                <ExportIcon />
              </Box>
            </Flex>
          </Card>

          <Card css={{ p: '$8' }}>
            <Flex justify="between" align="center">
              <Box>
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>Total Revenue</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2', color: '$primary' }}>
                  ${marketingStats.totalRevenue.toLocaleString()}
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
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>Budget Spent</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2', color: '$warning' }}>
                  ${marketingStats.totalSpent.toLocaleString()}
                </Text>
                <Text css={{ fontSize: '$xs', color: '$accents7' }}>
                  of ${marketingStats.totalBudget.toLocaleString()}
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
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>Active Campaigns</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2', color: '$secondary' }}>
                  {marketingStats.activeCampaigns}
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
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>Active Coupons</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2', color: '$success' }}>
                  {marketingStats.activeCoupons}
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
              color={activeTab === "campaigns" ? "primary" : "default"}
              variant={activeTab === "campaigns" ? "solid" : "light"}
              onPress={() => setActiveTab("campaigns")}
            >
              Campaigns
            </Button>
            <Button 
              auto 
              color={activeTab === "coupons" ? "primary" : "default"}
              variant={activeTab === "coupons" ? "solid" : "light"}
              onPress={() => setActiveTab("coupons")}
            >
              Discount Coupons
            </Button>
            <Button 
              auto 
              color={activeTab === "analytics" ? "primary" : "default"}
              variant={activeTab === "analytics" ? "solid" : "light"}
              onPress={() => setActiveTab("analytics")}
            >
              Analytics
            </Button>
          </Flex>
        </Card>

        {/* Campaigns Tab */}
        {activeTab === "campaigns" && (
          <Card css={{ p: 0 }}>
            <Card.Header>
              <Flex justify="between" align="center">
                <Text h3 css={{ m: 0 }}>Marketing Campaigns</Text>
                <Button bordered size="sm" icon={<ExportIcon />}>
                  Export
                </Button>
              </Flex>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
              <Box css={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--nextui-colors-border)' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>CAMPAIGN</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>TYPE</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>STATUS</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>BUDGET</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>SPENT</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>CONVERSIONS</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>REVENUE</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id} style={{ borderBottom: '1px solid var(--nextui-colors-border)' }}>
                        <td style={{ padding: '12px' }}>
                          <Box>
                            <Text css={{ fontWeight: '$medium' }}>{campaign.name}</Text>
                            <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                              {campaign.startDate} - {campaign.endDate}
                            </Text>
                          </Box>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Badge color={getCampaignTypeColor(campaign.type)} variant="flat" size="sm">
                            {campaign.type.toUpperCase()}
                          </Badge>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Badge color={getStatusColor(campaign.status)} variant="flat" size="sm">
                            {campaign.status.toUpperCase()}
                          </Badge>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Text>${campaign.budget.toLocaleString()}</Text>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Text css={{ color: '$warning' }}>
                            ${campaign.spent.toLocaleString()}
                          </Text>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Box>
                            <Text css={{ fontWeight: '$medium' }}>{campaign.conversions}</Text>
                            <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                              {campaign.clicks > 0 ? ((campaign.conversions / campaign.clicks) * 100).toFixed(1) : 0}% rate
                            </Text>
                          </Box>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Text css={{ fontWeight: '$medium', color: '$success' }}>
                            ${campaign.revenue.toLocaleString()}
                          </Text>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Flex css={{ gap: '$2' }}>
                            <Button auto light size="sm" icon={<InfoIcon />} />
                            <Dropdown>
                              <Dropdown.Button auto light size="sm" icon={<DotsIcon />} />
                              <Dropdown.Menu aria-label="Campaign Actions">
                                <Dropdown.Item>Edit Campaign</Dropdown.Item>
                                <Dropdown.Item>View Analytics</Dropdown.Item>
                                <Dropdown.Item>Duplicate</Dropdown.Item>
                                {campaign.status === "active" && (
                                  <Dropdown.Item>Pause Campaign</Dropdown.Item>
                                )}
                                {campaign.status === "paused" && (
                                  <Dropdown.Item>Resume Campaign</Dropdown.Item>
                                )}
                                <Dropdown.Item color="error">End Campaign</Dropdown.Item>
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

        {/* Coupons Tab */}
        {activeTab === "coupons" && (
          <Card css={{ p: 0 }}>
            <Card.Header>
              <Flex justify="between" align="center">
                <Text h3 css={{ m: 0 }}>Discount Coupons</Text>
                <Button bordered size="sm" icon={<ExportIcon />}>
                  Export
                </Button>
              </Flex>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
              <Box css={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--nextui-colors-border)' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>CODE</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>DISCOUNT</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>MIN ORDER</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>USAGE</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>STATUS</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>VALIDITY</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((coupon) => (
                      <tr key={coupon.id} style={{ borderBottom: '1px solid var(--nextui-colors-border)' }}>
                        <td style={{ padding: '12px' }}>
                          <Text css={{ fontWeight: '$medium', fontFamily: 'monospace' }}>
                            {coupon.code}
                          </Text>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Text css={{ fontWeight: '$medium', color: '$warning' }}>
                            {coupon.type === "percentage" ? `${coupon.value}%` : `$${coupon.value}`}
                          </Text>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Text>${coupon.minOrder}</Text>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Box>
                            <Text css={{ fontWeight: '$medium' }}>
                              {coupon.usageCount}/{coupon.usageLimit}
                            </Text>
                            <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                              {((coupon.usageCount / coupon.usageLimit) * 100).toFixed(1)}% used
                            </Text>
                          </Box>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Badge color={getStatusColor(coupon.status)} variant="flat" size="sm">
                            {coupon.status.toUpperCase()}
                          </Badge>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Text css={{ fontSize: '$sm' }}>
                            {coupon.startDate} to {coupon.endDate}
                          </Text>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <Flex css={{ gap: '$2' }}>
                            <Button auto light size="sm" icon={<InfoIcon />} />
                            <Dropdown>
                              <Dropdown.Button auto light size="sm" icon={<DotsIcon />} />
                              <Dropdown.Menu aria-label="Coupon Actions">
                                <Dropdown.Item>Edit Coupon</Dropdown.Item>
                                <Dropdown.Item>View Usage</Dropdown.Item>
                                <Dropdown.Item>Duplicate</Dropdown.Item>
                                {coupon.status === "active" && (
                                  <Dropdown.Item color="warning">Deactivate</Dropdown.Item>
                                )}
                                <Dropdown.Item color="error">Delete</Dropdown.Item>
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

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <Box css={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '$8' }}>
            <Card css={{ p: 0 }}>
              <Card.Header>
                <Text h3 css={{ m: 0 }}>Campaign Performance</Text>
              </Card.Header>
              <Card.Body css={{ p: '$8' }}>
                <Box css={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '$accents1', borderRadius: '$md' }}>
                  <Text css={{ color: '$accents7' }}>Performance Chart Placeholder</Text>
                </Box>
                <Text css={{ fontSize: '$sm', color: '$accents7', mt: '$4', textAlign: 'center' }}>
                  Campaign ROI and conversion tracking
                </Text>
              </Card.Body>
            </Card>

            <Card css={{ p: 0 }}>
              <Card.Header>
                <Text h3 css={{ m: 0 }}>Coupon Usage Trends</Text>
              </Card.Header>
              <Card.Body css={{ p: '$8' }}>
                <Box css={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '$accents1', borderRadius: '$md' }}>
                  <Text css={{ color: '$accents7' }}>Usage Trends Chart Placeholder</Text>
                </Box>
                <Text css={{ fontSize: '$sm', color: '$accents7', mt: '$4', textAlign: 'center' }}>
                  Discount code redemption patterns
                </Text>
              </Card.Body>
            </Card>
          </Box>
        )}
      </Flex>
    </Box>
  );
}