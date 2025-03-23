/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { getBrandProducts } from '../../services/productService';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import products from '../../Constants/Products';
import { getCategory } from '../../services/categoryService';
import { FaFilter } from 'react-icons/fa';

interface Category {
  _id: string;
  name: string;
}

const BrandProducts: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [mainProducts, setMainProducts] = useState<any[] | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<any[] | null>(null);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [filters, setFilters] = useState({
    priceRange: 'all',
    category: 'all',
    rating: 'all',
  });
  const [showFilters, setShowFilters] = useState(!isMobile);
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const selectedProducts = await getBrandProducts(name || '');
        setMainProducts(selectedProducts);
        setFilteredProducts(selectedProducts);
      } catch (error) {
        console.error('Error fetching product, falling back to local data:', error);
        const fallbackProducts = products.filter((item) => item.brand === 'Blue Star');
        setMainProducts(fallbackProducts);
        setFilteredProducts(fallbackProducts);
      }
    };

    fetchProducts();
  }, [name]);

  useEffect(() => {
    if (!hasFetchedData.current) {
      hasFetchedData.current = true;
      getCategory()
        .then((data) => setCategoryData(data))
        .catch((error) => console.error('Error fetching categories:', error));
    }
  }, []);

  useEffect(() => {
    if (!mainProducts) return;

    let result = [...mainProducts];

    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter((product) => product.price >= min && product.price <= max);
    }

    if (filters.category !== 'all') {
      result = result.filter((product) => product.category === filters.category);
    }

    if (filters.rating !== 'all') {
      const minRating = Number(filters.rating);
      result = result.filter((product) => product.rating >= minRating);
    }

    setFilteredProducts(result);
  }, [filters, mainProducts]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  if (!mainProducts) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeaderComponent />
      <div className="p-4">
        {isMobile && (
          <Button className="mb-4" onClick={() => setShowFilters(!showFilters)}>
            <FaFilter className="mr-2" />
          </Button>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          {showFilters && (
            <div className="w-full-card md:w-64 bg-white p-4 rounded-lg shadow">
              <h5 className="font-semibold mb-4">Filters</h5>

              <div className="mb-4">
                <label className="font-medium mb-2 block">Price Range</label>
                <Form.Select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full"
                >
                  <option value="all">All Prices</option>
                  <option value="0-1000">₹0 - ₹1000</option>
                  <option value="1001-2000">₹1001 - ₹2000</option>
                  <option value="2001-5000">₹2001 - ₹5000</option>
                  <option value="5001-10000">₹5001+</option>
                </Form.Select>
              </div>

              <div className="mb-4">
                <label className="font-medium mb-2 block">Category</label>
                <Form.Select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full"
                  disabled={categoryData.length === 0}
                >
                  <option value="all">All Categories</option>
                  {categoryData.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
                {categoryData.length === 0 && (
                  <p className="text-sm text-gray-500 mt-1">Loading categories...</p>
                )}
              </div>

              <div className="mb-4">
                <label className="font-medium mb-2 block">Minimum Rating</label>
                <Form.Select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="w-full"
                >
                  <option value="all">All Ratings</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                </Form.Select>
              </div>
            </div>
          )}

          <div className="flex-1" style={{ width: '70%' }}>
            <h4 className="font-semibold mb-4 font-sans">
              {name} ({filteredProducts?.length} Products)
            </h4>
            <div className="brand-card-container">
              {filteredProducts?.map((el) => (
                <Card key={el._id} className="card">
                  <Card.Img className="card-image img-fluid" variant="top" src={el.images[0]} />
                  <Card.Body>
                    <Card.Title className="card-title">{el.name}</Card.Title>
                  </Card.Body>
                  <Button className="card-button">{isMobile ? 'ADD +' : 'ADD TO CART'}</Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default BrandProducts;
