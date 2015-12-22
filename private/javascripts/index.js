/**
 * Created by meskill on 10.12.2015.
 */

Backbone.Collection.prototype.save = function () {
	Backbone.sync('create', this, {success: (()=>console.log('saved'))})
};

Backbone.Collection.prototype.update = function () {
	Backbone.sync('update', this, {success: (()=>console.log('updated'))})
};

var recentSearch = new SearchCollection();
recentSearch.fetch();
var favourites = new FavouritesCollection();
favourites.fetch();
var locationCollection = new LocationCollection();
var resultCollection = new ResultCollection();
var router;

$(document).ready(function () {
	var recentSearchView = new RecentSearchView({el: $('#recent'), collection: recentSearch});
	var locationView = new LocationView({el: $('#locations'), collection: locationCollection});
	var searchResultsView = new SearchResultsView({el: $('#search_results'), collection: resultCollection});
	var propertyView = new PropertyView({el: $('#property')});
	var favouritesView = new FavouritesView({el: $('#favourites'), collection: favourites});
	router = new Router(recentSearchView, locationView, $('#error'), $('#property_search'),
		searchResultsView, propertyView, favouritesView);
	recentSearchView.router = locationView.router =
		searchResultsView.router = propertyView.router = favouritesView.router = router;
	Backbone.history.start();
	router.navigate('recent', {trigger: true});
	$('button#go').click(function () {
		router.navigate('search/' + $('#location').val(), {trigger: true})
	});
	$('button#favourites_button').click(function () {
		router.navigate('favourites', {trigger: true})
	});
	$('button#my_location').click(function () {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((coords)=> {
					if (coords.coords)
						router.navigate('search/' + coords.coords.longitude + '/' + coords.coords.latitude, {trigger: true});
					else
						router.navigate('error/Unable to detect current location. Please ensure location is turned on in your browser and try again.', {trigger: true})
				}
			)
		} else
			router.navigate("error/Can't get current position", {trigger: true})
	})
});