"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var $ = require("jquery");
require("bootstrap");
var beerApp_1 = require("./scripts/beerApp");
$(document).ready(function () {
    var app = new beerApp_1.BeerApp();
    ko.applyBindings(app);
    $(window).scroll(function () {
        var position = $(window).scrollTop();
        var bottom = $(document).height() - $(window).height();
        if (position == bottom) {
            app.searchNextPage();
        }
    });
});
