import React, {useState} from 'react';
import {Box} from '../styles/box';
import {Sidebar} from './sidebar.styles';
import {Avatar, Tooltip} from '@nextui-org/react';
import {Flex} from '../styles/flex';
import {CompaniesDropdown} from './companies-dropdown';
import {HomeIcon} from '../icons/sidebar/home-icon';
import {PaymentsIcon} from '../icons/sidebar/payments-icon';
import {BalanceIcon} from '../icons/sidebar/balance-icon';
import {AccountsIcon} from '../icons/sidebar/accounts-icon';
import {CustomersIcon} from '../icons/sidebar/customers-icon';
import {ProductsIcon} from '../icons/sidebar/products-icon';
import {ReportsIcon} from '../icons/sidebar/reports-icon';
import {DevIcon} from '../icons/sidebar/dev-icon';
import {ViewIcon} from '../icons/sidebar/view-icon';
import {SettingsIcon} from '../icons/sidebar/settings-icon';
import {OrdersIcon} from '../icons/sidebar/orders-icon';
import {InventoryIcon} from '../icons/sidebar/inventory-icon';
import {MarketingIcon} from '../icons/sidebar/marketing-icon';
import {SupportIcon} from '../icons/sidebar/support-icon';
import {AnalyticsIcon} from '../icons/sidebar/analytics-icon';
import {MessageIcon} from '../icons/sidebar/message-icon';
import {OdooIcon} from '../icons/sidebar/odoo-icon';
import {CategoriesIcon} from '../icons/sidebar/categories-icon';
import {CollapseItems} from './collapse-items';
import {SidebarItem} from './sidebar-item';
import {SidebarMenu} from './sidebar-menu';
import {FilterIcon} from '../icons/sidebar/filter-icon';
import {useSidebarContext} from '../layout/layout-context';
import {ChangeLogIcon} from '../icons/sidebar/changelog-icon';
import {useRouter, usePathname} from 'next/navigation';

export const SidebarWrapper = () => {
   const router = useRouter();
   const pathname = usePathname();
   const {collapsed, setCollapsed} = useSidebarContext();

   return (
      <Box
         as="aside"
         css={{
            height: '100vh',
            zIndex: 202,
            position: 'sticky',
            top: '0',
         }}
      >
         {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}

         <Sidebar collapsed={collapsed}>
            <Sidebar.Header>
               <CompaniesDropdown />
            </Sidebar.Header>
            <Flex
               direction={'column'}
               justify={'between'}
               css={{height: '100%'}}
            >
               <Sidebar.Body className="body sidebar">
                  <SidebarItem
                     title="Dashboard"
                     icon={<HomeIcon />}
                     isActive={pathname === '/dashboard'}
                     href="/dashboard"
                  />
                  <SidebarMenu title="Store Management">
                     <SidebarItem
                        isActive={pathname === '/dashboard/products'}
                        title="Products"
                        icon={<ProductsIcon />}
                        href="/dashboard/products"
                     />
                     <SidebarItem
                        isActive={pathname === '/dashboard/orders'}
                        title="Orders"
                        icon={<OrdersIcon />}
                        href="/dashboard/orders"
                     />
                     <SidebarItem
                        isActive={pathname === '/dashboard/inventory'}
                        title="Inventory"
                        icon={<InventoryIcon />}
                        href="/dashboard/inventory"
                     />
                     <SidebarItem
                        isActive={pathname === '/dashboard/customers'}
                        title="Customers"
                        icon={<CustomersIcon />}
                        href="/dashboard/customers"
                     />
                     <SidebarItem
                        isActive={pathname === '/dashboard/payments'}
                        title="Payments"
                        icon={<PaymentsIcon />}
                        href="/dashboard/payments"
                     />
                  </SidebarMenu>

                  <SidebarMenu title="Analytics & Marketing">
                     <SidebarItem
                        isActive={pathname === '/dashboard/reports'}
                        title="Reports & Analytics"
                        icon={<ReportsIcon />}
                        href="/dashboard/reports"
                     />
                     <SidebarItem
                        isActive={pathname === '/dashboard/analytics'}
                        title="Advanced Analytics"
                        icon={<AnalyticsIcon />}
                        href="/dashboard/analytics"
                     />
                     <SidebarItem
                        isActive={pathname === '/dashboard/marketing'}
                        title="Marketing"
                        icon={<MarketingIcon />}
                        href="/dashboard/marketing"
                     />
                  </SidebarMenu>

                  <SidebarMenu title="Support & Configuration">
                     <SidebarItem
                        isActive={pathname === '/dashboard/chat-histories'}
                        title="AI Chat Histories"
                        icon={<MessageIcon />}
                        href="/dashboard/chat-histories"
                     />
                     <SidebarItem
                        isActive={pathname === '/dashboard/support'}
                        title="Support"
                        icon={<SupportIcon />}
                        href="/dashboard/support"
                     />
                     <SidebarItem
                        isActive={pathname === '/dashboard/settings'}
                        title="Settings"
                        icon={<SettingsIcon />}
                        href="/dashboard/settings"
                     />
                     <SidebarItem
                        isActive={pathname === '/dashboard/integrations'}
                        title="Integrations"
                        icon={<DevIcon />}
                        href="/dashboard/integrations"
                     />
                     <SidebarItem
                        isActive={pathname === '/dashboard/odoo-integration'}
                        title="Odoo Integration"
                        icon={<OdooIcon />}
                        href="/dashboard/odoo-integration"
                     />
                  </SidebarMenu>

                  <SidebarMenu title="Updates">
                     <SidebarItem
                        isActive={pathname === '/dashboard/changelog'}
                        title="Changelog"
                        icon={<ChangeLogIcon />}
                     />
                  </SidebarMenu>
               </Sidebar.Body>
               <Sidebar.Footer>
                  <Tooltip 
                     content={'Settings'} 
                     color="primary"
                     css={{}}
                     contentColor="white"
                  >
                     <SettingsIcon />
                  </Tooltip>
                  <Tooltip 
                     content={'Adjustments'} 
                     color="primary"
                     css={{}}
                     contentColor="white"
                  >
                     <FilterIcon />
                  </Tooltip>
                  <Tooltip 
                     content={'Profile'} 
                     color="primary"
                     css={{}}
                     contentColor="white"
                  >
                     <Avatar
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        size={'sm'}
                     />
                  </Tooltip>
               </Sidebar.Footer>
            </Flex>
         </Sidebar>
      </Box>
   );
};
