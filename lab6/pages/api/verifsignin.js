const { dbClients } = require("./dbClients");
import React from 'react'
import { useAlert } from 'react-alert'

export default function handler(req, res) {
    console.log(req.body);
    var b = 0;
    console.log(dbClients.client.length)
    for (var i = 0; i < dbClients.client.length; i++) {
        if (req.body.name === dbClients.client[i].username && req.body.mail === dbClients.client[i].mail) {
            console.log("Tu es bien dans notre database")
            b = 1;
            break;
        }
    }
    if (b == 0) {
        console.log("On te connait pas")
    }
    res.status(200).json(req.body);
}
