import {Dropdown, Text} from '@nextui-org/react';
import React, {useState} from 'react';
import {AcmeIcon} from '../icons/acme-icon';
import {AcmeLogo} from '../icons/acmelogo';
import {LaptekIcon} from '../icons/laptek-icon';
import {BottomIcon} from '../icons/sidebar/bottom-icon';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';

interface Company {
   name: string;
   location: string;
   logo: React.ReactNode;
}

export const CompaniesDropdown = () => {
   const [company, setCompany] = useState<Company>({
      name: 'Laptek Store',
      location: 'Gaming & Tech Hub',
      logo: <LaptekIcon />,
   });
   return (
      <Dropdown placement="bottom-right">
         <Dropdown.Trigger css={{cursor: 'pointer'}}>
            <Box>
               <Flex align={'center'} css={{gap: '$7'}}>
                  {company.logo}
                  <Box>
                     <Text
                        h3
                        size={'$xl'}
                        weight={'medium'}
                        css={{
                           m: 0,
                           color: '$accents9',
                           lineHeight: '$lg',
                           mb: '-$5',
                        }}
                     >
                        {company.name}
                     </Text>
                     <Text
                        span
                        weight={'medium'}
                        size={'$xs'}
                        css={{color: '$accents8'}}
                     >
                        {company.location}
                     </Text>
                  </Box>
                  <BottomIcon />
               </Flex>
            </Box>
         </Dropdown.Trigger>
         <Dropdown.Menu
            onAction={(e) => {
               if (e === '1') {
                  setCompany({
                     name: 'Laptek Store',
                     location: 'Gaming & Tech Hub',
                     logo: <LaptekIcon />,
                  });
               }
               if (e === '2') {
                  setCompany({
                     name: 'Laptek Pro',
                     location: 'Business Solutions',
                     logo: <LaptekIcon />,
                  });
               }
               if (e === '3') {
                  setCompany({
                     name: 'Laptek Gaming',
                     location: 'Gaming Division',
                     logo: <LaptekIcon />,
                  });
               }
               if (e === '4') {
                  setCompany({
                     name: 'Laptek Store',
                     location: 'Gaming & Tech Hub',
                     logo: <LaptekIcon />,
                  });
               }
            }}
            aria-label="Avatar Actions"
            css={{
               '$$dropdownMenuWidth': '340px',
               '$$dropdownItemHeight': '60px',
               '& .nextui-dropdown-item': {
                  'py': '$2',
                  // dropdown item left icon
                  'svg': {
                     color: '$secondary',
                     mr: '$4',
                  },
                  // dropdown item title
                  '& .nextui-dropdown-item-content': {
                     w: '100%',
                     fontWeight: '$semibold',
                  },
               },
            }}
         >
            <Dropdown.Section title="Store Divisions">
               <Dropdown.Item
                  key="1"
                  icon={<LaptekIcon />}
                  description="Gaming & Tech Hub"
               >
                  Laptek Store
               </Dropdown.Item>
               <Dropdown.Item
                  key="2"
                  icon={<LaptekIcon />}
                  description="Business Solutions"
               >
                  Laptek Pro
               </Dropdown.Item>
               <Dropdown.Item
                  key="3"
                  icon={<LaptekIcon />}
                  description="Gaming Division"
               >
                  Laptek Gaming
               </Dropdown.Item>
               <Dropdown.Item
                  key="4"
                  icon={<LaptekIcon />}
                  description="Gaming & Tech Hub"
               >
                  Laptek Store
               </Dropdown.Item>
            </Dropdown.Section>
         </Dropdown.Menu>
      </Dropdown>
   );
};
