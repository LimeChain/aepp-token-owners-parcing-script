const fs = require('fs');
const axios = require('axios');

const tokenOwnerDataPath = "./data/db-eth-node-sorted.json";
const BACKEND_URL = "https://token-migration.appspot.com";
const REQUEST_INTERVAL = 10; // ms

const AUTH_TOKEN = "YOUR_TOKEN_HERE";

(async function() {
    let data = JSON.parse(fs.readFileSync(tokenOwnerDataPath, 'utf8'));
    const ethAddresses = Object.keys(data);

    let index = 1; // index 0 is already inserted
    const iterations = ethAddresses.length;

    let sendInterval = setInterval(async function () {
        try {

            if (index >= iterations) {
                clearInterval(sendInterval);
                return;
            }
            
            var config = {
                headers: {'Authorization': "Bearer " + AUTH_TOKEN}
            };

            // send to 
            axios.post(BACKEND_URL + "/owner", {
                ethAddress: ethAddresses[index],
                balance: data[ethAddresses[index]]
            }, config).then(result => {
                console.log(result.data ? result.data : result);
                console.log();
            })

            
            index++;
        } catch (error) {
            console.log(error.data ? error.data : error);
            clearInterval(sendInterval);
        }
    }, REQUEST_INTERVAL)
})();
