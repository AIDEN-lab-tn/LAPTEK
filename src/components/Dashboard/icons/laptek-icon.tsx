import React from 'react';

export const LaptekIcon = () => {
   return (
      <svg
         width="30"
         height="30"
         viewBox="0 0 30 30"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <rect
            width="30"
            height="30"
            rx="15"
            fill="url(#gradient)"
         />
         <path
            d="M8 10C8 9.44772 8.44772 9 9 9H21C21.5523 9 22 9.44772 22 10V18H8V10Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
         <path
            d="M6 18H24C24.5523 18 25 18.4477 25 19V20C25 20.5523 24.5523 21 24 21H6C5.44772 21 5 20.5523 5 20V19C5 18.4477 5.44772 18 6 18Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
         <circle
            cx="15"
            cy="19.5"
            r="0.5"
            fill="white"
         />
         <defs>
            <linearGradient
               id="gradient"
               x1="0"
               y1="0"
               x2="30"
               y2="30"
               gradientUnits="userSpaceOnUse"
            >
               <stop stopColor="#3B82F6" />
               <stop offset="1" stopColor="#1E40AF" />
            </linearGradient>
         </defs>
      </svg>
   );
};