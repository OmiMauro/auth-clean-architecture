export const parseErrorMessageDTO = (error: any): string => {
  const constraintKey = Object.keys(error.constraints)[0];
  const property = error.property;

  // Define a mapping of constraint keys to custom error messages
  const customErrorMessages: { [key: string]: string } = {
    isEmail: `${property} must be a valid email address`,
    minLength: `${property} must be longer than or equal to ${error.constraints.minLength}`,
    maxLength: `${property} must be shorter than or equal to ${error.constraints.maxLength}`,
    min: `${property} must not be less than ${error.constraints.min}`,
    isDate: `${property} is not a valid date`,
    isUUID: `${property} is not a valid UUID`,
    isNotEmpty: `${property} is required. Please provide a value`,
    isString: `${property} must be a string value`,
    isNumber: `${property} must be a number value`,
    isBoolean: `${property} must be a boolean value`,
    isOptional: `${property} is optional`,
    whitelistValidation: `${property} is not allowed to have any additional properties`,
    matches: `${error.constraints.matches}`,
  };
  // Return the custom error message if available, otherwise, use a generic message

  return (
    customErrorMessages[constraintKey] ||
    `${error.constraints[constraintKey]}` ||
    `${property} is invalid`
  );
};
