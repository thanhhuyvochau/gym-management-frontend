import React from 'react';
import { Typography, Grid, Button, Divider, Dialog, DialogContent, Avatar, Box, Stack } from '@mui/material';
import { format } from 'date-fns';
import Image from 'next/image';
import { Inventory } from '@/app/_services/inventory/types';

interface MemberCardProps {
  inventory: Inventory;
  onClickClose: () => any;
}

export const EquipmentCard: React.FC<MemberCardProps> = ({ inventory, onClickClose }) => {
  const { id, code, name, expectedDateFrom, expectedDateTo, costPer, quantity, image } = inventory;

  const dialogStyles = {
    padding: '20px',
    width: '400px', // Adjusted width for a wider appearance
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const titleStyles = {
    color: '#1a1363',
    marginBottom: '10px',
  };

  const buttonStyles = {
    backgroundColor: '#1a1363',
    color: '#fff',
    borderRadius: '5px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#0d0a4a',
    },
  };

  return (
    <Dialog onClose={onClickClose} aria-labelledby='customized-dialog-title' open maxWidth={'md'}>
      <DialogContent style={dialogStyles}>
        <Box display='flex' gap={4}>
          <Avatar sx={{ width: 100, height: 100 }}>
            {image && (
              <Image
                src={image}
                alt='inventory-image'
                width={0}
                height={0}
                sizes='100vw'
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </Avatar>
          <Stack gap={1}>
            <Typography variant='body2' sx={{ color: '#1a1363', marginBottom: '0.5rem' }}>
              <strong>ID:</strong> {id}
            </Typography>
            <Typography variant='body2' sx={{ color: '#1a1363', marginBottom: '0.5rem' }}>
              <strong>Name:</strong> {name}
            </Typography>
            <Typography variant='body2' sx={{ color: '#1a1363', marginBottom: '0.5rem' }}>
              <strong>Code:</strong> {code}
            </Typography>
            <Typography variant='body2' sx={{ color: '#1a1363', marginBottom: '0.5rem' }}>
              <strong>Frome Date:</strong> {format(new Date(expectedDateFrom), 'MM-dd-yyyy')}
            </Typography>
            <Typography variant='body2' sx={{ color: '#1a1363', marginBottom: '0.5rem' }}>
              <strong>To Date:</strong> {format(new Date(expectedDateTo), 'MM-dd-yyyy')}
            </Typography>
            <Typography variant='body2' sx={{ color: '#1a1363', marginBottom: '0.5rem' }}>
              <strong>Cost per:</strong> {costPer}
            </Typography>
            <Typography variant='body2' sx={{ color: '#1a1363', marginBottom: '0.5rem' }}>
              <strong>Quantity:</strong> {quantity}
            </Typography>
          </Stack>
        </Box>
      </DialogContent>
      <Divider sx={{ my: 0, backgroundColor: '#1a1363' }} />
      <div style={{ marginTop: '0', textAlign: 'right', padding: '1rem' }}>
        <Button onClick={onClickClose} variant='contained' style={buttonStyles}>
          Close
        </Button>
      </div>
    </Dialog>
  );
};
