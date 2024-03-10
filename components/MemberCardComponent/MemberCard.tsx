import React from 'react';
import { Paper, Typography, Grid, Button, IconButton, Divider, Dialog, DialogContent } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { Member } from '@/app/_services/member/types';
import { format } from 'date-fns';

interface MemberCardProps {
  member: Member;
  onClickClose: () => any;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onClickClose }) => {
  const { id, fullName, gender, phoneNumber, birthday, dateEnrolled, dateExpiration } = member;

  const [expanded, setExpanded] = React.useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const dialogStyles = {
    padding: '20px',
    width: '800px', // Adjusted width for a wider appearance
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const titleStyles = {
    color: '#1a1363',
    marginBottom: '10px',
  };

  const subtitleStyles = {
    color: '#555',
    marginBottom: '20px',
  };

  const detailStyles = {
    marginBottom: '15px',
  };

  const buttonStyles = {
    backgroundColor: '#1a1363',
    color: '#fff',
    borderRadius: '5px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#0d0a4a',
    },
  };

  return (
    <Dialog onClose={onClickClose} aria-labelledby='customized-dialog-title' open maxWidth={'lg'}>
      <DialogContent style={dialogStyles}>
        <Typography variant='h5' sx={titleStyles}>
          {fullName}
        </Typography>
        <Grid container spacing={4} rowGap={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant='body2' sx={{ color: '#1a1363', marginBottom: '0.5rem' }}>
              <strong>ID:</strong> {id}
            </Typography>
            <Typography variant='body2' sx={{ color: '#1a1363', marginBottom: '0.5rem' }}>
              <strong>Full Name:</strong> {fullName}
            </Typography>
            <Typography variant='body2' sx={{ color: '#1a1363', marginBottom: '0.5rem' }}>
              <strong>Gender:</strong> {gender}
            </Typography>
            <Typography variant='body2' sx={{ color: '#1a1363', marginBottom: '0.5rem' }}>
              <strong>Date of Birth:</strong> {format(new Date(birthday), 'MM-dd-yyyy')}
            </Typography>
            <Divider sx={{ my: 2, backgroundColor: '#1a1363' }} />
            <Typography variant='body2' sx={{ color: '#1a1363', marginBottom: '0.5rem' }}>
              <strong>Phone Number:</strong> {phoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <Typography variant='body2' sx={{ color: '#1a1363', marginBottom: '0.5rem' }}>
              <strong>Address:</strong> {streetAddress}, {city}, {stateProvince}
            </Typography> */}
            {/* <Divider sx={{ my: 2, backgroundColor: '#1a1363' }} /> */}
            {/* <Typography variant='body2' sx={{ color: '#1a1363', marginBottom: '0.5rem' }}>
              <strong>Membership Type:</strong> {membershipType}
            </Typography> */}
            <Typography variant='body2' sx={{ color: '#1a1363', marginBottom: '0.5rem' }}>
              <strong>Membership Start Date:</strong> {format(new Date(dateEnrolled), 'MM-dd-yyyy')}
            </Typography>
            <Typography variant='body2' sx={{ color: '#1a1363', marginBottom: '0.5rem' }}>
              <strong>Membership End Date:</strong> {format(new Date(dateExpiration), 'MM-dd-yyyy')}
            </Typography>

            <Typography variant='body2' sx={{ color: '#1a1363', marginBottom: '0.5rem' }}>
              <strong>Membership Status:</strong> {new Date(dateExpiration) > new Date() ? 'Active' : 'Inactive'}
            </Typography>
          </Grid>
        </Grid>
        {/* <IconButton
          onClick={handleToggleExpand}
          sx={{
            position: 'absolute',
            right: 16,
            bottom: 16,
            backgroundColor: '#1a1363', // Primary color
            color: '#ffffff', // Text color
          }}
        >
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton> */}
      </DialogContent>
      <Divider sx={{ my: 0, backgroundColor: '#1a1363' }} />
      <div style={{ marginTop: '0', textAlign: 'right', padding: '1rem' }}>
        <Button onClick={onClickClose} variant='contained' style={buttonStyles}>
          Close
        </Button>
      </div>
    </Dialog>
  );
};

export default MemberCard;
