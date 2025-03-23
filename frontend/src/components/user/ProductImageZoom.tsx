import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

type ProductImageZoomProps = {
  imageSrc: string;
};

const ProductImageZoom: React.FC<ProductImageZoomProps> = ({ imageSrc }) => {
  return (
    <div className="product-image-zoom">
      <Zoom>
        <img
          src={imageSrc}
          alt="Product"
          // style={{ width: '100%', height: '500px', objectFit: 'cover', border:'solid 1px whitesmoke' }}
        />
      </Zoom>
    </div>
  );
};

export default ProductImageZoom;
