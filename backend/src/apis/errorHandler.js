export function handleApiError(apiName, error) {
  console.error(`[API ERROR] ${apiName}:`, error.message);
  return {
    apiName,
    status: 'rejected',
    error: error.message
  };
}

export function handleSystemError(res, error) {
  console.error('[SYSTEM ERROR]:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: error.message
  });
}
