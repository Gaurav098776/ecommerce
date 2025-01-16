'use client'
import Image from 'next/image';


// Define a constant for repeated Tailwind CSS class strings

const cardClasses = "bg-card p-4 rounded-lg shadow-md";
const imageContainerClasses = "relative w-full h-48";
const productContainerClasses = "max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10";

const ProductCard = ({ imageSrc, altText, productName, price }) => (
  <div className={cardClasses}>
    <div className={imageContainerClasses}>
      <Image
        src={imageSrc}
        alt={altText}
        fill
        className="object-cover rounded-t-lg"
      />
    </div>
    <div className="mt-4">
      <h3 className="text-lg font-semibold">{productName}</h3>
      <p className="text-muted-foreground">{price}</p>
      {/* <button className={buttonClasses}>
        Add to Cart
      </button> */}
    </div>
  </div>
);

const ProductGrid = () => {
  const products = [
    { id: 1, name: "Product Name 1", price: "$29.99", image: '/img/01.jpg', alt: "Product 1 Image" },
    { id: 2, name: "Product Name 2", price: "$39.99", image: "/img/02.jpg", alt: "Product 2 Image" },
    { id: 3, name: "Product Name 3", price: "$49.99", image: "/img/03.jpg", alt: "Product 3 Image" },
    { id: 4, name: "Product Name 4", price: "$59.99", image: "/img/04.jpg", alt: "Product 4 Image" },
    { id: 5, name: "Product Name 5", price: "$69.99", image: "/img/05.jpg", alt: "Product 5 Image" },
    { id: 6, name: "Product Name 6", price: "$79.99", image: "/img/03.jpg", alt: "Product 6 Image" },
  ];

  return (
    <div className="bg-background text-primary-foreground">
      <div className={productContainerClasses}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            imageSrc={product.image}
            altText={product.alt}
            productName={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
