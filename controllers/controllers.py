# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from datetime import datetime, timedelta
import base64
import json
import os
import logging
import requests
from markupsafe import Markup
from werkzeug.exceptions import Forbidden
from odoo.addons.website.controllers.main import QueryURL


from odoo import http, tools, _
from odoo.exceptions import AccessError, UserError
from odoo.http import request
from odoo.tools import lazy

_logger = logging.getLogger(__name__)

class CapViCatalogController(http.Controller):

    @http.route('/get_seo_results_from_page', type='json', auth="public")
    def get_seo_results_from_page(self, url_param):

        api_endpoint_method = "https://api.capston.ai/api/v1/integrations/seo/analyze"

        api_key = request.env['ir.config_parameter'].sudo().get_param(
            'capston_ai.capston_api_key'
        )

        headers = {
        'Content-Type': 'application/json',
        'X-API-Key': api_key
        }

        body = {
            # It should be "url_param"
            "url": url_param,
            "generate_suggestions": True
        }


        response = requests.post(api_endpoint_method, json=body, headers=headers)

        return response.json()["scores"]