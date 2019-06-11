"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var Client = /** @class */ (function () {
    function Client(baseUrl) {
        var _this = this;
        this.call = function (settings) {
            settings.url = _this.baseUrl + settings.url;
            return $.ajax(settings);
        };
        this.baseUrl = baseUrl;
    }
    return Client;
}());
var BeerClient = /** @class */ (function (_super) {
    __extends(BeerClient, _super);
    function BeerClient() {
        var _this = _super.call(this, "https://api.punkapi.com/v2/beers") || this;
        _this.getBeer = function (id) {
            return _this.call({
                type: "GET",
                url: "/" + id,
                contentType: "application/json; charset=utf-8"
            });
        };
        _this.getRandom = function () {
            return _this.call({
                type: "GET",
                url: "/random",
                contentType: "application/json; charset=utf-8"
            });
        };
        _this.getBeers = function (page) {
            return _this.call({
                type: "GET",
                url: "?page=" + page,
                contentType: "application/json; charset=utf-8"
            });
        };
        _this.getSpecific = function (ids, page) {
            return _this.call({
                type: "GET",
                url: "?ids=" + ids + "&page=" + page,
                contentType: "application/json; charset=utf-8"
            });
        };
        _this.search = function (searchTerm, page) {
            return _this.call({
                type: "GET",
                url: "?beer_name=" + searchTerm + "&page=" + page,
                contentType: "application/json; charset=utf-8"
            });
        };
        return _this;
    }
    return BeerClient;
}(Client));
exports.BeerClient = BeerClient;
