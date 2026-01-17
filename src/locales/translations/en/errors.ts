import errors from '../../tokens/errors';

const errorsTranslation = {
  // 401
  [errors.error401Title]: '401: Authorization required',
  [errors.error401Message]:
    'You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation.',

  // 404
  [errors.error404Title]: "404: The page you are looking for isn't here",
  [errors.error404Message]:
    'You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation.',

  // 500
  [errors.error500Title]: '500: Internal Server Error',
  [errors.error500Message]:
    'You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation.',

  // Common
  [errors.backToHome]: '← Back to Home',
};

export default errorsTranslation;
