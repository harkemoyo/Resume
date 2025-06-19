import React, { useState, useRef } from 'react';
import '../styles/PDFUploader.css';
import { extractPDFContent, parseResumeContent, PDFContent } from '../utils/pdfProcessor';

interface PDFUploaderProps {
  onFileUpload?: (file: File) => void;
  onContentExtracted?: (content: PDFContent, sections: Record<string, string>) => void;
}

/**
 * PDF Uploader Component
 * 
 * Allows users to upload PDF files with drag and drop or file selection
 * 
 * @component
 * @param {PDFUploaderProps} props - Component props
 * @returns {JSX.Element} The PDF uploader component
 */
const PDFUploader: React.FC<PDFUploaderProps> = ({ onFileUpload, onContentExtracted }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedContent, setExtractedContent] = useState<PDFContent | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  // Validate file type and set the file
  const validateAndSetFile = (file: File) => {
    setErrorMessage(null);
    
    // Check if file is a PDF
    if (file.type !== 'application/pdf') {
      setErrorMessage('Please upload a PDF file');
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size should be less than 5MB');
      return;
    }
    
    setSelectedFile(file);
    
    // Call the onFileUpload callback if provided
    if (onFileUpload) {
      onFileUpload(file);
    }
    
    // Extract content from PDF
    extractPDFContent(file).then(content => {
      setIsExtracting(true);
      try {
        setExtractedContent(content);
        const sections = parseResumeContent(content.text);
        
        // Call the onContentExtracted callback if provided
        if (onContentExtracted) {
          onContentExtracted(content, sections);
        }
      } catch (err) {
        console.error('Error processing PDF content:', err);
        setErrorMessage('Error extracting content from PDF');
      } finally {
        setIsExtracting(false);
      }
    }).catch(err => {
      console.error('Error extracting PDF content:', err);
      setErrorMessage('Error extracting content from PDF');
      setIsExtracting(false);
    });
  };

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  // Trigger file input click
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="pdf-uploader">
      <h3>Upload Resume or CV</h3>
      
      <div 
        className={`drop-area ${isDragging ? 'dragging' : ''} ${selectedFile ? 'has-file' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf"
          className="file-input"
        />
        
        {selectedFile ? (
          <div className="file-info">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <div>
              <p className="file-name">{selectedFile.name}</p>
              <p className="file-size">{(selectedFile.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
        ) : (
          <div className="upload-prompt">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <p>Drag and drop your PDF here or <span className="browse-text">browse</span></p>
            <p className="file-hint">PDF files only, max 5MB</p>
          </div>
        )}
      </div>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      {isExtracting && <p className="extracting-message">Extracting content from PDF...</p>}
      
      {selectedFile && (
        <div className="action-buttons">
          <button 
            className="view-button"
            onClick={(e) => {
              e.stopPropagation();
              window.open(URL.createObjectURL(selectedFile), '_blank');
            }}
          >
            View PDF
          </button>
          <button 
            className="remove-button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFile(null);
              setExtractedContent(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
          >
            Remove
          </button>
        </div>
      )}
      
      {extractedContent && extractedContent.images.length > 0 && (
        <div className="extracted-images">
          <h4>Extracted Images ({extractedContent.images.length})</h4>
          <div className="image-preview-container">
            {extractedContent.images.map((imgSrc, index) => (
              <div key={index} className="image-preview">
                <img src={imgSrc} alt={`Extracted image ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
