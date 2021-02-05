const axios = require("axios");
const cheerio = require("cheerio");

async function fetchDetails(url) {
    try {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = fetchDetails;