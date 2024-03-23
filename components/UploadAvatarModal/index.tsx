import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userService } from '@/app/_services';
import { toast } from 'react-toastify';
import { useAuth } from '@/app/_hooks';
import { useState } from 'react';
import Image from 'next/image';

const schema = yup.object().shape({
  image: yup.mixed().required('Avatar image is required'),
});

interface IUploadAvatarModalProps {
  open: boolean;
  onClose: () => void;
}

export const UploadAvatarModal = ({ open, onClose }: IUploadAvatarModalProps) => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [preview, setPreview] = useState<string | null>(null);

  const { profile, refetch } = useAuth();

  const { mutate: uploadAvatar } = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: () => {
      refetch();
      toast.success('Upload avatar successfully!');
      onClose();
      setPreview(null);
    },
  });

  const onSubmit = (data: any) => {
    console.log('data', data);
    uploadAvatar({
      ...data,
      fullName: profile?.fullName,
      phone: profile?.phone,
      gender: profile?.gender,
      address: profile?.address,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setValue('image', file);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        setPreview(null);
      }}
    >
      <DialogTitle>Upload Avatar Image</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box display='flex' alignItems='center' justifyContent='center'>
            {preview ? (
              <Avatar sx={{ width: 200, height: 200 }}>
                <Image src={preview} alt='preview-img' width={0} height={0} style={{ width: '100%', height: '100%' }} />
              </Avatar>
            ) : (
              <TextField
                type='file'
                fullWidth
                variant='outlined'
                inputProps={{ accept: 'image/jpeg,image/png,image/jpg' }} // Specify accepted file types here
                InputLabelProps={{ shrink: true }}
                onChange={handleFileChange}
                error={!!errors.image}
                helperText={errors.image?.message}
              />
            )}
          </Box>
        </DialogContent>
        <Box display='flex' justifyContent='center' gap={4} pb={3}>
          <Button
            onClick={() => {
              onClose();
              setPreview(null);
            }}
          >
            Cancel
          </Button>
          <Button type='submit' variant='contained'>
            Upload
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};
