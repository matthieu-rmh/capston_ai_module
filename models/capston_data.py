from odoo import models, fields, api, _
from odoo.exceptions import UserError
import re

class CapstonData(models.Model):
   _name = 'capston.data'
   _description = 'Capston Data'

   title = fields.Char(string='Title', required=True)
   description = fields.Char(string='Description', required=True)
   is_active = fields.Boolean(string='Active', default=True, tracking=True)
  