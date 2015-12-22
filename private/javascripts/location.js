/**
 * Created by meskill on 11.12.2015.
 */

var Location = Backbone.Model.extend({
    defaults: {
        title: ""
    }
    , parse(res) {
        return {title: res.title}
    }
});

var LocationCollection = Query.extend({
    model: Location
    , parse(res) {
        return res.response.locations
    }
});

var LocationView = AbstractView.extend({
    tagName: 'ul'
    , events: {
        'click li': function (e) {
            this.router.navigate('search/'+e.target.textContent, {trigger: true})
        }
    }
    , add(loc) {
        this.$el.append('<li id="' + loc.cid + '">' + loc.get('title') + '</li>')
    }
});