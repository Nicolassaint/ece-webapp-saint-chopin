const { dbClients } = require("./dbClients");

const createClients = async (req, res) => {
  const client = {
    username: req.body.username,
    mail: req.body.mail,
    name: req.body.name,
    First_name: req.body.First_name,
  };
  dbClients.client.push(client);
  res.send("Tu as crée ton compte félicitations : " + client.username + " " + client.mail)
};
module.exports = createClients