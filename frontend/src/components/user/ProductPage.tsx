/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import './ProductPage.css';
import ProductImageZoom from './ProductImageZoom';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import { useParams } from 'react-router-dom';
import products from '../../Constants/Products';
import { getSingleProduct } from '../../services/productService';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const selectedProduct = await getSingleProduct(id);
        setProduct(selectedProduct);
        setMainImage(selectedProduct.images[0]);
      } catch (error) {
        console.error('Error fetching product, falling back to local data:', error);
        const fallbackProduct = id ? products.find((item) => item._id === parseInt(id)) : null;

        if (fallbackProduct) {
          setProduct(fallbackProduct);
          setMainImage(fallbackProduct.images[0]);
        }
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <HeaderComponent />
      <div className="product-page">
        <div className="product-image-container">
          <div className="product-main-image">
            <ProductImageZoom imageSrc={mainImage} />
          </div>
          <div className="product-preview-images">
            {product.images?.map((image: any, index: any) => (
              <img
                key={index}
                src={image}
                alt={`Product Preview`}
                className="product-preview-image"
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="product-details">
          <span className="product-name">{product.name}</span>
          <h6 className="product-availability">
            Availability: <span className="availability-status">{product.availability}</span>
          </h6>
          <div className="product-actions">
            <a
              href="https://wa.me/+919447458735?text=Hi, I would like to enquire about your services."
              className="enquire-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire Now
            </a>
          </div>
          <div className="product-description">
            <ol>
              <li>8mm toughened clear glass</li>
              <li>Electronic digital thermostat for refrigeration counter</li>
              <li>Rear removable electrocoated aluminium sliding doors</li>
              <li>6mm shelf glass with ss mirror finish stopper</li>
              <li>High bright LED lighting: pure white / warm white</li>
              <li>304 grade steel finish with matte & mirror combination</li>
              <li>Changeable Corian and engraving work with unique insertion</li>
            </ol>
          </div>
          <div className="more-details">
            <p className="delivery-info">
              Delivery: <span>Within 2 days.</span>
            </p>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <h3 className="specifications-title">Specifications</h3>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.specifications.map((item: any, index: any) => (
                    <tr key={index}>
                      <td className="spec-key">{item.word}</td>
                      <td className="spec-value">{item.word}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default ProductPage;
