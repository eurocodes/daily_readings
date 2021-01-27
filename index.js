// /_ server _/
const express = require("express");
const fullSite = require("./app/main");


const app = express();

const port = process.env.PORT || 8000;
app.set("port", port);

app.get("/mass-readings/*", async (req, res) => {
    const date = req.path.split("/")[2];
    const response = await fullSite(`https://bible.usccb.org/bible/readings/${date}.cfm`);
    res.send(response);
    // res.send(date);
})
app.listen(port, () => console.log(`App started on port ${port}.`));