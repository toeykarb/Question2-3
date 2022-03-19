const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
import cheerio from "cheerio";

const myArgs = process.argv.slice(2);

console.log(myArgs);

const response = await fetch("https://codequiz.azurewebsites.net/", {
  headers: {
    cookie: "hasCookie=true",
  },
});
const body = await response.text();
// console.log(body);

const $ = await cheerio.load(body);
var test = await $("table tr");
// console.log($(test).text());
test.map((item) => {
  if ($(test[item]).text().includes(myArgs)) {
    const printVal = $(test[item]).find("td:nth-child(2)").text();
    console.log(printVal);
  }
});
