/**
 * Created by meskill on 11.12.2015.
 */

app.Models.Search = Backbone.Model.extend({
	defaults: {
		title: "",
		count: 0
	}
});

app.Collections.SearchCollection = Backbone.Collection.extend({
	model: app.Models.Search
	, url: './recent'
	, add(models, options) {
		models = _.isArray(models) ? models.slice() : [models];
		for (var i = 0; i < models.length; i++) {
			var model = ((models[i] instanceof this.model) ? models[i] : new this.model(models[i]));
			if (!this.any((_model) => _model.get('title').toLowerCase() === model.get('title').toLowerCase()))
				Backbone.Collection.prototype.add.call(this, model);
		}
		this.models = this.slice(-10)
	}
});


app.Views.RecentSearchView = app.Views.AbstractView.extend({
	tagName: "ul"
	, events: {
		'click li': function (e) {
			app.router.navigate('search/' + this.collection.get(e.target.id).get('title'), {trigger: true})
		}
	}
	, add(search) {
		this.$el.append('<li id="' + search.cid + '">' + search.get('title') + ' (' + search.get('count') + ')</li>')
	}
});


app.collections.recentSearch = new app.Collections.SearchCollection();