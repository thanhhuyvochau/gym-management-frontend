'use client';
import { EquimentResponse } from '@/app/_models/EquimentResponse';
import { Add } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { MUIDataTableColumn, MUIDataTableOptions } from 'mui-datatables';
import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import CustomizedButtons, { ColorButton } from '@/components/CustomButton/ViewButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EquipmentAddForm from '@/components/DialogForm/EquipmentAddForm';
import dynamic from 'next/dynamic';
import { useMutation, useQuery } from '@tanstack/react-query';
import { inventoryService } from '@/app/_services';
import { Inventory } from '@/app/_services/inventory/types';
import EquipmentEditForm from '@/components/DialogForm/EquipmentEditForm';
import { ConfirmDeletePopup, EquipmentCard } from '@/components';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
const MUIDataTable = dynamic(() => import('mui-datatables'), {
  ssr: false,
});

const EquimentComponent = () => {
  const { data, refetch } = useQuery({ queryKey: ['inventories'], queryFn: () => inventoryService.getInventories() });

  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>();
  const [statusModal, setStatusModal] = useState<'edit' | 'view'>();
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [isOpenEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedDeleteInventory, setSelectedDeleteInventory] = useState<Inventory | null>();
  const [isOpenDeletePopup, setOpenDeletePopup] = useState<boolean>(false);

  const { mutate: mutateDelete } = useMutation({
    mutationFn: inventoryService.delete,
    onSuccess: () => {
      refetch();
      toast.success('Delete equipment successfully');
      setOpenDeletePopup(false);
      setSelectedDeleteInventory(null);
    },
  });

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    console.log('OPEN POPUP');

    setOpen(false);
  };

  const columns: MUIDataTableColumn[] = [
    { label: 'Code', name: 'code' },
    { label: 'Name', name: 'name' },
    {
      label: 'From',
      name: 'expectedDateFrom',
      options: {
        customBodyRender: (value: number) => {
          return format(value, 'dd-MM-yyyy');
        },
      },
    },
    {
      label: 'To',
      name: 'expectedDateTo',
      options: {
        customBodyRender: (value: string) => {
          return format(value, 'dd-MM-yyyy');
        },
      },
    },
    {
      label: 'Cost Per',
      name: 'costPer',
      options: {
        customBodyRender: (value: string) => {
          return value + 'VND';
        },
      },
    },
    {
      label: 'Status',
      name: 'expectedDateTo',
      options: {
        customBodyRender: (value: string) => {
          return new Date(value) > new Date() ? (
            <Typography color='green'>Active</Typography>
          ) : (
            <Typography color='red'>Inactive</Typography>
          );
        },
      },
    },
    { label: 'Quantity', name: 'quantity' },
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
                  const selectedInventory = data?.items[rowIndex];

                  selectedInventory && setSelectedInventory(selectedInventory);
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
                  const rowIndex = tableMeta.rowIndex;
                  const selectedInventory = data?.items[rowIndex];

                  selectedInventory && setSelectedInventory(selectedInventory);
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
            startIcon={<DeleteIcon></DeleteIcon>}
            sx={{ '&:hover': { color: 'red' }, color: 'grey' }}
            onClick={() => {
              setSelectedDeleteInventory(data?.items[selectedRows.data[0].index]);
              setOpenDeletePopup(true);
            }}
          >
            Delete
          </Button>
        </>
      );
    },
    responsive: 'standard',
  };

  return (
    <Box className='children-box' component={'div'} height={'100%'}>
      <Box display='flex' justifyContent='space-between' alignItems='center' my={2}>
        <Typography variant='h3' py={2} color={'var(--primary)'} fontWeight={700}>
          Equipment Management
        </Typography>
        <Button variant='contained' sx={{ height: 'fit-content' }} onClick={() => setOpenCreateModal(true)}>
          Create new
        </Button>
      </Box>
      {data && <MUIDataTable title='Manage Equipments' data={data?.items} columns={columns} options={options} />}
      {selectedInventory && statusModal === 'edit' && (
        <EquipmentEditForm
          inventory={selectedInventory}
          onClose={() => {
            setSelectedInventory(null);
          }}
        />
      )}
      <EquipmentAddForm status={isOpenCreateModal} onClose={() => setOpenCreateModal(false)} />
      {selectedDeleteInventory && (
        <ConfirmDeletePopup
          isOpen={isOpenDeletePopup}
          onClose={() => setOpenDeletePopup(false)}
          onDelete={() => mutateDelete(selectedDeleteInventory.id)}
          itemName={selectedDeleteInventory.name}
        />
      )}
      {selectedInventory && statusModal === 'view' && (
        <EquipmentCard
          inventory={selectedInventory}
          onClickClose={() => {
            setSelectedInventory(null);
          }}
        />
      )}
    </Box>
  );
};

export default EquimentComponent;
