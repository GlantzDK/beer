import * as ko from "knockout";
import { BeerClient } from "./client";
import { IBeer } from "./beer";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "../custom.css"



export class BeerApp {
    beerClient: BeerClient;
    beers: ko.ObservableArray<IBeer>;
    selectedBeer: ko.Observable<IBeer>;
    favourites: ko.ObservableArray<IBeer>;
    currentPage: number;
    isLoading: ko.Observable<boolean>;
    searchEnabled: ko.Observable<boolean>;
    searchTerm: ko.Observable<string>;
    nextSearch: Function;
    constructor() {
        this.beerClient = new BeerClient();
        this.beers = ko.observableArray();
        this.currentPage = 1;
        this.isLoading = ko.observable(false);
        this.searchEnabled = ko.observable(false);
        this.selectedBeer = ko.observable();
        this.searchTerm = ko.observable();
        this.favourites = ko.observableArray();
        this.loadFavourites();
        this.getAll();

        this.searchTerm.subscribe(() => {
            this.getSearch();
        });
    }

    getAll = () => {
        if (this.isLoading()) {
            return;
        }

        this.isLoading(true);
        this.beerClient.getBeers(this.currentPage).done((beers: IBeer[]) => {
            beers.forEach((beer: IBeer) => {
                this.beers.push(beer);

            });

            this.isLoading(false);
        });
        this.nextSearch = this.getAll;
    }

    getFavourites = () => {
        if (this.isLoading()) {
            return;
        }

        this.isLoading(true);
        var ids = this.favourites().map((beer: IBeer) => {
            return beer.id;
        });
        this.beerClient.getSpecific(ids.join("|"), this.currentPage).done((beers: IBeer[]) => {
            beers.forEach((beer: IBeer) => {
                this.beers.push(beer);

            });

            this.isLoading(false);
        });
        this.nextSearch = this.getFavourites;
    }

    getSearch = () => {
        this.beers.removeAll();
        this.search();
        this.nextSearch = this.search;
    }

    search = () => {
        if (this.isLoading()) {
            return;
        }
        if (this.searchTerm().length === 0) {
            return;
        }
        this.isLoading(true);
        this.beerClient.search(this.searchTerm().replace(" ", "_"), this.currentPage).done((beers: IBeer[]) => {
            beers.forEach((beer: IBeer) => {
                this.beers.push(beer);

            });
            this.isLoading(false);
        });
    }
    

    reset = () => {
        this.currentPage = 1;
        this.beers.removeAll();
        this.searchEnabled(false);
    }

    loadFavourites = () => {
        var x = JSON.parse(localStorage.getItem("favourites"));
        if (x !== null) {
            this.favourites(x);
        }
    }

    searchNextPage = () => {
        this.currentPage++;
        this.nextSearch();
    }

    showBeer = (beer: IBeer) => {
        console.log(beer.name);
        this.selectedBeer(beer);
    }

    showFavourites = () => {
        this.reset();
        this.getFavourites();
    }

    enableSearch = () => {
        this.reset();
        this.searchEnabled(true);
        this.searchTerm("");
    }

    showAll = () => {
        this.reset();
        this.getAll();
    }

    markFavourite = (beer: IBeer) => {
        if (!this.isFavourite(beer)) {
            this.favourites.push(beer);
        } else {
            const existing = ko.utils.arrayFirst(this.favourites(), (favBeer: IBeer) => {
                return favBeer.id === beer.id;
            });

            this.favourites.remove(existing);
        }

        localStorage.setItem("favourites", JSON.stringify(this.favourites()));
    }

    isFavourite = (beer: IBeer) => {
        return this.favourites().some((favBeer) => {
            return favBeer.id === beer.id;
        });
    }
}