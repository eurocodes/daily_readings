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

    const readingVerse = [];
    for (let i = 0; i < items.length; i++) {
        readingVerse.push(verse[i], items[i])
    }
    // console.log(readingVerse[readingVerse.length - 2])
    if (readingVerse[readingVerse.length - 2] == "undefined" || readingVerse[readingVerse.length - 2] == null) {
        [readingVerse[readingVerse.length - 2], readingVerse[readingVerse.length - 4]] = [readingVerse[readingVerse.length - 4], readingVerse[readingVerse.length - 2]]
    }
    // console.log(readingVerse[readingVerse.length - 2])

    const read = []
    readingVerse.map((item) => {
        if (item) read.push(item.split("\n").join(`{\n}`))
        else read.push("")
    })

    const content = {
        title: $("title").text().split("|")[0],
        lectionary: $(".b-lectionary").find('p').text(),
        length: read.length,
        verse: verse,
        text: read,

    }

    return content
}

module.exports = fullSite;