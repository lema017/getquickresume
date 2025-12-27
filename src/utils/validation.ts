// Utilidades de validación para el wizard

export interface ValidationResult {
  isValid: boolean;
  message?: string;
  messageKey?: string; // Translation key for internationalization
}

export interface FieldValidation {
  [key: string]: ValidationResult;
}

// Validaciones básicas
export const validateRequired = (value: string | undefined | null, fieldKey: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      messageKey: `validation.profile.${fieldKey}`,
      message: '' // Will be translated in component
    };
  }
  return { isValid: true };
};

export const validateMinLength = (value: string, minLength: number, fieldName: string): ValidationResult => {
  if (value.length < minLength) {
    return {
      isValid: false,
      message: `${fieldName} debe tener al menos ${minLength} caracteres`
    };
  }
  return { isValid: true };
};

export const validateMaxLength = (value: string, maxLength: number, fieldName: string): ValidationResult => {
  if (value.length > maxLength) {
    return {
      isValid: false,
      message: `${fieldName} no puede exceder ${maxLength} caracteres`
    };
  }
  return { isValid: true };
};

// Validaciones de caracteres especiales
export const validateAllowedCharacters = (value: string, fieldKey: string): ValidationResult => {
  // Caracteres básicos permitidos: letras, números, espacios, puntos, comas, guiones, paréntesis, arroba, símbolos básicos, y ampersand
  const allowedRegex = /^[a-zA-Z0-9\s.,\-+()/@<>=:&áéíóúÁÉÍÓÚñÑüÜ]+$/;
  
  if (!allowedRegex.test(value)) {
    return {
      isValid: false,
      messageKey: 'validation.invalidCharacters',
      message: '' // Will be translated in component
    };
  }
  return { isValid: true };
};

export const validatePhoneCharacters = (phone: string): ValidationResult => {
  // Solo permitir números, espacios, guiones, paréntesis y el símbolo +
  const phoneRegex = /^[0-9\s\-\(\)\+]+$/;
  
  if (!phoneRegex.test(phone)) {
    return {
      isValid: false,
      messageKey: 'validation.phoneCharacters',
      message: '' // Will be translated in component
    };
  }
  return { isValid: true };
};

// Validaciones de formato
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      messageKey: 'validation.email',
      message: '' // Will be translated in component
    };
  }
  return { isValid: true };
};

export const validatePhone = (phone: string): ValidationResult => {
  // Remover espacios, guiones y paréntesis
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  const phoneRegex = /^[\+]?[0-9]{7,15}$/;
  
  if (!phoneRegex.test(cleanPhone)) {
    return {
      isValid: false,
      messageKey: 'validation.phone',
      message: '' // Will be translated in component
    };
  }
  return { isValid: true };
};

export const validateLinkedIn = (linkedin: string): ValidationResult => {
  if (!linkedin) return { isValid: true }; // LinkedIn es opcional
  
  // Limpiar la URL removiendo espacios en blanco
  const cleanLinkedin = linkedin.trim();
  
  // Detectar errores comunes en la URL
  if (cleanLinkedin.includes('https//') && !cleanLinkedin.includes('https://')) {
    return {
      isValid: false,
      messageKey: 'validation.linkedin',
      message: '' // Will be translated in component
    };
  }
  
  // Regex más flexible para URLs de LinkedIn - acepta varias variaciones
  const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_.]+\/?$/;
  if (!linkedinRegex.test(cleanLinkedin)) {
    return {
      isValid: false,
      messageKey: 'validation.linkedin',
      message: '' // Will be translated in component
    };
  }
  return { isValid: true };
};

export const validateUrl = (url: string): ValidationResult => {
  if (!url) return { isValid: true }; // URL es opcional
  
  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return {
      isValid: false,
      message: 'Formato de URL inválido'
    };
  }
};

// Validaciones de fechas
export const validateDate = (date: string, fieldName: string): ValidationResult => {
  if (!date) return { isValid: true }; // Fecha es opcional
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return {
      isValid: false,
      message: `${fieldName} debe ser una fecha válida`
    };
  }
  return { isValid: true };
};

export const validateDateRange = (startDate: string, endDate: string, fieldName: string): ValidationResult => {
  if (!startDate || !endDate) return { isValid: true };
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start > end) {
    return {
      isValid: false,
      message: `La fecha de inicio debe ser anterior a la fecha de fin en ${fieldName}`
    };
  }
  return { isValid: true };
};

// Validaciones de arrays
export const validateArrayMinLength = (array: any[], minLength: number, fieldName: string): ValidationResult => {
  if (array.length < minLength) {
    return {
      isValid: false,
      message: `${fieldName} debe tener al menos ${minLength} elemento${minLength > 1 ? 's' : ''}`
    };
  }
  return { isValid: true };
};

export const validateArrayItems = (array: any[], fieldName: string): ValidationResult => {
  const emptyItems = array.filter(item => 
    typeof item === 'string' ? item.trim() === '' : 
    typeof item === 'object' ? Object.values(item).some(val => !val || (typeof val === 'string' && val.trim() === '')) :
    false
  );
  
  if (emptyItems.length > 0) {
    return {
      isValid: false,
      message: `Todos los elementos de ${fieldName} deben estar completos`
    };
  }
  return { isValid: true };
};

// Validaciones específicas del wizard
export const validateProfile = (formData: any): FieldValidation => {
  const errors: FieldValidation = {};
  
  // Validar campos requeridos
  const requiredFields = [
    { key: 'firstName', translationKey: 'firstName' },
    { key: 'lastName', translationKey: 'lastName' },
    { key: 'country', translationKey: 'country' },
    { key: 'profession', translationKey: 'profession' },
    { key: 'phone', translationKey: 'phone' },
    { key: 'email', translationKey: 'email' }
  ];
  
  requiredFields.forEach(field => {
    const result = validateRequired(formData[field.key], field.translationKey);
    if (!result.isValid) {
      errors[field.key] = result;
    }
  });
  
  // Validar caracteres permitidos en campos de texto
  const textFields = [
    { key: 'firstName', translationKey: 'firstName' },
    { key: 'lastName', translationKey: 'lastName' },
    { key: 'profession', translationKey: 'profession' }
  ];
  
  textFields.forEach(field => {
    if (formData[field.key] && !errors[field.key]) {
      const charResult = validateAllowedCharacters(formData[field.key], field.translationKey);
      if (!charResult.isValid) {
        errors[field.key] = charResult;
      }
    }
  });
  
  // Validar caracteres del teléfono
  if (formData.phone && !errors.phone) {
    const phoneCharResult = validatePhoneCharacters(formData.phone);
    if (!phoneCharResult.isValid) {
      errors.phone = phoneCharResult;
    } else {
      // Si los caracteres son válidos, validar formato
      const phoneResult = validatePhone(formData.phone);
      if (!phoneResult.isValid) {
        errors.phone = phoneResult;
      }
    }
  }
  
  // Validar formato de email
  if (formData.email && !errors.email) {
    const emailResult = validateEmail(formData.email);
    if (!emailResult.isValid) {
      errors.email = emailResult;
    }
  }
  
  // Validar LinkedIn
  if (formData.linkedin) {
    const linkedinResult = validateLinkedIn(formData.linkedin);
    if (!linkedinResult.isValid) {
      errors.linkedin = linkedinResult;
    }
  }
  
  return errors;
};

export const validateSkills = (skills: string[]): FieldValidation => {
  const errors: FieldValidation = {};
  
  // Validar que haya al menos 5 habilidades totales
  const skillsResult = validateArrayMinLength(skills, 5, 'Habilidades');
  if (!skillsResult.isValid) {
    errors.skills = skillsResult;
  }
  
  return errors;
};

export const validateExperience = (experiences: any[]): FieldValidation => {
  const errors: FieldValidation = {};
  
  if (experiences.length === 0) {
    errors.experience = {
      isValid: false,
      message: 'Debes agregar al menos una experiencia laboral'
    };
    return errors;
  }
  
  // Validar que todas las experiencias estén completas
  const experienceResult = validateArrayItems(experiences, 'Experiencia laboral');
  if (!experienceResult.isValid) {
    errors.experience = experienceResult;
  }
  
  // Validar fechas de cada experiencia
  experiences.forEach((exp, index) => {
    if (exp.startDate && exp.endDate && !exp.isCurrent) {
      const dateResult = validateDateRange(exp.startDate, exp.endDate, `Experiencia ${index + 1}`);
      if (!dateResult.isValid) {
        errors[`experience_${index}_dates`] = dateResult;
      }
    }
  });
  
  return errors;
};

export const validateProjects = (projects: any[]): FieldValidation => {
  const errors: FieldValidation = {};
  
  if (projects.length === 0) {
    errors.projects = {
      isValid: false,
      message: 'Debes agregar al menos un proyecto'
    };
    return errors;
  }
  
  // Validar que todos los proyectos estén completos
  const projectsResult = validateArrayItems(projects, 'Proyectos');
  if (!projectsResult.isValid) {
    errors.projects = projectsResult;
  }
  
  return errors;
};

export const validateAchievements = (achievements: any[]): FieldValidation => {
  const errors: FieldValidation = {};
  
  if (achievements.length === 0) {
    errors.achievements = {
      isValid: false,
      message: 'Debes agregar al menos un logro'
    };
    return errors;
  }
  
  // Validar que todos los logros estén completos
  const achievementsResult = validateArrayItems(achievements, 'Logros');
  if (!achievementsResult.isValid) {
    errors.achievements = achievementsResult;
  }
  
  return errors;
};

export const validateSummary = (summary: string, jobDescription: string): FieldValidation => {
  const errors: FieldValidation = {};
  
  // Validar longitud mínima del resumen
  if (summary.length < 50) {
    errors.summary = {
      isValid: false,
      message: 'El resumen debe tener al menos 50 caracteres'
    };
  }
  
  // Validar longitud mínima de la descripción del puesto
  if (jobDescription.length < 30) {
    errors.jobDescription = {
      isValid: false,
      message: 'La descripción del puesto debe tener al menos 30 caracteres'
    };
  }
  
  return errors;
};

// Función helper para verificar si hay errores
export const hasErrors = (errors: FieldValidation): boolean => {
  return Object.values(errors).some(error => !error.isValid);
};

// Función helper para obtener el primer error
export const getFirstError = (errors: FieldValidation): string | null => {
  const firstError = Object.values(errors).find(error => !error.isValid);
  return firstError?.message || null;
};
