const http = require('https');
var baseurl = `https://discordbots.fr/api/v1/bot/`;

exports.getBotID = function getBotID(id) {
    return new Promise((resolve, reject) => {
        http.get(baseurl + id, (res) => {
            const { statusCode } = res;
            if (statusCode !== 200) {
                res.resume();
                reject(`La requête n'a pas pu aboutire, Erreur : ${statusCode}`);
            }
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    reject(`Error: ${e.message}`);
                }
            }).on('error', (err) => {
                reject(`Error: ${err.message}`);
            })

        })
    })
}

exports.postBotID = function postBotID(id, token, server) {
    return new Promise((resolve, reject) => {
        var options = {
            hostname: 'discordbots.fr',
            path: `/api/v1/bot/${id}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: token
            }
          };
          var req = http.request(options, function(res) {
            const { statusCode } = res;
            if (statusCode !== 200) {
                res.resume();
                reject(`La requête n'a pas pu aboutire, Erreur : ${statusCode}`);
            }
            res.setEncoding('utf8');
            res.on('data', function (body) {
              console.log('Body: ' + body);
            });
          });
          req.on('error', function(e) {
            console.log('Probleme avec la Requete ' + e.message);
          });
          // write data to request body
          req.write(`{"server_count": ${server}}`);
          req.end();
        
    })
}
