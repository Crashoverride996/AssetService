module.exports = {
    getUrlFromProviderType: function (type) {
        if (type === 'nomics') {
            return 'https://api.nomics.com/v1/currencies/ticker?key=' + process.env.NOMICS_KEY + '&id='
        }
        else if (type === 'cryptoCompare') {
            return 'https://min-api.cryptocompare.com/data/pricehistorical?api_key=' + process.env.CRYPTO_COMPARE_KEY + '&tsyms=USD&fsym='
        }
        else {
            console.error("Unsuported provider type!")
        }
    }
}