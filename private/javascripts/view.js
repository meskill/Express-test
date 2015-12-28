'use strict'

/**
 * Created by meskill on 28.12.2015.
 */

app.Views.MainView = Backbone.View.extend({
	events: {
		'click button#go': function () {
			app.router.navigate('search/' + $('#location').val(), {trigger: true})
		},

		'click button#favourites_button': function () {
			app.router.navigate('favourites', {trigger: true})
		},
		'click button#my_location': function () {
			let onError = () => app.router.navigate('error/Unable to detect current location. Please ensure location is turned on in your browser and try again.', {trigger: true})
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((coords)=> {
					if (coords.coords)
						app.router.navigate('search/' + coords.coords.longitude + '/' + coords.coords.latitude, {trigger: true});
					else
						onError()
				}, onError)
			} else
				app.router.navigate("error/Can't get current position", {trigger: true})
		}
	},
	show() {
		this.$el.show()
	},
	hide() {
		this.$el.hide();
	}
});