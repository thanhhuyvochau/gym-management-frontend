import { Box, Stack, Typography } from '@mui/material';

interface PlanCardProps {
  timeUnit?: string;
  amount?: number;
  name: string;
  icon: string;
  backgroundColor: string;
  border?: string;
  fontColor: string;
}

export const PlanCard = (props: PlanCardProps) => {
  let planCardHeader;
  if (props.timeUnit && props.amount) {
    planCardHeader = (
      <Stack direction={'column'} justifyContent={'center'} alignItems={'space-between'}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography alignSelf={'end'} variant='h4'>
            {props.amount}
          </Typography>
          <Box
            component={'img'}
            src={props.icon}
            style={{
              width: '65%',
              height: '65%',
              objectFit: 'scale-down',
              alignSelf: 'start',
            }}
          />
        </Stack>
        <Stack>
          <Typography textAlign={'left'} variant='h5'>
            {props.timeUnit}
          </Typography>
        </Stack>
      </Stack>
    );
  } else {
    planCardHeader = (
      <Stack padding={'0.5rem'} direction={'row'} justifyContent={'center'} alignItems={'center'}>
        <Box
          component={'img'}
          src={props.icon}
          style={{
            width: '65%',
            height: '65%',
            objectFit: 'scale-down',
          }}
        />
        <Stack>
          <Typography textAlign={'center'} variant='h5'>
            {props.timeUnit}
          </Typography>
        </Stack>
      </Stack>
    );
  }

  return (
    <>
      <Stack
        direction={'row'}
        sx={{
          backgroundColor: props.backgroundColor,
          borderRadius: '27px',
          color: props.fontColor,
          padding: '0.85rem',
          border: '3px solid #FFF',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        }}
        component={'div'}
        spacing={2}
      >
        <Stack
          flexGrow={1}
          border={props.border ? props.border : 'none'}
          style={{
            borderRadius: '27px',
            height: '100%',
            width: '100%',
            padding: '1rem',
          }}
          direction={'column'}
          justifyContent={'center'}
        >
          {planCardHeader}
          <Stack direction={'row'} justifyContent={'center'} padding={'0 0'}>
            <Typography textAlign={'center'}>{props.name}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
