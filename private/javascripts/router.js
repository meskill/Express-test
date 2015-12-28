/**
 * Created by meskill on 21.12.2015.
 */

app.collections.query = new app.Collections.Query();

var Router = Backbone.Router.extend({
	routes: {
		'recent': 'recent',
		'locations': 'locations',
		'error(/:error)': 'error',
		'search/:lon/:lat': 'my_search',
		'search/:title': 'search',
		'property/:id': 'property',
		'favourites': 'favourites',
		'*path': 'recent'
	}
	, hide() {
		app.views.recentSearchView.hide();
		app.views.locationView.hide();
		app.views.errorView.hide();
		app.views.mainView.hide();
		app.views.searchResultsView.hide();
		app.views.propertyView.hide();
		app.views.favouritesView.hide()
	}
	, show() {
		this.hide();
		for (var i = 0; i < arguments.length; i++)
			arguments[i].show()
	}
	, parse_response(col, res, op) {
		switch (res.response.application_response_code) {
			case "100":
			case "101":
			case "110":
				if (!res.response.total_results)
					return this.navigate('error/There were no properties found for the given location', {
						trigger: true,
						replace: true
					});
				this.show(app.views.searchResultsView);
				app.views.searchResultsView.clear();
				app.views.searchResultsView.result_length = res.response.total_results;
				app.views.searchResultsView.collection.set(res, {parse: true});
				app.views.searchResultsView.render();
				app.views.recentSearchView.collection.add([{
					title: res.request.location,
					count: res.response.total_results
				}]);
				app.views.recentSearchView.collection.update();
				break;
			case "200":
			case "202":
				this.show(app.views.mainView, app.views.locationView);
				app.views.locationView.clear();
				app.views.locationView.collection.set(res, {parse: true});
				this.navigate('locations', {trigger: true, replace: true});
				break;
			default:
				this.navigate('error/The location given was not recognised.', {trigger: true, replace: true})
		}
	}
	, recent() {
		this.show(app.views.mainView, app.views.recentSearchView);
		app.views.recentSearchView.show()
	}
	, locations() {
		this.show(app.views.mainView, app.views.locationView);
		app.views.locationView.show()
	}
	, error(error) {
		this.show(app.views.mainView, app.views.errorView);
		app.views.errorView.find('#error-text').html(error);
		app.views.errorView.show()
	}
	, my_search(lon, lat) {
		coords = lon + ',' + lat;
		if (coords != app.config.search_data.centre_point) {
			app.config.search_data.page = 1;
			app.config.search_data.place_name = undefined;
			app.config.search_data.centre_point = coords;
			app.collections.query.fetch({
				dataType: 'jsonp', data: app.config.search_data, success: this.parse_response.bind(this),
				error: () => this.navigate('error/An error occurred while searching. Please check your network connection and try again', {
					trigger: true,
					replace: true
				})
			})
		} else {
			this.show(app.views.searchResultsView)
		}
	}
	, search(title) {
		if (title != app.config.search_data.place_name) {
			app.config.search_data.page = 1;
			app.config.search_data.place_name = title;
			app.config.search_data.centre_point = undefined;
			app.collections.query.fetch({
				dataType: 'jsonp', data: app.config.search_data, success: this.parse_response.bind(this),
				error: () => this.navigate('error/An error occurred while searching. Please check your network connection and try again', {
					trigger: true,
					replace: true
				})
			})
		} else {
			this.show(app.views.searchResultsView)
		}
	}
	, property(id) {
		app.views.propertyView.model = app.views.searchResultsView.collection.get(id) || app.views.favouritesView.collection.get(id);
		app.views.propertyView.clear();
		app.views.propertyView.render();
		this.show(app.views.propertyView)
	}
	, favourites() {
		this.show(app.views.favouritesView)
	}
});

app.router = new Router();