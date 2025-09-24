'use client';

import React, { useState, useMemo } from 'react';
import { 
  Card,
  Button,
  Input,
  Text,
  Dropdown,
  Badge,
  Avatar,
  Grid
} from '@nextui-org/react';
import {Box} from '../../../../components/Dashboard/styles/box';
import {Flex} from '../../../../components/Dashboard/styles/flex';

// Icon Components
const PackageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17M2 12L12 17L22 12"/>
  </svg>
);

const AlertTriangleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L13.09 8.26L22 9L13.09 15.74L12 22L10.91 15.74L2 9L10.91 8.26L12 2Z"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14L12 9L16 13L21 8V16H3V8L7 14Z"/>
  </svg>
);

const DollarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM13.5 6V7.5C14.04 7.5 14.5 7.96 14.5 8.5S14.04 9.5 13.5 9.5V11H12.5V9.5C11.96 9.5 11.5 9.04 11.5 8.5S11.96 7.5 12.5 7.5V6H13.5ZM9.5 8.5C9.5 7.12 10.62 6 12 6V4C9.51 4 7.5 6.01 7.5 8.5S9.51 13 12 13V15C10.62 15 9.5 13.88 9.5 12.5H8C8 14.71 9.79 16.5 12 16.5V18H13V16.5C15.21 16.5 17 14.71 17 12.5S15.21 8.5 13 8.5V6.5H12V8.5Z"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
  </svg>
);

const XCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z"/>
  </svg>
);

const ExportIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 9H16C16.55 9 17 8.55 17 8C17 7.45 16.55 7 16 7H12C11.45 7 11 7.45 11 8C11 8.55 11.45 9 12 9ZM12 13H16C16.55 13 17 12.55 17 12C17 11.45 16.55 11 16 11H12C11.45 11 11 11.45 11 12C11 12.55 11.45 13 12 13ZM12 17H16C16.55 17 17 16.55 17 16C17 15.45 16.55 15 16 15H12C11.45 15 11 15.45 11 16C11 16.55 11.45 17 12 17ZM7 7H9V9H7V7ZM7 11H9V13H7V11ZM7 15H9V17H7V15ZM20 3H4C3.45 3 3 3.45 3 4V20C3 20.55 3.45 21 4 21H20C20.55 21 21 20.55 21 20V4C21 3.45 20.55 3 20 3ZM19 19H5V5H19V19Z"/>
  </svg>
);

// Product interface
interface Product {
  id: number;
  title: string;
  category: string;
  newPrice: number;
  oldPrice?: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image: string;
}

// Sample products data
const sampleProducts: Product[] = [
  {
    id: 1001,
    title: "MacBook Pro 16-inch",
    category: "Laptops", 
    newPrice: 2399,
    oldPrice: 2599,
    stock: 15,
    status: 'In Stock',
    image: '/images/products/product-1-bg-1.png'
  },
  {
    id: 1002,
    title: "iPhone 14 Pro Max",
    category: "Smartphones",
    newPrice: 1099,
    stock: 8,
    status: 'Low Stock', 
    image: '/images/products/product-1-bg-2.png'
  },
  {
    id: 1003,
    title: "Samsung Galaxy Watch",
    category: "Wearables",
    newPrice: 299,
    oldPrice: 349,
    stock: 0,
    status: 'Out of Stock',
    image: '/images/products/product-1-sm-1.png'
  },
  {
    id: 1004,
    title: "Dell XPS 13",
    category: "Laptops",
    newPrice: 1299,
    stock: 22,
    status: 'In Stock',
    image: '/images/products/product-1-bg-1.png'
  },
  {
    id: 1005,
    title: "iPad Air",
    category: "Tablets",
    newPrice: 599,
    oldPrice: 699,
    stock: 12,
    status: 'In Stock',
    image: '/images/products/product-1-bg-2.png'
  },
  {
    id: 1006,
    title: "AirPods Pro 2",
    category: "Audio",
    newPrice: 249,
    stock: 5,
    status: 'Low Stock',
    image: '/images/products/product-1-sm-1.png'
  }
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  // Categories and statuses for filters
  const categories = ['All Categories', 'Laptops', 'Smartphones', 'Tablets', 'Wearables', 'Audio'];
  const statuses = ['All Status', 'In Stock', 'Low Stock', 'Out of Stock'];

  // Filtered products
  const filteredProducts = useMemo(() => {
    return sampleProducts.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All Status' || product.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus]);

  // Helper function for status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'success';
      case 'Low Stock': return 'warning'; 
      case 'Out of Stock': return 'error';
      default: return 'default';
    }
  };

  const productStats = {
    total: sampleProducts.length,
    inStock: sampleProducts.filter(p => p.status === 'In Stock').length,
    lowStock: sampleProducts.filter(p => p.status === 'Low Stock').length,
    outOfStock: sampleProducts.filter(p => p.status === 'Out of Stock').length,
    totalValue: sampleProducts.reduce((sum, p) => sum + (p.newPrice * p.stock), 0),
    categories: categories.length - 1,
  };

  return (
    <Box css={{ p: '$6', maxWidth: '100%' }}>
      <Flex direction="column" css={{ gap: '$6' }}>
        {/* Page Header */}
        <Box>
          <Box css={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'inline-block',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-4px',
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '2px'
            }
          }}>
            <Text h1 css={{ 
              fontSize: '$3xl', 
              fontWeight: '$bold', 
              m: 0,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Product Management
            </Text>
          </Box>
          <Text css={{ color: '$accents7', mt: '$2' }}>
            Manage your gaming products and inventory
          </Text>
        </Box>

        {/* Stats Cards */}
        <Box css={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '$6',
          '@sm': {
            gridTemplateColumns: 'repeat(2, 1fr)'
          },
          '@md': {
            gridTemplateColumns: 'repeat(3, 1fr)'
          },
          '@lg': {
            gridTemplateColumns: 'repeat(6, 1fr)'
          }
        }}>
          <Card css={{ 
            p: '$6', 
            minHeight: '120px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.15)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Flex direction="column" align="center" css={{ textAlign: 'center' }}>
              <Box css={{ p: '$3', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '$lg', mb: '$3', color: 'white' }}>
                <PackageIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Total Products</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {productStats.total.toLocaleString()}
              </Text>
            </Flex>
          </Card>

          <Card css={{ 
            p: '$6', 
            minHeight: '120px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            border: 'none',
            boxShadow: '0 6px 20px rgba(240, 147, 251, 0.15)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(240, 147, 251, 0.2)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Flex direction="column" align="center" css={{ textAlign: 'center' }}>
              <Box css={{ p: '$3', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '$lg', mb: '$3', color: 'white' }}>
                <WarningIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Low Stock</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {productStats.lowStock}
              </Text>
            </Flex>
          </Card>

          <Card css={{ 
            p: '$6', 
            minHeight: '120px',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
            border: 'none',
            boxShadow: '0 6px 20px rgba(255, 107, 107, 0.15)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(255, 107, 107, 0.2)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Flex direction="column" align="center" css={{ textAlign: 'center' }}>
              <Box css={{ p: '$3', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '$lg', mb: '$3', color: 'white' }}>
                <XCircleIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Out of Stock</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {productStats.outOfStock}
              </Text>
            </Flex>
          </Card>

          <Card css={{ 
            p: '$6', 
            minHeight: '120px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            border: 'none',
            boxShadow: '0 6px 20px rgba(16, 185, 129, 0.15)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(16, 185, 129, 0.2)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Flex direction="column" align="center" css={{ textAlign: 'center' }}>
              <Box css={{ p: '$3', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '$lg', mb: '$3', color: 'white' }}>
                <DollarIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Inventory Value</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                ${productStats.totalValue.toLocaleString()}
              </Text>
            </Flex>
          </Card>

          <Card css={{ 
            p: '$6', 
            minHeight: '120px',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            border: 'none',
            boxShadow: '0 6px 20px rgba(79, 172, 254, 0.15)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(79, 172, 254, 0.2)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Flex direction="column" align="center" css={{ textAlign: 'center' }}>
              <Box css={{ p: '$3', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '$lg', mb: '$3', color: 'white' }}>
                <CheckCircleIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>In Stock</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {productStats.inStock}
              </Text>
            </Flex>
          </Card>

          <Card css={{ 
            p: '$6', 
            minHeight: '120px',
            background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            border: 'none',
            boxShadow: '0 6px 20px rgba(168, 237, 234, 0.15)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(168, 237, 234, 0.2)',
              transition: 'all 0.3s ease'
            }
          }}>
            <Flex direction="column" align="center" css={{ textAlign: 'center' }}>
              <Box css={{ p: '$3', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '$lg', mb: '$3', color: 'white' }}>
                <TrendingUpIcon />
              </Box>
              <Text css={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '$xs', fontWeight: '$medium' }}>Categories</Text>
              <Text css={{ fontSize: '$xl', fontWeight: '$bold', mt: '$2', color: 'white' }}>
                {productStats.categories}
              </Text>
            </Flex>
          </Card>
        </Box>

        {/* Filters and Search */}
        <Card css={{ 
          p: '$8', 
          mb: '$6',
          border: 'none',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          background: '$background'
        }}>
          <Flex justify="between" align="center" wrap="wrap" css={{ gap: '$8' }}>
            <Flex align="center" css={{ gap: '$8', flex: 1 }}>
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                css={{ 
                  flex: 1,
                  maxWidth: '400px',
                  '& .nextui-input': {
                    background: '$background',
                    border: '2px solid $border',
                    borderRadius: '$lg',
                    '&:focus-within': {
                      borderColor: '$primary',
                      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)'
                    }
                  },
                  '& input': {
                    fontSize: '$sm'
                  }
                }}
              />
              <Dropdown>
                <Dropdown.Button auto flat>
                  Category: {selectedCategory === 'All Categories' ? 'All' : selectedCategory}
                </Dropdown.Button>
                <Dropdown.Menu
                  selectedKeys={new Set([selectedCategory])}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setSelectedCategory(selected);
                  }}
                >
                  <Dropdown.Item key="All Categories">All</Dropdown.Item>
                  <Dropdown.Item key="Laptops">Laptops</Dropdown.Item>
                  <Dropdown.Item key="Smartphones">Smartphones</Dropdown.Item>
                  <Dropdown.Item key="Tablets">Tablets</Dropdown.Item>
                  <Dropdown.Item key="Wearables">Wearables</Dropdown.Item>
                  <Dropdown.Item key="Audio">Audio</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Button auto flat>
                  Status: {selectedStatus === 'All Status' ? 'All' : selectedStatus.replace(' Stock', '')}
                </Dropdown.Button>
                <Dropdown.Menu
                  selectedKeys={new Set([selectedStatus])}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setSelectedStatus(selected);
                  }}
                >
                  <Dropdown.Item key="All Status">All</Dropdown.Item>
                  <Dropdown.Item key="In Stock">In Stock</Dropdown.Item>
                  <Dropdown.Item key="Low Stock">Low Stock</Dropdown.Item>
                  <Dropdown.Item key="Out of Stock">Out of Stock</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Flex>
            <Button css={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              Add Product
            </Button>
          </Flex>
        </Card>

        {/* Products Table */}
        <Card css={{ 
          p: 0,
          border: 'none',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          borderRadius: '$xl',
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Card.Header css={{ p: '$6' }}>
            <Text h3 css={{ m: 0, fontSize: '$lg', fontWeight: '$semibold' }}>Products Directory</Text>
          </Card.Header>
          <Card.Body css={{ p: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box css={{ 
              overflowX: 'auto',
              overflowY: 'auto',
              flex: 1,
              '&::-webkit-scrollbar': {
                height: '8px'
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent'
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#e4e4e7',
                borderRadius: '4px'
              }
            }}>
              <table style={{ width: '100%', minWidth: '900px', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th colSpan={6} style={{ padding: 0, border: 'none' }}>
                      <Box css={{ 
                        background: 'rgba(59, 130, 246, 0.05)',
                        m: '$4',
                        borderRadius: '$lg',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <Box css={{ flex: 1.5, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>PRODUCT</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>CATEGORY</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>STOCK</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>PRICE</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>STATUS</Box>
                        <Box css={{ flex: 1, padding: '12px 16px', textAlign: 'left', fontWeight: 600, fontSize: '12px', color: '$accents7' }}>ACTIONS</Box>
                      </Box>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr key={product.id}>
                      <td colSpan={6} style={{ padding: 0, border: 'none' }}>
                        <Box css={{
                          display: 'flex',
                          alignItems: 'center',
                          m: '$4',
                          p: '$4',
                          borderRadius: '$lg',
                          background: 'rgba(255, 255, 255, 0.8)',
                          border: '1px solid rgba(0, 0, 0, 0.05)',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            background: 'rgba(59, 130, 246, 0.05)',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                          }
                        }}>
                          <Box css={{ flex: 1.5, padding: '0 12px' }}>
                            <Flex align="center" css={{ gap: '$3' }}>
                              <Avatar 
                                src={product.image} 
                                size="sm" 
                                css={{ minWidth: '32px' }}
                                squared
                              />
                              <Box>
                                <Text css={{ fontSize: '$sm', fontWeight: '$semibold' }}>{product.title}</Text>
                                <Text css={{ fontSize: '$xs', color: '$accents6' }}>SKU: {product.id}</Text>
                              </Box>
                            </Flex>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Badge variant="flat" color="primary" size="sm">
                              {product.category}
                            </Badge>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Text css={{ 
                              fontSize: '$sm', 
                              fontWeight: '$semibold',
                              color: product.stock > 10 ? '$success' : product.stock > 0 ? '$warning' : '$error'
                            }}>
                              {product.stock} units
                            </Text>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Text css={{ fontSize: '$sm', fontWeight: '$semibold' }}>${product.newPrice}</Text>
                            {product.oldPrice && (
                              <Text css={{ fontSize: '$xs', color: '$accents6', textDecoration: 'line-through' }}>
                                ${product.oldPrice}
                              </Text>
                            )}
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px' }}>
                            <Badge color={getStatusColor(product.status)} variant="flat" size="sm">
                              {product.status.charAt(0).toUpperCase() + product.status.slice(1).replace('-', ' ')}
                            </Badge>
                          </Box>
                          <Box css={{ flex: 1, padding: '0 12px', display: 'flex', gap: '$2', justifyContent: 'flex-end' }}>
                            <Button auto light size="sm" css={{ minWidth: 'auto', p: '$2' }}>
                              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                              </svg>
                            </Button>
                            <Button auto light size="sm" css={{ minWidth: 'auto', p: '$2' }}>
                              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                              </svg>
                            </Button>
                          </Box>
                        </Box>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Card.Body>
        </Card>
      </Flex>
    </Box>
  );
}