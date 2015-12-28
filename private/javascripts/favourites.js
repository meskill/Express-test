/**
 * Created by meskill on 22.12.2015.
 */

app.Models.Favourite = app.Models.Result.extend({
	parse(res) {
		return res;
	}
});

app.Collections.FavouritesCollection = app.Collections.ResultCollection.extend({
	url: './favourites'
	, model: app.Models.Favourite
	, parse(res) {
		return res
	}
});

app.Views.FavouritesView = app.Views.SearchResultsView.extend({
	initialize() {
		app.Views.AbstractView.prototype.initialize.apply(this, arguments)
	}
	, render() {
		app.Views.AbstractView.prototype.render.apply(this, arguments)
	}
	, clear() {
		app.Views.AbstractView.prototype.clear.apply(this, arguments)
	}
});


app.collections.favourites = new app.Collections.FavouritesCollection();