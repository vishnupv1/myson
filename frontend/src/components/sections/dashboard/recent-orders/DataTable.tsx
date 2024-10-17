/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, useGridApiRef, GridApi } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import ActionMenu from 'components/common/ActionMenu';
import Image from 'components/base/Image';
import { formatNumber } from 'helpers/formatNumber';
import { getProducts } from 'services/productService'; // Assuming the API service is defined

const actions = [
  { id: 1, icon: 'mage:refresh', title: 'Refresh' },
  { id: 2, icon: 'solar:export-linear', title: 'Export' },
  { id: 3, icon: 'mage:share', title: 'Share' },
];

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
    headerAlign: 'right',
    align: 'right',
    editable: false,
    sortable: false,
    flex: 1,
    minWidth: 100,
    renderHeader: () => <ActionMenu actions={actions} />,
    renderCell: () => <ActionMenu actions={actions} />,
  },
];

interface TaskOverviewTableProps {
  searchText: string;
}

const DataTable = ({ searchText }: TaskOverviewTableProps) => {
  const [productsData, setProductsData] = useState<any[]>([]);
  const apiRef = useGridApiRef<GridApi>();
  const productsFetchedRef = useRef(false); // Use a ref to track if products have been fetched

  useEffect(() => {
    if (productsFetchedRef.current) return; // If products are already fetched, do nothing

    getProducts()
      .then((data) => {
        setProductsData(data); // Assuming data is in correct format
        productsFetchedRef.current = true; // Mark as fetched
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    apiRef.current.setQuickFilterValues(searchText.split(/\b\W+\b/).filter((word) => word !== ''));
  }, [searchText]);

  return (
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
  );
};

export default DataTable;
