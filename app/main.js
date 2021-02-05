const fetchDetails = require("./helpers");

async function fullSite(url) {
    const $ = await fetchDetails(url);

    const items = [];
    $("div .content-body").each((index, element) => {
        items.push($(element).text())
    })

    const verse = [];
    $(".content-body").siblings().find("a").each((index, element) => {
        if (!$(element)) {
            verse.push("")
        } else { verse.push($(element).text()) }
    })

    const readingNum = [];
    $(".content-body").siblings().find("h3").each((index, element) => {
        if (!$(element)) {
            readingNum.push("")
        } else { readingNum.push($(element).text()) }
    })

    const readingVerse = [];
    for (let i = 0; i < items.length; i++) {
        readingVerse.push(readingNum[i], verse[i], items[i])
    }

    if (readingVerse[readingVerse.length - 2] == "undefined" || readingVerse[readingVerse.length - 2] == null) {
        [readingVerse[readingVerse.length - 2], readingVerse[readingVerse.length - 5]] = [readingVerse[readingVerse.length - 5], readingVerse[readingVerse.length - 2]]
    }

    const read = []
    readingVerse.map((item) => {
        if (item) {
            for (let i = 1; i < item.length; i++) {
                if (item[i] + item[i - 1] === "  ") {
                    item = item.trim();
                }
            }
            read.push(item)
        }
        else read.push("")
    });

    let readArr = []
    for (let i = 0; i < read.length; i += 3) {
        let readObj = {}
        if (i % 3 == 0) {
            readObj.id = i
            readObj.title = read[i]
            readObj.verse = read[i + 1]
            readObj.text = read[i + 2]
        }
        readArr.push(readObj)
    }

    const content = {
        title: $("title").text().split("|")[0],
        lectionary: $(".b-lectionary").find('p').text(),
        length: read.length,
        verse: verse,
        text: readArr,
    }

    return content;
}

module.exports = fullSite;