/**
 * Created by meskill on 21.12.2015.
 */

var query = new Query();

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
	, initialize(recentSearchView, locationView, errorView, initialView, resultView, propertyView, favouritesView) {
		this.recentSearchView = recentSearchView;
		this.locationView = locationView;
		this.errorView = errorView;
		this.initialView = initialView;
		this.resultView = resultView;
		this.propertyView = propertyView;
		this.favouritesView = favouritesView
	}
	, hide() {
		this.recentSearchView.hide();
		this.locationView.hide();
		this.errorView.hide();
		this.initialView.hide();
		this.resultView.hide();
		this.propertyView.hide();
		this.favouritesView.hide()
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
					return this.navigate('error/There were no properties found for the given location', {trigger: true});
				this.show(this.resultView);
				this.resultView.clear();
				this.resultView.result_length = res.response.total_results;
				this.resultView.collection.set(res, {parse: true});
				this.resultView.render();
				this.recentSearchView.collection.add([{
					title: res.request.location,
					count: res.response.total_results
				}]);
				this.recentSearchView.collection.update();
				break;
			case "200":
			case "202":
				this.show(this.initialView, this.locationView);
				this.locationView.clear();
				this.locationView.collection.set(res, {parse: true});
				this.navigate('locations', {trigger: true});
				break;
			default:
				this.navigate('error/The location given was not recognised.', {trigger: true})
		}
	}
	, recent() {
		this.show(this.initialView, this.recentSearchView);
		this.recentSearchView.show()
	}
	, locations() {
		this.show(this.initialView, this.locationView);
		this.locationView.show()
	}
	, error(error) {
		this.show(this.initialView, this.errorView);
		this.errorView.find('#error-text').html(error);
		this.errorView.show()
	}
	, my_search(lon, lat) {
		coords = lon + ',' + lat;
		if (coords != search_data.centre_point) {
			search_data.page = 1;
			search_data.place_name = undefined;
			search_data.centre_point = coords;
			query.fetch({dataType: 'jsonp', data: search_data, success: this.parse_response.bind(this)})
		} else {
			this.show(this.resultView)
		}
	}
	, search(title) {
		if (title != search_data.place_name) {
			search_data.page = 1;
			search_data.place_name = title;
			search_data.centre_point = undefined;
			query.fetch({dataType: 'jsonp', data: search_data, success: this.parse_response.bind(this)})
		} else {
			this.show(this.resultView)
		}
	}
	, property(id) {
		this.propertyView.model = this.resultView.collection.get(id) || this.favouritesView.collection.get(id);
		this.propertyView.clear();
		this.propertyView.render();
		this.show(this.propertyView)
	}
	, favourites() {
		this.show(this.favouritesView)
	}
});