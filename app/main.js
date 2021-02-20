const fetchDetails = require("./helpers");

async function fullSite(url) {
    try {
        const $ = await fetchDetails(url);

        // Gets Reading full text
        const items = [];
        $("div .content-body").each((index, element) => {
            items.push($(element).text())
        })

        // Gets verses
        const verse = [];
        $(".content-body").siblings().find("a").each((index, element) => {
            if (!$(element)) {
                verse.push("")
            } else { verse.push($(element).text()) }
        })

        // Gets Readings title
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

        // Arranges it in order, putting title and verse in place (in an object)
        let readArr = []
        for (let i = 0; i < read.length; i += 3) {
            let readObj = {}
            if (i % 3 == 0) {
                readObj.id = i
                readObj.title = read[i]
                readObj.verse = read[i + 1]
                if (read[i].toUpperCase() == "RESPONSORIAL PSALM" ||
                    read[i].toUpperCase() == "VERSE BEFORE THE GOSPEL" ||
                    read[i].toUpperCase() == "ALLELUIA") {
                    readObj.text = read[i + 2]
                } else {
                    readObj.text = read[i + 2].replace(/\s\s+/g, " ").split("\n").join(" ");
                }
            }
            readArr.push(readObj)
        }

        const content = {
            title: $("title").text().split("|")[0].toUpperCase(),
            lectionary: $(".b-lectionary h2").siblings().text(),
            ref: $(".content-header h2").text(),
            length: read.length,
            verse: verse,
            text: readArr,
        }

        return content;
    } catch (error) {
        console.log(error)
    }
}

module.exports = fullSite;