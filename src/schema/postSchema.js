export const postSchema = (postTitle, postContent) => {
  const errors = {};
  if (postContent.trim() === "") {
    errors.postContent = "*Post Content cannot be empty";
  } else if (postContent.length < 10) {
    errors.postContent = "*Post Content should be more than 10 characters";
  }

  if (postTitle.trim() === "") {
    errors.postTitle = "*Post Title cannot be empty";
  } else if (postTitle.length < 5) {
    errors.postTitle = "*Post Title should be more than 5 characters";
  }

  return errors;
};
