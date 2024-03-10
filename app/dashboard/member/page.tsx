'use client';
import React, { useState } from 'react';
import { MUIDataTableColumn, MUIDataTableOptions } from 'mui-datatables';
import { Box, Button, Stack, Typography } from '@mui/material';
import { AccountResponse } from '@/app/_models/AccountResponse';
import { Add, DeleteOutline, PlusOneRounded } from '@mui/icons-material';
import dynamic from 'next/dynamic';
import { MemberResponse } from '@/app/_models/MemberResponse';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import MemberCard from '@/components/MemberCardComponent/MemberCard';
import { useMutation, useQuery } from '@tanstack/react-query';
import { memberService } from '@/app/_services';
import { ConfirmDeletePopup } from '@/components';
import { Member } from '@/app/_services/member/types';
import { format } from 'date-fns';
import MemberEditForm from '@/components/MemberCardComponent/MemberEditForm';
import { toast } from 'react-toastify';
const MUIDataTable = dynamic(() => import('mui-datatables'), {
  ssr: false,
});
const mockUsers: MemberResponse[] = [
  {
    id: 1,
    fullName: 'John Doe',
    gender: 'Male',
    dateOfBirth: '1990-01-01',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    streetAddress: '123 Main St',
    city: 'Cityville',
    stateProvince: 'State A',
    membershipType: 'Premium',
    membershipStartDate: '2022-01-01',
    membershipEndDate: '2022-12-31',
    membershipStatus: true,
  },
  {
    id: 2,
    fullName: 'Jane Smith',
    gender: 'Female',
    dateOfBirth: '1985-03-15',
    email: 'jane.smith@example.com',
    phoneNumber: '987-654-3210',
    streetAddress: '456 Oak St',
    city: 'Townsville',
    stateProvince: 'State B',
    membershipType: 'Regular',
    membershipStartDate: '2022-02-15',
    membershipStatus: true,
  },
  {
    id: 3,
    fullName: 'Bob Johnson',
    gender: 'Male',
    dateOfBirth: '1982-07-20',
    email: 'bob.johnson@example.com',
    phoneNumber: '555-123-4567',
    streetAddress: '789 Pine St',
    city: 'Villageville',
    stateProvince: 'State C',
    membershipType: 'Basic',
    membershipStartDate: '2022-03-10',
    membershipEndDate: '2022-09-10',
    membershipStatus: false,
  },
];

const ManagerManagement = () => {
  const { data, refetch } = useQuery({
    queryKey: ['members'],
    queryFn: () => memberService.getMembers({ page: 0, size: -1 }),
  });
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [statusModal, setStatusModal] = useState<'edit' | 'view'>();

  const [selectedDeleteMember, setSelectedDeleteMember] = useState<any | null>();
  const [isOpenDeletePopup, setOpenDeletePopup] = useState<boolean>(false);

  const { mutate: mutateDelete } = useMutation({
    mutationFn: memberService.delete,
    onSuccess: () => {
      refetch();
      setSelectedDeleteMember(null);
      setOpenDeletePopup(false);
      toast.success('Delete member successfully!');
    },
  });

  const handleClickClose = () => {
    setSelectedMember(null);
  };

  console.log(data);

  const columns: MUIDataTableColumn[] = [
    { label: 'ID', name: 'id' },
    { label: 'Name', name: 'fullName' },
    {
      label: 'Birthday',
      name: 'birthday',
      options: {
        customBodyRender(value) {
          return format(new Date(value), 'dd-MM-yyyy');
        },
      },
    },

    {
      label: 'Plan Type',
      name: 'gymPlanId',
      options: {
        customBodyRender(value) {
          return (
            <>
              {new Date(value) > new Date() ? (
                <Typography fontSize={'1rem'} fontWeight={'normal'} variant='h6' color='green'>
                  Active
                </Typography>
              ) : (
                <Typography fontSize={'1rem'} fontWeight={'normal'} variant='h6' color='red'>
                  In Active
                </Typography>
              )}
            </>
          );
        },
      },
    },
    {
      label: 'Plan Status',
      name: 'dateExpiration',
      options: {
        customBodyRender(value, tableMeta, updateValue) {
          return (
            <>
              {new Date(value) > new Date() ? (
                <Typography fontSize={'1rem'} fontWeight={'normal'} variant='h6' color='green'>
                  Active
                </Typography>
              ) : (
                <Typography fontSize={'1rem'} fontWeight={'normal'} variant='h6' color='red'>
                  In Active
                </Typography>
              )}
            </>
          );
        },
      },
    },
    { label: 'Gender', name: 'gender' },
    {
      label: '',
      name: '',
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <Stack gap={'0.5rem'} direction={'row'}>
              <Button
                variant='outlined'
                color='info'
                startIcon={<VisibilityIcon />}
                onClick={() => {
                  const rowIndex = tableMeta.rowIndex;
                  const selectedMember = data?.items[rowIndex];
                  if (selectedMember) {
                    handleViewDetail(selectedMember);
                  }
                }}
              >
                View
              </Button>
              <Button
                variant='outlined'
                color='success'
                startIcon={<EditIcon />}
                onClick={() => {
                  const rowIndex = tableMeta.rowIndex;
                  const selectedMember = data?.items[rowIndex];
                  if (selectedMember) {
                    handleEditDetail(selectedMember);
                  }
                }}
              >
                Edit
              </Button>
            </Stack>
          );
        },
      },
    },
  ];

  const options: MUIDataTableOptions = {
    filterType: 'checkbox',
    tableBodyMaxHeight: '100',
    print: false,
    download: false,
    selectableRows: 'single',
    responsive: 'standard',
    customToolbarSelect(selectedRows, displayData, setSelectedRows) {
      return (
        <>
          <Button
            startIcon={<DeleteOutline />}
            sx={{ '&:hover': { color: 'red' }, color: 'grey' }}
            onClick={() => {
              setSelectedDeleteMember(data?.items[selectedRows.data[0].index]);
              setOpenDeletePopup(true);
            }}
          >
            Delete
          </Button>
        </>
      );
    },
  };

  const handleViewDetail = (member: Member) => {
    setStatusModal('view');
    setSelectedMember(member);
  };

  const handleEditDetail = (member: Member) => {
    setStatusModal('edit');
    setSelectedMember(member);
  };

  return (
    <Box className='children-box' component={'div'} height={'100%'} mt={4}>
      <Typography className='mt-8 mb-16' variant='h3' py={2} color={'var(--primary)'} fontWeight={700}>
        Member Management
      </Typography>
      {data && <MUIDataTable title='Gym members' data={data.items} columns={columns} options={options} />}
      {statusModal === 'view' && selectedMember && (
        <MemberCard onClickClose={handleClickClose} member={selectedMember} />
      )}
      {statusModal === 'edit' && selectedMember && (
        <MemberEditForm onClose={handleClickClose} member={selectedMember} />
      )}
      {selectedDeleteMember && (
        <ConfirmDeletePopup
          isOpen={isOpenDeletePopup}
          onClose={() => setOpenDeletePopup(false)}
          onDelete={() => mutateDelete(selectedDeleteMember.id)}
          itemName={selectedDeleteMember.name}
        />
      )}
    </Box>
  );
};

export default ManagerManagement;
