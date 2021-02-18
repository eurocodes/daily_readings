const fetchDetails = require("./helpers");

const reflectionsText = async (url) => {
    try {
        const $ = await fetchDetails(url);

        const link = [];
        $(".post-card .title").find("a").each((index, element) => {
            link.push($(element).attr("href"))
        })

        const title = [];
        $(".post-card .title").find("a").each((index, element) => {
            title.push($(element).text())
        })

        const message = []
        $(".post-card .card-content").find(".content").each((index, element) => {
            message.push($(element).text())
        })

        const list = [];
        for (let i = 0; i < link.length; i++) {
            list.push(link[i], title[i], message[i])
        }

        const msg = []
        list.map((item) => {
            if (item) {
                for (let i = 1; i < item.length; i++) {
                    if (item[i] + item[i - 1] === "  ") {
                        item = item.trim();
                    }
                }
                msg.push(item)
            }
            else msg.push("")
        });

        let listArr = []
        for (let i = 0; i < msg.length; i += 3) {
            let listObj = {}
            if (i % 3 == 0) {
                listObj.id = i
                listObj.link = msg[i]
                listObj.title = msg[i + 1]
                listObj.message = msg[i + 2]
            }
            listArr.push(listObj)
        }

        return listArr;
    } catch (error) {
        console.log(error)
    }
}

module.exports = reflectionsText;