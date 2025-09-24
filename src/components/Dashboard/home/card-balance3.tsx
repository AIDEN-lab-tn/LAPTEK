"use client";
import {Card, Text} from '@nextui-org/react';
import React from 'react';
import {StockIcon} from '../icons/stock-icon';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';

export const CardBalance3 = () => {
   return (
      <Card
         css={{
            mw: '375px',
            bg: '$green600',
            borderRadius: '$xl',
            px: '$6',
         }}
      >
         <Card.Body css={{py: '$10'}}>
            <Flex css={{gap: '$5'}}>
               <StockIcon />
               <Flex direction={'column'}>
                  <Text span css={{color: 'white'}}>
                     Inventory Status
                  </Text>
                  <Text span css={{color: 'white'}} size={'$xs'}>
                     2,847 Items
                  </Text>
               </Flex>
            </Flex>
            <Flex css={{gap: '$6', py: '$4'}} align={'center'}>
               <Text
                  span
                  size={'$xl'}
                  css={{color: 'white'}}
                  weight={'semibold'}
               >
                  $486K
               </Text>
               <Text span css={{color: '$green400'}} size={'$xs'}>
                  In Stock
               </Text>
            </Flex>
            <Flex css={{gap: '$12'}} align={'center'}>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{color: '$green400'}}
                     weight={'semibold'}
                  >
                     {'✅'}
                  </Text>
                  <Text span size={'$xs'} css={{color: '$white'}}>
                     2,630 Available
                  </Text>
               </Box>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{color: '$yellow400'}}
                     weight={'semibold'}
                  >
                     {'⚠️'}
                  </Text>
                  <Text span size={'$xs'} css={{color: '$white'}}>
                     185 Low Stock
                  </Text>
               </Box>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{color: '$red400'}}
                     weight={'semibold'}
                  >
                     {'❌'}
                  </Text>
                  <Text span size={'$xs'} css={{color: '$white'}}>
                     32 Out
                  </Text>
               </Box>
            </Flex>
         </Card.Body>
      </Card>
   );
};
