const fs = require('fs');
const axios = require('axios');

// const tokenOwnerDataPath = "./data/db-eth-node-sorted.json";
const tokenOwnerDataPath = "./data/infura.json";

// const SEED_URL = "https://token-migration.appspot.com/owner";
const SEED_URL = 'http://localhost:3000/owner';

(async function () {
    let data = JSON.parse(fs.readFileSync(tokenOwnerDataPath, 'utf8'));
    const ethAddresses = Object.keys(data);

    const iterations = ethAddresses.length;

    var config = {
        headers: {
            'Authorization': "Bearer 9015e355-8dec-49a5-a5a6-70a51cc9f2d1"
        }
    };

    for(let prop in data) {
        if (!prop || prop == '') {
            console.log("===> EMPTY address");
            continue
        }

        // send to 
        let result = await axios.post(SEED_URL, {
            ethAddress: prop,
            balance: data[prop]
        }, config)

        console.log();
        console.log(result.data);
    }
})();