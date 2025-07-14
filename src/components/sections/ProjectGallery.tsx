
import React, { useState } from 'react';
import './modal.css';

interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  link?: string;
}

interface ProjectGalleryProps {
  images: ProjectImage[];
  projectTitle: string;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, projectTitle }) => {
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (image: ProjectImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    // Only close modal if click is on overlay
    if (e.target === e.currentTarget) {
      closeModal();
    }
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

      {isModalOpen && selectedImage && (
        <div className="modal-overlay" onClick={handleModalClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <span className="close-icon">×</span>
            </button>
            <div className="modal-image-container">
              <img 
                src={`${process.env.PUBLIC_URL}${selectedImage.src}`} 
                alt={selectedImage.alt} 
                className="modal-image"
              />
            </div>
            <div className="modal-info">
              <div className="info-header">
                <h5>{selectedImage.title}</h5>
                <p className="category-text">{selectedImage.category}</p>
              </div>
              {selectedImage.link && (
                <div className="modal-links">
                  <a 
                    href={selectedImage.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="view-store-btn"
                  >
                    <span className="view-store-icon">🔗</span> View Store
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
