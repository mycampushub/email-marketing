/**
 * Email validation utilities
 */

/**
 * Validates if a string is a valid email address
 * @param email - The email string to validate
 * @returns true if valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || email.trim() === '') return false;
  
  const emailRegex = /^[^\s]*(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|("[^<>()[\]\\.,;:\s@"]+)*)+@\w+([-\w]+\.)+\w{2,})$/;
  return emailRegex.test(email);
};

/**
 * Validates if a string looks like an email address (basic format check)
 * @param email - The email string to validate
 * @returns true if it looks like an email, false otherwise
 */
export const isEmailLike = (email: string): boolean => {
  if (!email || email.trim() === '') return false;
  
  // Basic email pattern check - must contain @ symbol
  const atSymbolIndex = email.indexOf('@');
  if (atSymbolIndex === -1) return false;
  
  // Must have something before and after @
  if (atSymbolIndex === 0 || atSymbolIndex === email.length - 1) return false;
  
  return true;
};

/**
 * Returns detailed error message for invalid email
 * @param email - The invalid email string
 * @returns Error message describing why validation failed
 */
export const getEmailError = (email: string): string => {
  if (!email || email.trim() === '') {
    return 'Email is required';
  }
  
  if (!isEmailLike(email)) {
    return 'Please enter a valid email address';
  }
  
  if (!isValidEmail(email)) {
    return 'Please enter a valid email format (e.g., user@example.com)';
  }
  
  return '';
};

/**
 * Validate email and return both validity and error message
 * @param email - The email string to validate
 * @returns Object with valid boolean and error message string
 */
export const validateEmail = (email: string): { valid: boolean; error: string } => {
  return {
    valid: isValidEmail(email),
    error: getEmailError(email)
  };
};
