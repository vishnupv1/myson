import { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconifyIcon from 'components/base/IconifyIcon';
import DataTable from './ProductTable';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CategoryList = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleAddProduct = () => {
    navigate('/product/add'); // Navigate to the AddProduct page
  };

  return (
    <Paper sx={{ height: { xs: 418, sm: 370 }, overflow: 'hidden' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        mt={-0.5}
        spacing={1.5}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6" color="text.secondary">
          Products
        </Typography>
        <TextField
          variant="filled"
          size="small"
          placeholder="Search here"
          value={searchText}
          onChange={handleInputChange}
          sx={{ width: 1, maxWidth: { xs: 260, sm: 240 } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconifyIcon icon="prime:search" />
              </InputAdornment>
            ),
          }}
        />
        <Button sx={{ color: 'white' }} variant="contained" onClick={handleAddProduct}>
          Add
        </Button>
      </Stack>

      <Box mt={{ xs: 1.5, sm: 0.75 }} height={305} flex={1}>
        <DataTable searchText={searchText} />
      </Box>
    </Paper>
  );
};

export default CategoryList;
