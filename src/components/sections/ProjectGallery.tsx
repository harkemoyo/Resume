import React from 'react';
import './modal.css';
import { Link } from 'react-router-dom';

interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  link: string;
}

interface ProjectGalleryProps {
  images: ProjectImage[];
  projectTitle: string;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, projectTitle }) => {
  return (
    <div className="project-gallery">
      <h4>{projectTitle}</h4>
      <div className="gallery-grid">
        {images.map((image) => (
          <div key={image.id} className="gallery-item">
            <img 
              src={`${process.env.PUBLIC_URL}${image.src}`} 
              alt={image.alt} 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                console.error(`Failed to load image: ${image.src}`);
                target.style.display = 'none';
              }}
            />
            <div className="gallery-overlay">
              <Link 
                to='/product-showcase'
                className="gallery-link"
              >
                {image.category}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
