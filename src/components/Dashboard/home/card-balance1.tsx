"use client";
import {Card, Text} from '@nextui-org/react';
import React from 'react';
import {SalesIcon} from '../icons/sales-icon';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';

export const CardBalance1 = () => {
   return (
      <Card
         css={{
            mw: '375px',
            bg: '$blue600',
            borderRadius: '$xl',
            px: '$6',
         }}
      >
         <Card.Body css={{py: '$10'}}>
            <Flex css={{gap: '$5'}}>
               <SalesIcon />
               <Flex direction={'column'}>
                  <Text span css={{color: 'white'}}>
                     Today's Sales
                  </Text>
                  <Text span css={{color: 'white'}} size={'$xs'}>
                     142 Orders
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
                  $28,540
               </Text>
               <Text span css={{color: '$green600'}} size={'$xs'}>
                  + 12.8%
               </Text>
            </Flex>
            <Flex css={{gap: '$12'}} align={'center'}>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{color: '$green600'}}
                     weight={'semibold'}
                  >
                     {'💻'}
                  </Text>
                  <Text span size={'$xs'} css={{color: '$white'}}>
                     85 Laptops
                  </Text>
               </Box>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{color: '$blue400'}}
                     weight={'semibold'}
                  >
                     {'🖥️'}
                  </Text>
                  <Text span size={'$xs'} css={{color: '$white'}}>
                     42 Desktops
                  </Text>
               </Box>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{color: '$yellow600'}}
                     weight={'semibold'}
                  >
                     {'⚙️'}
                  </Text>
                  <Text span size={'$xs'} css={{color: '$white'}}>
                     15 Parts
                  </Text>
               </Box>
            </Flex>
         </Card.Body>
      </Card>
   );
};
