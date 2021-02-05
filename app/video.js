const fetchDetails = require("./helpers");

const reflectionVideo = async (url) => {
    const $ = await fetchDetails(url);

    let youtubeId = $(".embed-video").find("iframe").attr("src")
    youtubeId = youtubeId.split("/");
    youtubeId = youtubeId[youtubeId.length - 1].split("?")[0];

    return youtubeId;
}

module.exports = reflectionVideo;