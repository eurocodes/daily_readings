const fetchDetails = require("./helpers");

const reflectionLinks = async (url) => {
    const $ = await fetchDetails(url);

    const links = [];
    $(".view-content .content-body li").find("a").each((index, element) => {
        links.push($(element).attr("href"))
    })

    const title = []
    $(".view-content .content-body li").find(".title").each((index, element) => {
        title.push($(element).text())
    })

    const list = [];
    for (let i = 0; i < links.length; i++) {
        list.push(title[i], links[i])
    }

    let listArr = []
    for (let i = 0; i < list.length; i += 2) {
        let listObj = {}
        if (i % 2 == 0) {
            listObj.id = i
            listObj.title = list[i]
            listObj.link = list[i + 1]
        }
        listArr.push(listObj)
    }

    return listArr;
}

module.exports = reflectionLinks;