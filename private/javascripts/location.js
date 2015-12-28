/**
 * Created by meskill on 11.12.2015.
 */

app.Models.Location = Backbone.Model.extend({
	defaults: {
		title: ""
	}
	, parse(res) {
		return {title: res.title}
	}
});

app.Collections.LocationCollection = app.Collections.Query.extend({
	model: app.Models.Location
	, parse(res) {
		return res.response.locations
	}
});

app.Views.LocationView = app.Views.AbstractView.extend({
	tagName: 'ul'
	, events: {
		'click li': function (e) {
			app.router.navigate('search/' + e.target.textContent, {trigger: true})
		}
	}
	, add(loc) {
		this.$el.append('<li id="' + loc.cid + '">' + loc.get('title') + '</li>')
	}
});


app.collections.locationCollection = new app.Collections.LocationCollection();