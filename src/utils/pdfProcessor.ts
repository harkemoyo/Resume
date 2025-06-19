import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source - using a local worker path instead of CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

export interface PDFContent {
  text: string[];
  images: string[];
}

/**
 * Extracts text and images from a PDF file
 * @param file The PDF file to process
 * @returns Promise containing extracted text and image data URLs
 */
export const extractPDFContent = async (file: File): Promise<PDFContent> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    const numPages = pdf.numPages;
    const textContent: string[] = [];
    const imageContent: string[] = [];
    
    // Process each page
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      
      // Extract text
      const content = await page.getTextContent();
      const textItems = content.items.map((item: any) => item.str);
      const pageText = textItems.join(' ');
      textContent.push(pageText);
      
      // Extract images
      const operatorList = await page.getOperatorList();
      for (let j = 0; j < operatorList.fnArray.length; j++) {
        const fnId = operatorList.fnArray[j];
        if (fnId === pdfjsLib.OPS.paintImageXObject) {
          const imgIndex = operatorList.argsArray[j][0];
          const img = page.objs.get(imgIndex);
          
          if (img && img.data) {
            // Convert image data to data URL
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            
            const ctx = canvas.getContext('2d');
            if (ctx) {
              const imgData = ctx.createImageData(img.width, img.height);
              imgData.data.set(img.data);
              ctx.putImageData(imgData, 0, 0);
              
              const dataURL = canvas.toDataURL('image/png');
              imageContent.push(dataURL);
            }
          }
        }
      }
    }
    
    return {
      text: textContent,
      images: imageContent
    };
  } catch (error) {
    console.error('Error extracting PDF content:', error);
    throw new Error('Failed to extract content from PDF');
  }
};

/**
 * Parses resume sections from extracted text
 * @param textContent Array of text content from PDF pages
 * @returns Object containing parsed resume sections
 */
export const parseResumeContent = (textContent: string[]): Record<string, string> => {
  const fullText = textContent.join(' ');
  
  // Common resume section headers
  const sectionHeaders = [
    'WORK EXPERIENCE',
    'EXPERIENCE',
    'EMPLOYMENT HISTORY',
    'EDUCATION',
    'SKILLS',
    'PROJECTS',
    'CERTIFICATIONS',
    'AWARDS',
    'LANGUAGES',
    'INTERESTS',
    'REFERENCES'
  ];
  
  const sections: Record<string, string> = {};
  
  // Find sections in the text
  for (let i = 0; i < sectionHeaders.length; i++) {
    const currentHeader = sectionHeaders[i];
    const nextHeader = sectionHeaders[i + 1];
    
    const startIndex = fullText.indexOf(currentHeader);
    
    if (startIndex !== -1) {
      let endIndex = fullText.length;
      
      // Find the next section header if it exists
      if (nextHeader) {
        const nextHeaderIndex = fullText.indexOf(nextHeader);
        if (nextHeaderIndex !== -1) {
          endIndex = nextHeaderIndex;
        }
      }
      
      // Extract the section content
      const sectionContent = fullText.substring(startIndex + currentHeader.length, endIndex).trim();
      sections[currentHeader] = sectionContent;
    }
  }
  
  return sections;
};
