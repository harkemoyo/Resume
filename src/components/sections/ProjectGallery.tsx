
import React, { useState } from 'react';

interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
}

interface ProjectGalleryProps {
  images: ProjectImage[];
  projectTitle: string;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, projectTitle }) => {
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);

  const openModal = (image: ProjectImage) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="project-gallery">
      <h4>Project Showcase</h4>
      <div className="gallery-grid">
        {images.map((image) => (
          <div key={image.id} className="gallery-item" onClick={() => openModal(image)}>
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
              <span className="gallery-title">{image.title}</span>
              <span className="gallery-category">{image.category}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <div className="modal-info">
              <h5>{selectedImage.title}</h5>
              <p>{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
