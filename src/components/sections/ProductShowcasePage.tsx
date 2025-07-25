import React from "react";
import "./ProductShowcasePage.css";
import { Link } from "react-router-dom";

const products = [
  {
    name: "Custom Product Variations (Color Selector)",
    description: "In this project, I developed a custom product variation selector that allows customers to seamlessly switch between different versions of a product—such as colors or styles—even though each version exists as a separate product in Shopify. I used Shopify metafields to link related products based on shared attributes (like color) and display them dynamically on the product page. This solution mimics the functionality of a native variant picker but provides greater flexibility and control. I implemented multiple display options for the selector, including color swatches, image thumbnails, text blocks, and combined swatch+block styles. Each variation links to its own unique product page, enhancing inventory management, improving SEO, and delivering a smoother user experience.",
    image: "/images/cc-resorts-product.png",
    link: "https://www.ccresorts.com.au/products/goose-chocolate",
    loomUrl: "https://www.loom.com/embed/placeholder1"
  },
  {
    name: "Portfolio Website",
    description: "Personal portfolio with React, animations, and a custom CMS.",
    image: "/images/toden.png",
    link: "https://harkemoyo.github.io/Resume",
    loomUrl: "https://www.loom.com/embed/placeholder2"
  },
  {
    name: "E-commerce Dashboard",
    description: "Admin dashboard for managing products, orders, and analytics.",
    image: "/images/littlebook.png",
    link: "#",
    loomUrl: "https://www.loom.com/embed/placeholder3"
  }
];

const ProductShowcasePage: React.FC = () => (
  <div className="content-section">
    <div className="section-header">
      <h2>Product Showcase</h2>
      <p className="section-subtitle">See some of my featured projects and products.</p>
    </div>
    <div className="product-showcase-list">
      {products.map((product, idx) => (
        <div className="product-showcase-row" key={idx}>
          <div className="product-showcase-paragraph">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="product-showcase-image">
            <img src={process.env.PUBLIC_URL + product.image} alt={product.name} />
          </div>
            <a href={product.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
          <div className="product-showcase-video">
            <div className="video-wrapper">
              <iframe
                src={product.loomUrl}
                title={`Loom video for ${product.name}`}
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
                style={{ width: '100%', height: '100%' }}
              ></iframe>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProductShowcasePage;
