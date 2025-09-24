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
const CampaignIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14L12 9L16 13L21 8V16H3V8L7 14Z"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
  </svg>
);

const SocialIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18L19,11H15V9A1,1 0 0,1 16,8H18V5Z"/>
  </svg>
);

const ClickIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9,5V9H21V7.5L16,12.5L21,17.5V16H9V20H7V16H3V14H7V10H3V8H7V4H9V5Z"/>
  </svg>
);

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

export default function MarketingManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Mock data for marketing
  const marketingStats = {
    totalCampaigns: 15,
    activeCampaigns: 8,
    totalBudget: 45000,
    budgetSpent: 32800,
    conversionRate: 3.2,
    totalRevenue: 89500
  };

  const campaigns = [
    {
      id: 1,
      name: "Gaming Laptops Black Friday",
      type: "discount",
      status: "active",
      budget: 15000,
      spent: 12400,
      impressions: 125000,
      clicks: 3800,
      conversions: 145,
      revenue: 28900,
      startDate: "2024-01-01",
      endDate: "2024-01-31"
    },
    {
      id: 2,
      name: "New Gaming Accessories",
      type: "banner",
      status: "active",
      budget: 8000,
      spent: 6200,
      impressions: 89000,
      clicks: 2100,
      conversions: 78,
      revenue: 15600,
      startDate: "2024-01-10",
      endDate: "2024-01-25"
    },
    {
      id: 3,
      name: "Email Newsletter Campaign",
      type: "email",
      status: "completed",
      budget: 2500,
      spent: 2100,
      impressions: 45000,
      clicks: 1200,
      conversions: 89,
      revenue: 12800,
      startDate: "2024-01-05",
      endDate: "2024-01-15"
    },
    {
      id: 4,
      name: "Social Media Gaming Push",
      type: "social",
      status: "paused",
      budget: 5000,
      spent: 3200,
      impressions: 67000,
      clicks: 1800,
      conversions: 45,
      revenue: 8900,
      startDate: "2024-01-08",
      endDate: "2024-01-22"
    }
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    const matchesType = typeFilter === "all" || campaign.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'paused': return 'warning';
      case 'completed': return 'primary';
      default: return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'discount': return 'warning';
      case 'banner': return 'primary';
      case 'email': return 'secondary';
      case 'social': return 'success';
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
              Marketing Management
            </Text>
          </Box>
          <Text css={{ color: '$accents7', mt: '$2' }}>
            Manage campaigns, promotions, and marketing analytics
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
                <CampaignIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Total Campaigns</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {marketingStats.totalCampaigns}
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
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Active Campaigns</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {marketingStats.activeCampaigns}
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
                <TargetIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Total Budget</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                ${marketingStats.totalBudget.toLocaleString()}
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
                <EmailIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Budget Spent</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                ${marketingStats.budgetSpent.toLocaleString()}
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
                <ClickIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Conversion Rate</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {marketingStats.conversionRate}%
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
                <SocialIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Total Revenue</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                ${marketingStats.totalRevenue.toLocaleString()}
              </Text>
            </Flex>
          </Card>
        </Box>

        {/* Marketing Campaigns Section */}
        <Box>
          {/* Section Header with Filters */}
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
                Marketing Campaigns
              </Text>
              <Button auto css={{ 
                background: 'rgba(255, 255, 255, 0.2)', 
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.3)'
                }
              }}>
                Add Campaign
              </Button>
            </Flex>
            
            <Flex css={{ gap: '$3', flexWrap: 'wrap' }}>
              <Input
                placeholder="Search campaigns..."
                size="sm"
                css={{ 
                  minWidth: '240px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  '& input': {
                    color: 'white',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.7)'
                    }
                  }
                }}
                contentLeft={
                  <Box css={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Box>
                }
              />
              
              <Button auto flat css={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}>
                All Types
              </Button>
              
              <Button auto flat css={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}>
                All Status
              </Button>
            </Flex>
          </Card>

          {/* Campaign Cards */}
          <Box css={{ display: 'flex', flexDirection: 'column', gap: '$3' }}>
            {/* Summer Sale Campaign Card */}
            <Card css={{
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
                {/* Campaign Info */}
                <Flex align="center" css={{ gap: '$3', flex: '2' }}>
                  <Box css={{
                    p: '$3',
                    borderRadius: '$lg',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white'
                  }}>
                    <CampaignIcon />
                  </Box>
                  <Box>
                    <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>Summer Sale 2024</Text>
                    <Text css={{ color: '$accents7', fontSize: '$xs' }}>Email Marketing Campaign</Text>
                  </Box>
                </Flex>
                
                {/* Type */}
                <Flex align="center" css={{ flex: '1' }}>
                  <Badge color="primary" variant="flat" size="sm">Social Media</Badge>
                </Flex>
                
                {/* Status */}
                <Flex align="center" css={{ flex: '1' }}>
                  <Badge color="success" variant="flat" size="sm">Active</Badge>
                </Flex>
                
                {/* Budget */}
                <Flex direction="column" align="end" css={{ flex: '1' }}>
                  <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>$15,000</Text>
                  <Text css={{ color: '$accents7', fontSize: '$xs' }}>Budget</Text>
                </Flex>
                
                {/* Spent */}
                <Flex direction="column" align="end" css={{ flex: '1' }}>
                  <Text css={{ color: '$warning', fontWeight: '$semibold', fontSize: '$sm' }}>$8,420</Text>
                  <Text css={{ color: '$accents7', fontSize: '$xs' }}>Spent</Text>
                </Flex>
                
                {/* Performance */}
                <Flex direction="column" align="end" css={{ flex: '1.5' }}>
                  <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>12,847 clicks</Text>
                  <Text css={{ color: '$success', fontSize: '$xs' }}>284 conversions</Text>
                </Flex>
                
                {/* ROI */}
                <Flex direction="column" align="end" css={{ flex: '1' }}>
                  <Text css={{ color: '$success', fontWeight: '$bold', fontSize: '$sm' }}>+24.5%</Text>
                  <Text css={{ color: '$accents7', fontSize: '$xs' }}>ROI</Text>
                </Flex>
              </Flex>
            </Card>

            {/* Newsletter Campaign Card */}
            <Card css={{
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
                {/* Campaign Info */}
                <Flex align="center" css={{ gap: '$3', flex: '2' }}>
                  <Box css={{
                    p: '$3',
                    borderRadius: '$lg',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white'
                  }}>
                    <EmailIcon />
                  </Box>
                  <Box>
                    <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>Newsletter Campaign</Text>
                    <Text css={{ color: '$accents7', fontSize: '$xs' }}>Email Marketing</Text>
                  </Box>
                </Flex>
                
                {/* Type */}
                <Flex align="center" css={{ flex: '1' }}>
                  <Badge color="secondary" variant="flat" size="sm">Email</Badge>
                </Flex>
                
                {/* Status */}
                <Flex align="center" css={{ flex: '1' }}>
                  <Badge color="success" variant="flat" size="sm">Active</Badge>
                </Flex>
                
                {/* Budget */}
                <Flex direction="column" align="end" css={{ flex: '1' }}>
                  <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>$5,000</Text>
                  <Text css={{ color: '$accents7', fontSize: '$xs' }}>Budget</Text>
                </Flex>
                
                {/* Spent */}
                <Flex direction="column" align="end" css={{ flex: '1' }}>
                  <Text css={{ color: '$warning', fontWeight: '$semibold', fontSize: '$sm' }}>$3,240</Text>
                  <Text css={{ color: '$accents7', fontSize: '$xs' }}>Spent</Text>
                </Flex>
                
                {/* Performance */}
                <Flex direction="column" align="end" css={{ flex: '1.5' }}>
                  <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>8,234 clicks</Text>
                  <Text css={{ color: '$success', fontSize: '$xs' }}>156 conversions</Text>
                </Flex>
                
                {/* ROI */}
                <Flex direction="column" align="end" css={{ flex: '1' }}>
                  <Text css={{ color: '$success', fontWeight: '$bold', fontSize: '$sm' }}>+18.2%</Text>
                  <Text css={{ color: '$accents7', fontSize: '$xs' }}>ROI</Text>
                </Flex>
              </Flex>
            </Card>

            {/* Black Friday Promo Card */}
            <Card css={{
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
                {/* Campaign Info */}
                <Flex align="center" css={{ gap: '$3', flex: '2' }}>
                  <Box css={{
                    p: '$3',
                    borderRadius: '$lg',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: 'white'
                  }}>
                    <SocialIcon />
                  </Box>
                  <Box>
                    <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>Black Friday Promo</Text>
                    <Text css={{ color: '$accents7', fontSize: '$xs' }}>Social Media Campaign</Text>
                  </Box>
                </Flex>
                
                {/* Type */}
                <Flex align="center" css={{ flex: '1' }}>
                  <Badge color="warning" variant="flat" size="sm">Paid Ads</Badge>
                </Flex>
                
                {/* Status */}
                <Flex align="center" css={{ flex: '1' }}>
                  <Badge color="warning" variant="flat" size="sm">Paused</Badge>
                </Flex>
                
                {/* Budget */}
                <Flex direction="column" align="end" css={{ flex: '1' }}>
                  <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>$25,000</Text>
                  <Text css={{ color: '$accents7', fontSize: '$xs' }}>Budget</Text>
                </Flex>
                
                {/* Spent */}
                <Flex direction="column" align="end" css={{ flex: '1' }}>
                  <Text css={{ color: '$warning', fontWeight: '$semibold', fontSize: '$sm' }}>$18,650</Text>
                  <Text css={{ color: '$accents7', fontSize: '$xs' }}>Spent</Text>
                </Flex>
                
                {/* Performance */}
                <Flex direction="column" align="end" css={{ flex: '1.5' }}>
                  <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>45,192 clicks</Text>
                  <Text css={{ color: '$success', fontSize: '$xs' }}>892 conversions</Text>
                </Flex>
                
                {/* ROI */}
                <Flex direction="column" align="end" css={{ flex: '1' }}>
                  <Text css={{ color: '$success', fontWeight: '$bold', fontSize: '$sm' }}>+42.8%</Text>
                  <Text css={{ color: '$accents7', fontSize: '$xs' }}>ROI</Text>
                </Flex>
              </Flex>
            </Card>

            {/* Google Ads Campaign Card */}
            <Card css={{
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
                {/* Campaign Info */}
                <Flex align="center" css={{ gap: '$3', flex: '2' }}>
                  <Box css={{
                    p: '$3',
                    borderRadius: '$lg',
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white'
                  }}>
                    <TargetIcon />
                  </Box>
                  <Box>
                    <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>Google Ads Campaign</Text>
                    <Text css={{ color: '$accents7', fontSize: '$xs' }}>Search Ads</Text>
                  </Box>
                </Flex>
                
                {/* Type */}
                <Flex align="center" css={{ flex: '1' }}>
                  <Badge color="primary" variant="flat" size="sm">Search</Badge>
                </Flex>
                
                {/* Status */}
                <Flex align="center" css={{ flex: '1' }}>
                  <Badge color="success" variant="flat" size="sm">Active</Badge>
                </Flex>
                
                {/* Budget */}
                <Flex direction="column" align="end" css={{ flex: '1' }}>
                  <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>$12,000</Text>
                  <Text css={{ color: '$accents7', fontSize: '$xs' }}>Budget</Text>
                </Flex>
                
                {/* Spent */}
                <Flex direction="column" align="end" css={{ flex: '1' }}>
                  <Text css={{ color: '$warning', fontWeight: '$semibold', fontSize: '$sm' }}>$9,830</Text>
                  <Text css={{ color: '$accents7', fontSize: '$xs' }}>Spent</Text>
                </Flex>
                
                {/* Performance */}
                <Flex direction="column" align="end" css={{ flex: '1.5' }}>
                  <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>18,394 clicks</Text>
                  <Text css={{ color: '$success', fontSize: '$xs' }}>423 conversions</Text>
                </Flex>
                
                {/* ROI */}
                <Flex direction="column" align="end" css={{ flex: '1' }}>
                  <Text css={{ color: '$success', fontWeight: '$bold', fontSize: '$sm' }}>+31.7%</Text>
                  <Text css={{ color: '$accents7', fontSize: '$xs' }}>ROI</Text>
                </Flex>
              </Flex>
            </Card>

            {/* Retargeting Campaign Card */}
            <Card css={{
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
                {/* Campaign Info */}
                <Flex align="center" css={{ gap: '$3', flex: '2' }}>
                  <Box css={{
                    p: '$3',
                    borderRadius: '$lg',
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                    color: 'white'
                  }}>
                    <TrendingUpIcon />
                  </Box>
                  <Box>
                    <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>Retargeting Campaign</Text>
                    <Text css={{ color: '$accents7', fontSize: '$xs' }}>Display Ads</Text>
                  </Box>
                </Flex>
                
                {/* Type */}
                <Flex align="center" css={{ flex: '1' }}>
                  <Badge color="error" variant="flat" size="sm">Display</Badge>
                </Flex>
                
                {/* Status */}
                <Flex align="center" css={{ flex: '1' }}>
                  <Badge color="success" variant="flat" size="sm">Active</Badge>
                </Flex>
                
                {/* Budget */}
                <Flex direction="column" align="end" css={{ flex: '1' }}>
                  <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>$8,000</Text>
                  <Text css={{ color: '$accents7', fontSize: '$xs' }}>Budget</Text>
                </Flex>
                
                {/* Spent */}
                <Flex direction="column" align="end" css={{ flex: '1' }}>
                  <Text css={{ color: '$warning', fontWeight: '$semibold', fontSize: '$sm' }}>$4,920</Text>
                  <Text css={{ color: '$accents7', fontSize: '$xs' }}>Spent</Text>
                </Flex>
                
                {/* Performance */}
                <Flex direction="column" align="end" css={{ flex: '1.5' }}>
                  <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>6,847 clicks</Text>
                  <Text css={{ color: '$success', fontSize: '$xs' }}>189 conversions</Text>
                </Flex>
                
                {/* ROI */}
                <Flex direction="column" align="end" css={{ flex: '1' }}>
                  <Text css={{ color: '$success', fontWeight: '$bold', fontSize: '$sm' }}>+28.3%</Text>
                  <Text css={{ color: '$accents7', fontSize: '$xs' }}>ROI</Text>
                </Flex>
              </Flex>
            </Card>
          </Box>
        </Box>

      </Flex>
    </Box>
  );
}