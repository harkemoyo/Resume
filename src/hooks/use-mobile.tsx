import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the current device is a mobile device
 * @returns {boolean} True if the device is a mobile device, false otherwise
 */
export const useMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return isMobile;
};

export default useMobile;
