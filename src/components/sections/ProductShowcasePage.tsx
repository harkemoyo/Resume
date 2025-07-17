import React from "react";
import "./ProductShowcasePage.css";

const products = [
  {
    name: "Shopify Store Redesign",
    description: "A modern, responsive Shopify theme for a fashion retailer.",
    image: "/images/shopify-store.png",
    link: "https://yourshopifystore.com"
  },
  {
    name: "Portfolio Website",
    description: "Personal portfolio with React, animations, and a custom CMS.",
    image: "/images/portfolio.png",
    link: "https://harkemoyo.github.io/Resume"
  },
  {
    name: "E-commerce Dashboard",
    description: "Admin dashboard for managing products, orders, and analytics.",
    image: "/images/dashboard.png",
    link: "#"
  }
];

const ProductShowcasePage: React.FC = () => (
  <div className="content-section">
    <div className="section-header">
      <h2>Product Showcase</h2>
      <p className="section-subtitle">See some of my featured projects and products.</p>
    </div>
    <div className="product-grid">
      {products.map((product, idx) => (
        <div className="product-card" key={idx}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <a href={product.link} target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default ProductShowcasePage;
