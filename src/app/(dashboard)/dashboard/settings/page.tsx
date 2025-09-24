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
              Store Settings
            </Text>
            <Text css={{ color: '$accents8', mt: '$2' }}>
              Configure your store preferences and system settings
            </Text>
          </Box>
          <Button auto color="primary" css={{ fontWeight: '$medium' }}>
            Save Changes
          </Button>
        </Flex>

        {/* Tab Navigation */}
        <Card css={{ p: '$4', mb: '$8' }}>
          <Flex css={{ gap: '$4' }}>
            <Button 
              auto 
              color={activeTab === "store" ? "primary" : "default"}
              variant={activeTab === "store" ? "solid" : "light"}
              onPress={() => setActiveTab("store")}
            >
              Store Settings
            </Button>
            <Button 
              auto 
              color={activeTab === "shipping" ? "primary" : "default"}
              variant={activeTab === "shipping" ? "solid" : "light"}
              onPress={() => setActiveTab("shipping")}
            >
              Shipping
            </Button>
            <Button 
              auto 
              color={activeTab === "users" ? "primary" : "default"}
              variant={activeTab === "users" ? "solid" : "light"}
              onPress={() => setActiveTab("users")}
            >
              Users & Roles
            </Button>
            <Button 
              auto 
              color={activeTab === "notifications" ? "primary" : "default"}
              variant={activeTab === "notifications" ? "solid" : "light"}
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
          <Card css={{ p: 0 }}>
            <Card.Header>
              <Flex justify="between" align="center">
                <Text h3 css={{ m: 0 }}>User Management</Text>
                <Button color="primary">Invite User</Button>
              </Flex>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
              <Box css={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--nextui-colors-border)' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>USER</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>ROLE</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>STATUS</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>LAST ACTIVE</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--nextui-colors-border)' }}>
                      <td style={{ padding: '12px' }}>
                        <Box>
                          <Text css={{ fontWeight: '$medium' }}>Admin User</Text>
                          <Text css={{ fontSize: '$sm', color: '$accents7' }}>admin@laptek.com</Text>
                        </Box>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Text css={{ fontWeight: '$medium', color: '$error' }}>Super Admin</Text>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Text css={{ color: '$success' }}>Active</Text>
                      </td>
                      <td style={{ padding: '12px' }}>2 minutes ago</td>
                      <td style={{ padding: '12px' }}>
                        <Button size="sm" light>Edit</Button>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nextui-colors-border)' }}>
                      <td style={{ padding: '12px' }}>
                        <Box>
                          <Text css={{ fontWeight: '$medium' }}>John Manager</Text>
                          <Text css={{ fontSize: '$sm', color: '$accents7' }}>john@laptek.com</Text>
                        </Box>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Text css={{ fontWeight: '$medium', color: '$warning' }}>Manager</Text>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Text css={{ color: '$success' }}>Active</Text>
                      </td>
                      <td style={{ padding: '12px' }}>1 hour ago</td>
                      <td style={{ padding: '12px' }}>
                        <Button size="sm" light>Edit</Button>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px' }}>
                        <Box>
                          <Text css={{ fontWeight: '$medium' }}>Jane Support</Text>
                          <Text css={{ fontSize: '$sm', color: '$accents7' }}>jane@laptek.com</Text>
                        </Box>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Text css={{ fontWeight: '$medium', color: '$primary' }}>Support</Text>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Text css={{ color: '$success' }}>Active</Text>
                      </td>
                      <td style={{ padding: '12px' }}>Yesterday</td>
                      <td style={{ padding: '12px' }}>
                        <Button size="sm" light>Edit</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
            </Card.Body>
          </Card>
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