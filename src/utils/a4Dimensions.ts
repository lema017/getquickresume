/**
 * Constantes y helpers para formato A4 (carta)
 * A4: 210mm x 297mm (8.27" x 11.69")
 * A 96 DPI: 794px x 1123px
 */

export const A4_DIMENSIONS = {
  // Dimensiones en milímetros
  widthMM: 210,
  heightMM: 297,
  
  // Dimensiones en pulgadas
  widthInches: 8.27,
  heightInches: 11.69,
  
  // Dimensiones en píxeles a 96 DPI (estándar web)
  widthPX: 794,
  heightPX: 1123,
  
  // Márgenes estándar para impresión (en píxeles)
  marginTop: 20,
  marginBottom: 20,
  marginLeft: 20,
  marginRight: 20,
  
  // Área de contenido (después de márgenes)
  contentWidth: 754, // 794 - 40 (márgenes izquierdo + derecho)
  contentHeight: 1083, // 1123 - 40 (márgenes superior + inferior)
};

/**
 * Calcula la escala apropiada para mostrar un preview A4 en un contenedor
 */
export function calculateA4PreviewScale(containerWidth: number, containerHeight: number): number {
  const scaleX = containerWidth / A4_DIMENSIONS.widthPX;
  const scaleY = containerHeight / A4_DIMENSIONS.heightPX;
  
  // Usar la escala más pequeña para asegurar que quepa completamente
  return Math.min(scaleX, scaleY, 1); // Máximo 1 (100%)
}

/**
 * Obtiene estilos CSS para un contenedor A4
 */
export function getA4ContainerStyles(scale: number = 1): React.CSSProperties {
  return {
    width: `${A4_DIMENSIONS.widthPX}px`,
    height: `${A4_DIMENSIONS.heightPX}px`,
    transform: scale !== 1 ? `scale(${scale})` : undefined,
    transformOrigin: 'top center',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    margin: '0 auto',
    // Asegurar que el contenedor padre tenga espacio para el contenido escalado
    flexShrink: 0,
  };
}

/**
 * Obtiene el tamaño del contenedor wrapper necesario para el contenido escalado
 */
export function getA4WrapperSize(scale: number = 1): { width: number; height: number } {
  return {
    width: A4_DIMENSIONS.widthPX * scale,
    height: A4_DIMENSIONS.heightPX * scale,
  };
}

/**
 * CSS para estilos de impresión A4
 */
export const A4_PRINT_STYLES = `
  @media print {
    @page {
      size: A4 portrait;
      margin: 0;
    }
    
    :host {
      width: 210mm;
      height: 297mm;
      margin: 0;
      padding: 0;
      box-shadow: none;
    }
  }
`;

/**
 * CSS base para contenedor A4
 */
export const A4_BASE_STYLES = `
  :host {
    display: block;
    width: ${A4_DIMENSIONS.widthPX}px;
    min-height: ${A4_DIMENSIONS.heightPX}px;
    max-height: ${A4_DIMENSIONS.heightPX}px;
    margin: 0 auto;
    padding: ${A4_DIMENSIONS.marginTop}px ${A4_DIMENSIONS.marginRight}px ${A4_DIMENSIONS.marginBottom}px ${A4_DIMENSIONS.marginLeft}px;
    box-sizing: border-box;
    background-color: #ffffff;
    overflow: hidden;
    page-break-after: always;
  }
  
  ${A4_PRINT_STYLES}
`;

