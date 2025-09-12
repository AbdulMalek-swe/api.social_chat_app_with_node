const sendResponse = (
  res,
  code=200,
  {
    
    success = true,
    message = "Request successful",
    data = null,
    meta = null,
  }
) => {
  const response = {
    success,
    message,
    data,
  };

  if (meta) {
    response.meta = meta;
  }
  return res.status(code).json(response);
};

module.exports = sendResponse;
