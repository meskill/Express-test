/**
 * Created by meskill on 14.12.2015.
 */

app.Views.AbstractView = Backbone.View.extend({
	initialize() {
		this.oel = this.$el;
		this.$el = this.$(this.tagName);
		this.collection.on('add', this.add, this);
		this.collection.on('reset', this.render, this)
	}
	, clear() {
		this.$el.html('')
	}
	, show() {
		this.oel.show()
	}
	, hide() {
		this.oel.hide()
	}
});