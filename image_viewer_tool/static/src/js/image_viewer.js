odoo.define('image_viewer_tool.image_viewer', function (require) {
    "use strict";

    var core = require('web.core');
    var qweb = core.qweb;
    var base_f = require('web.basic_fields');
    var imageWidget = base_f.FieldBinaryImage;
    var session = require('web.session');
    var utils = require('web.utils');
    var field_utils = require('web.field_utils');

    imageWidget.include({
        events: _.extend({}, imageWidget.prototype.events, {
            'click img': 'ImageViewer'
        }),
        _render: function () {
            this._super();
            this.imageSrc = this.placeholder;
            if (this.value) {
                if (!utils.is_bin_size(this.value)) {
                    this.imageSrc = 'data:image/png;base64,' + this.value;
                } else {
                    this.imageSrc = session.url('/web/image', {
                        model: this.model,
                        id: JSON.stringify(this.res_id),
                        field: 'image',
                        unique: field_utils.format.datetime(this.recordData.__last_update).replace(/[^0-9]/g, '')
                    });
                }
            }
        },

        ImageViewer: function (e) {
            if (this.mode === "readonly") {
                this.trigger_up('bounce_edit');
            }
            var target = $(e.currentTarget);
            //prevent multi modal pop up. :D
            if (target.hasClass('image-modal-preview-content'))
                return;
            var $img = $(qweb.render("imagePreviewModal", {widget: this, url: this.imageSrc}));
            this.$el.prepend($img);
            $img.css({'display': 'block'});
            $img.find('.image-preview-stop').bind('click', {'image_previev_modal': $img}, this.ImageViewerStop);
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