/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { DataGrid, GridColDef, useGridApiRef, GridApi } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import ActionMenu from './ActionMenu';
import { getBrands, deleteBrand } from 'services/brandService';
import AddBrand from '../brands/AddBrand'; // Import the AddBrand component
import { Drawer } from '@mui/material'; // Import Drawer from Material UI

interface Category {
  _id: string;
  name: string;
  description: string;
}

const actions = [
  { id: 1, icon: 'mage:edit', title: 'Edit' },
  { id: 2, icon: 'mage:trash', title: 'Delete' },
];

const BrandTable = ({ searchText }: any) => {
  const [brandData, setBrandData] = useState<Category[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false); // State to control the drawer
  const [selectedBrand, setSelectedBrand] = useState<Category | null>(null); // State to store selected brand for editing
  const apiRef = useGridApiRef<GridApi>();
  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (!hasFetchedData.current) {
      hasFetchedData.current = true;
      getBrands()
        .then((data) => setBrandData(data))
        .catch((error) => console.error('Error fetching categories:', error));
    }
  }, []);

  useEffect(() => {
    apiRef.current.setQuickFilterValues(
      searchText?.split(/\b\W+\b/).filter((word: any) => word !== ''),
    );
  }, [searchText]);

  const handleActionClick = (actionId: number, categoryId: string) => {
    switch (actionId) {
      case 1: // Edit action
        // eslint-disable-next-line no-case-declarations
        const brandToEdit = brandData.find((brand) => brand._id === categoryId);
        setSelectedBrand(brandToEdit || null); // Set the brand to edit
        setOpenDrawer(true); // Open the drawer
        break;
      case 2: // Delete action
        handleDelete(categoryId);
        break;
      default:
        break;
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Brand Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    {
      field: 'action',
      headerName: 'Actions',
      headerAlign: 'right',
      align: 'right',
      editable: false,
      sortable: false,
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <ActionMenu
          actions={actions}
          onActionClick={(actionId) => handleActionClick(actionId, params.row._id)}
        />
      ),
    },
  ];

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteBrand(id)
        .then(() => {
          setBrandData((prevData) => prevData.filter((category) => category._id !== id));
        })
        .catch((error) => console.error('Error deleting category:', error));
    }
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedBrand(null); // Reset selected brand
  };

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          apiRef={apiRef}
          density="standard"
          columns={columns}
          rows={brandData}
          rowHeight={50}
          getRowId={(row) => row._id}
          disableColumnResize
          disableColumnMenu
          disableColumnSelector
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { pageSize: 4 } },
          }}
          slots={{
            pagination: DataGridFooter,
          }}
          pageSizeOptions={[4]}
        />
      </div>

      {/* Side Drawer for Editing Brand */}
      <Drawer anchor="right" open={openDrawer} onClose={handleCloseDrawer}>
        <AddBrand brand={selectedBrand} onClose={handleCloseDrawer} isEditMode={true} />
      </Drawer>
    </>
  );
};

export default BrandTable;
