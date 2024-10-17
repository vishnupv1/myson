/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Paper,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
} from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import PageLoader from 'components/loader/PageLoader';
import { addBrand, editBrand } from 'services/brandService';
import { useNavigate } from 'react-router-dom';
import IconifyIcon from 'components/base/IconifyIcon';

const AddBrand = ({
  brand,
  onClose,
  isEditMode,
}: {
  brand?: any;
  onClose?: () => void;
  isEditMode?: boolean;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    description: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode && brand) {
      setFormData({
        name: brand.name,
        description: brand.description,
      });
    }
  }, [isEditMode, brand]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      setErrors({
        name: !formData.name,
        description: !formData.description,
      });
      return;
    }

    setLoading(true);

    const action = isEditMode ? editBrand : addBrand; // Choose the appropriate service function

    action(formData, brand?._id) // Pass brand ID for updates
      .then((result) => {
        console.log(`${isEditMode ? 'Brand updated' : 'Brand added'}:`, result);
        onClose?.();
        navigate('/brands');
        window.location.reload();
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error ${isEditMode ? 'updating' : 'adding'} brand:`, error);
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <Paper sx={{ p: 3 }}>
          <Box
            component="form"
            sx={{ mb: 3, display: 'flex', flexDirection: 'column' }}
            onSubmit={handleSubmit}
          >
            {isEditMode && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 4,
                }}
              >
                <Typography>Update Brand</Typography>
                <IconButton
                  onClick={() => {
                    onClose?.();
                  }}
                >
                  <IconifyIcon icon="solar:close-circle-linear" color="neutral.dark" />
                </IconButton>
              </Box>
            )}
            <FormControl fullWidth variant="filled" sx={{ mt: 3, mb: 2 }}>
              <InputLabel htmlFor="name">Brand Name</InputLabel>
              <TextField
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                variant="outlined"
                error={errors.name}
                helperText={errors.name ? 'Brand name is required' : ''}
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth variant="filled" sx={{ mt: 3, mb: 2 }}>
              <InputLabel htmlFor="description">Description</InputLabel>
              <TextField
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
                helperText={errors.description ? 'Description is required' : ''}
                error={errors.description}
              />
            </FormControl>
            <Button type="submit" variant="contained" size="large" sx={{ mt: 3 }} fullWidth>
              {isEditMode ? 'Update Brand' : 'Add Brand'}
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default AddBrand;
