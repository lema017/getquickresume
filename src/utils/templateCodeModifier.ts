/**
 * Modifies template JavaScript code to support multi-page display
 * This includes:
 * - Converting fixed heights to min-heights for content expansion
 * - Changing overflow from hidden to visible
 * - Injecting page break CSS for visual A4 page separation
 */
export function modifyTemplateCodeForMultiPageDisplay(jsCode: string): string {
  if (!jsCode) return jsCode;

  let modifiedCode = jsCode;

  // Replace fixed height with min-height to allow content expansion
  // Handle :host height: 1123px (most common case)
  modifiedCode = modifiedCode.replace(
    /(:host\s*\{[^}]*?)height:\s*1123px([^}]*?\})/gi,
    '$1min-height: 1123px; height: auto$2'
  );

  // Also replace standalone height: 1123px (in case the regex above doesn't match)
  modifiedCode = modifiedCode.replace(
    /height:\s*1123px/gi,
    'min-height: 1123px; height: auto'
  );

  // Replace max-height constraint
  modifiedCode = modifiedCode.replace(
    /max-height:\s*1123px/gi,
    'max-height: none'
  );

  // Change overflow: hidden to overflow: visible in :host
  modifiedCode = modifiedCode.replace(
    /(:host\s*\{[^}]*?)overflow:\s*hidden([^}]*?\})/gi,
    '$1overflow: visible$2'
  );

  // Also replace standalone overflow: hidden
  modifiedCode = modifiedCode.replace(
    /overflow:\s*hidden/gi,
    'overflow: visible'
  );

  // Change fixed height in .resume-container to allow expansion
  modifiedCode = modifiedCode.replace(
    /(\.resume-container[^}]*?)height:\s*1083px([^}]*?\})/gi,
    '$1min-height: 1083px; height: auto$2'
  );

  // Also replace standalone height: 1083px
  modifiedCode = modifiedCode.replace(
    /height:\s*1083px/gi,
    'min-height: 1083px; height: auto'
  );

  // Remove or modify @media print height constraints that might interfere
  modifiedCode = modifiedCode.replace(
    /(@media\s+print[^}]*?:host[^}]*?)height:\s*297mm([^}]*?\})/gi,
    '$1min-height: 297mm; height: auto$2'
  );

  // Add multi-page CSS that creates visual A4 pages
  // This will make the content flow in discrete A4-sized pages
  const pageBreakCSS = `
      /* Multi-page A4 display */
      :host {
        position: relative;
        display: block;
        width: 794px;
        min-height: 1123px;
        height: auto;
      }
      
      /* Create page containers every 1123px */
      .resume-container {
        min-height: 1083px;
        height: auto;
        position: relative;
      }
      
      /* Visual page separators - add border every A4 height */
      :host::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        background-image: repeating-linear-gradient(
          to bottom,
          transparent 0,
          transparent calc(1123px - 2px),
          #e5e7eb calc(1123px - 2px),
          #e5e7eb 1123px
        );
        background-size: 100% 1123px;
        z-index: 1000;
      }
      
      /* Force page breaks every 1123px for print */
      @media print {
        :host {
          page-break-after: always;
        }
      }
    `;

  // Try to inject into existing style tag
  const styleTagPattern = /(<style>[\s\S]*?)(<\/style>)/;
  if (styleTagPattern.test(modifiedCode)) {
    modifiedCode = modifiedCode.replace(
      styleTagPattern,
      (match, opening, closing) => {
        // Check if page break CSS already exists
        if (match.includes('page separators')) {
          return match;
        }
        return `${opening}${pageBreakCSS}${closing}`;
      }
    );
  } else {
    // If no style tag found, try to add it to the styles template literal
    // Look for const styles = `...` pattern
    const stylesPattern = /(const\s+styles\s*=\s*`)([\s\S]*?)(`)/;
    if (stylesPattern.test(modifiedCode)) {
      modifiedCode = modifiedCode.replace(
        stylesPattern,
        (match, opening, content, closing) => {
          if (content.includes('page separators')) {
            return match;
          }
          // Add page break CSS before closing style tag if exists, or at end
          if (content.includes('</style>')) {
            return `${opening}${content.replace('</style>', `${pageBreakCSS}</style>`)}${closing}`;
          } else {
            return `${opening}${content}<style>${pageBreakCSS}</style>${closing}`;
          }
        }
      );
    }
  }

  // Log the modifications for debugging
  console.log('Template code modified for multi-page display:', {
    originalLength: jsCode.length,
    modifiedLength: modifiedCode.length,
    heightReplaced: modifiedCode.includes('min-height: 1123px'),
    overflowReplaced: modifiedCode.includes('overflow: visible'),
    resumeContainerReplaced: modifiedCode.includes('min-height: 1083px'),
  });

  return modifiedCode;
}


