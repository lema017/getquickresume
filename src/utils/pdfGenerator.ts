import { A4_DIMENSIONS } from './a4Dimensions';

// Dynamic imports for jspdf and html2canvas to avoid loading ~178 KiB on initial page load.
// These are only fetched when the user actually triggers PDF generation.
async function loadPdfDeps() {
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas'),
  ]);
  return { jsPDF, html2canvas };
}

/**
 * Generates PDF from a rendered template element
 * Handles multi-page templates by splitting content across multiple PDF pages
 */
export async function generateResumePDF(
  element: HTMLElement,
  fileName: string = 'resume.pdf'
): Promise<void> {
  if (!element) {
    throw new Error('Element not found');
  }

  const { jsPDF, html2canvas } = await loadPdfDeps();

  // A4 dimensions in mm
  const A4_WIDTH_MM = 210;
  const A4_HEIGHT_MM = 297;
  const A4_WIDTH_PX = 794; // 210mm × 3.7795275591
  const A4_HEIGHT_PX = 1123; // 297mm × 3.7795275591

  // Capture the element as canvas with high quality
  const canvas = await html2canvas(element, {
    scale: 2, // High resolution for quality PDF
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: A4_WIDTH_PX,
    windowHeight: element.scrollHeight,
  });

  const imgData = canvas.toDataURL('image/png', 1.0);
  const imgWidth = A4_WIDTH_MM;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Create PDF
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Calculate how many pages we need
  const pageHeight = A4_HEIGHT_MM;
  const totalPages = Math.ceil(imgHeight / pageHeight);

  // Add image to PDF, splitting across pages if needed
  let heightLeft = imgHeight;
  let position = 0;

  for (let i = 0; i < totalPages; i++) {
    if (i > 0) {
      pdf.addPage();
    }

    // Calculate the portion of the image to add to this page
    const sourceY = (canvas.height / imgHeight) * position;
    const sourceHeight = Math.min(
      (canvas.height / imgHeight) * pageHeight,
      canvas.height - sourceY
    );

    // Create a temporary canvas for this page
    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = canvas.width;
    pageCanvas.height = (sourceHeight / canvas.height) * canvas.height;
    const pageCtx = pageCanvas.getContext('2d');

    if (pageCtx) {
      pageCtx.drawImage(
        canvas,
        0,
        sourceY,
        canvas.width,
        sourceHeight,
        0,
        0,
        pageCanvas.width,
        pageCanvas.height
      );
    }

    const pageImgData = pageCanvas.toDataURL('image/png', 1.0);
    const pageImgHeight = (pageCanvas.height * imgWidth) / pageCanvas.width;

    // Add to PDF
    pdf.addImage(pageImgData, 'PNG', 0, 0, imgWidth, Math.min(pageImgHeight, pageHeight));

    heightLeft -= pageHeight;
    position += pageHeight;
  }

  // Save PDF
  pdf.save(fileName);
}

/**
 * Alternative method: Generate PDF by capturing the entire element
 * and splitting it into A4 pages
 */
export async function generateResumePDFSimple(
  element: HTMLElement,
  fileName: string = 'resume.pdf'
): Promise<void> {
  if (!element) {
    throw new Error('Element not found');
  }

  const { jsPDF, html2canvas } = await loadPdfDeps();

  // Capture the element as canvas
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png', 1.0);
  
  // A4 dimensions
  const A4_WIDTH_MM = 210;
  const A4_HEIGHT_MM = 297;
  const imgWidth = A4_WIDTH_MM;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Create PDF
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // If content fits in one page
  if (imgHeight <= A4_HEIGHT_MM) {
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  } else {
    // Split across multiple pages
    let heightLeft = imgHeight;
    let position = 0;

    while (heightLeft > 0) {
      if (position > 0) {
        pdf.addPage();
      }

      const pageHeight = Math.min(A4_HEIGHT_MM, heightLeft);
      const sourceY = (canvas.height / imgHeight) * position;
      const sourceHeight = (canvas.height / imgHeight) * pageHeight;

      // Create canvas for this page
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = sourceHeight;
      const pageCtx = pageCanvas.getContext('2d');

      if (pageCtx) {
        pageCtx.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          sourceHeight,
          0,
          0,
          pageCanvas.width,
          pageCanvas.height
        );
      }

      const pageImgData = pageCanvas.toDataURL('image/png', 1.0);
      pdf.addImage(pageImgData, 'PNG', 0, 0, imgWidth, pageHeight);

      heightLeft -= A4_HEIGHT_MM;
      position += A4_HEIGHT_MM;
    }
  }

  pdf.save(fileName);
}

/**
 * Generate PDF by capturing each .a4-page-container individually
 * This ensures each page is captured at exact A4 dimensions without padding/scaling issues
 */
export async function generateResumePDFFromPages(
  container: HTMLElement,
  fileName: string = 'resume.pdf'
): Promise<void> {
  if (!container) {
    throw new Error('Container not found');
  }

  const { jsPDF, html2canvas } = await loadPdfDeps();

  // Find all page containers
  const pageContainers = container.querySelectorAll('.a4-page-container') as NodeListOf<HTMLElement>;
  
  if (pageContainers.length === 0) {
    throw new Error('No page containers found');
  }

  // A4 dimensions
  const A4_WIDTH_MM = 210;
  const A4_HEIGHT_MM = 297;

  // Create PDF with first page - we'll use custom sizes for each page
  // Start with A4 size, but we'll resize each page to match rendered dimensions
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Capture each page individually
  const scale = 2; // html2canvas scale factor
  
  for (let i = 0; i < pageContainers.length; i++) {
    const pageContainer = pageContainers[i];

    // Scroll page container into view for better capture
    // html2canvas works better with visible elements
    pageContainer.scrollIntoView({ behavior: 'instant', block: 'start' });
    
    // Small delay to ensure scroll completes
    await new Promise(resolve => setTimeout(resolve, 100));

    // Get actual element dimensions (before scaling)
    // Use the maximum of scrollHeight and offsetHeight to capture full content
    // scrollHeight includes all content even if overflowed
    // offsetHeight is the visible height
    const elementWidth = pageContainer.offsetWidth; // Should be 794px (A4 width in pixels)
    
    // Get the actual rendered height - use the larger of scrollHeight or offsetHeight
    // This ensures we capture all content even if it overflows
    const actualScrollHeight = pageContainer.scrollHeight;
    const actualOffsetHeight = pageContainer.offsetHeight;
    const elementHeight = Math.max(
      actualScrollHeight,  // Full content height (includes overflow)
      actualOffsetHeight,   // Visible height
      A4_DIMENSIONS.heightPX  // Minimum A4 height as fallback
    );
    
    // Log for debugging
    console.log(`[PDF] Page ${i + 1} dimensions:`, {
      offsetWidth: elementWidth,
      offsetHeight: actualOffsetHeight,
      scrollHeight: actualScrollHeight,
      calculatedHeight: elementHeight,
      expectedA4Height: A4_DIMENSIONS.heightPX,
      exceedsA4: elementHeight > A4_DIMENSIONS.heightPX
    });

    // Capture this page container with full content height
    const canvas = await html2canvas(pageContainer, {
      scale: scale, // High resolution
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: elementWidth,
      height: elementHeight,
      windowHeight: elementHeight, // Important for html2canvas to capture full height
      scrollX: 0, // Ensure we capture from the start
      scrollY: 0, // Ensure we capture from the start
    });

    // Convert canvas to image
    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // Calculate dimensions in mm
    // The canvas dimensions are: canvas.width = elementWidth * scale, canvas.height = elementHeight * scale
    // We need to convert canvas pixels to mm maintaining the aspect ratio
    
    // Convert canvas pixels to mm
    // A4: 794px = 210mm, so 1px = 210/794 mm
    // We use the width ratio for consistency
    const pxToMm = A4_WIDTH_MM / elementWidth; // Should be 210/794 ≈ 0.2646 mm/px
    
    // Calculate image dimensions in mm
    // canvas.width and canvas.height are in pixels (scaled)
    // We need to convert back to original pixels first, then to mm
    const imgWidthPx = canvas.width / scale; // Original width in pixels
    const imgHeightPx = canvas.height / scale; // Original height in pixels (actual rendered height)
    
    // Convert to mm (don't constrain to A4 - use actual rendered height)
    const imgWidth = imgWidthPx * pxToMm; // Should be 210mm
    const imgHeight = imgHeightPx * pxToMm; // Actual height in mm (may exceed 297mm if content overflows)

    // Set custom page size to match rendered page dimensions
    // This ensures the PDF page is exactly the same size as the rendered page
    if (i > 0) {
      // Add new page with custom size matching rendered dimensions
      pdf.addPage([imgWidth, imgHeight], 'portrait');
    } else {
      // First page - resize the initial A4 page to match rendered dimensions
      pdf.internal.pageSize.width = imgWidth;
      pdf.internal.pageSize.height = imgHeight;
    }

    // Add to PDF at actual dimensions (captures full content, matches rendered page exactly)
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  }

  // Save PDF
  pdf.save(fileName);
}

