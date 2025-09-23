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
                     title="Home"
                     icon={<HomeIcon />}
                     isActive={pathname === '/dashboard'}
                     href="/dashboard"
                  />
                  <SidebarMenu title="Main Menu">
                     <SidebarItem
                        isActive={pathname === '/dashboard/accounts'}
                        title="Accounts"
                        icon={<AccountsIcon />}
                        href="/dashboard/accounts"
                     />
                     <SidebarItem
                        isActive={pathname === '/dashboard/payments'}
                        title="Payments"
                        icon={<PaymentsIcon />}
                     />
                     <CollapseItems
                        icon={<BalanceIcon />}
                        items={['Banks Accounts', 'Credit Cards', 'Loans']}
                        title="Balances"
                     />

                     <SidebarItem
                        isActive={pathname === '/dashboard/customers'}
                        title="Customers"
                        icon={<CustomersIcon />}
                     />
                     <SidebarItem
                        isActive={pathname === '/dashboard/products'}
                        title="Products"
                        icon={<ProductsIcon />}
                     />
                     <SidebarItem
                        isActive={pathname === '/dashboard/reports'}
                        title="Reports"
                        icon={<ReportsIcon />}
                     />
                  </SidebarMenu>

                  <SidebarMenu title="General">
                     <SidebarItem
                        isActive={pathname === '/dashboard/developers'}
                        title="Developers"
                        icon={<DevIcon />}
                     />
                     <SidebarItem
                        isActive={pathname === '/dashboard/view'}
                        title="View Test Data"
                        icon={<ViewIcon />}
                     />
                     <SidebarItem
                        isActive={pathname === '/dashboard/settings'}
                        title="Settings"
                        icon={<SettingsIcon />}
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
