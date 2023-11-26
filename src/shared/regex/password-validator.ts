export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

export const PASSWORD_VALIDATOR = {
  validator: (value: string) => PASSWORD_REGEX.test(value),
  message: 'Password too weak!',
};
