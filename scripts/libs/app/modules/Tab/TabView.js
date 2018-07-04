/**
 * Created by Skeksify on 09/07/2016.
 */

define([
    "underscore",
    "jquery",
    "Backbone",
    "Displayable",
    "Toolset/toolset",
    "text!./Tab.html",
    "text!./Tab.css"
], function (_, $, Backbone, Displayable, Toolset, html, css) {
	let alreadyInjectedCSS = false;

    return Displayable.extend({
        _markupScheme: {

        },

		events: {
			'click': 'tabClick'
		},

        initialize: function ($prerenderedTab) {
            Displayable.prototype.initialize.call(this, $prerenderedTab ? '' : html, !alreadyInjectedCSS ? css : '');
			alreadyInjectedCSS = true;
			if ($prerenderedTab) {
				this.$el = $prerenderedTab;
				Displayable.prototype.injectCSS.call(this);
			}
        },

        render: function (settings) {
            Displayable.prototype.render.call(this, settings, this._markupScheme);

            return this.$el;
        },

		tabClick: function () {
			this.trigger('selected');
		},

        select: function () {
			this.$el.addClass('selected');
        },

		unselect: function () {
			this.$el.removeClass('selected');
		}
    })
});