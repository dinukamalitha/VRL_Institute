'use client'

import { useState, useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import InfoCard from './InfoCard';
import { SidebarProps } from '@/types/sidebar';

export default function Sidebar({ title, items, isEventSidebar = false, onItemClick, icon }: SidebarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate items every 10 seconds
  useEffect(() => {
    if (items.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [items.length]);

  // Rotate all items (for both normal and event sidebars)
  const rotatedItems = [...items.slice(currentIndex), ...items.slice(0, currentIndex)];

  return (
    <Box
      sx={{
        width: 300,
        backgroundColor: '#f8f9fa',
        borderRight: isEventSidebar ? 'none' : '1px solid #e0e0e0',
        borderLeft: isEventSidebar ? '1px solid #e0e0e0' : 'none',
        overflowY: 'auto',
        maxHeight: '100vh',
        position: 'sticky',
        top: 0,
        '@media (max-width: 1200px)': {
          display: 'none',
        }
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Sidebar header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          {icon && <Box sx={{ mr: 1 }}>{icon}</Box>}
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
            {title}
          </Typography>
        </Box>

        {/* Items */}
        {rotatedItems.map((item, index) => (
          <Box
            key={index}
            onClick={() => onItemClick?.(item)}
            sx={{
              cursor: onItemClick ? 'pointer' : 'default',
              mb: isEventSidebar ? 0 : 2
            }}
          >
            {isEventSidebar ? (
              <>
                <Divider />
                <Typography
                  variant="body1"
                  sx={{
                    py: 2,
                    fontWeight: 500,
                    color: '#007bff',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  {item.title}
                </Typography>
              </>
            ) : (
              <InfoCard {...item} isEvent={isEventSidebar} />
            )}
          </Box>
        ))}

        {/* Bottom line for event sidebar */}
        {isEventSidebar && rotatedItems.length > 0 && <Divider />}
      </Box>
    </Box>
  );
}
