// Get the correct base URL for GitHub Pages
export const getBasePath = () => {
  return import.meta.env.BASE_URL || '/';
};

// Get the correct image path accounting for base URL
export const getImagePath = (imagePath) => {
  if (!imagePath) return '';
  // If it already starts with the base path, return as is
  if (imagePath.startsWith(getBasePath())) {
    return imagePath;
  }
  // If it starts with /, remove it and prepend base path
  if (imagePath.startsWith('/')) {
    return `${getBasePath()}${imagePath.slice(1)}`;
  }
  // Otherwise just prepend base path
  return `${getBasePath()}${imagePath}`;
};
