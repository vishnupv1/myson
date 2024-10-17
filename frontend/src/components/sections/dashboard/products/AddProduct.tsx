/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  MenuItem,
  Paper,
  IconButton,
  InputLabel,
  FormControl,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { addProduct, editProduct } from 'services/productService'; // Added editProduct
import { useNavigate } from 'react-router-dom';
import PageLoader from 'components/loader/PageLoader';
import { getCategory } from 'services/categoryService';

const AddProduct = ({
  product,
  onClose,
  isEditMode,
}: {
  product?: any;
  onClose?: () => void;
  isEditMode?: boolean;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    images: [] as string[],
  });

  const [errors, setErrors] = useState({
    name: false,
    category: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (!hasFetchedData.current) {
      hasFetchedData.current = true;
      getCategory()
        .then((data) => setCategoryData(data))
        .catch((error) => console.error('Error fetching categories:', error));
    }

    // Populate form data when editing
    if (isEditMode && product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description,
        images: product.images || [],
      });
    }
  }, [isEditMode, product]);

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const base64Promises = fileArray.map((file) => convertToBase64(file));

      Promise.all(base64Promises).then((base64Images) => {
        setFormData({ ...formData, images: [...formData.images, ...base64Images] });
      });
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result as string);
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const replaceImage = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newImage = e.target.files[0];
      convertToBase64(newImage).then((base64) => {
        const newImages = [...formData.images];
        newImages[index] = base64;
        setFormData({ ...formData, images: newImages });
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!formData.name || !formData.category) {
      setErrors({
        name: !formData.name,
        category: !formData.category,
      });
      return;
    }

    setLoading(true);

    const action = isEditMode ? editProduct : addProduct; // Select the action based on mode

    action(formData, product?._id) // Pass product ID for update
      .then((result) => {
        console.log(`${isEditMode ? 'Product updated' : 'Product added'}:`, result);
        onClose?.();
        navigate('/products');
        window.location.reload();
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error ${isEditMode ? 'updating' : 'adding'} product:`, error);
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
                <Typography>Update Product</Typography>
                <IconButton onClick={() => onClose?.()}>
                  <IconifyIcon icon="solar:close-circle-linear" color="neutral.dark" />
                </IconButton>
              </Box>
            )}

            {/* Product Name Field */}
            <FormControl fullWidth variant="filled" sx={{ mt: 3, mb: 2 }}>
              <InputLabel htmlFor="name">Product Name</InputLabel>
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

            {/* Category Field */}
            <FormControl fullWidth variant="filled" sx={{ mt: 3, mb: 2 }}>
              <InputLabel htmlFor="category">Category</InputLabel>
              <TextField
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                select
                error={Boolean(errors.category)}
                helperText={errors.category ? 'Category is required' : ''}
                fullWidth
              >
                {categoryData.map((item: any) => (
                  <MenuItem key={item.name} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            {/* Price Field */}
            <FormControl fullWidth variant="filled" sx={{ mt: 3, mb: 2 }}>
              <InputLabel htmlFor="price">Price</InputLabel>
              <TextField
                id="price"
                name="price"
                value={formData.price || 0}
                onChange={handleInputChange}
                type="number"
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
              />
            </FormControl>

            {/* Image Upload Section */}
            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography variant="subtitle1">Product Images</Typography>
              <Button variant="contained" component="label" sx={{ mt: 1, mb: 2 }}>
                Upload Images
                <input type="file" hidden multiple accept="image/*" onChange={handleImageChange} />
              </Button>

              {/* Image Preview */}
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {formData.images.map((image, index) => (
                  <Box key={index} sx={{ position: 'relative', width: 120 }}>
                    <img
                      src={image}
                      alt={`preview-${index}`}
                      style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                    />
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ position: 'absolute', top: 0, right: 0 }}
                    >
                      <IconButton onClick={() => removeImage(index)} color="error">
                        <IconifyIcon icon="mingcute:close-square-line" />
                      </IconButton>
                      <IconButton component="label">
                        <IconifyIcon icon="material-symbols:replace-image-outline-sharp" />
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => replaceImage(index, e)}
                        />
                      </IconButton>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Submit Button */}
            <Button type="submit" variant="contained" size="large" sx={{ mt: 3 }} fullWidth>
              {isEditMode ? 'Update Product' : 'Add Product'}
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default AddProduct;
