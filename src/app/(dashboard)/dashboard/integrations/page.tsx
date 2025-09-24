"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Input,
  Text,
  Switch,
} from "@nextui-org/react";
import {Box} from '../../../../components/Dashboard/styles/box';
import {Flex} from '../../../../components/Dashboard/styles/flex';
import {InfoIcon} from '../../../../components/Dashboard/icons/accounts/info-icon';
import {SettingsIcon} from '../../../../components/Dashboard/icons/sidebar/settings-icon';

interface Integration {
  id: string;
  name: string;
  description: string;
  status: "connected" | "disconnected" | "error";
  category: "payment" | "shipping" | "analytics" | "marketing" | "erp";
}

const mockIntegrations: Integration[] = [
  {
    id: "1",
    name: "Stripe",
    description: "Accept credit card payments securely",
    status: "connected",
    category: "payment",
  },
  {
    id: "2",
    name: "PayPal",
    description: "Alternative payment processing",
    status: "connected",
    category: "payment",
  },
  {
    id: "3",
    name: "FedEx API",
    description: "Real-time shipping rates and tracking",
    status: "connected",
    category: "shipping",
  },
  {
    id: "4",
    name: "Google Analytics",
    description: "Track website and store analytics",
    status: "connected",
    category: "analytics",
  },
  {
    id: "5",
    name: "Mailchimp",
    description: "Email marketing and automation",
    status: "disconnected",
    category: "marketing",
  },
  {
    id: "6",
    name: "QuickBooks",
    description: "Accounting and financial management",
    status: "disconnected",
    category: "erp",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "connected": return "success";
    case "disconnected": return "default";
    case "error": return "error";
    default: return "default";
  }
};

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState<"integrations" | "api" | "webhooks">("integrations");
  const [integrations] = useState<Integration[]>(mockIntegrations);
  const [apiKey] = useState("laptek_live_sk_1234567890abcdef");
  const [showApiKey, setShowApiKey] = useState(false);

  const integrationStats = {
    connected: integrations.filter(i => i.status === "connected").length,
    total: integrations.length,
    byCategory: {
      payment: integrations.filter(i => i.category === "payment" && i.status === "connected").length,
      shipping: integrations.filter(i => i.category === "shipping" && i.status === "connected").length,
      analytics: integrations.filter(i => i.category === "analytics" && i.status === "connected").length,
      marketing: integrations.filter(i => i.category === "marketing" && i.status === "connected").length,
    }
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
              API & Integrations
            </Text>
          </Box>
          <Text css={{ color: '$accents7', mt: '$2' }}>
            Connect third-party services and manage API access
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
            gridTemplateColumns: 'repeat(2, 1fr)'
          },
          '@lg': {
            gridTemplateColumns: 'repeat(4, 1fr)'
          }
        }}>
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
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Connected</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {integrationStats.connected} / {integrationStats.total}
              </Text>
            </Flex>
          </Card>

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
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Payment</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {integrationStats.byCategory.payment}
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
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Shipping</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {integrationStats.byCategory.shipping}
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
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Analytics</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {integrationStats.byCategory.analytics}
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
              Integrations Dashboard
            </Text>
            <Button auto css={{ 
              background: 'rgba(255, 255, 255, 0.2)', 
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)'
              }
            }}>
              Browse Integrations
            </Button>
          </Flex>
          
          <Flex css={{ gap: '$3' }}>
            <Button 
              auto 
              flat
              css={{
                background: activeTab === "integrations" ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}
              onPress={() => setActiveTab("integrations")}
            >
              Integrations
            </Button>
            <Button 
              auto 
              flat
              css={{
                background: activeTab === "api" ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}
              onPress={() => setActiveTab("api")}
            >
              API Keys
            </Button>
            <Button 
              auto 
              flat
              css={{
                background: activeTab === "webhooks" ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}
              onPress={() => setActiveTab("webhooks")}
            >
              Webhooks
            </Button>
          </Flex>
        </Card>

        {/* Integrations Tab */}
        {activeTab === "integrations" && (
          <Box css={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '$8' }}>
            {integrations.map((integration) => (
              <Card key={integration.id} css={{ p: '$8' }}>
                <Flex justify="between" align="start" css={{ mb: '$4' }}>
                  <Box css={{ flex: 1 }}>
                    <Text css={{ fontSize: '$lg', fontWeight: '$semibold', mb: '$2' }}>
                      {integration.name}
                    </Text>
                    <Text css={{ fontSize: '$sm', color: '$accents7', mb: '$3' }}>
                      {integration.description}
                    </Text>
                    <Text css={{ 
                      fontSize: '$xs', 
                      textTransform: 'uppercase',
                      color: '$accents6',
                      fontWeight: '$medium'
                    }}>
                      {integration.category}
                    </Text>
                  </Box>
                  <Switch 
                    isSelected={integration.status === "connected"} 
                    color={getStatusColor(integration.status)}
                    size="sm"
                  />
                </Flex>
                
                <Box css={{ mt: '$4', pt: '$4', borderTop: '1px solid $border' }}>
                  <Flex justify="between" align="center">
                    <Text css={{ 
                      fontSize: '$sm', 
                      color: getStatusColor(integration.status) === "success" ? "$success" : "$accents7",
                      fontWeight: '$medium'
                    }}>
                      {integration.status === "connected" ? "Connected" : "Not Connected"}
                    </Text>
                    <Button size="sm" light>
                      {integration.status === "connected" ? "Configure" : "Connect"}
                    </Button>
                  </Flex>
                </Box>
              </Card>
            ))}
          </Box>
        )}

        {/* API Keys Tab */}
        {activeTab === "api" && (
          <Box css={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '$8' }}>
            <Card css={{ p: '$8' }}>
              <Text h3 css={{ mb: '$6' }}>API Keys</Text>
              <Flex direction="column" css={{ gap: '$4' }}>
                <Box>
                  <Text css={{ fontSize: '$sm', fontWeight: '$medium', mb: '$2' }}>
                    Live API Key
                  </Text>
                  <Flex css={{ gap: '$2' }}>
                    <Input
                      value={showApiKey ? apiKey : "••••••••••••••••••••••••••••••••"}
                      readOnly
                      css={{ flex: 1, fontFamily: 'monospace' }}
                    />
                    <Button size="sm" light onPress={() => setShowApiKey(!showApiKey)}>
                      {showApiKey ? "Hide" : "Show"}
                    </Button>
                  </Flex>
                  <Text css={{ fontSize: '$xs', color: '$accents7', mt: '$2' }}>
                    Use this key for production API calls
                  </Text>
                </Box>

                <Box>
                  <Text css={{ fontSize: '$sm', fontWeight: '$medium', mb: '$2' }}>
                    Test API Key
                  </Text>
                  <Flex css={{ gap: '$2' }}>
                    <Input
                      value="laptek_test_sk_abcdef1234567890"
                      readOnly
                      css={{ flex: 1, fontFamily: 'monospace' }}
                    />
                    <Button size="sm" light>Copy</Button>
                  </Flex>
                  <Text css={{ fontSize: '$xs', color: '$accents7', mt: '$2' }}>
                    Use this key for testing and development
                  </Text>
                </Box>

                <Box css={{ mt: '$4', p: '$4', background: '$warning2', borderRadius: '$md' }}>
                  <Text css={{ fontSize: '$sm', fontWeight: '$medium', mb: '$2', color: '$warning' }}>
                    Security Notice
                  </Text>
                  <Text css={{ fontSize: '$xs', color: '$accents7' }}>
                    Keep your API keys secure. Never share them in client-side code or public repositories.
                  </Text>
                </Box>

                <Button color="primary" bordered css={{ mt: '$4' }}>
                  Regenerate Keys
                </Button>
              </Flex>
            </Card>

            <Card css={{ p: '$8' }}>
              <Text h3 css={{ mb: '$6' }}>API Documentation</Text>
              <Flex direction="column" css={{ gap: '$4' }}>
                <Box css={{ p: '$4', background: '$accents1', borderRadius: '$md' }}>
                  <Text css={{ fontWeight: '$medium', mb: '$2' }}>Base URL</Text>
                  <Input value="https://api.laptek.com/v1" readOnly css={{ fontFamily: 'monospace' }} />
                </Box>

                <Box css={{ p: '$4', background: '$accents1', borderRadius: '$md' }}>
                  <Text css={{ fontWeight: '$medium', mb: '$2' }}>Authentication</Text>
                  <Input value="Authorization: Bearer YOUR_API_KEY" readOnly css={{ fontFamily: 'monospace' }} />
                </Box>

                <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                  Available endpoints include products, orders, customers, and inventory management.
                </Text>

                <Button bordered css={{ mt: '$4' }}>
                  View Full Documentation
                </Button>
              </Flex>
            </Card>
          </Box>
        )}

        {/* Webhooks Tab */}
        {activeTab === "webhooks" && (
          <Card css={{ p: '$8' }}>
            <Flex justify="between" align="center" css={{ mb: '$6' }}>
              <Text h3 css={{ m: 0 }}>Webhook Endpoints</Text>
              <Button color="primary">Add Webhook</Button>
            </Flex>

            <Box css={{ mb: '$6' }}>
              <Text css={{ fontSize: '$sm', color: '$accents7', mb: '$4' }}>
                Configure webhook URLs to receive real-time notifications about events in your store.
              </Text>
            </Box>

            <Box css={{ border: '1px dashed $border', borderRadius: '$md', p: '$12', textAlign: 'center' }}>
              <Box css={{ mb: '$4' }}>
                <SettingsIcon />
              </Box>
              <Text css={{ color: '$accents7', mt: '$4' }}>
                No webhooks configured yet
              </Text>
              <Text css={{ fontSize: '$sm', color: '$accents6', mt: '$2' }}>
                Add webhook endpoints to receive notifications for order updates, payment events, and more
              </Text>
              <Button color="primary" css={{ mt: '$6' }}>
                Create Your First Webhook
              </Button>
            </Box>
          </Card>
        )}
      </Flex>
    </Box>
  );
}