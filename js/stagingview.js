define(['d3'], function () {
    "use strict";

    /**
     * @class StagingView
     * @constructor
     */
    function StagingView(config) {
        this.files = [];
    }

    StagingView.prototype = {
        render: function (container) {
            var sView = this,
                sViewContainer;

            var div = container.append('div')
                .classed('staging-view', true);

            div.append('h2').text('Staging Area (Index)');

            sViewContainer = div.append('ul');

            this.container = sViewContainer;

            for (var file in this.files) {
                sViewContainer.append('li').text(file);
            }
        },
        destroy: function () {
            this.container.remove();

            for (var prop in this) {
                if (this.hasOwnProperty(prop)) {
                    this[prop] = null;
                }
            }
        },
        add: function (newFiles) {
            if (newFiles.indexOf(".") >= 0) {
                throw new Error("Sorry, in absence of a real working direcory, "
                        + "I can't add all unstaged files to the index. "
                        + "But this works in real git, of course.")
            } else {
                for (var i in newFiles) {
                    if (this.files.indexOf(newFiles[i]) < 0) {
                        this.files.push(newFiles[i]);
                    }
                }
                this._renderFiles();
            }
        },
        _renderFiles: function () {
            var items = this.container.selectAll('li')
                .data(this.files)
                .text(function(d) {return d;});
            items.enter()
                .append('li')
                .text(function(d) {return d;})
                .style('opacity', 0)
                .transition('file')
                .duration(500)
                .style('opacity', 1);
            items.exit()
                .style('opacity', 1)
                .transition('file')
                .duration(500)
                .style('opacity', 0)
                .remove();
        },

        reset: function () {
            this.files = [];
            this._renderFiles();
        }
    }
    return StagingView;
});
