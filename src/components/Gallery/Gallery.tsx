import React from 'react';
import Card from '../Card/Card';
import './Gallery.css';

type Product = {
  image?: string;
  name: string;
  description?: string;
  price: number;
};

type GalleryProps = {
  products: Product[];
};

/**
 * Gallery Component
 * 
 * @param {Product[]} products - An array of product objects.
 * @returns {JSX.Element} The Gallery component displaying a list of product cards.
 */
const Gallery: React.FC<GalleryProps> = ({ products }) => {

  if (!products || products.length === 0) {
    return <div className="gallery">No products available</div>;
  }
  return (
    <div className="gallery">
      {products.map((product, index) => (
        <Card
          key={index}
          image={product.image}
          name={product.name}
          description={product.description}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default Gallery;
