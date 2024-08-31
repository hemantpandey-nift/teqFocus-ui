const CONSTANTS: any = Object.freeze({
  APP_API_URL: process.env.REACT_APP_API_URL,
  MESSAGES: {
    ERRORS: {
      minCharError: "must be at least 3 characters",
      maxCharError: "must be 50 characters or less",
      requiredError: "is required",
      invalidEmail: "Invalid email address",
    },
  },
});

export default CONSTANTS;
