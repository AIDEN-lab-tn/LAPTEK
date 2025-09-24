"use client";
import React from 'react';
import {Text, Link} from '@nextui-org/react';
import {Box} from '../styles/box';
import dynamic from 'next/dynamic';
import {Flex} from '../styles/flex';
import {TableWrapper} from '../table/table';
import NextLink from 'next/link';
import {CardBalance1} from './card-balance1';
import {CardBalance2} from './card-balance2';
import {CardBalance3} from './card-balance3';
import {CardAgents} from './card-agents';
import {CardTransactions} from './card-transactions';

const Chart = dynamic(
   () => import('../charts/steam').then((mod) => mod.Steam),
   {
      ssr: false,
   }
);

export const Content = () => (
   <Box css={{overflow: 'hidden', height: '100%'}}>
      <Flex
         css={{
            'gap': '$8',
            'pt': '$5',
            'height': 'fit-content',
            'flexWrap': 'wrap',
            '@lg': {
               flexWrap: 'nowrap',
            },
            '@sm': {
               pt: '$10',
            },
         }}
         justify={'center'}
      >
         <Flex
            css={{
               'px': '$12',
               'mt': '$8',
               '@xsMax': {px: '$10'},
               'gap': '$12',
            }}
            direction={'column'}
         >
            {/* Card Section Top */}
            <Box>
               <Text
                  h3
                  css={{
                     'textAlign': 'center',
                     '@sm': {
                        textAlign: 'inherit',
                     },
                  }}
               >
                  Store Overview
               </Text>
               <Flex
                  css={{
                     'gap': '$10',
                     'flexWrap': 'wrap',
                     'justifyContent': 'center',
                     '@sm': {
                        flexWrap: 'nowrap',
                     },
                  }}
                  direction={'row'}
               >
                  <CardBalance1 />
                  <CardBalance2 />
                  <CardBalance3 />
               </Flex>
            </Box>

            {/* Chart */}
            <Box>
               <Text
                  h3
                  css={{
                     'textAlign': 'center',
                     '@lg': {
                        textAlign: 'inherit',
                     },
                  }}
               >
                  Sales & Revenue Over Time
               </Text>
               <Box
                  css={{
                     width: '100%',
                     backgroundColor: 'white',
                     border: '1px solid $accents2',
                     borderRadius: '$lg',
                     boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                     px: '$10',
                     py: '$10',
                  }}
               >
                  <Chart />
               </Box>
            </Box>
         </Flex>

         {/* Left Section */}
         <Box
            css={{
               'px': '$12',
               'mt': '$8',
               'mb': '$12',
               'height': 'fit-content',
               '@xsMax': {px: '$10'},
               'gap': '$6',
               'overflow': 'hidden',
            }}
         >
            <Text
               h3
               css={{
                  'textAlign': 'center',
                  '@lg': {
                     textAlign: 'inherit',
                  },
               }}
            >
               Quick Insights
            </Text>
            <Flex
               direction={'column'}
               justify={'center'}
               css={{
                  'gap': '$8',
                  'flexDirection': 'row',
                  'flexWrap': 'wrap',
                  '@sm': {
                     flexWrap: 'nowrap',
                  },
                  '@lg': {
                     flexWrap: 'nowrap',
                     flexDirection: 'column',
                  },
               }}
            >
               <CardAgents />
               <CardTransactions />
            </Flex>
         </Box>
      </Flex>

      {/* Table Latest Users */}
      <Flex
         direction={'column'}
         justify={'center'}
         css={{
            'width': '100%',
            'px': '$6',
            'mt': '$0',
            '@xsMax': {px: '$4'},
         }}
      >
         <Flex justify={'between'} wrap={'wrap'}>
            <Text
               h3
               css={{
                  'textAlign': 'center',
                  '@lg': {
                     textAlign: 'inherit',
                  },
               }}
            >
               Recent Orders
            </Text>
            <NextLink 
               href="/dashboard/orders"
               style={{
                  display: 'block',
                  color: 'var(--nextui-colors-primary)',
                  textAlign: 'center',
                  textDecoration: 'none'
               }}
            >
               View All Orders
            </NextLink>
         </Flex>
         <TableWrapper />
      </Flex>
   </Box>
);
