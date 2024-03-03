import { Close, FileUploadOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryService } from '@/app/_services';
import { toast } from 'react-toastify';
import { Inventory } from '@/app/_services/inventory/types';
import { DatePicker } from '@mui/x-date-pickers';

const schema = yup.object().shape({
  name: yup.string().required('Equipment Name is required'),
  code: yup.string().required('Code is required'),
  quantity: yup.number().required('Quantity is required'),
  expectedDateFrom: yup.date().required('From date is required'),
  expectedDateTo: yup.date().required('To date is required'),
  costPer: yup.number().required('Cost Per is required'),
});

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

interface IEquipmentAddFormProps {
  onClose: () => void;
  inventory: Inventory;
}

const EquipmentEditForm = ({ onClose, inventory }: IEquipmentAddFormProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: inventory.name,
      code: inventory.code,
      quantity: inventory.quantity,
      expectedDateFrom: new Date(inventory.expectedDateFrom),
      expectedDateTo: new Date(inventory.expectedDateTo),
      costPer: inventory.costPer,
    },
  });

  const queryClient = useQueryClient();

  const { mutate: mutateEdit } = useMutation({
    mutationFn: inventoryService.update,
    onSuccess: () => {
      toast.success('Update inventory successfully!');
      queryClient.invalidateQueries({ queryKey: ['inventories'] });
      onClose();
    },
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: any) => {
    mutateEdit({ id: inventory.id, payload: data });
  };

  return (
    <Dialog onClose={onClose} aria-labelledby='customized-dialog-title' open={true}>
      <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
        <Typography color={'var(--primary)'} variant='h6'>
          Update Equipment
        </Typography>
        {/* <Stack direction={'row'} justifyContent={'space-between'}>
          <Stack direction={'column'} gap={'0.5rem'}>
            <Typography color={'var(--primary)'} variant='h6'>
              Add Equipment
            </Typography>
            <Button component='label' variant='text' endIcon={<FileUploadOutlined />} className='pl-0 justify-start'>
              Attach Photo
              <VisuallyHiddenInput onChange={handleFileUpload} type='file' />
            </Button>
          </Stack>
          {selectedImage == null ? (
            <Box style={{ background: '#807DA8', width: '109px', height: '109px' }} component={'div'}></Box>
          ) : (
            <img
              src={selectedImage}
              alt='Equipment'
              style={{
                width: '109px',
                height: '109px',
              }}
            />
          )}
        </Stack> */}
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid spacing={2} container>
            <Grid item xs={12}>
              <TextField fullWidth size='medium' sx={{ borderRadius: 8 }} {...register('name')} placeholder='Name' />
              <Typography variant='caption' style={{ color: 'red' }}>
                {errors.name?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth size='medium' sx={{ borderRadius: 8 }} {...register('code')} placeholder='Code' />
              <Typography variant='caption' style={{ color: 'red' }}>
                {errors.code?.message}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size='medium'
                sx={{ borderRadius: 8 }}
                type='number'
                {...register('quantity')}
                placeholder='Quantity'
              />
              <Typography variant='caption' style={{ color: 'red' }}>
                {errors.quantity?.message}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size='medium'
                sx={{ borderRadius: 8 }}
                type='number'
                {...register('costPer')}
                placeholder='Cost'
              />
              <Typography variant='caption' style={{ color: 'red' }}>
                {errors.costPer?.message}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label='From'
                sx={{ borderRadius: 8, width: '100%' }}
                defaultValue={getValues('expectedDateFrom')}
                onChange={(value) => value && setValue('expectedDateFrom', new Date(value))}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              <Typography variant='caption' style={{ color: 'red' }}>
                {errors.expectedDateFrom?.message}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label='To'
                sx={{ borderRadius: 8, width: '100%' }}
                defaultValue={getValues('expectedDateTo')}
                onChange={(value) => value && setValue('expectedDateTo', new Date(value))}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              <Typography variant='caption' style={{ color: 'red' }}>
                {errors.expectedDateTo?.message}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 4, pb: 4 }}>
          <Button
            style={{
              border: '2px #1A1363',
              fontWeight: 'normal',
              borderRadius: '8px',
            }}
            variant='outlined'
            color='info'
            autoFocus
            onClick={onClose}
            type='button'
          >
            Cancel
          </Button>
          <Button
            style={{
              borderRadius: '8px',
              color: 'var(--primary)',
              backgroundColor: '#DEBA3B',
              fontWeight: 600,
            }}
            autoFocus
            type='submit'
          >
            Save changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EquipmentEditForm;
