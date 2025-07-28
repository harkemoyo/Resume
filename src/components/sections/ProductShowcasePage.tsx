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
    name: "PortfolioScroll-Activated Media Section with Smart Video Fallback",
    description: "I developed a scroll-activated media section for a Shopify store that enhances the user experience through synchronized visuals and text. As the user scrolls down the page, the accompanying image or video dynamically changes to match the content, creating an engaging storytelling flow. The section supports autoplaying, looping desktop videos with lazy loading for performance optimization, and includes responsive fallback images using srcset for sharp display across devices. A key achievement in this implementation is the smart fallback functionality — when no video is available, a default image is automatically shown, preserving the layout and ensuring consistent visual design. The aspect ratio is maintained using dynamic CSS variables, allowing for seamless integration into any section. This feature elevates the shopping experience by combining rich media, motion, and performance-conscious design.",
    image: "/images/fireblanket.png",
    link: "https://fireblanket.com/products/emergency-fire-blanket",
    loomUrl: "https://www.loom.com/embed/placeholder2"
  },
  {
    name: "Dynamic Key Features Section Powered by Metafields",
    description: "I built a reusable “Key Features” section for product pages that automatically pulls in feature data from multiple custom metafields—such as brackets, surface kits, closet rods, hooks, and more—and displays them in a scrollable, image‑paired layout. The section detects which feature set is populated for a given product, calculates the optimal media aspect ratio based on your settings, and then renders each feature block with its icon, heading, description, and optional segment‑rating UI. As users scroll through the list, the background, image, and text update in sync, while navigation dots indicate the current feature. All styling—colors, gradients, text, and layout—can be controlled through the theme editor, making it easy for merchants to highlight different product highlights without touching any code.",
    image: "/images/toden.png",
    link: "https://todenind.com/collections/ultimate-garage-storage-solutions/products/long-shelving-surface-storage-hook-installation-kit-16-inch",
    loomUrl: "https://www.loom.com/embed/placeholder3"
  },
  {
    name: "Design to Code Landing Page with Carousel",
    description: "I converted the Little Book landing page from design mockups into a fully responsive and interactive webpage using clean, semantic HTML, CSS, and JavaScript. The layout was meticulously recreated to match the original design, including precise typography, spacing, and visual structure. As part of the interactive features, I implemented a carousel component to showcase content or testimonials in a dynamic, scrollable format, enhancing user engagement. The entire page is optimized for all devices and includes smooth scrolling, fast-loading assets, and a mobile-friendly experience. This project showcases my ability to bring static designs to life with interactive elements and attention to performance and usability.",
    image: "/images/littlebook.png",
    link: "https://littlebookleague.com/",
    loomUrl: "https://www.loom.com/embed/placeholder3"
  },
  {
    name: "Funeral Home Landing Page",
    description: "I converted the funeral home landing page from design mockups into a fully responsive and interactive webpage using clean, semantic HTML, CSS, and JavaScript. The layout was meticulously recreated to match the original design, including precise typography, spacing, and visual structure. As part of the interactive features, I implemented a carousel component to showcase content or testimonials in a dynamic, scrollable format, enhancing user engagement. The entire page is optimized for all devices and includes smooth scrolling, fast-loading assets, and a mobile-friendly experience. This project showcases my ability to bring static designs to life with interactive elements and attention to performance and usability.",
    image: "/images/funeral.png",
    link: "https://funeralhomes.contact/",
    loomUrl: "https://www.loom.com/embed/placeholder3"
  },
  {
    name: "Vazi App Landing Page",
    description: "I converted the funeral home landing page from design mockups into a fully responsive and interactive webpage using clean, semantic HTML, CSS, and JavaScript. The layout was meticulously recreated to match the original design, including precise typography, spacing, and visual structure. As part of the interactive features, I implemented a carousel component to showcase content or testimonials in a dynamic, scrollable format, enhancing user engagement. The entire page is optimized for all devices and includes smooth scrolling, fast-loading assets, and a mobile-friendly experience. This project showcases my ability to bring static designs to life with interactive elements and attention to performance and usability.",
    image: "/images/vazi.png",
    link: "https://vazi.app/",
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
