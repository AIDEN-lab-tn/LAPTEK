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
              API & Integrations
            </Text>
            <Text css={{ color: '$accents8', mt: '$2' }}>
              Connect third-party services and manage API access
            </Text>
          </Box>
          <Button auto color="primary" css={{ fontWeight: '$medium' }}>
            Browse Integrations
          </Button>
        </Flex>

        {/* Stats Cards */}
        <Box css={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '$8', mb: '$12' }}>
          <Card css={{ p: '$8' }}>
            <Flex justify="between" align="center">
              <Box>
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>Connected</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2', color: '$success' }}>
                  {integrationStats.connected} / {integrationStats.total}
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
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>Payment</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2', color: '$primary' }}>
                  {integrationStats.byCategory.payment}
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
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>Shipping</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2', color: '$secondary' }}>
                  {integrationStats.byCategory.shipping}
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
                <Text css={{ color: '$accents8', fontSize: '$sm' }}>Analytics</Text>
                <Text css={{ fontSize: '$2xl', fontWeight: '$bold', mt: '$2', color: '$warning' }}>
                  {integrationStats.byCategory.analytics}
                </Text>
              </Box>
              <Box css={{ p: '$4', background: '$warning2', borderRadius: '$lg' }}>
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
              color={activeTab === "integrations" ? "primary" : "default"}
              variant={activeTab === "integrations" ? "solid" : "light"}
              onPress={() => setActiveTab("integrations")}
            >
              Integrations
            </Button>
            <Button 
              auto 
              color={activeTab === "api" ? "primary" : "default"}
              variant={activeTab === "api" ? "solid" : "light"}
              onPress={() => setActiveTab("api")}
            >
              API Keys
            </Button>
            <Button 
              auto 
              color={activeTab === "webhooks" ? "primary" : "default"}
              variant={activeTab === "webhooks" ? "solid" : "light"}
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