const { dbClients } = require("./dbClients");

export default function handler(req, res) {
    console.log("Bonjour")
    console.log(req.body);
    res.status(200).json(req.body);
  }
