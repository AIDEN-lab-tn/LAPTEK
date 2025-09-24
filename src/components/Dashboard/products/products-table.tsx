"use client";
import React from 'react';
import {
   Avatar,
   Badge,
   Button,
   Col,
   Row,
   Table,
   Tooltip,
   User,
   Text,
   Dropdown,
} from '@nextui-org/react';
import {IconButton} from '../table/table.styled';
import {EyeIcon} from '../icons/table/eye-icon';
import {EditIcon} from '../icons/table/edit-icon';
import {DeleteIcon} from '../icons/table/delete-icon';

interface Product {
   id: string;
   name: string;
   sku: string;
   category: string;
   price: number;
   stock: number;
   status: 'active' | 'inactive';
   image: string;
   brand: string;
}

interface ProductsTableProps {
   filterCategory: string;
   filterStock: string;
}

const mockProducts: Product[] = [
   {
      id: '1',
      name: 'ROG Strix G15 Gaming Laptop',
      sku: 'ASUS-ROG-G15-001',
      category: 'Gaming Laptops',
      price: 1299.99,
      stock: 15,
      status: 'active',
      image: '/images/products/product-1-bg-1.png',
      brand: 'ASUS',
   },
   {
      id: '2',
      name: 'ThinkPad X1 Carbon',
      sku: 'LEN-X1C-002',
      category: 'Business Laptops',
      price: 1899.99,
      stock: 8,
      status: 'active',
      image: '/images/products/product-1-bg-2.png',
      brand: 'Lenovo',
   },
   {
      id: '3',
      name: 'Gaming RGB Mechanical Keyboard',
      sku: 'CORSAIR-K95-003',
      category: 'Accessories',
      price: 179.99,
      stock: 45,
      status: 'active',
      image: '/images/products/product-1-sm-1.png',
      brand: 'Corsair',
   },
   {
      id: '4',
      name: 'RTX 4080 Graphics Card',
      sku: 'NVIDIA-RTX4080-004',
      category: 'Components',
      price: 1199.99,
      stock: 3,
      status: 'active',
      image: '/images/products/image 156.png',
      brand: 'NVIDIA',
   },
   {
      id: '5',
      name: 'Alienware Aurora R15',
      sku: 'DELL-AURORA-005',
      category: 'Gaming PCs',
      price: 2499.99,
      stock: 0,
      status: 'inactive',
      image: '/images/products/product-1-bg-1.png',
      brand: 'Dell',
   },
];

export const ProductsTable: React.FC<ProductsTableProps> = ({
   filterCategory,
   filterStock,
}) => {
   const filteredProducts = mockProducts.filter((product) => {
      const categoryMatch = 
         filterCategory === 'all' || 
         product.category.toLowerCase().replace(' ', '-') === filterCategory;
      
      let stockMatch = true;
      if (filterStock === 'in-stock') stockMatch = product.stock > 10;
      else if (filterStock === 'low-stock') stockMatch = product.stock > 0 && product.stock <= 10;
      else if (filterStock === 'out-of-stock') stockMatch = product.stock === 0;
      
      return categoryMatch && stockMatch;
   });

   const getStockBadge = (stock: number) => {
      if (stock === 0) {
         return <Badge color="error" variant="flat">Out of Stock</Badge>;
      } else if (stock <= 10) {
         return <Badge color="warning" variant="flat">Low Stock</Badge>;
      } else {
         return <Badge color="success" variant="flat">In Stock</Badge>;
      }
   };

   const getStatusBadge = (status: string) => {
      return (
         <Badge
            color={status === 'active' ? 'success' : 'error'}
            variant="flat"
         >
            {status === 'active' ? 'Active' : 'Inactive'}
         </Badge>
      );
   };

   const renderCell = (product: Product, columnKey: React.Key) => {
      switch (columnKey) {
         case 'product':
            return (
               <User
                  src={product.image}
                  name={product.name}
                  description={`SKU: ${product.sku}`}
               />
            );
         case 'category':
            return (
               <Col>
                  <Row>
                     <Text b size={14} css={{ tt: 'capitalize' }}>
                        {product.category}
                     </Text>
                  </Row>
                  <Row>
                     <Text b size={13} css={{ tt: 'capitalize', color: '$accents7' }}>
                        {product.brand}
                     </Text>
                  </Row>
               </Col>
            );
         case 'price':
            return (
               <Text b size={14} css={{ tt: 'capitalize' }}>
                  ${product.price.toFixed(2)}
               </Text>
            );
         case 'stock':
            return (
               <Col>
                  <Row>
                     <Text b size={14}>
                        {product.stock} units
                     </Text>
                  </Row>
                  <Row>
                     {getStockBadge(product.stock)}
                  </Row>
               </Col>
            );
         case 'status':
            return getStatusBadge(product.status);
         case 'actions':
            return (
               <Row justify="center" align="center">
                  <Col css={{ d: 'flex' }}>
                     <Tooltip 
                        content="View Product"
                        color="primary"
                        css={{}}
                        contentColor="white"
                     >
                        <IconButton onClick={() => console.log('View product', product.id)}>
                           <EyeIcon size={20} fill="#979797" />
                        </IconButton>
                     </Tooltip>
                  </Col>
                  <Col css={{ d: 'flex' }}>
                     <Tooltip 
                        content="Edit Product"
                        color="secondary"
                        css={{}}
                        contentColor="white"
                     >
                        <IconButton onClick={() => console.log('Edit product', product.id)}>
                           <EditIcon size={20} fill="#979797" />
                        </IconButton>
                     </Tooltip>
                  </Col>
                  <Col css={{ d: 'flex' }}>
                     <Tooltip
                        content="Delete Product"
                        color="error"
                        css={{}}
                        contentColor="white"
                     >
                        <IconButton onClick={() => console.log('Delete product', product.id)}>
                           <DeleteIcon size={20} fill="#FF0080" />
                        </IconButton>
                     </Tooltip>
                  </Col>
               </Row>
            );
         default:
            return <></>;
      }
   };

   const columns = [
      { name: 'PRODUCT', uid: 'product' },
      { name: 'CATEGORY', uid: 'category' },
      { name: 'PRICE', uid: 'price' },
      { name: 'STOCK', uid: 'stock' },
      { name: 'STATUS', uid: 'status' },
      { name: 'ACTIONS', uid: 'actions' },
   ];

   return (
      <Table
         aria-label="Products table"
         css={{
            height: 'auto',
            minWidth: '100%',
         }}
         selectionMode="multiple"
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
         <Table.Body items={filteredProducts}>
            {(item) => (
               <Table.Row key={item.id}>
                  {(columnKey) => (
                     <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                  )}
               </Table.Row>
            )}
         </Table.Body>
      </Table>
   );
};