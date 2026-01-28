from odoo import models, fields, api, _
from odoo.exceptions import UserError
import re
# from odoo.http import routing_map

class ProductTemplate(models.Model):
   _inherit = 'product.template'

   is_capston_admin = fields.Boolean(string='Is Capston Admin',compute='_compute_is_capston_admin', store=False)

   def _compute_is_capston_admin(self):
      for record in self:
         record.is_capston_admin = self.env.user.has_group('base.group_system')

class CapstonData(models.Model):
   _name = 'capston.data'
   _description = 'Capston Data'

   title = fields.Char(string='Title', required=True)
   description = fields.Char(string='Description', required=True)
   is_active = fields.Boolean(string='Active', default=True, tracking=True)

   def test(self):

      website = self.env['website'].get_current_website()

      pages = []

      for page in website._enumerate_pages():
         pages.append(page)

      # raise UserError(str(pages))

      pages = [{"url":x["loc"]} for x in pages]

      raise UserError(str(pages))

      # Search for all published pages
      # pages = self.env['website.page'].search([['is_published', '=', True]])

      # for page in pages:
      #    print(f"Name: {page.name} | URL: {page.url} | View ID: {page.view_id.id}")

      # raise UserError(str(pages))
  