'use strict'

const Eos    = require('eosjs');
const dotenv = require('dotenv');

dotenv.config();

const oracleContract = process.env.CONTRACT;

const eos = Eos({
    chainId: process.env.EOS_CHAIN,
    keyProvider: process.env.EOS_KEY,
    httpEndpoint: process.env.EOS_PROTOCOL + "://" + process.env.EOS_HOST + ":" + process.env.EOS_PORT,
    verbose: false,
    sign: true,
    broadcast: true
});

let options = {
    authorization: oracleContract + "@" + process.env.CONTRACT_PERMISSION,
    sign: true,
    broadcast: true
};

function update() {
    eos.getTableRows({
        code:  oracleContract,
        scope: oracleContract,
        table: `calctable`,
        json: true
    })
    .then(response  => {
        console.log("List of Recorded Accounts: ", response);
        let db = response.rows;
        execute(db);
    })
    .catch(error => {
        console.log("List Error: ", error);
    });
};

async function execute(db) {
    for (var i in db) {
        let _ =  await eos.contract(oracleContract)
            .then(account => {
                return account.upsertbal( db[i].account, db[i].dob, options );
            })
            .then(response => {
                console.log("Inflate Balance for", db[i].account, ":", response);
            })
            .catch(error => {
                console.log("Inflate Error for", db[i].account, ":", error);
            });
    }   
}

update();

