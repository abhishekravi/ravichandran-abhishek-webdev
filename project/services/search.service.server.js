module.exports = function (app) {

    /* require the modules needed */
    var oauthSignature = require('oauth-signature');
    var n = require('nonce')();
    var qs = require('querystring');
    var request = require('request');
    app.post('/api/search', searchQuery);

    /**
     * method to perform yelp api search
     * @param req
     * @param res
     */
    function searchQuery(req, res) {
        var query = req.body;
        var method = 'GET';
        var url = 'http://api.yelp.com/v2/search';
        var params = {
            location: 'Boston',
            oauth_consumer_key: 'jy6KfFXcDAuhEWaU3yq7Cg', //Consumer Key
            oauth_token: 'O4AfEjXOKLSgMxYaeE3UTpmiq9pcrFoq', //Token
            oauth_signature_method: "HMAC-SHA1",
            oauth_timestamp: n().toString().substr(0,10),
            oauth_nonce: n(),
            category_filter: 'food',
            term: query.text
        };
        var consumerSecret = 'egCopRSeSLB9j5i0ace_oUbrHBw'; //Consumer Secret
        var tokenSecret = 'BC-Z3fTHG2_xpUzVl2b-BMZ41pE'; //Token Secret
        var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {encodeSignature: false});
        params['oauth_signature'] = signature;
        var paramURL = qs.stringify(params);

        /* Add the query string to the url */
        var apiURL = url+'?'+paramURL;
        request(apiURL, function(error, response, body){
            if (!error && response.statusCode == 200) {
                //var data = JSON.parse(body)
                res.send(body);
            } else{
                res.sendStatus(400).send(body);
            }
        });
    }
};