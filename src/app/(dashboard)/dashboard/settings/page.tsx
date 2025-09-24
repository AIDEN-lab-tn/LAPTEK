"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Input,
  Text,
  Dropdown,
  Switch,
  Textarea,
  Spacer,
} from "@nextui-org/react";
import {Box} from '../../../../components/Dashboard/styles/box';
import {Flex} from '../../../../components/Dashboard/styles/flex';
import {SettingsIcon} from '../../../../components/Dashboard/icons/sidebar/settings-icon';
import {InfoIcon} from '../../../../components/Dashboard/icons/accounts/info-icon';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"store" | "shipping" | "users" | "notifications">("store");
  const [settings, setSettings] = useState({
    storeName: "Laptek Gaming Store",
    storeEmail: "admin@laptek.com",
    storePhone: "+1 (555) 123-4567",
    currency: "USD",
    timezone: "America/New_York",
    taxRate: "8.5",
    address: "123 Tech Street, Gaming City, GC 12345",
    enableNotifications: true,
    enableAnalytics: true,
    enableInventoryAlerts: true,
    lowStockThreshold: "10",
  });

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
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
              Store Settings
            </Text>
          </Box>
          <Text css={{ color: '$accents7', mt: '$2' }}>
            Configure your store preferences and system settings
          </Text>
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
              Settings Dashboard
            </Text>
            <Button auto css={{ 
              background: 'rgba(255, 255, 255, 0.2)', 
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)'
              }
            }}>
              Save Changes
            </Button>
          </Flex>
          
          <Flex css={{ gap: '$3', flexWrap: 'wrap' }}>
            <Button 
              auto 
              flat
              css={{
                background: activeTab === "store" ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}
              onPress={() => setActiveTab("store")}
            >
              Store Settings
            </Button>
            <Button 
              auto 
              flat
              css={{
                background: activeTab === "shipping" ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}
              onPress={() => setActiveTab("shipping")}
            >
              Shipping
            </Button>
            <Button 
              auto 
              flat
              css={{
                background: activeTab === "users" ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}
              onPress={() => setActiveTab("users")}
            >
              Users & Roles
            </Button>
            <Button 
              auto 
              flat
              css={{
                background: activeTab === "notifications" ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)'
                }
              }}
              onPress={() => setActiveTab("notifications")}
            >
              Notifications
            </Button>
          </Flex>
        </Card>

        {/* Store Settings Tab */}
        {activeTab === "store" && (
          <Box css={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '$8' }}>
            <Card css={{ p: '$8' }}>
              <Text h3 css={{ mb: '$6' }}>Basic Information</Text>
              <Flex direction="column" css={{ gap: '$4' }}>
                <Input
                  label="Store Name"
                  value={settings.storeName}
                  onChange={(e) => handleSettingChange('storeName', e.target.value)}
                  fullWidth
                />
                <Input
                  label="Store Email"
                  type="email"
                  value={settings.storeEmail}
                  onChange={(e) => handleSettingChange('storeEmail', e.target.value)}
                  fullWidth
                />
                <Input
                  label="Phone Number"
                  value={settings.storePhone}
                  onChange={(e) => handleSettingChange('storePhone', e.target.value)}
                  fullWidth
                />
                <Textarea
                  label="Store Address"
                  value={settings.address}
                  onChange={(e) => handleSettingChange('address', e.target.value)}
                  fullWidth
                />
              </Flex>
            </Card>

            <Card css={{ p: '$8' }}>
              <Text h3 css={{ mb: '$6' }}>Regional Settings</Text>
              <Flex direction="column" css={{ gap: '$4' }}>
                <Dropdown>
                  <Dropdown.Button bordered css={{ width: '100%' }}>
                    Currency: {settings.currency}
                  </Dropdown.Button>
                  <Dropdown.Menu 
                    aria-label="Currency"
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as string;
                      handleSettingChange('currency', selected);
                    }}
                  >
                    <Dropdown.Item key="USD">USD - US Dollar</Dropdown.Item>
                    <Dropdown.Item key="EUR">EUR - Euro</Dropdown.Item>
                    <Dropdown.Item key="GBP">GBP - British Pound</Dropdown.Item>
                    <Dropdown.Item key="CAD">CAD - Canadian Dollar</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                  <Dropdown.Button bordered css={{ width: '100%' }}>
                    Timezone: {settings.timezone}
                  </Dropdown.Button>
                  <Dropdown.Menu 
                    aria-label="Timezone"
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as string;
                      handleSettingChange('timezone', selected);
                    }}
                  >
                    <Dropdown.Item key="America/New_York">Eastern Time</Dropdown.Item>
                    <Dropdown.Item key="America/Chicago">Central Time</Dropdown.Item>
                    <Dropdown.Item key="America/Denver">Mountain Time</Dropdown.Item>
                    <Dropdown.Item key="America/Los_Angeles">Pacific Time</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Input
                  label="Tax Rate (%)"
                  value={settings.taxRate}
                  onChange={(e) => handleSettingChange('taxRate', e.target.value)}
                  fullWidth
                />
              </Flex>
            </Card>
          </Box>
        )}

        {/* Shipping Tab */}
        {activeTab === "shipping" && (
          <Box css={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '$8' }}>
            <Card css={{ p: '$8' }}>
              <Text h3 css={{ mb: '$6' }}>Shipping Zones</Text>
              <Box css={{ mb: '$4' }}>
                <Text css={{ fontSize: '$sm', color: '$accents7', mb: '$2' }}>
                  Configure shipping rates by region
                </Text>
              </Box>
              <Flex direction="column" css={{ gap: '$4' }}>
                <Card css={{ p: '$4', background: '$accents1' }}>
                  <Flex justify="between" align="center">
                    <Box>
                      <Text css={{ fontWeight: '$medium' }}>Domestic (US)</Text>
                      <Text css={{ fontSize: '$sm', color: '$accents7' }}>Free shipping over $500</Text>
                    </Box>
                    <Button size="sm" light>Edit</Button>
                  </Flex>
                </Card>
                <Card css={{ p: '$4', background: '$accents1' }}>
                  <Flex justify="between" align="center">
                    <Box>
                      <Text css={{ fontWeight: '$medium' }}>International</Text>
                      <Text css={{ fontSize: '$sm', color: '$accents7' }}>Starting at $25</Text>
                    </Box>
                    <Button size="sm" light>Edit</Button>
                  </Flex>
                </Card>
                <Button bordered fullWidth>Add Shipping Zone</Button>
              </Flex>
            </Card>

            <Card css={{ p: '$8' }}>
              <Text h3 css={{ mb: '$6' }}>Shipping Providers</Text>
              <Flex direction="column" css={{ gap: '$4' }}>
                <Card css={{ p: '$4', background: '$accents1' }}>
                  <Flex justify="between" align="center">
                    <Box>
                      <Text css={{ fontWeight: '$medium' }}>FedEx</Text>
                      <Text css={{ fontSize: '$sm', color: '$success' }}>Active</Text>
                    </Box>
                    <Switch defaultSelected size="sm" />
                  </Flex>
                </Card>
                <Card css={{ p: '$4', background: '$accents1' }}>
                  <Flex justify="between" align="center">
                    <Box>
                      <Text css={{ fontWeight: '$medium' }}>UPS</Text>
                      <Text css={{ fontSize: '$sm', color: '$success' }}>Active</Text>
                    </Box>
                    <Switch defaultSelected size="sm" />
                  </Flex>
                </Card>
                <Card css={{ p: '$4', background: '$accents1' }}>
                  <Flex justify="between" align="center">
                    <Box>
                      <Text css={{ fontWeight: '$medium' }}>DHL</Text>
                      <Text css={{ fontSize: '$sm', color: '$accents7' }}>Inactive</Text>
                    </Box>
                    <Switch size="sm" />
                  </Flex>
                </Card>
              </Flex>
            </Card>
          </Box>
        )}

        {/* Users & Roles Tab */}
        {activeTab === "users" && (
          <Box>
            <Flex justify="between" align="center" css={{ mb: '$4' }}>
              <Text h3 css={{ m: 0, fontSize: '$lg', fontWeight: '$semibold' }}>User Management</Text>
              <Button color="primary">Invite User</Button>
            </Flex>
            
            <Box css={{ display: 'flex', flexDirection: 'column', gap: '$3' }}>
              {/* Admin User Card */}
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
                  {/* User Info */}
                  <Flex align="center" css={{ gap: '$3', flex: '2' }}>
                    <Box css={{
                      p: '$3',
                      borderRadius: '$lg',
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                      color: 'white'
                    }}>
                      <SettingsIcon />
                    </Box>
                    <Box>
                      <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>Admin User</Text>
                      <Text css={{ color: '$accents7', fontSize: '$xs' }}>admin@laptek.com</Text>
                    </Box>
                  </Flex>
                  
                  {/* Role */}
                  <Flex direction="column" align="end" css={{ flex: '1' }}>
                    <Text css={{ fontWeight: '$bold', fontSize: '$sm', color: '$error' }}>Super Admin</Text>
                    <Text css={{ color: '$accents7', fontSize: '$xs' }}>Role</Text>
                  </Flex>
                  
                  {/* Status */}
                  <Flex direction="column" align="end" css={{ flex: '1' }}>
                    <Text css={{ color: '$success', fontWeight: '$semibold', fontSize: '$sm' }}>Active</Text>
                    <Text css={{ color: '$accents7', fontSize: '$xs' }}>Status</Text>
                  </Flex>
                  
                  {/* Last Active */}
                  <Flex direction="column" align="end" css={{ flex: '1' }}>
                    <Text css={{ fontWeight: '$semibold', fontSize: '$sm' }}>2 minutes ago</Text>
                    <Text css={{ color: '$accents7', fontSize: '$xs' }}>Last Active</Text>
                  </Flex>
                  
                  {/* Actions */}
                  <Flex align="center" css={{ flex: '0.5' }}>
                    <Button size="sm" light>Edit</Button>
                  </Flex>
                </Flex>
              </Card>

              {/* Manager User Card */}
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
                  {/* User Info */}
                  <Flex align="center" css={{ gap: '$3', flex: '2' }}>
                    <Box css={{
                      p: '$3',
                      borderRadius: '$lg',
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      color: 'white'
                    }}>
                      <SettingsIcon />
                    </Box>
                    <Box>
                      <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>John Manager</Text>
                      <Text css={{ color: '$accents7', fontSize: '$xs' }}>john@laptek.com</Text>
                    </Box>
                  </Flex>
                  
                  {/* Role */}
                  <Flex direction="column" align="end" css={{ flex: '1' }}>
                    <Text css={{ fontWeight: '$bold', fontSize: '$sm', color: '$warning' }}>Manager</Text>
                    <Text css={{ color: '$accents7', fontSize: '$xs' }}>Role</Text>
                  </Flex>
                  
                  {/* Status */}
                  <Flex direction="column" align="end" css={{ flex: '1' }}>
                    <Text css={{ color: '$success', fontWeight: '$semibold', fontSize: '$sm' }}>Active</Text>
                    <Text css={{ color: '$accents7', fontSize: '$xs' }}>Status</Text>
                  </Flex>
                  
                  {/* Last Active */}
                  <Flex direction="column" align="end" css={{ flex: '1' }}>
                    <Text css={{ fontWeight: '$semibold', fontSize: '$sm' }}>1 hour ago</Text>
                    <Text css={{ color: '$accents7', fontSize: '$xs' }}>Last Active</Text>
                  </Flex>
                  
                  {/* Actions */}
                  <Flex align="center" css={{ flex: '0.5' }}>
                    <Button size="sm" light>Edit</Button>
                  </Flex>
                </Flex>
              </Card>

              {/* Support User Card */}
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
                  {/* User Info */}
                  <Flex align="center" css={{ gap: '$3', flex: '2' }}>
                    <Box css={{
                      p: '$3',
                      borderRadius: '$lg',
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      color: 'white'
                    }}>
                      <SettingsIcon />
                    </Box>
                    <Box>
                      <Text css={{ fontWeight: '$bold', fontSize: '$sm' }}>Jane Support</Text>
                      <Text css={{ color: '$accents7', fontSize: '$xs' }}>jane@laptek.com</Text>
                    </Box>
                  </Flex>
                  
                  {/* Role */}
                  <Flex direction="column" align="end" css={{ flex: '1' }}>
                    <Text css={{ fontWeight: '$bold', fontSize: '$sm', color: '$primary' }}>Support</Text>
                    <Text css={{ color: '$accents7', fontSize: '$xs' }}>Role</Text>
                  </Flex>
                  
                  {/* Status */}
                  <Flex direction="column" align="end" css={{ flex: '1' }}>
                    <Text css={{ color: '$success', fontWeight: '$semibold', fontSize: '$sm' }}>Active</Text>
                    <Text css={{ color: '$accents7', fontSize: '$xs' }}>Status</Text>
                  </Flex>
                  
                  {/* Last Active */}
                  <Flex direction="column" align="end" css={{ flex: '1' }}>
                    <Text css={{ fontWeight: '$semibold', fontSize: '$sm' }}>Yesterday</Text>
                    <Text css={{ color: '$accents7', fontSize: '$xs' }}>Last Active</Text>
                  </Flex>
                  
                  {/* Actions */}
                  <Flex align="center" css={{ flex: '0.5' }}>
                    <Button size="sm" light>Edit</Button>
                  </Flex>
                </Flex>
              </Card>
            </Box>
          </Box>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <Box css={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '$8' }}>
            <Card css={{ p: '$8' }}>
              <Text h3 css={{ mb: '$6' }}>Email Notifications</Text>
              <Flex direction="column" css={{ gap: '$4' }}>
                <Flex justify="between" align="center">
                  <Box>
                    <Text css={{ fontWeight: '$medium' }}>Order Notifications</Text>
                    <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                      Receive emails for new orders
                    </Text>
                  </Box>
                  <Switch defaultSelected />
                </Flex>
                <Flex justify="between" align="center">
                  <Box>
                    <Text css={{ fontWeight: '$medium' }}>Low Stock Alerts</Text>
                    <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                      Alert when inventory is low
                    </Text>
                  </Box>
                  <Switch 
                    isSelected={settings.enableInventoryAlerts} 
                    onChange={(checked) => handleSettingChange('enableInventoryAlerts', checked)}
                  />
                </Flex>
                <Flex justify="between" align="center">
                  <Box>
                    <Text css={{ fontWeight: '$medium' }}>Payment Alerts</Text>
                    <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                      Notifications for payment issues
                    </Text>
                  </Box>
                  <Switch defaultSelected />
                </Flex>
                <Box>
                  <Input
                    label="Low Stock Threshold"
                    value={settings.lowStockThreshold}
                    onChange={(e) => handleSettingChange('lowStockThreshold', e.target.value)}
                    helperText="Alert when stock falls below this number"
                  />
                </Box>
              </Flex>
            </Card>

            <Card css={{ p: '$8' }}>
              <Text h3 css={{ mb: '$6' }}>System Settings</Text>
              <Flex direction="column" css={{ gap: '$4' }}>
                <Flex justify="between" align="center">
                  <Box>
                    <Text css={{ fontWeight: '$medium' }}>Analytics Tracking</Text>
                    <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                      Enable Google Analytics
                    </Text>
                  </Box>
                  <Switch 
                    isSelected={settings.enableAnalytics} 
                    onChange={(checked) => handleSettingChange('enableAnalytics', checked)}
                  />
                </Flex>
                <Flex justify="between" align="center">
                  <Box>
                    <Text css={{ fontWeight: '$medium' }}>Push Notifications</Text>
                    <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                      Browser push notifications
                    </Text>
                  </Box>
                  <Switch 
                    isSelected={settings.enableNotifications} 
                    onChange={(checked) => handleSettingChange('enableNotifications', checked)}
                  />
                </Flex>
                <Flex justify="between" align="center">
                  <Box>
                    <Text css={{ fontWeight: '$medium' }}>Maintenance Mode</Text>
                    <Text css={{ fontSize: '$sm', color: '$accents7' }}>
                      Show maintenance page to visitors
                    </Text>
                  </Box>
                  <Switch />
                </Flex>
              </Flex>
            </Card>
          </Box>
        )}
      </Flex>
    </Box>
  );
}