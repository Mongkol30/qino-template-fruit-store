// Error tokens (Type-safe translation keys)
const errors = {
  // 401
  error401Title: 'errors.error401Title',
  error401Message: 'errors.error401Message',

  // 404
  error404Title: 'errors.error404Title',
  error404Message: 'errors.error404Message',

  // 500
  error500Title: 'errors.error500Title',
  error500Message: 'errors.error500Message',

  // Common
  backToHome: 'errors.backToHome',
} as const;

export default errors;
