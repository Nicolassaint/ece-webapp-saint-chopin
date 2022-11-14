export default (req, res) => {
  const {name,problem,email,message} = req.body;

  res.status(200).json(req.body);
}
