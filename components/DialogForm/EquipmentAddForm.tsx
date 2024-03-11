import { Close, FileUploadOutlined, Watch } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryService } from '@/app/_services';
import { toast } from 'react-toastify';
import { DatePicker } from '@mui/x-date-pickers';
import Image from 'next/image';

const schema = yup.object().shape({
  name: yup.string().required('Equipment Name is required'),
  code: yup.string().required('Code is required'),
  quantity: yup.number().required('Quantity is required'),
  expectedDateFrom: yup.string().required('From date is required'),
  expectedDateTo: yup.string().required('To date is required'),
  costPer: yup.number().required('Cost Per is required'),
  image: yup.mixed(),
});

interface IEquipmentAddFormProps {
  onClose: () => void;
  status: boolean;
}

const EquipmentAddForm = ({ onClose, status }: IEquipmentAddFormProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();

  const handleReset = () => {
    reset();
    setSelectedImage(null);
  };

  const { mutate: mutateAdd } = useMutation({
    mutationFn: inventoryService.create,
    onSuccess: () => {
      toast.success('Create inventory successfully!');
      queryClient.invalidateQueries({ queryKey: ['inventories'] });
      onClose();
      handleReset();
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('image', file);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setSelectedImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: any) => {
    console.log('hihi', data);
    mutateAdd(data);
  };

  const handleClose = () => {
    onClose();
    handleReset();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={status}>
      <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
        <Typography color={'var(--primary)'} variant='h6'>
          Add Equipment
        </Typography>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid spacing={2} container>
            <Grid item xs={12}>
              <Box display='flex' flexDirection='column' gap={1}>
                <TextField
                  type='file'
                  fullWidth
                  label='Image'
                  variant='outlined'
                  InputLabelProps={{ shrink: true }}
                  onChange={handleFileChange}
                  error={!!errors.image}
                />
                {selectedImage && (
                  <Box width={150} height={150} borderRadius={1} overflow='hidden'>
                    <Image
                      src={selectedImage}
                      alt='preview-img'
                      width={0}
                      height={0}
                      sizes='100vw'
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth size='medium' sx={{ borderRadius: 8 }} {...register('name')} label='Name' />
              <Typography variant='caption' style={{ color: 'red' }}>
                {errors.name?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth size='medium' sx={{ borderRadius: 8 }} {...register('code')} label='Code' />
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
                label='Quantity'
                {...register('quantity')}
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
                label='Cost'
              />
              <Typography variant='caption' style={{ color: 'red' }}>
                {errors.costPer?.message}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label='From'
                sx={{ borderRadius: 8, width: '100%' }}
                disablePast
                onChange={(value: Date | null) => value && setValue('expectedDateFrom', new Date(value).toISOString())}
              />
              <Typography variant='caption' style={{ color: 'red' }}>
                {errors.expectedDateFrom?.message}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label='To'
                sx={{ borderRadius: 8, width: '100%' }}
                disablePast
                onChange={(value: Date | null) => value && setValue('expectedDateTo', new Date(value).toISOString())}
              />
              <Typography variant='caption' style={{ color: 'red' }}>
                {errors.expectedDateTo?.message}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <Box sx={{ px: 4, pb: 4, gap: 2 }} display='flex' justifyContent='end'>
          <Button variant='outlined' onClick={handleClose} type='button'>
            Cancel
          </Button>
          <Button variant='contained' type='submit'>
            Save changes
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};

export default EquipmentAddForm;
