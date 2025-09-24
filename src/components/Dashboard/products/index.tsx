"use client";
import {Button, Input, Text, Dropdown, Badge} from '@nextui-org/react';
import Link from 'next/link';
import React, { useState } from 'react';
import {Breadcrumbs, Crumb, CrumbLink} from '../breadcrumb/breadcrumb.styled';
import {DotsIcon} from '../icons/accounts/dots-icon';
import {ExportIcon} from '../icons/accounts/export-icon';
import {InfoIcon} from '../icons/accounts/info-icon';
import {TrashIcon} from '../icons/accounts/trash-icon';
import {HouseIcon} from '../icons/breadcrumb/house-icon';
import {ProductsIcon} from '../icons/sidebar/products-icon';
import {SettingsIcon} from '../icons/sidebar/settings-icon';
import {CategoriesIcon} from '../icons/sidebar/categories-icon';
import {InventoryIcon} from '../icons/sidebar/inventory-icon';
import {Flex} from '../styles/flex';
import {Box} from '../styles/box';
// import {ProductsTable} from './products-table';
// import {AddProduct} from './add-product';

// Temporary placeholder components
const ProductsTable = ({ filterCategory, filterStock }: { filterCategory: string; filterStock: string }) => (
   <Box css={{ mt: '$10', p: '$10', bg: '$accents1', borderRadius: '$lg' }}>
      <Text>Products Table (Filters: {filterCategory}, {filterStock})</Text>
      <Text css={{ mt: '$4' }}>This will show the products table with advanced filtering and management capabilities.</Text>
   </Box>
);

const AddProduct = () => (
   <Button auto color="primary">
      Add New Product
   </Button>
);

export const Products = () => {
   const [filterCategory, setFilterCategory] = useState<string>('all');
   const [filterStock, setFilterStock] = useState<string>('all');

   return (
      <Flex
         css={{
            'mt': '$5',
            'px': '$6',
            '@sm': {
               mt: '$10',
               px: '$16',
            },
         }}
         justify={'center'}
         direction={'column'}
      >
         <Breadcrumbs>
            <Crumb>
               <HouseIcon />
               <Link href={'/dashboard'}>
                  <CrumbLink href="#">Dashboard</CrumbLink>
               </Link>
               <Text>/</Text>
            </Crumb>

            <Crumb>
               <ProductsIcon />
               <CrumbLink href="#">Products</CrumbLink>
               <Text>/</Text>
            </Crumb>
            <Crumb>
               <CrumbLink href="#">Manage</CrumbLink>
            </Crumb>
         </Breadcrumbs>

         {/* Header Section */}
         <Box css={{ mb: '$10' }}>
            <Text h3>Product Management</Text>
            <Text css={{ color: '$accents8', mb: '$8' }}>
               Manage your store's product catalog, categories, and inventory
            </Text>
            
            {/* Quick Stats */}
            <Flex css={{ gap: '$8', mb: '$8' }} wrap={'wrap'}>
               <Box css={{ 
                  bg: '$blue100', 
                  borderRadius: '$lg', 
                  p: '$8',
                  minWidth: '150px'
               }}>
                  <Text h4 css={{ color: '$blue700', m: 0 }}>2,847</Text>
                  <Text size={'$sm'} css={{ color: '$blue600' }}>Total Products</Text>
               </Box>
               <Box css={{ 
                  bg: '$green100', 
                  borderRadius: '$lg', 
                  p: '$8',
                  minWidth: '150px'
               }}>
                  <Text h4 css={{ color: '$green700', m: 0 }}>2,630</Text>
                  <Text size={'$sm'} css={{ color: '$green600' }}>In Stock</Text>
               </Box>
               <Box css={{ 
                  bg: '$yellow100', 
                  borderRadius: '$lg', 
                  p: '$8',
                  minWidth: '150px'
               }}>
                  <Text h4 css={{ color: '$yellow700', m: 0 }}>185</Text>
                  <Text size={'$sm'} css={{ color: '$yellow600' }}>Low Stock</Text>
               </Box>
               <Box css={{ 
                  bg: '$red100', 
                  borderRadius: '$lg', 
                  p: '$8',
                  minWidth: '150px'
               }}>
                  <Text h4 css={{ color: '$red700', m: 0 }}>32</Text>
                  <Text size={'$sm'} css={{ color: '$red600' }}>Out of Stock</Text>
               </Box>
            </Flex>
         </Box>

         {/* Action Bar */}
         <Flex
            css={{gap: '$8'}}
            align={'center'}
            justify={'between'}
            wrap={'wrap'}
         >
            <Flex
               css={{
                  'gap': '$6',
                  'flexWrap': 'wrap',
                  '@sm': {flexWrap: 'nowrap'},
               }}
               align={'center'}
            >
               <Input
                  css={{width: '100%', maxW: '350px'}}
                  placeholder="Search products, SKU, or barcode..."
                  clearable
               />
               
               {/* Category Filter */}
               <Dropdown>
                  <Dropdown.Trigger>
                     <Button auto flat color="primary" iconLeft={<CategoriesIcon />}>
                        Category: {filterCategory === 'all' ? 'All' : filterCategory}
                     </Button>
                  </Dropdown.Trigger>
                  <Dropdown.Menu
                     onAction={(key) => setFilterCategory(String(key))}
                     selectionMode="single"
                     selectedKeys={[filterCategory]}
                  >
                     <Dropdown.Item key="all">All Categories</Dropdown.Item>
                     <Dropdown.Item key="gaming-laptops">Gaming Laptops</Dropdown.Item>
                     <Dropdown.Item key="business-laptops">Business Laptops</Dropdown.Item>
                     <Dropdown.Item key="desktop-pcs">Desktop PCs</Dropdown.Item>
                     <Dropdown.Item key="gaming-pcs">Gaming PCs</Dropdown.Item>
                     <Dropdown.Item key="accessories">Accessories</Dropdown.Item>
                     <Dropdown.Item key="components">Components</Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>

               {/* Stock Filter */}
               <Dropdown>
                  <Dropdown.Trigger>
                     <Button auto flat color="secondary" iconLeft={<InventoryIcon />}>
                        Stock: {filterStock === 'all' ? 'All' : filterStock}
                     </Button>
                  </Dropdown.Trigger>
                  <Dropdown.Menu
                     onAction={(key) => setFilterStock(String(key))}
                     selectionMode="single"
                     selectedKeys={[filterStock]}
                  >
                     <Dropdown.Item key="all">All Stock Levels</Dropdown.Item>
                     <Dropdown.Item key="in-stock">In Stock</Dropdown.Item>
                     <Dropdown.Item key="low-stock">Low Stock</Dropdown.Item>
                     <Dropdown.Item key="out-of-stock">Out of Stock</Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>

               <SettingsIcon />
               <TrashIcon />
               <InfoIcon />
               <DotsIcon />
            </Flex>

            <Flex direction={'row'} css={{gap: '$6'}} wrap={'wrap'}>
               <AddProduct />
               <Button auto color="secondary" flat>
                  Bulk Actions
               </Button>
               <Button auto iconRight={<ExportIcon />}>
                  Export Products
               </Button>
            </Flex>
         </Flex>

         {/* Products Table */}
         <ProductsTable filterCategory={filterCategory} filterStock={filterStock} />
      </Flex>
   );
};