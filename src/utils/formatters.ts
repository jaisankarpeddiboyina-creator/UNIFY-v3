export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const truncate = (str, n) => {
  return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
};
