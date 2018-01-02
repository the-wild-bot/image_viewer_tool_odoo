# -*- coding: utf-8 -*-
# Part of the-wild-bot. MIT LICENSE.

{
    'name': 'Image Viewer Tool',
    'summary': """Enlarge the size of image and preview small images into big one.""",
    'description': """
This is extension enlarges the binary field image
to the size a person can view it.
==============================================
* Tutorial:
    * Click on image in form view 
    * Click close to Image previewer
    * zoomin/zoomout will be added later
""",
    'author': 'The Wild Bot',
    'category': "Tools",
    'version': '11.0.1.0',
    'depends': ['web'],
    "license": "Other OSI approved licence",
    'data': ['views/assets.xml', ],
    'qweb': ['static/src/xml/image_preview_modal.xml', ],
    'installable': True,
    'application': False,
    'auto_install': False,
}
