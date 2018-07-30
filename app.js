const express = require("express");
const app = express();
const request = require("request");
const http = require("http");
const rp = require("request-promise");
const cheerio = require("cheerio");
const amazon = require("./amazon");
const ebay = require("./ebay");
const gumtree = require("./gumtree");
let data = {
  gumtree: [],
  ebay: [],
  amazon: []
};

var hostname = "127.0.0.1";
var port = 8080;

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("search");
});

app.get("/results", function(req, res) {
  var searchItem = req.query.search;

  gumtree.gumtreeSearch(searchItem, 2, function(result) {
    if (result != undefined) {
		data.gumtree = result;
    }
  });
  
  amazon.amazonSearch(0, function(output) {
    data.amazon = output;
  });
  
  ebay.ebaySearch(searchItem, function(details) {
    data.ebay = details;
  });
  
  res.render("results", { data: data });
});

app.get("/graph", function(req, res) {
  res.render("graph");
});
app.listen(port, hostname, function() {
  console.log("Server has started");
});
