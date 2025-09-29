export const signUpSchema = (formData) => {
  const errors = {};
  const { username, password, confirmPassword } = formData;

  if (username.length < 4) {
    errors.username = "*Username should be more than 4 characters";
  }

  if (password.length < 4) {
    errors.password = "*Password should be more than 4 characters";
  }

  if (password.length > 16) {
    errors.password = "*Password should be less than 16 characters";
  }

  if (
    password.length > 4 &&
    password.length < 16 &&
    password !== confirmPassword
  ) {
    errors.confirmPassword = "*Confirm password is not equal";
  }

  return errors;
};
