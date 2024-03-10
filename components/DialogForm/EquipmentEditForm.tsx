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
      expectedDateFrom: new Date(inventory.expectedDateFrom).toISOString(),
      expectedDateTo: new Date(inventory.expectedDateTo).toISOString(),
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

  const [selectedImage, setSelectedImage] = useState<string | null>(inventory.image);

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
    mutateEdit({ id: inventory.id, payload: data });
  };

  return (
    <Dialog onClose={onClose} aria-labelledby='customized-dialog-title' open={true}>
      <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
        <Typography color={'var(--primary)'} variant='h6'>
          Update Equipment
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid spacing={2} container>
            <Grid item xs={12}>
              <Box display='flex' flexDirection='column' gap={4}>
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
                  <Box maxWidth={150} maxHeight={150}>
                    <Image
                      src={selectedImage}
                      alt='preview-img'
                      width={0}
                      height={0}
                      sizes='100vw'
                      style={{ width: '100%', height: '100%' }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
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
                onChange={(value) => value && setValue('expectedDateFrom', new Date(value).toISOString())}
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
                onChange={(value) => value && setValue('expectedDateTo', new Date(value).toISOString())}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              <Typography variant='caption' style={{ color: 'red' }}>
                {errors.expectedDateTo?.message}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <Box display='flex' justifyContent='end' gap={2} sx={{ px: 4, pb: 4 }}>
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
        </Box>
      </form>
    </Dialog>
  );
};

export default EquipmentEditForm;
