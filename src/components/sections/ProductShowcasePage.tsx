import React from "react";
import "./ProductShowcasePage.css";
import { Link } from "react-router-dom";

const products = [
  {
    name: "Shopify Store Redesign",
    description: "A modern, responsive Shopify theme for a fashion retailer.",
    image: "/images/cc-resorts-product.png",
    link: "https://yourshopifystore.com",
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
