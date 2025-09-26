"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Input,
  Text,
  Switch,
  Badge,
  Progress,
} from "@nextui-org/react";
import {Box} from '../../../../components/Dashboard/styles/box';
import {Flex} from '../../../../components/Dashboard/styles/flex';

// Icon Components
const OdooIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17M2 12L12 17L22 12"/>
  </svg>
);

const SyncIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4V1L8 5L12 9V6C15.31 6 18 8.69 18 12C18 13.01 17.75 13.97 17.3 14.8L18.76 16.26C19.54 15.03 20 13.57 20 12C20 7.58 16.42 4 12 4ZM12 18C8.69 18 6 15.31 6 12C6 10.99 6.25 10.03 6.7 9.2L5.24 7.74C4.46 8.97 4 10.43 4 12C4 16.42 7.58 20 12 20V23L16 19L12 15V18Z"/>
  </svg>
);

const DatabaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3C7.58 3 4 4.79 4 7C4 9.21 7.58 11 12 11C16.42 11 20 9.21 20 7C20 4.79 16.42 3 12 3ZM4 9V12C4 14.21 7.58 16 12 16C16.42 16 20 14.21 20 12V9C20 11.21 16.42 13 12 13C7.58 13 4 11.21 4 9ZM4 14V17C4 19.21 7.58 21 12 21C16.42 21 20 19.21 20 17V14C20 16.21 16.42 18 12 18C7.58 18 4 16.21 4 14Z"/>
  </svg>
);

const InventoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM14 6H10V4H14V6Z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z"/>
  </svg>
);

interface OdooModule {
  id: string;
  name: string;
  description: string;
  status: "connected" | "disconnected" | "syncing" | "error";
  lastSync: string;
  recordCount: number;
}

interface SyncStatus {
  module: string;
  status: "completed" | "in-progress" | "failed";
  progress: number;
  lastSync: string;
  recordsProcessed: number;
  totalRecords: number;
}

const mockOdooModules: OdooModule[] = [
  {
    id: "1",
    name: "Product Catalog",
    description: "Sync products, categories, and pricing",
    status: "connected",
    lastSync: "2024-01-15T10:30:00Z",
    recordCount: 2847,
  },
  {
    id: "2",
    name: "Inventory Management",
    description: "Real-time stock levels and warehouse data",
    status: "connected",
    lastSync: "2024-01-15T10:25:00Z",
    recordCount: 1256,
  },
  {
    id: "3",
    name: "Sales Orders",
    description: "Order processing and fulfillment",
    status: "syncing",
    lastSync: "2024-01-15T10:20:00Z",
    recordCount: 892,
  },
  {
    id: "4",
    name: "Customer Data",
    description: "Customer profiles and contact information",
    status: "connected",
    lastSync: "2024-01-15T10:15:00Z",
    recordCount: 1543,
  },
  {
    id: "5",
    name: "Purchase Orders",
    description: "Supplier orders and procurement",
    status: "disconnected",
    lastSync: "2024-01-14T15:30:00Z",
    recordCount: 234,
  },
  {
    id: "6",
    name: "Financial Data",
    description: "Accounting and financial records",
    status: "error",
    lastSync: "2024-01-15T09:45:00Z",
    recordCount: 0,
  },
];

const mockSyncStatus: SyncStatus[] = [
  {
    module: "Product Catalog",
    status: "completed",
    progress: 100,
    lastSync: "2024-01-15T10:30:00Z",
    recordsProcessed: 2847,
    totalRecords: 2847,
  },
  {
    module: "Sales Orders",
    status: "in-progress",
    progress: 65,
    lastSync: "2024-01-15T10:20:00Z",
    recordsProcessed: 580,
    totalRecords: 892,
  },
  {
    module: "Inventory Management",
    status: "completed",
    progress: 100,
    lastSync: "2024-01-15T10:25:00Z",
    recordsProcessed: 1256,
    totalRecords: 1256,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "connected": return "success";
    case "disconnected": return "default";
    case "syncing": return "primary";
    case "error": return "error";
    default: return "default";
  }
};

const getSyncStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "success";
    case "in-progress": return "primary";
    case "failed": return "error";
    default: return "default";
  }
};

export default function OdooIntegrationPage() {
  const [activeTab, setActiveTab] = useState<"modules" | "sync" | "settings">("modules");
  const [connectionStatus, setConnectionStatus] = useState("connected");

  const integrationStats = {
    connectedModules: mockOdooModules.filter(m => m.status === "connected").length,
    totalModules: mockOdooModules.length,
    totalRecords: mockOdooModules.reduce((sum, module) => sum + module.recordCount, 0),
    lastFullSync: "2024-01-15T10:30:00Z",
    syncFrequency: "Every 15 minutes",
    uptime: "99.8%",
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
              Odoo Integration
            </Text>
          </Box>
          <Text css={{ color: '$accents7', mt: '$2' }}>
            Manage your Odoo ERP integration and data synchronization
          </Text>
        </Box>

        {/* Connection Status */}
        <Card css={{ 
          p: '$6',
          background: connectionStatus === "connected" 
            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
            : 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
          border: 'none',
          boxShadow: '0 6px 20px rgba(16, 185, 129, 0.15)',
          color: 'white'
        }}>
          <Flex align="center" css={{ gap: '$4' }}>
            <Box css={{ p: '$3', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '$lg' }}>
              <OdooIcon />
            </Box>
            <Box css={{ flex: 1 }}>
              <Text css={{ fontSize: '$lg', fontWeight: '$bold', color: 'white' }}>
                Odoo Connection Status: {connectionStatus === "connected" ? "Connected" : "Disconnected"}
              </Text>
              <Text css={{ fontSize: '$sm', color: 'rgba(255, 255, 255, 0.9)' }}>
                {connectionStatus === "connected" 
                  ? "All systems operational - Last sync: 2 minutes ago"
                  : "Connection lost - Please check your Odoo server"
                }
              </Text>
            </Box>
            <Button 
              auto 
              css={{ 
                background: 'rgba(255, 255, 255, 0.2)', 
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.3)'
                }
              }}
            >
              {connectionStatus === "connected" ? "Reconnect" : "Connect"}
            </Button>
          </Flex>
        </Card>

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
                <OdooIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Connected Modules</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {integrationStats.connectedModules} / {integrationStats.totalModules}
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
                <DatabaseIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Total Records</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {integrationStats.totalRecords.toLocaleString()}
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
                <SyncIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Sync Frequency</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                15 min
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
                <CheckIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Uptime</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {integrationStats.uptime}
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
                <SyncIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Last Full Sync</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                2 min ago
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
                <InventoryIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Data Quality</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                98.5%
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
              Odoo Integration Dashboard
            </Text>
            <Button auto css={{ 
              background: 'rgba(255, 255, 255, 0.2)', 
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)'
              }
            }}>
              Force Sync All
            </Button>
          </Flex>
          
          <Flex css={{ gap: '$3' }}>
            <Button 
              auto 
              flat
              css={{
                background: activeTab === "modules" ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}
              onPress={() => setActiveTab("modules")}
            >
              Modules
            </Button>
            <Button 
              auto 
              flat
              css={{
                background: activeTab === "sync" ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}
              onPress={() => setActiveTab("sync")}
            >
              Sync Status
            </Button>
            <Button 
              auto 
              flat
              css={{
                background: activeTab === "settings" ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}
              onPress={() => setActiveTab("settings")}
            >
              Settings
            </Button>
          </Flex>
        </Card>

        {/* Modules Tab */}
        {activeTab === "modules" && (
          <Box css={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '$6' }}>
            {mockOdooModules.map((module) => (
              <Card key={module.id} css={{ 
                p: '$8',
                border: 'none',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                borderRadius: '$xl',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
                  transition: 'all 0.3s ease'
                }
              }}>
                <Flex justify="between" align="start" css={{ mb: '$4' }}>
                  <Box css={{ flex: 1 }}>
                    <Text css={{ fontSize: '$lg', fontWeight: '$semibold', mb: '$2' }}>
                      {module.name}
                    </Text>
                    <Text css={{ fontSize: '$sm', color: '$accents7', mb: '$3' }}>
                      {module.description}
                    </Text>
                    <Text css={{ fontSize: '$xs', color: '$accents6' }}>
                      {module.recordCount.toLocaleString()} records
                    </Text>
                  </Box>
                  <Badge color={getStatusColor(module.status)} variant="flat">
                    {module.status.toUpperCase()}
                  </Badge>
                </Flex>
                
                <Box css={{ mt: '$4', pt: '$4', borderTop: '1px solid $border' }}>
                  <Flex justify="between" align="center">
                    <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                      Last sync: {new Date(module.lastSync).toLocaleString()}
                    </Text>
                    <Flex css={{ gap: '$2' }}>
                      <Button size="sm" light>
                        Configure
                      </Button>
                      <Button size="sm" color="primary">
                        Sync Now
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              </Card>
            ))}
          </Box>
        )}

        {/* Sync Status Tab */}
        {activeTab === "sync" && (
          <Card css={{ 
            p: 0,
            border: 'none',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            borderRadius: '$xl'
          }}>
            <Card.Header css={{ p: '$6' }}>
              <Text h3 css={{ m: 0, fontSize: '$lg', fontWeight: '$semibold' }}>Real-time Sync Status</Text>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
              {mockSyncStatus.map((sync, index) => (
                <Box key={index} css={{
                  p: '$6',
                  borderBottom: index < mockSyncStatus.length - 1 ? '1px solid $border' : 'none'
                }}>
                  <Flex justify="between" align="center" css={{ mb: '$3' }}>
                    <Box>
                      <Text css={{ fontWeight: '$semibold' }}>{sync.module}</Text>
                      <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                        {sync.recordsProcessed.toLocaleString()} / {sync.totalRecords.toLocaleString()} records
                      </Text>
                    </Box>
                    <Badge color={getSyncStatusColor(sync.status)} variant="flat">
                      {sync.status.toUpperCase().replace('-', ' ')}
                    </Badge>
                  </Flex>
                  
                  <Progress
                    color={sync.status === "completed" ? "success" : sync.status === "failed" ? "error" : "primary"}
                    value={sync.progress}
                    css={{ mb: '$2' }}
                  />
                  
                  <Flex justify="between" align="center">
                    <Text css={{ fontSize: '$xs', color: '$accents6' }}>
                      Last sync: {new Date(sync.lastSync).toLocaleString()}
                    </Text>
                    <Text css={{ fontSize: '$xs', color: '$accents6' }}>
                      {sync.progress}% complete
                    </Text>
                  </Flex>
                </Box>
              ))}
            </Card.Body>
          </Card>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <Box css={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '$8' }}>
            <Card css={{ p: '$8' }}>
              <Text h3 css={{ mb: '$6' }}>Connection Settings</Text>
              <Flex direction="column" css={{ gap: '$4' }}>
                <Input
                  label="Odoo Server URL"
                  value="https://your-odoo-instance.odoo.com"
                  fullWidth
                />
                <Input
                  label="Database Name"
                  value="your-database"
                  fullWidth
                />
                <Input
                  label="Username"
                  value="admin@yourcompany.com"
                  fullWidth
                />
                <Input
                  label="API Key"
                  type="password"
                  value="••••••••••••••••"
                  fullWidth
                />
                <Button color="primary" css={{ mt: '$4' }}>
                  Test Connection
                </Button>
              </Flex>
            </Card>

            <Card css={{ p: '$8' }}>
              <Text h3 css={{ mb: '$6' }}>Sync Configuration</Text>
              <Flex direction="column" css={{ gap: '$4' }}>
                <Flex justify="between" align="center">
                  <Box>
                    <Text css={{ fontWeight: '$medium' }}>Auto Sync</Text>
                    <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                      Automatically sync data every 15 minutes
                    </Text>
                  </Box>
                  <Switch defaultSelected />
                </Flex>
                
                <Flex justify="between" align="center">
                  <Box>
                    <Text css={{ fontWeight: '$medium' }}>Real-time Inventory</Text>
                    <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                      Sync stock levels in real-time
                    </Text>
                  </Box>
                  <Switch defaultSelected />
                </Flex>
                
                <Flex justify="between" align="center">
                  <Box>
                    <Text css={{ fontWeight: '$medium' }}>Order Sync</Text>
                    <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                      Sync orders to Odoo automatically
                    </Text>
                  </Box>
                  <Switch defaultSelected />
                </Flex>
                
                <Flex justify="between" align="center">
                  <Box>
                    <Text css={{ fontWeight: '$medium' }}>Customer Sync</Text>
                    <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                      Sync customer data bidirectionally
                    </Text>
                  </Box>
                  <Switch />
                </Flex>

                <Box css={{ mt: '$4', p: '$4', background: '$warning2', borderRadius: '$md' }}>
                  <Text css={{ fontSize: '$sm', fontWeight: '$medium', mb: '$2', color: '$warning' }}>
                    Sync Frequency
                  </Text>
                  <Text css={{ fontSize: '$xs', color: '$accents7' }}>
                    Current setting: Every 15 minutes. You can adjust this in the advanced settings.
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Box>
        )}
      </Flex>
    </Box>
  );
}