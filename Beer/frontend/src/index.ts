import * as ko from "knockout";
import * as $ from "jquery";
import "bootstrap";

import { BeerApp } from "./scripts/beerApp";



$(document).ready(() => {
    var app = new BeerApp();
    ko.applyBindings(app);

    $(window).scroll(() => {

        var position = $(window).scrollTop();
        var bottom = $(document).height() - $(window).height();

        if (position == bottom) {

            app.searchNextPage();
        }

    });

});