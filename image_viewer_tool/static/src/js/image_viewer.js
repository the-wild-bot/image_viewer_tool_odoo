odoo.define('image_viewer_tool.image_viewer', function (require) {
    "use strict";

    var core = require('web.core');
    var qweb = core.qweb;
    var imageWidget = core.form_widget_registry.get('image');
    var session = require('web.session');
    var utils = require('web.utils');

    imageWidget.include({
        render_value: function () {
            this._super();
            this.$el.find('img').bind('click', {widget: this}, this.ImageViewer);
            this.imageSrc = this.placeholder;
            if (this.get('value')) {
                if (!utils.is_bin_size(this.get('value'))) {
                    this.imageSrc = 'data:image/png;base64,' + this.get('value');
                } else {
                    this.imageSrc = session.url('/web/image', {
                        model: this.view.dataset.model,
                        id: JSON.stringify(this.view.datarecord.id || null),
                        field: (this.options.preview_image) ? this.options.preview_image : this.name,
                        unique: (this.view.datarecord.__last_update || '').replace(/[^0-9]/g, '')
                    });
                }
            }
        },

        ImageViewer: function (e) {
            var target = $(e.currentTarget);
            //prevent multi modal pop up. :D
            if (target.hasClass('image-modal-preview-content'))
                return;
            var $img = $(qweb.render("imagePreviewModal", {widget: e.data.widget, url: e.data.widget.imageSrc}));
            e.data.widget.$el.prepend($img);
            $img.css({'display': 'block'});
            $img.find('.image-preview-stop').bind('click', {'image_previev_modal': $img}, e.data.widget.ImageViewerStop);
        },

        ImageViewerStop: function (e) {
            var $img = e.data.image_previev_modal;
            //Timeout is matched up with css file so fix accordingly to one's needs.
            var timeout = 650;
            $img.find('.image-modal-preview-content').addClass('zoom-out', function () {
                setTimeout(function () {
                    $img.remove();
                }, timeout);
            });
        }
    });

});