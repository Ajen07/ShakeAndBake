const notFoundMiddleware = async (req, res) => {
  res.json({ msg: "This Route doesnot exist" });
};

export default notFoundMiddleware;
