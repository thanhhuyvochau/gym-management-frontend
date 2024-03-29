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
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memberService } from '@/app/_services';
import { toast } from 'react-toastify';
import { DatePicker } from '@mui/x-date-pickers';
import { Member } from '@/app/_services/member/types';
import Image from 'next/image';

const schema = yup.object().shape({
  fullName: yup.string().required('Member Name is required'),
  gender: yup.string().required('Gender is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  birthday: yup.date().required('Birthday is required'),
  image: yup.mixed(),
});

const genderSelect = [
  {
    value: 'MALE',
    label: 'Male',
  },
  {
    value: 'FEMALE',
    label: 'Female',
  },
];

interface IEquipmentAddFormProps {
  onClose: () => void;
  member: Member;
}

const MemberEditForm = ({ onClose, member }: IEquipmentAddFormProps) => {
  const { fullName, gender, phoneNumber, birthday, memberImage } = member;
  const {
    handleSubmit,
    register,
    setValue,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName,
      gender,
      phoneNumber,
      birthday: new Date(birthday),
    },
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(memberImage || null);

  const queryClient = useQueryClient();

  const { mutate: mutateEdit } = useMutation({
    mutationFn: memberService.update,
    onSuccess: () => {
      toast.success('Update member successfully!');
      queryClient.invalidateQueries({ queryKey: ['members'] });
      onClose();
      handleReset();
    },
  });

  const handleReset = () => {
    reset();
    setSelectedImage(null);
  };

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

  const handleClose = () => {
    onClose();
    handleReset();
  };

  const onSubmit = (data: any) => {
    mutateEdit({ id: member.id, payload: data });
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={true}>
      <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
        <Typography color={'var(--primary)'} variant='h6'>
          Update Member Info
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
              <TextField fullWidth size='medium' sx={{ borderRadius: 8 }} {...register('fullName')} label='Full Name' />
              <Typography variant='caption' style={{ color: 'red' }}>
                {errors.fullName?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='gender'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label='Gender'
                    fullWidth
                    error={!!errors.gender}
                    helperText={errors.gender?.message}
                  >
                    {genderSelect.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              {errors.gender && (
                <Typography variant='caption' color='red'>
                  {errors.gender.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size='medium'
                sx={{ borderRadius: 8 }}
                {...register('phoneNumber')}
                placeholder='Phone Number'
              />
              <Typography variant='caption' style={{ color: 'red' }}>
                {errors.phoneNumber?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                label='Birthday'
                sx={{ borderRadius: 8, width: '100%' }}
                defaultValue={getValues('birthday')}
                onChange={(value) => value && setValue('birthday', new Date(value))}
              />
              <Typography variant='caption' style={{ color: 'red' }}>
                {errors.birthday?.message}
              </Typography>
            </Grid>
            {/* Add more fields here according to your requirement */}
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
            onClick={handleClose}
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

export default MemberEditForm;
