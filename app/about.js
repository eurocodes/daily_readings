const fetchDetails = require("./helpers");

const aboutInfo = async (url) => {

    try {
        const $ = await fetchDetails(url);

        const details = {};
        $(".social__media--wrap").each((index, element) => {
            details.name = $(element).find(".footer__logo a").text();
            details.siteUrl = url.split("/").slice(0, 3).join("/");
            details.facebook = $(element).find(".social__icons a").eq(0).attr("href")
            details.twitter = $(element).find(".social__icons a").eq(1).attr("href")
            details.instagram = $(element).find(".social__icons a").eq(2).attr("href")
            details.linkedin = $(element).find(".social__icons a").eq(3).attr("href")
            details.email = $(element).find(".social__icons a").last().attr("href");
            details.mail = $(element).find(".social__icons a").last().attr("href").split(":")[1];
            details.message = $(element).find("p").text().replace(/\s\s+/g, " ");
            // console.log($(element).find(".social__icons a").length);
        })

        return details;

    } catch (error) {
        console.log(error)
    }
}

module.exports = aboutInfo;