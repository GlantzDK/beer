"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var client_1 = require("./client");
require("bootstrap");
require("bootstrap/dist/css/bootstrap.css");
require("../custom.css");
var BeerApp = /** @class */ (function () {
    function BeerApp() {
        var _this = this;
        this.getAll = function () {
            if (_this.isLoading()) {
                return;
            }
            _this.isLoading(true);
            _this.beerClient.getBeers(_this.currentPage).done(function (beers) {
                beers.forEach(function (beer) {
                    _this.beers.push(beer);
                });
                _this.isLoading(false);
            });
            _this.nextSearch = _this.getAll;
        };
        this.getFavourites = function () {
            if (_this.isLoading()) {
                return;
            }
            _this.isLoading(true);
            var ids = _this.favourites().map(function (beer) {
                return beer.id;
            });
            _this.beerClient.getSpecific(ids.join("|"), _this.currentPage).done(function (beers) {
                beers.forEach(function (beer) {
                    _this.beers.push(beer);
                });
                _this.isLoading(false);
            });
            _this.nextSearch = _this.getFavourites;
        };
        this.getSearch = function () {
            _this.beers.removeAll();
            _this.search();
            _this.nextSearch = _this.search;
        };
        this.search = function () {
            if (_this.isLoading()) {
                return;
            }
            if (_this.searchTerm().length === 0) {
                return;
            }
            _this.isLoading(true);
            _this.beerClient.search(_this.searchTerm().replace(" ", "_"), _this.currentPage).done(function (beers) {
                beers.forEach(function (beer) {
                    _this.beers.push(beer);
                });
                _this.isLoading(false);
            });
        };
        this.reset = function () {
            _this.currentPage = 1;
            _this.beers.removeAll();
            _this.searchEnabled(false);
        };
        this.loadFavourites = function () {
            var x = JSON.parse(localStorage.getItem("favourites"));
            if (x !== null) {
                _this.favourites(x);
            }
        };
        this.searchNextPage = function () {
            _this.currentPage++;
            _this.nextSearch();
        };
        this.showBeer = function (beer) {
            console.log(beer.name);
            _this.selectedBeer(beer);
        };
        this.showFavourites = function () {
            _this.reset();
            _this.getFavourites();
        };
        this.enableSearch = function () {
            _this.reset();
            _this.searchEnabled(true);
            _this.searchTerm("");
        };
        this.showAll = function () {
            _this.reset();
            _this.getAll();
        };
        this.markFavourite = function (beer) {
            if (!_this.isFavourite(beer)) {
                _this.favourites.push(beer);
            }
            else {
                var existing = ko.utils.arrayFirst(_this.favourites(), function (favBeer) {
                    return favBeer.id === beer.id;
                });
                _this.favourites.remove(existing);
            }
            localStorage.setItem("favourites", JSON.stringify(_this.favourites()));
        };
        this.isFavourite = function (beer) {
            return _this.favourites().some(function (favBeer) {
                return favBeer.id === beer.id;
            });
        };
        this.beerClient = new client_1.BeerClient();
        this.beers = ko.observableArray();
        this.currentPage = 1;
        this.isLoading = ko.observable(false);
        this.searchEnabled = ko.observable(false);
        this.selectedBeer = ko.observable();
        this.searchTerm = ko.observable();
        this.favourites = ko.observableArray();
        this.loadFavourites();
        this.getAll();
        this.searchTerm.subscribe(function () {
            _this.getSearch();
        });
    }
    return BeerApp;
}());
exports.BeerApp = BeerApp;
