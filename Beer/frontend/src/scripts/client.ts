import * as $ from "jquery";
import { IBeer } from "../scripts/beer";

abstract class Client {
    private readonly baseUrl: string;

    protected constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    protected call = (settings: JQueryAjaxSettings) => {
        settings.url = this.baseUrl + settings.url;
        return $.ajax(settings);
    }
}



export class BeerClient extends Client {
    constructor() {
        super("https://api.punkapi.com/v2/beers");
    }


    getBeer = (id): JQueryPromise<any> => {
        return this.call({
            type: "GET",
            url: `/${id}`,
            contentType: "application/json; charset=utf-8"
        });
    }

    getRandom = (): JQueryPromise<any> => {
        return this.call({
            type: "GET",
            url: "/random",
            contentType: "application/json; charset=utf-8"
        });
    }

    getBeers = (page: number): JQueryPromise<any> => {
        return this.call({
            type: "GET",
            url: `?page=${page}`,
            contentType: "application/json; charset=utf-8"
        });
    }

    getSpecific = (ids: string, page: number): JQueryPromise<any> => {
        return this.call({
            type: "GET",
            url: `?ids=${ids}&page=${page}`,
            contentType: "application/json; charset=utf-8"
        });
    }

    search = (searchTerm: string, page: number): JQueryPromise<any> => {
        return this.call({
            type: "GET",
            url: `?beer_name=${searchTerm}&page=${page}`,
            contentType: "application/json; charset=utf-8"
        });
    }

}