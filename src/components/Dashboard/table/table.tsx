"use client";
import {Table} from '@nextui-org/react';
import React from 'react';
import {Box} from '../styles/box';
import {columns, users} from './data';
import {RenderCell} from './render-cell';
import {useIsClient} from '../../../hooks/useIsClient';

export const TableWrapper = () => {
   const isClient = useIsClient();
   
   if (!isClient) {
      return (
         <Box
            css={{
               border: '1px solid $accents2',
               borderRadius: '$lg',
               boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
               p: '$8',
               textAlign: 'center',
               color: '$accents7'
            }}
         >
            Loading...
         </Box>
      );
   }

   return (
      <Box
         css={{
            '& .nextui-table-container': {
               boxShadow: 'none',
            },
            border: '1px solid $accents2',
            borderRadius: '$lg',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
         }}
      >
         <Table
            aria-label="Example table with custom cells"
            css={{
               height: 'auto',
               minWidth: '100%',
               boxShadow: 'none',
               width: '100%',
               px: '$6',
            }}
            selectionMode="multiple"
            suppressHydrationWarning={true}
         >
            <Table.Header columns={columns}>
               {(column) => (
                  <Table.Column
                     key={column.uid}
                     hideHeader={column.uid === 'actions'}
                     align={column.uid === 'actions' ? 'center' : 'start'}
                  >
                     {column.name}
                  </Table.Column>
               )}
            </Table.Header>
            <Table.Body items={users}>
               {(item) => (
                  <Table.Row>
                     {(columnKey) => (
                        <Table.Cell>
                           {RenderCell({user: item, columnKey: columnKey})}
                        </Table.Cell>
                     )}
                  </Table.Row>
               )}
            </Table.Body>
            <Table.Pagination
               shadow
               noMargin
               align="center"
               rowsPerPage={8}
               onPageChange={(page) => console.log({page})}
            />
         </Table>
      </Box>
   );
};
