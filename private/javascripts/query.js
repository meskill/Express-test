/**
 * Created by meskill on 11.12.2015.
 */

app.Collections.Query = Backbone.Collection.extend({
	url: 'http://api.nestoria.co.uk/api'
});

app.config.search_data = {
	country: 'uk'
	, pretty: 1
	, action: 'search_listings'
	, encoding: 'json'
	, listing_type: 'buy'
	, page: 1
};