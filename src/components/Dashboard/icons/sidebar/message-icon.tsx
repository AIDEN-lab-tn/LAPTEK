import React from 'react';
import {Svg} from '../../styles/svg';

export const MessageIcon = () => {
   return (
      <Svg
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         css={{
            '& path': {
               fill: '$accents6',
            },
         }}
      >
         <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"
            fill="#969696"
         />
         <path
            d="M7 9H17V11H7V9ZM7 12H15V14H7V12ZM7 6H17V8H7V6Z"
            fill="#969696"
         />
      </Svg>
   );
};