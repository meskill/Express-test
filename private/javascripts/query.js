/**
 * Created by meskill on 11.12.2015.
 */

var Query = Backbone.Collection.extend({
	url: 'http://api.nestoria.co.uk/api'
});

var search_data = {
	country: 'uk'
	, pretty: 1
	, action: 'search_listings'
	, encoding: 'json'
	, listing_type: 'buy'
	, page: 1
};