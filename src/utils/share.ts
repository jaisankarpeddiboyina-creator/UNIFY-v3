export const shareToWhatsApp = (title, url) => {
  window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
};

export const shareToTwitter = (title, url) => {
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};
