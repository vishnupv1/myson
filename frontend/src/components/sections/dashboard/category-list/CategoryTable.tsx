/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { DataGrid, GridColDef, useGridApiRef, GridApi } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import { getCategory, deleteCategory } from 'services/categoryService';
import ActionMenu from './ActionMenu';

interface Category {
  _id: string;
  name: string;
  description: string;
  // Add other fields as necessary
}

const actions = [
  { id: 1, icon: 'mage:edit', title: 'Edit' },
  { id: 2, icon: 'mage:trash', title: 'Delete' }, // Delete action
];

const CategoryTable = ({ searchText }: any) => {
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const apiRef = useGridApiRef<GridApi>();
  const hasFetchedData = useRef(false); // Ref to track if data has been fetched

  // Fetch categories when the component mounts
  useEffect(() => {
    if (!hasFetchedData.current) {
      hasFetchedData.current = true; // Mark data as fetched
      getCategory()
        .then((data) => setCategoryData(data))
        .catch((error) => console.error('Error fetching categories:', error));
    }
  }, []);

  // Handle search filter
  useEffect(() => {
    apiRef.current.setQuickFilterValues(
      searchText.split(/\b\W+\b/).filter((word: any) => word !== ''),
    );
  }, [searchText]);

  // Handle action clicks from the menu
  const handleActionClick = (actionId: number, categoryId: string) => {
    switch (actionId) {
      case 1: // Edit action
        console.log(`Edit category with id: ${categoryId}`);
        // Implement edit functionality here
        break;
      case 2: // Delete action
        handleDelete(categoryId);
        break;
      default:
        break;
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Category Name', flex: 1 },
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

  // Delete a category by ID
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      // Optional confirmation dialog
      deleteCategory(id)
        .then(() => {
          setCategoryData((prevData) => prevData.filter((category) => category._id !== id));
        })
        .catch((error) => console.error('Error deleting category:', error));
    }
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        apiRef={apiRef}
        density="standard"
        columns={columns}
        rows={categoryData}
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
  );
};

export default CategoryTable;
