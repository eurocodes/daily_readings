const fetchDetails = require("./helpers");

const reflectionTextSingle = async (url) => {
    const $ = await fetchDetails(url);

    const title = $("div .story").find("h1").text();

    const author = $("div .info-box .author").text();

    const verses = $("div .content").find("a").text();

    const subtitle = []
    $("div .content p strong").find("em").each((index, element) => {
        subtitle.push($(element).text())
    });

    const message = []
    $(".content p").each((index, element) => {
        message.push($(element).text())
    });

    const msgObject = {
        title: title,
        author: author.trim(),
        verses: verses,
        subtitle: subtitle[0],
        message: message.slice(2,),
    }


    return msgObject;
}

module.exports = reflectionTextSingle;