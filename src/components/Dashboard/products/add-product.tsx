"use client";
import {
   Button,
   Input,
   Modal,
   Text,
   Textarea,
   Dropdown,
   Grid,
   Spacer,
   Switch,
} from '@nextui-org/react';
import React, {useState} from 'react';
import {Flex} from '../styles/flex';
import {Box} from '../styles/box';

export const AddProduct = () => {
   const [visible, setVisible] = useState(false);
   const [productData, setProductData] = useState({
      name: '',
      sku: '',
      category: '',
      price: '',
      comparePrice: '',
      description: '',
      shortDescription: '',
      stock: '',
      weight: '',
      dimensions: '',
      brand: '',
      model: '',
      warranty: '',
      isActive: true,
      trackQuantity: true,
      allowBackorder: false,
   });

   const [category, setCategory] = useState('gaming-laptops');

   const handler = () => setVisible(true);
   const closeHandler = () => {
      setVisible(false);
      // Reset form
      setProductData({
         name: '',
         sku: '',
         category: '',
         price: '',
         comparePrice: '',
         description: '',
         shortDescription: '',
         stock: '',
         weight: '',
         dimensions: '',
         brand: '',
         model: '',
         warranty: '',
         isActive: true,
         trackQuantity: true,
         allowBackorder: false,
      });
   };

   const handleSave = () => {
      // Here you would typically send the data to your API
      console.log('Saving product:', {
         ...productData,
         category: category
      });
      closeHandler();
   };

   return (
      <div>
         <Button auto onClick={handler} color="primary">
            Add New Product
         </Button>
         <Modal
            closeButton
            aria-labelledby="modal-title"
            width="900px"
            open={visible}
            onClose={closeHandler}
         >
            <Modal.Header>
               <Text id="modal-title" h3>
                  Add New Product
               </Text>
            </Modal.Header>
            <Modal.Body>
               <Grid.Container gap={2}>
                  {/* Basic Information */}
                  <Grid xs={12}>
                     <Text h4>Basic Information</Text>
                  </Grid>
                  
                  <Grid xs={8}>
                     <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Product Name"
                        label="Product Name"
                        value={productData.name}
                        onChange={(e) => setProductData({...productData, name: e.target.value})}
                     />
                  </Grid>
                  
                  <Grid xs={4}>
                     <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="SKU-001"
                        label="SKU"
                        value={productData.sku}
                        onChange={(e) => setProductData({...productData, sku: e.target.value})}
                     />
                  </Grid>

                  <Grid xs={6}>
                     <Box css={{ width: '100%' }}>
                        <Text size="sm" css={{ mb: '$2' }}>Category</Text>
                        <Dropdown>
                           <Dropdown.Trigger css={{ width: '100%' }}>
                              <Button flat css={{ width: '100%', justifyContent: 'flex-start' }}>
                                 {category === 'gaming-laptops' && 'Gaming Laptops'}
                                 {category === 'business-laptops' && 'Business Laptops'}
                                 {category === 'desktop-pcs' && 'Desktop PCs'}
                                 {category === 'gaming-pcs' && 'Gaming PCs'}
                                 {category === 'accessories' && 'Accessories'}
                                 {category === 'components' && 'Components'}
                              </Button>
                           </Dropdown.Trigger>
                           <Dropdown.Menu
                              onAction={(key) => setCategory(String(key))}
                              selectionMode="single"
                              selectedKeys={[category]}
                           >
                              <Dropdown.Item key="gaming-laptops">Gaming Laptops</Dropdown.Item>
                              <Dropdown.Item key="business-laptops">Business Laptops</Dropdown.Item>
                              <Dropdown.Item key="desktop-pcs">Desktop PCs</Dropdown.Item>
                              <Dropdown.Item key="gaming-pcs">Gaming PCs</Dropdown.Item>
                              <Dropdown.Item key="accessories">Accessories</Dropdown.Item>
                              <Dropdown.Item key="components">Components</Dropdown.Item>
                           </Dropdown.Menu>
                        </Dropdown>
                     </Box>
                  </Grid>

                  <Grid xs={3}>
                     <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Brand Name"
                        label="Brand"
                        value={productData.brand}
                        onChange={(e) => setProductData({...productData, brand: e.target.value})}
                     />
                  </Grid>

                  <Grid xs={3}>
                     <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Model Number"
                        label="Model"
                        value={productData.model}
                        onChange={(e) => setProductData({...productData, model: e.target.value})}
                     />
                  </Grid>

                  <Grid xs={12}>
                     <Textarea
                        bordered
                        fullWidth
                        color="primary"
                        placeholder="Detailed product description..."
                        label="Description"
                        rows={4}
                        value={productData.description}
                        onChange={(e) => setProductData({...productData, description: e.target.value})}
                     />
                  </Grid>

                  {/* Pricing */}
                  <Grid xs={12}>
                     <Spacer y={1} />
                     <Text h4>Pricing</Text>
                  </Grid>

                  <Grid xs={6}>
                     <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="0.00"
                        label="Price"
                        type="number"
                        value={productData.price}
                        onChange={(e) => setProductData({...productData, price: e.target.value})}
                     />
                  </Grid>

                  <Grid xs={6}>
                     <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="0.00"
                        label="Compare Price (optional)"
                        type="number"
                        value={productData.comparePrice}
                        onChange={(e) => setProductData({...productData, comparePrice: e.target.value})}
                     />
                  </Grid>

                  {/* Inventory */}
                  <Grid xs={12}>
                     <Spacer y={1} />
                     <Text h4>Inventory</Text>
                  </Grid>

                  <Grid xs={4}>
                     <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="0"
                        label="Stock Quantity"
                        type="number"
                        value={productData.stock}
                        onChange={(e) => setProductData({...productData, stock: e.target.value})}
                     />
                  </Grid>

                  <Grid xs={4}>
                     <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="1.5 kg"
                        label="Weight"
                        value={productData.weight}
                        onChange={(e) => setProductData({...productData, weight: e.target.value})}
                     />
                  </Grid>

                  <Grid xs={4}>
                     <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="30×20×5 cm"
                        label="Dimensions"
                        value={productData.dimensions}
                        onChange={(e) => setProductData({...productData, dimensions: e.target.value})}
                     />
                  </Grid>

                  {/* Settings */}
                  <Grid xs={12}>
                     <Spacer y={1} />
                     <Text h4>Settings</Text>
                  </Grid>

                  <Grid xs={4}>
                     <Flex align="center" css={{ gap: '$4' }}>
                        <Switch 
                           checked={productData.isActive} 
                           onChange={(checked) => setProductData({...productData, isActive: checked})}
                        />
                        <Text>Active Product</Text>
                     </Flex>
                  </Grid>

                  <Grid xs={4}>
                     <Flex align="center" css={{ gap: '$4' }}>
                        <Switch 
                           checked={productData.trackQuantity} 
                           onChange={(checked) => setProductData({...productData, trackQuantity: checked})}
                        />
                        <Text>Track Quantity</Text>
                     </Flex>
                  </Grid>

                  <Grid xs={4}>
                     <Flex align="center" css={{ gap: '$4' }}>
                        <Switch 
                           checked={productData.allowBackorder} 
                           onChange={(checked) => setProductData({...productData, allowBackorder: checked})}
                        />
                        <Text>Allow Backorder</Text>
                     </Flex>
                  </Grid>
               </Grid.Container>
            </Modal.Body>
            <Modal.Footer>
               <Button auto flat color="error" onClick={closeHandler}>
                  Cancel
               </Button>
               <Button auto onClick={handleSave}>
                  Add Product
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
};