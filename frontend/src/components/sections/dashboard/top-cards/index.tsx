import Grid from '@mui/material/Grid';
import TopCard from './TopCard';
import { useEffect, useState } from 'react';
import { getProducts } from '../../../../services/productService';

export interface TopCard {
  id: string | number;
  icon: string;
  title: string;
  count: number;
  iconColor: string;
  iconBg: string;
}

const TopCards = () => {
  // const [products, setProducts] = useState([]);
  const [topCardsData, setTopCardsData] = useState<TopCard[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        // setProducts(data);.
        // Update topCardsData based on fetched products
        setTopCardsData([
          {
            id: 1,
            icon: 'solar:washing-machine-bold-duotone',
            title: 'Products',
            count: data.length,
            iconColor: 'error.light',
            iconBg: 'transparent.error.light',
          },
          // Additional card data can go here if needed
        ]);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <Grid container spacing={3.75}>
      {topCardsData.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} lg={3}>
          <TopCard data={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
