/**
 * Created by meskill on 22.12.2015.
 */

var Favourite = Result.extend({
	parse(res) {
		return res;
	}
});
var FavouritesCollection = ResultCollection.extend({
	url: './favourites'
	, model: Favourite
	, parse(res) {
		return res
	}
});

var FavouritesView = SearchResultsView.extend({
	initialize() {
		AbstractView.prototype.initialize.apply(this, arguments)
	}
	, render() {
		AbstractView.prototype.render.apply(this, arguments)
	}
	, clear() {
		AbstractView.prototype.clear.apply(this, arguments)
	}
});