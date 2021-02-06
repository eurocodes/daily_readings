const fetchDetails = require("./helpers");

async function getSpecialDays(url) {

    const $ = await fetchDetails(url);
    const title = [];
    $(".b-lectionary p").find("a").each((index, element) => {
        let label = $(element).text();
        let link = $(element).attr("href");
        title.push(label, link)
    })

    let readArr = []
    for (let i = 0; i < title.length; i += 2) {
        let readObj = {}
        if (i % 2 == 0) {
            readObj.id = i
            readObj.text = title[i]
            readObj.link = title[i + 1]
        }
        readArr.push(readObj)
    }

    const content = {
        title: $("title").text().split("|")[0],
        lectionary: $(".b-lectionary h2").siblings().text(),
        length: title.length,
        text: readArr,
    }
    return content;
}

module.exports = getSpecialDays;