export const signInSchema = (formData, setErrors) => {
  const errors = {};
  const { username, password } = formData;

  if (username.trim() === "") {
    errors.username = "*Username cannot be empty";
  }

  if (password.trim() === "") {
    errors.password = "*Password cannot be empty";
  }
  return errors;
};
