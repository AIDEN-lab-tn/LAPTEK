"use client";
import {Input, Link, Navbar, Text} from '@nextui-org/react';
import React from 'react';
import {FeedbackIcon} from '../icons/navbar/feedback-icon';
import {GithubIcon} from '../icons/navbar/github-icon';
import {SupportIcon} from '../icons/navbar/support-icon';
import {SearchIcon} from '../icons/searchicon';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import {BurguerButton} from './burguer-button';
import {NotificationsDropdown} from './notifications-dropdown';
import {UserDropdown} from './user-dropdown';

interface Props {
   children: React.ReactNode;
}

export const NavbarWrapper = ({children}: Props) => {
   const collapseItems = [
      'Profile',
      'Dashboard',
      'Activity',
      'Analytics',
      'System',
      'Deployments',
      'My Settings',
      'Team Settings',
      'Help & Feedback',
      'Log Out',
   ];
   return (
      <Box
         css={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            overflowY: 'auto',
            overflowX: 'hidden',
         }}
      >
         <Navbar>
            <Navbar.Content showIn="md">
               <BurguerButton />
            </Navbar.Content>
            <Navbar.Content
               hideIn={'md'}
               css={{
                  width: '100%',
               }}
            >
               <Input
                  clearable
                  contentLeft={
                     <SearchIcon
                        fill="var(--nextui-colors-accents6)"
                        size={16}
                     />
                  }
                  contentLeftStyling={false}
                  css={{
                     'w': '97%',
                     'transition': 'all 0.2s ease',
                     '@xsMax': {
                        w: '100%',
                        // mw: '300px',
                     },
                     '& .nextui-input-content--left': {
                        h: '100%',
                        ml: '$4',
                        dflex: 'center',
                     },
                     '& .nextui-input-wrapper': {
                        backgroundColor: '#ffffff !important',
                     },
                     '& .nextui-input': {
                        backgroundColor: '#ffffff !important',
                        pl: '$3',
                     },
                     backgroundColor: '#ffffff',
                     background: '#ffffff',
                     border: '1px solid $accents4',
                     borderRadius: '$md',
                     py: '$4',
                     boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                     '&:focus': {
                        borderColor: '$primary',
                        boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                     },
                  }}
                  placeholder="Search..."
               />
            </Navbar.Content>
            <Navbar.Content>
               <Navbar.Content hideIn={'md'}>
                  <Flex align={'center'} css={{gap: '$4'}}>
                     <FeedbackIcon />
                     <Text span>Feedback?</Text>
                  </Flex>
               </Navbar.Content>

               <Navbar.Content>
                  <NotificationsDropdown />
               </Navbar.Content>

               <Navbar.Content hideIn={'md'}>
                  <SupportIcon />
               </Navbar.Content>
               <Navbar.Content>
                  <Link
                     href="https://github.com/"
                     target={'_blank'}
                  >
                     <GithubIcon />
                  </Link>
               </Navbar.Content>
               <Navbar.Content>
                  <UserDropdown />
               </Navbar.Content>
            </Navbar.Content>

            <Navbar.Collapse>
               {collapseItems.map((item, index) => (
                  <Navbar.CollapseItem
                     key={item}
                     activeColor="secondary"
                     css={{
                        color:
                           index === collapseItems.length - 1 ? '$error' : '',
                     }}
                     isActive={index === 2}
                  >
                     <Link
                        color="inherit"
                        css={{
                           minWidth: '100%',
                        }}
                        href="#"
                     >
                        {item}
                     </Link>
                  </Navbar.CollapseItem>
               ))}
            </Navbar.Collapse>
         </Navbar>
         {children}
      </Box>
   );
};
