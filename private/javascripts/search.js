/**
 * Created by meskill on 11.12.2015.
 */

app.Models.Result = Backbone.Model.extend({
	defaults: {
		price: 0
		, loc: ''
		, img: '/private/images/default.png'
		, bedroom_number: 0
		, bathroom_number: 0
		, summary: ''
	}

	, parse(res) {
		return {
			price: res.price
			, loc: res.title.split(',').slice(0, 2).join(',')
			, img: res.img_url
			, bedroom_number: res.bedroom_number
			, bathroom_number: res.bathroom_number
			, summary: res.summary
		}
	}
});

app.Collections.ResultCollection = Backbone.Collection.extend({
	model: app.Models.Result
	, parse(res) {
		return res.response.listings
	}
});

app.Views.SearchResultsView = app.Views.AbstractView.extend({
	tagName: 'table'
	, initialize() {
		app.Views.AbstractView.prototype.initialize.apply(this, arguments);
		this.oel.find('#load_more').click(() => {
			app.config.search_data.page++;
			app.collections.query.fetch({
				dataType: 'jsonp', data: app.config.search_data, success: (col, res, op)=> {
					this.collection.add(res, {parse: true});
					this.render()
				}, error: () =>  console.log('error')
			})
		})
	}
	, events: {
		'click tr': function (e) {
			app.router.navigate('property/' + e.currentTarget.id, {trigger: true})
		}
	}
	, add(result) {
		this.$el.append('<tr id=' + result.cid + '><td><img src="' + result.get('img') + '"></td><td>$' + result.get('price') + '<br>' + result.get('loc') + '</td></tr>')
	}
	, render() {
		this.$('caption').text(this.collection.length + ' of ' + this.result_length);
		if (this.result_length - this.collection.length > 0) this.oel.find('#load_more').show();
		else this.oel.find('#load_more').hide()
	}
	, clear() {
		this.$el.html('<caption>0</caption>')
	}
});

app.Views.PropertyView = app.Views.AbstractView.extend({
	tagName: 'div'
	, initialize() {
		this.oel = this.$el;
		this.$el = this.$(this.tagName);
		this.oel.find('#favourites_add').click(()=> {
			app.views.favouritesView.collection.add(this.model);
			app.views.favouritesView.collection.update()
		})
	}
	, render() {
		if (this.model) {
			this.$el.append('$' + this.model.get('price') + '<br>');
			this.$el.append(this.model.get('loc') + '<br>');
			this.$el.append('<img src="' + this.model.get('img') + '"><br>');
			this.$el.append(this.model.get('bedroom_number') + ' bed, ' + this.model.get('bathroom_number') + ' bathrooms' + '<br>');
			this.$el.append(this.model.get('summary') + '<br>')
		}
	}
});


app.collections.resultCollection = new app.Collections.ResultCollection();