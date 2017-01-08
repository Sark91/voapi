export const sendError = (res, error, code = 500) => {
  return res
    .status(code)
    .send({ code, error })
    .end();
};

export const sendSuccess = (res, message = 'success', code = 200) => {
  return res
    .status(code)
    .send({ code, message })
    .end();
};