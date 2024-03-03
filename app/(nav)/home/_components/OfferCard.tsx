import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
interface OfferCardProps {
  title: string;
  icon: string;
}

export const OfferCard = (props: OfferCardProps) => {
  return (
    <>
      <Stack
        direction={'row'}
        style={{
          backgroundColor: '#ECE9E9',
          borderRadius: '27px',
          color: 'var(--main-font-color)',
          padding: 10,
        }}
        width={{
          xs: '150px',
          md: '170px',
          lg: '190px',
          xl: '210px',
        }}
        height={{
          xs: '150px',
          md: '170px',
          lg: '190px',
          xl: '210px',
        }}
        component={'div'}
        spacing={5}
      >
        <Stack
          style={{
            border: '4px solid #1A1363',
            borderRadius: '27px',
            height: '100%',
            width: '100%',
          }}
          direction={'column'}
          justifyContent='space-between'
        >
          <Box
            width={{
              xs: '40%',
              md: '50%',
              lg: '60%',
              xl: '70%',
            }}
            height={{
              xs: '40%',
              md: '50%',
              lg: '60%',
              xl: '70%',
            }}
          >
            <Image
              src={props.icon}
              alt='icon'
              width={0}
              height={0}
              sizes='100vw'
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
          <Stack direction={'row'} justifyContent={'end'} padding={'0 1rem'}>
            <Typography>{props.title}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
