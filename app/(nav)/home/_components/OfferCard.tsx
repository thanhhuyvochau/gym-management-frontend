import { Box, Stack, Typography } from '@mui/material';
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
          width: '211px',
          height: '211px',
          padding: '0.5rem',
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
        >
          <Stack direction={'row'}>
            <Box
              component={'img'}
              src={props.icon}
              style={{
                width: '70%',
                height: '100%',
                objectFit: 'scale-down',
              }}
            ></Box>
          </Stack>
          <Stack direction={'row'} justifyContent={'end'} padding={'0 1rem'}>
            <Typography>{props.title}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
