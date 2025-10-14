/**
 * Utility to hide Clerk branding elements
 * This function should be called after Clerk components are rendered
 */

export const hideClerkBranding = () => {
  // Function to hide elements by class name
  const hideElementsByClass = (classNames: string[]) => {
    classNames.forEach(className => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach(element => {
        (element as HTMLElement).style.display = 'none';
        (element as HTMLElement).style.visibility = 'hidden';
        (element as HTMLElement).style.opacity = '0';
        (element as HTMLElement).style.height = '0';
        (element as HTMLElement).style.width = '0';
        (element as HTMLElement).style.overflow = 'hidden';
        (element as HTMLElement).style.position = 'absolute';
        (element as HTMLElement).style.left = '-9999px';
        (element as HTMLElement).style.top = '-9999px';
        (element as HTMLElement).style.zIndex = '-9999';
      });
    });
  };

  // Function to hide elements containing specific text
  const hideElementsByText = (texts: string[]) => {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      const elementText = element.textContent || '';
      if (texts.some(text => elementText.includes(text))) {
        (element as HTMLElement).style.display = 'none';
        (element as HTMLElement).style.visibility = 'hidden';
        (element as HTMLElement).style.opacity = '0';
        (element as HTMLElement).style.height = '0';
        (element as HTMLElement).style.width = '0';
        (element as HTMLElement).style.overflow = 'hidden';
      }
    });
  };

  // Hide ONLY specific Clerk internal elements that contain branding
  hideElementsByClass([
    'cl-internal-gr8mll',     // Main branding container
    'cl-internal-1bhx3gv',   // "Secured by" text
    'cl-internal-1axx6jt',   // Clerk logo link
    'cl-internal-5ghyhf',    // Clerk logo SVG
    'cl-internal-10qfs6u',   // "Development mode" text
    'cl-internal-114tq5k'    // Back button element
  ]);

  // Hide elements containing branding text
  hideElementsByText([
    'Secured by',
    'Development mode'
  ]);

  // Hide any links to clerk.com
  const clerkLinks = document.querySelectorAll('a[href*="clerk.com"]');
  clerkLinks.forEach(link => {
    (link as HTMLElement).style.display = 'none';
    (link as HTMLElement).style.visibility = 'hidden';
    (link as HTMLElement).style.opacity = '0';
  });
};

// Auto-run when DOM is ready
if (typeof window !== 'undefined') {
  // Run immediately
  hideClerkBranding();
  
  // Run after a short delay to catch dynamically loaded elements
  setTimeout(hideClerkBranding, 100);
  setTimeout(hideClerkBranding, 500);
  setTimeout(hideClerkBranding, 1000);
  
  // Run when DOM changes (for dynamically loaded content)
  const observer = new MutationObserver(() => {
    hideClerkBranding();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
