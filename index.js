// /_ server _/
const http = require("http");
const express = require("express");
const fullSite = require("./app/main");
const getSpecialDays = require("./app/specialDays");
const reflectionLinks = require("./app/videos");
const reflectionVideo = require("./app/video");
const reflectionsText = require("./app/reflectionsText");
const reflectionTextSingle = require("./app/singleReflectionText");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

const server = http.createServer(app);

// test host endpoint
app.get('/', (req, res) => {
    return res.send({ message: 'Welcome' });
})

// Fetch video
app.get('/vid/*', async (req, res) => {
    let link = req.path;
    link = link.split("/");
    link = link.slice(2,)
    link = link.join("/");
    const response = await reflectionVideo(`https://bible.usccb.org/${link}`)
    return res.send({ youtubeId: response });
})

app.get("/mass-readings/*", async (req, res) => {
    const date = req.path.split("/")[2];
    let response = date ?
        await fullSite(`https://bible.usccb.org/bible/readings/${date}.cfm`)
        : await fullSite("https://bible.usccb.org/bible/readings/");
    if (!response.text[0]) {
        response = await getSpecialDays(`https://bible.usccb.org/bible/readings/${date}.cfm`)
    }
    res.send(response);
})

app.get("/readings/special/*", async (req, res) => {
    const sufix = req.path.split("/")[3];
    let response = await fullSite(`https://bible.usccb.org/bible/readings/${sufix}`)
    res.send(response);
})

app.get("/reflections/list", async (req, res) => {
    const response = await reflectionLinks("https://bible.usccb.org/podcasts/video");
    res.send(response);
})

app.get("/reflections/text/list", async (req, res) => {
    const response = await reflectionsText("https://catholicdioceseofwichita.org/reflections/");
    res.send(response);
})

app.post("/reflections/text/single/*", async (req, res) => {
    let date = req.path;
    const { url } = req.body;
    date = date.split("/");
    date = date.slice(4,)
    date = date.join("/");
    const year = "20" + date.split("-")[0];
    const month = date.split("-")[1];
    const day = date.split("-")[2];
    const response = req.body.url == "" ?
        await reflectionTextSingle(`https://catholicdioceseofwichita.org/reflections/${year}-${month}-${day}`)
        : await reflectionTextSingle(url);
    res.send(response);
})

server.listen(port, () => console.log(`App started on port ${port}.`));