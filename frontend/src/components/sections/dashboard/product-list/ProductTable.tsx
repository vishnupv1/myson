/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, useGridApiRef, GridApi } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import Image from 'components/base/Image';
import { formatNumber } from 'helpers/formatNumber';
import { getProducts, deleteProduct } from 'services/productService'; // Import deleteProduct service
import ActionMenu from './ActionMenu';
import { Drawer } from '@mui/material';
import AddProduct from '../products/AddProduct';

const actions = [
  { id: 1, icon: 'mage:edit', title: 'Edit' },
  { id: 2, icon: 'mage:trash', title: 'Delete' }, // Delete action
];

interface TaskOverviewTableProps {
  searchText: string;
}

const ProductTable = ({ searchText }: TaskOverviewTableProps) => {
  const [productsData, setProductsData] = useState<any[]>([]);
  const apiRef = useGridApiRef<GridApi>();
  const hasFetchedData = useRef(false); // Ref to track if data has been fetched
  const [openDrawer, setOpenDrawer] = useState(false); // State to control the drawer
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null); // State to store selected brand for editing
  // Fetch products when the component mounts
  useEffect(() => {
    if (!hasFetchedData.current) {
      hasFetchedData.current = true; // Mark data as fetched
      getProducts()
        .then((data) => setProductsData(data)) // Assuming data is in correct format
        .catch((error) => console.error('Error fetching products:', error));
    }
  }, []);

  // Handle search filter
  useEffect(() => {
    apiRef.current.setQuickFilterValues(searchText.split(/\b\W+\b/).filter((word) => word !== ''));
  }, [searchText]);

  // Handle action clicks from the menu
  const handleActionClick = (actionId: number, productId: string) => {
    switch (actionId) {
      case 1: // Edit action
        // eslint-disable-next-line no-case-declarations
        const brandToEdit = productsData.find((product) => product._id === productId);
        setSelectedProduct(brandToEdit || null); // Set the brand to edit
        setOpenDrawer(true); // Open the drawer
        break;
      case 2: // Delete action
        handleDelete(productId);
        break;
      default:
        break;
    }
  };

  // Delete a product by ID
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Optional confirmation dialog
      deleteProduct(id)
        .then(() => {
          setProductsData((prevData) => prevData.filter((product) => product._id !== id));
        })
        .catch((error) => console.error('Error deleting product:', error));
    }
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedProduct(null); // Reset selected brand
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Product Name',
      editable: false,
      align: 'left',
      flex: 2,
      minWidth: 220,
      renderCell: (params) => (
        <Stack height={1} spacing={1.5} alignItems="center" justifyContent="flex-start">
          <Image
            src={params?.row?.images ? params?.row?.images[0] : ''} // Assuming the image field in product data
            height={30}
            width={30}
            sx={{ objectFit: 'cover', borderRadius: 1.5 }}
          />
          <Typography variant="caption" fontWeight={600}>
            {params.row.name} {/* Assuming 'name' in product data */}
          </Typography>
        </Stack>
      ),
      sortComparator: (v1, v2) => v1.localeCompare(v2),
    },
    {
      field: 'price',
      headerName: 'Price',
      headerAlign: 'left',
      editable: false,
      flex: 1,
      minWidth: 140,
      renderCell: (params) => (
        <Typography variant="caption">
          {formatNumber(params.value, {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2,
          })}
        </Typography>
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      headerAlign: 'right',
      align: 'right',
      editable: false,
      flex: 1,
      minWidth: 100,
      renderCell: (params) => <Typography variant="caption">{params.value}</Typography>,
    },
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

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          apiRef={apiRef}
          density="standard"
          columns={columns}
          rows={productsData} // Use fetched product data
          rowHeight={50}
          getRowId={(row) => row._id}
          disableColumnResize
          disableColumnMenu
          disableColumnSelector
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { pageSize: 4 } },
          }}
          autosizeOptions={{
            includeOutliers: true,
            includeHeaders: false,
            outliersFactor: 1,
            expand: true,
          }}
          slots={{
            pagination: DataGridFooter,
          }}
          pageSizeOptions={[4]}
        />
      </div>
      <Drawer anchor="right" open={openDrawer} onClose={handleCloseDrawer}>
        <AddProduct product={selectedProduct} onClose={handleCloseDrawer} isEditMode={true} />
      </Drawer>
    </>
  );
};

export default ProductTable;
