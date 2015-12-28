/**
 * Created by meskill on 10.12.2015.
 */

var app = {
	Models: {},
	models: {},
	Collections: {},
	collections: {},
	Views: {},
	views: {},
	config: {}
};

app.showView = function (viewName, selector, collection) {
	this.views[viewName[0].toLowerCase() + viewName.slice(1)] = new this.Views[viewName]({
		el: selector,
		collection: collection
	})
};

app.init = function () {
	app.showView('MainView', $('#property_search'));
	app.showView('RecentSearchView', $('#recent'), app.collections.recentSearch);
	app.showView('LocationView', $('#locations'), app.collections.locationCollection);
	app.showView('SearchResultsView', $('#search_results'), app.collections.resultCollection);
	app.showView('PropertyView', $('#property'));
	app.showView('FavouritesView', $('#favourites'), app.collections.favourites);
	app.views.errorView = $('#error');
	Backbone.history.start();
	app.router.navigate('recent', {trigger: true});
};