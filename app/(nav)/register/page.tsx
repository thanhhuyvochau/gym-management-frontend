'use client';
import {
  Box,
  Button,
  Checkbox,
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import classes from './Register.module.css';
import axios from 'axios';
import { API } from '@/app/_constants/api-endpoint';
import { redirect } from 'next/navigation';

const Register = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    rePassword: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    rePassword: '',
  });
  const changeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };
  const validateForm = () => {
    let valid = true;

    if (!formState.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Email is required',
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }

    if (!formState.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password is required',
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }

    if (formState.password !== formState.rePassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        rePassword: 'Passwords do not match',
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, rePassword: '' }));
    }

    return valid;
  };
  const handleSubmitRegister = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(API.REGISTER, {
          email: formState.email,
          password: formState.password,
        });
        // Handle the response as needed
        console.log('Registration successful:', response.data);
        redirect('/login');
      } catch (error) {
        // Handle errors
        console.error('Registration failed:', error);
      }
    }
  };
  return (
    <>
      <Grid className={classes.fullHeightContainer} container>
        <Grid
          direction='row'
          justifyContent='center'
          alignItems='center'
          className={classes.fullHeightGridItem}
          container
          item
          xs={12}
          sm={6}
        >
          <Box
            width='65%'
            maxWidth='25rem'
            height='100%'
            className='mt-16'
            minWidth={{ xs: '100%', sm: '25rem' }}
            component='form'
            autoComplete='true'
          >
            <Stack justifyContent='center' alignItems='center' spacing={4}>
              <Typography style={{ color: ' var( --main-font-color)' }} variant='h3'>
                Sign Up
              </Typography>

              <Grid container direction='column'>
                <InputLabel style={{ color: 'var(--main-font-color)' }} htmlFor='emailInput'>
                  <Typography fontWeight='600' variant='h5'>
                    Email
                  </Typography>
                </InputLabel>
                <TextField
                  className={classes.inputField}
                  id='emailInput'
                  style={{ border: 'solid 4px #332F64', borderRadius: '10px' }}
                  required
                  value={formState.email}
                  onChange={changeField}
                  name='email'
                />
                <Typography variant='subtitle2' color={'red'}>
                  {errors.email}
                </Typography>
              </Grid>
              <Grid container direction='column'>
                <InputLabel style={{ color: 'var(--main-font-color)' }} htmlFor='passwordInput'>
                  <Typography fontWeight='600' variant='h5'>
                    Create Password
                  </Typography>
                </InputLabel>
                <TextField
                  className={classes.inputField}
                  style={{ border: 'solid 4px #332F64', borderRadius: '10px' }}
                  required
                  id='passwordInput'
                  value={formState.password}
                  onChange={changeField}
                  name='password'
                />
                <Typography variant='subtitle2' color={'red'}>
                  {errors.email}
                </Typography>
              </Grid>

              <Grid container direction='column'>
                <InputLabel style={{ color: 'var(--main-font-color)' }} htmlFor='passwordInput'>
                  <Typography fontWeight='600' variant='h5'>
                    Re-type Password
                  </Typography>
                </InputLabel>
                <TextField
                  className={classes.inputField}
                  style={{ border: 'solid 4px #332F64', borderRadius: '10px' }}
                  required
                  id='passwordInput'
                  value={formState.rePassword}
                  onChange={changeField}
                  name='rePassword'
                />
                <Typography variant='subtitle2' color={'red'}>
                  {errors.rePassword}
                </Typography>
              </Grid>

              <Fab
                style={{
                  background: 'var( --main-font-color)',
                  color: 'white',
                }}
                variant='extended'
                sx={{ width: '100%' }}
                onClick={handleSubmitRegister}
              >
                <Typography variant='h5'>Register</Typography>
              </Fab>
              <Grid justifyContent='space-between' direction='row' container item xs={12}>
                <FormControlLabel
                  style={{ color: 'var(--main-font-color)' }}
                  control={<Checkbox />}
                  label='Accept all the Terms and Conditions'
                />
              </Grid>
            </Stack>
          </Box>
        </Grid>
        <Grid container direction='row' justifyContent='center' item xs={6} style={{ maxHeight: '100%' }}>
          <Box
            component='img'
            src='./images/main-logo.png'
            style={{
              maxWidth: '100%',
              maxHeight: '80%',
              objectFit: 'scale-down',
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
