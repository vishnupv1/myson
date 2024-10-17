/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent } from 'react';
import { Box, Button, TextField, Paper, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageLoader from 'components/loader/PageLoader';
import { addCategory } from 'services/categoryService';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    category: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false }); // Reset error on change
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.description) {
      setErrors({
        name: !formData.name,
        category: !formData.description,
      });
      return;
    }
    setLoading(true);
    addCategory(formData)
      .then((newCategory) => {
        console.log('Category added:', newCategory);
        navigate('/categories');
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error adding category:', error);
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <Paper sx={{ p: 3 }}>
          <Box component="form" sx={{ mb: 3 }} onSubmit={handleSubmit}>
            {/* Product Name Field */}
            <FormControl fullWidth variant="filled" sx={{ mt: 3, mb: 2 }}>
              <InputLabel htmlFor="name">Category Name</InputLabel>
              <TextField
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                variant="outlined"
                error={errors.name}
                helperText={errors.name ? 'Product name is required' : ''}
                fullWidth
              />
            </FormControl>

            {/* Description Field */}
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
                helperText={errors.category ? 'Description is required' : ''}
                error={errors.category}
              />
            </FormControl>
            {/* Submit Button */}
            <Button type="submit" variant="contained" size="large" sx={{ mt: 3 }} fullWidth>
              Add Category
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default AddCategory;
