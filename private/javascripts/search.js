/**
 * Created by meskill on 11.12.2015.
 */

var Result = Backbone.Model.extend({
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

var ResultCollection = Backbone.Collection.extend({
	model: Result
	, parse(res) {
		return res.response.listings
	}
});

var SearchResultsView = AbstractView.extend({
	tagName: 'table'
	, initialize() {
		AbstractView.prototype.initialize.apply(this, arguments);
		this.oel.find('#load_more').click(() => {
			query.fetch({
				dataType: 'jsonp', data: search_data, success: (col, res, op)=> {
					this.collection.add(res, {parse: true});
					this.render()
				}
			})
		})
	}
	, events: {
		'click tr': function (e) {
			this.router.navigate('property/' + e.currentTarget.id, {trigger: true})
		}
	}
	, add(result) {
		this.$el.append('<tr id=' + result.cid + '><td><img src="' + result.get('img') + '"></td><td>$' + result.get('price') + '<br>' + result.get('loc') + '</td></tr>')
	}
	, render() {
		this.$('caption').text(this.collection.length + ' of ' + this.result_length);
		if (this.result_length > 20) this.oel.find('#load_more').show();
		else this.oel.find('#load_more').hide()
	}
	, clear() {
		this.$el.html('<caption>0</caption>')
	}
});

var PropertyView = AbstractView.extend({
	tagName: 'div'
	, initialize() {
		this.oel = this.$el;
		this.$el = this.$(this.tagName);
		this.oel.find('#favourites_add').click(()=> {
			this.router.favouritesView.collection.add(this.model);
			this.router.favouritesView.collection.update()
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