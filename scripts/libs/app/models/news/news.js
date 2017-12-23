/**
 * Created by Skeksify on 09/07/2016.
 */

define([
    "underscore",
    "jquery",
    "Backbone",
    "Displayable",
    "utils",
    "text!../news/news.html",
    "text!../news/news.css"
], function (_, $, Backbone, Displayable, Utils, html, css) {
    function beautifyTitle(title) {
        return title.split('-').map(word => word.substr(0, 1).toUpperCase() + word.substr(1)).slice(0, -1).join(' ');
    }

    return Displayable.extend({

        _titleMap: {
            'nq-100-futures': 'Nasdaq Futures',
            'us-spx-500-futures': 'S&P 500 Futures',
            'us-30': 'Dow 30',
            'smallcap-2000': 'SmallCap 2000',
            'volatility-s-p-500': 'S&P 500 VIX',
            'germany-30': 'DAX',
            '': ''

        },

        _markupScheme: {
        },

        initialize: function () {
            Displayable.prototype.initialize.call(this, html, css);

        },

        render: function (category, title) {
            Displayable.prototype.render.call(this, this._chewTemplateData(category, title), this._markupScheme);

            return this.$el;
        },

        _chewTemplateData: function (category, title) {
            return {
                title: beautifyTitle(title)
            }
        }
    })
});
