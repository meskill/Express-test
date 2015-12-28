/**
 * Created by meskill on 28.12.2015.
 */

Backbone.Collection.prototype.save = function () {
	Backbone.sync('create', this, {success: (()=>console.log('saved'))})
};

Backbone.Collection.prototype.update = function () {
	Backbone.sync('update', this, {success: (()=>console.log('updated'))})
};