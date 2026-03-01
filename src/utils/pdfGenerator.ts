import { A4_DIMENSIONS } from './a4Dimensions';

async function loadPdfDeps() {
  const [{ default: jsPDF }, { toPng }] = await Promise.all([
    import('jspdf'),
    import('html-to-image'),
  ]);
  return { jsPDF, toPng };
}

/**
 * Generate PDF by capturing each .a4-page-container individually.
 * Uses html-to-image (SVG foreignObject serialization) for pixel-perfect
 * rendering that faithfully preserves shadow DOM content and CSS.
 */
export async function generateResumePDFFromPages(
  container: HTMLElement,
  fileName: string = 'resume.pdf'
): Promise<void> {
  if (!container) {
    throw new Error('Container not found');
  }

  const { jsPDF, toPng } = await loadPdfDeps();

  const pageContainers = container.querySelectorAll('.a4-page-container') as NodeListOf<HTMLElement>;

  if (pageContainers.length === 0) {
    throw new Error('No page containers found');
  }

  const A4_WIDTH_MM = 210;
  const pixelRatio = 2;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  for (let i = 0; i < pageContainers.length; i++) {
    const pageContainer = pageContainers[i];

    pageContainer.scrollIntoView({ behavior: 'instant', block: 'start' });
    await new Promise(resolve => setTimeout(resolve, 100));

    const elementWidth = pageContainer.offsetWidth;
    const elementHeight = Math.max(
      pageContainer.scrollHeight,
      pageContainer.offsetHeight,
      A4_DIMENSIONS.heightPX
    );

    const imgData = await toPng(pageContainer, {
      width: elementWidth,
      height: elementHeight,
      pixelRatio,
      backgroundColor: '#ffffff',
    });

    const pxToMm = A4_WIDTH_MM / elementWidth;
    const imgWidth = A4_WIDTH_MM;
    const imgHeight = elementHeight * pxToMm;

    if (i > 0) {
      pdf.addPage([imgWidth, imgHeight], 'portrait');
    } else {
      pdf.internal.pageSize.width = imgWidth;
      pdf.internal.pageSize.height = imgHeight;
    }

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  }

  pdf.save(fileName);
}
