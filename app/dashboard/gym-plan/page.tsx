'use client';
import React, { useState } from 'react';
import { MUIDataTableColumn, MUIDataTableOptions } from 'mui-datatables';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Add, DeleteOutline } from '@mui/icons-material';
import dynamic from 'next/dynamic';
import { GymPlanResponse } from '@/app/_models/GymPlanResponse';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import GymPlanDetails from '@/components/GymPlanDetailComponent/ViewGymPlanDetails';
import EditGymPlanForm from '@/components/GymPlanDetailComponent/EditGymPlanForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { planService } from '@/app/_services/plan';
import { Plan } from '@/app/_services/plan/types';
import { toast } from 'react-toastify';
import CreateGymPlanForm from '@/components/GymPlanDetailComponent/CreateGymPlanForm';
import { ConfirmDeletePopup } from '@/components';

const MUIDataTable = dynamic(() => import('mui-datatables'), {
  ssr: false,
});

const GymPlanManagement = () => {
  const { data = [] } = useQuery({ queryKey: ['plans'], queryFn: () => planService.getPlans() });

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedDeletePlan, setSelectedDeletePlan] = useState<Plan | null>(null);
  const [statusModal, setStatusModal] = useState<'view' | 'edit'>();
  const [isOpenCreateForm, setOpenCreateForm] = useState(false);
  const [isOpenDeletePopup, setOpenDeletePopup] = useState(false);

  const handleClickClose = () => {
    setSelectedPlan(null);
  };
  const handleClickCloseEditForm = () => {
    setSelectedPlan(null);
  };

  const queryClient = useQueryClient();

  const { mutate: mutateDelete } = useMutation({
    mutationFn: planService.deletePlan,
    onSuccess: () => {
      toast.success('Delete plan successfully!');
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      setSelectedDeletePlan(null);
      setOpenDeletePopup(false);
    },
  });

  const options: MUIDataTableOptions = {
    filterType: 'checkbox',
    tableBodyMaxHeight: '100',
    print: false,
    download: false,
    selectableRows: 'single',
    customToolbarSelect(selectedRows, displayData, setSelectedRows) {
      return (
        <>
          <Button
            startIcon={<DeleteOutline />}
            sx={{ '&:hover': { color: 'red' }, color: 'grey' }}
            onClick={() => {
              console.log('selectedRows', selectedRows);
              setSelectedDeletePlan(data[selectedRows.data[0].index]);
              setOpenDeletePopup(true);
            }}
          >
            Delete
          </Button>
        </>
      );
    },
    searchAlwaysOpen: true,
    responsive: 'standard',
    customToolbar(data) {
      return (
        <Button sx={{ '&:hover': { color: 'green' }, color: 'grey' }}>
          <Add></Add>
        </Button>
      );
    },
  };

  const columns: MUIDataTableColumn[] = [
    { label: 'Plan Name', name: 'name' },
    { label: 'Price (VND)', name: 'price' },
    {
      label: 'Register',
      name: 'registerNumber',
    },
    {
      label: 'Status',
      name: 'activate',
      options: {
        customBodyRender(value, tableMeta, updateValue) {
          return (
            <>
              {value ? (
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
      label: 'Action',
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
                  let rowIndex = tableMeta.rowIndex;
                  let selectedPlan = data[rowIndex];
                  setSelectedPlan(selectedPlan);
                  setStatusModal('view');
                }}
              >
                View
              </Button>
              <Button
                variant='outlined'
                color='success'
                startIcon={<EditIcon />}
                onClick={() => {
                  let rowIndex = tableMeta.rowIndex;
                  let selectedPlan = data[rowIndex];
                  setSelectedPlan((previous) => {
                    return (previous = selectedPlan);
                  });
                  setStatusModal('edit');
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
  return (
    <Box className='children-box' component={'div'} height={'100%'}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography className='mt-8 mb-16' variant='h3' my={2} color='black'>
          Gym Plan Management
        </Typography>
        <Button variant='contained' sx={{ height: 'fit-content' }} onClick={() => setOpenCreateForm(true)}>
          Create new
        </Button>
      </Box>

      {selectedPlan !== null && statusModal === 'view' && (
        <GymPlanDetails onClickClose={handleClickClose} gymPlan={selectedPlan} />
      )}
      <Box sx={{ overflowX: 'scroll' }} width={'100%'}>
        {data && <MUIDataTable title='Gym Owner Management' data={data} columns={columns} options={{ ...options }} />}
      </Box>
      {selectedPlan !== null && statusModal === 'edit' && (
        <EditGymPlanForm gymPlan={selectedPlan as any} onCancel={handleClickCloseEditForm} />
      )}
      {isOpenCreateForm && <CreateGymPlanForm onCancel={() => setOpenCreateForm(false)} />}
      {selectedDeletePlan && (
        <ConfirmDeletePopup
          isOpen={isOpenDeletePopup}
          onClose={() => setOpenDeletePopup(false)}
          onDelete={() => mutateDelete(selectedDeletePlan.id)}
          itemName={selectedDeletePlan.name}
        />
      )}
    </Box>
  );
};

export default GymPlanManagement;
