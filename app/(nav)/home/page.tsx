'use client';

import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import classes from './Main.module.css';
import { OfferCard, PlanCard } from './_components';
import Image from 'next/image';
import { yellow } from '@mui/material/colors';

const Home = () => {
  return (
    <Stack>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        component='div'
        className={classes.introduction}
      >
        <Grid container py={{ xs: 6, lg: 0 }}>
          <Grid
            container
            justifyContent={'center'}
            item
            xs={12}
            lg={6}
            alignItems={'center'}
            order={{ xs: 2, md: 1, lg: 1, xl: 1 }}
          >
            <Stack
              direction='column'
              justifyContent={'center'}
              alignItems={{
                xs: 'center',
                lg: 'start',
              }}
              maxWidth={'28rem'}
            >
              <Typography
                variant='h3'
                textAlign={{
                  xs: 'center',
                  md: 'center',
                  lg: 'left',
                }}
                color='white'
              >
                Start Simplify Your Bussiness
              </Typography>
              <Typography
                color={yellow[500]}
                variant='h3'
                textAlign={{
                  xs: 'center',
                  md: 'center',
                  lg: 'left',
                }}
              >
                Come Join Us
              </Typography>
              <Button
                style={{
                  maxWidth: '10rem',
                  background: 'white',
                  color: 'var(--main-font-color)',
                  fontWeight: 600,
                  marginTop: '2rem',
                }}
                variant='contained'
              >
                Learn More
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} lg={6} order={{ xs: 1, md: 2, lg: 2 }}>
            <Box display='flex' alignItems='center' width='100%'>
              <Box
                height={{
                  xs: '50%',
                  md: '50%',
                  lg: '100%',
                }}
                width='70%'
                mx={{ xs: 'auto', lg: 0 }}
              >
                <Image
                  src='/images/main-logo.png'
                  alt='images'
                  width={0}
                  height={0}
                  sizes='100vw'
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box bgcolor='#1a1363' py={6} id='about'>
        <Box display='flex' flexDirection='column' gap={2} mb={4}>
          <Typography textAlign={'center'} color='white' variant='h4'>
            About
          </Typography>
          <Typography textAlign={'center'} color='white' variant='h3'>
            STAMINA GYM MANAGEMENT PLATFORM
          </Typography>
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={12} lg={4}>
              <Box display='flex' justifyContent='center'>
                <Box width={{ xs: '50%', lg: '80%' }}>
                  <Image
                    src='/images/gym-model.png'
                    alt='thumbnail'
                    sizes='100vw'
                    width={0}
                    height={0}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} lg={8}>
              <Stack direction={'column'}>
                <Box mx={{ xs: 'auto', lg: '0' }}>
                  <Typography
                    style={{
                      color: '#FFFF7D',
                      fontWeight: '700',
                      letterSpacing: '1px',
                      lineHeight: 'normal',
                    }}
                    className='pt-16'
                    variant='h6'
                    textAlign={{ xs: 'center', lg: 'left' }}
                    px={{ xs: 3, md: 0 }}
                  >
                    Welcome to STAMINA Platform – the ultimate solution for small gym management. Streamline your
                    operations, engage members effortlessly, and elevate your fitness business. Simplify, thrive, and
                    transform the way you run your gym with us. Welcome to efficiency, welcome to growth, welcome to
                    success. Sign up now!
                  </Typography>
                </Box>
                <Box mx={{ xs: 'auto', lg: '0' }}>
                  <Typography variant='h5' mb={2} mt={2} color='white' textAlign={{ xs: 'center', lg: 'left' }}>
                    What we offer:
                  </Typography>
                  <Stack
                    style={{ width: '100%' }}
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    alignItems='center'
                  >
                    <OfferCard title='Support' icon='/images/elipse16.png' />
                    <OfferCard title='Simple' icon='/images/target-fill.png' />
                    <OfferCard title='Effective' icon='/images/target-fill.png' />
                  </Stack>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        style={{
          background: '#ECE9E9',
          color: '#151515',
          padding: '3rem',
        }}
        component='div'
        display='flex'
        flexDirection='column'
        gap={2}
        id='plan'
      >
        <Stack direction={'row'} justifyContent={{ xs: 'center', lg: 'end' }}>
          <Typography letterSpacing={'4px'} fontWeight={'normal'} variant='h5'>
            JOIN OUR MEMBERSHIP
          </Typography>
        </Stack>

        <Stack direction={'column'} color={'--var(main-font-color)'} gap={2}>
          <Typography textAlign={{ xs: 'center', lg: 'left' }} variant='h4'>
            Our Plan
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6} md={4} lg={2}>
              <PlanCard
                name='Annual Membership'
                icon='./images/mdi_chess-pawn.png'
                backgroundColor='white'
                fontColor='--var(main-font-color)'
                border='4px solid #1A1363'
              />
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <PlanCard
                name='Weekly Rate'
                icon='./images/mdi_chess-knight.png'
                backgroundColor='#3E3E3E'
                amount={7}
                timeUnit='Days'
                fontColor='white'
              />
            </Grid>

            <Grid item xs={6} md={4} lg={2}>
              <PlanCard
                name='Monthly Rate'
                icon='./images/mdi_chess-bishop.png'
                backgroundColor='#77749B'
                timeUnit='Month'
                amount={1}
                fontColor='white'
              />
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <PlanCard
                name='Biannual Rate'
                icon='./images/mdi_chess-king.png'
                backgroundColor='#332F64'
                timeUnit='Months'
                amount={6}
                fontColor='white'
              />
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <PlanCard
                name='Biannual Rate'
                icon='./images/mdi_chess-king.png'
                backgroundColor='#332F64'
                timeUnit='Months'
                amount={6}
                fontColor='white'
              />
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
              <PlanCard
                name='Annual Rate'
                icon='./images/mdi_crown.png'
                backgroundColor='#1A1363'
                timeUnit='Year'
                amount={1}
                fontColor='white'
              />
            </Grid>
          </Grid>
        </Stack>
      </Box>
      <Stack
        style={{
          background: '#ECE9E9',
          color: '#151515',
          height: '300px',
        }}
        component={'div'}
        direction={'column'}
      >
        <Box
          component={'div'}
          style={{
            height: '70px',
            backgroundImage: 'linear-gradient(180deg, #2B2B2B 0%, rgba(43, 43, 43, 0.00) 100%)',
          }}
        ></Box>
        <Stack direction={'row'} justifyContent={'space-around'} alignItems={'center'} flexGrow={'1'}>
          <Stack direction={'column'}>
            <Typography className='mb-5' variant='h5'>
              COMPANY
            </Typography>
            <Typography fontSize={'1rem'} variant='h6'>
              Privacy Policy
            </Typography>
            <Typography fontSize={'1rem'} variant='h6'>
              Terms and Conditions
            </Typography>
            <Typography fontSize={'1rem'} variant='h6'>
              Careers
            </Typography>
          </Stack>
          <Stack direction={'column'}>
            <Typography className='mb-5' variant='h5'>
              GYM
            </Typography>
            <Typography fontSize={'1rem'} variant='h6'>
              Why Join Us
            </Typography>
            <Typography fontSize={'1rem'} variant='h6'>
              Plan
            </Typography>
          </Stack>
          <Stack direction={'column'}>
            <Typography className='mb-5' variant='h5'>
              CUSTOMER
            </Typography>
            <Typography fontSize={'1rem'} variant='h6'>
              FAQs
            </Typography>
            <Typography fontSize={'1rem'} variant='h6'>
              Contact Us
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;
