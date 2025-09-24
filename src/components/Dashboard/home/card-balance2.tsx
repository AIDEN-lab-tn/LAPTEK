"use client";
import {Card, Text} from '@nextui-org/react';
import React from 'react';
import {OrderStatusIcon} from '../icons/order-status-icon';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';

export const CardBalance2 = () => {
   return (
      <Card
         css={{
            mw: '375px',
            bg: '$accents0',
            borderRadius: '$xl',
            px: '$6',
         }}
      >
         <Card.Body css={{py: '$10'}}>
            <Flex css={{gap: '$5'}}>
               <OrderStatusIcon />
               <Flex direction={'column'}>
                  <Text span css={{color: ''}}>
                     Pending Orders
                  </Text>
                  <Text span size={'$xs'}>
                     24 Processing
                  </Text>
               </Flex>
            </Flex>
            <Flex css={{gap: '$6', py: '$4'}} align={'center'}>
               <Text span size={'$xl'} weight={'semibold'}>
                  67
               </Text>
               <Text span css={{color: '$orange600'}} size={'$xs'}>
                  + 8 new
               </Text>
            </Flex>
            <Flex css={{gap: '$12'}} align={'center'}>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{color: '$blue600'}}
                     weight={'semibold'}
                  >
                     {'📦'}
                  </Text>
                  <Text span size={'$xs'}>
                     24 Pending
                  </Text>
               </Box>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{color: '$yellow600'}}
                     weight={'semibold'}
                  >
                     {'🚚'}
                  </Text>
                  <Text span size={'$xs'}>
                     18 Shipped
                  </Text>
               </Box>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{color: '$green600'}}
                     weight={'semibold'}
                  >
                     {'✅'}
                  </Text>
                  <Text span size={'$xs'}>
                     25 Delivered
                  </Text>
               </Box>
            </Flex>
         </Card.Body>
      </Card>
   );
};
