{
    'name': 'Capston AI Plugin',
    'version': '0.1.0',
    'summary': 'Connector between Odoo and Capston AI Saas',
    'description': """
        Integrates all the backend logics of the Capston AI Saas
    """,
    'author': 'Matthieu Heritiana',
    'website': 'https://www.yourwebsite.com',
    'category': 'Website',
    'depends': ['base', 'web', 'website'],
    'data': [
        'security/ir.model.access.csv',
        'views/capston_data_views.xml',
        'views/capston_website_templates.xml',
        'data/capston_data.xml'
    ],
    'demo': [],
    'installable': True,
    'application': True,
    'license': 'LGPL-3',
    'assets': {
        # 'web.assets_backend': [
        #     'capston_ai/static/src/js/seo_analyzer_widget.js',
        # ],
        'web.assets_frontend': [
            'capston_ai/static/src/js/seo_analyzer_widget.js',
            'capston_ai/static/src/css/custom.css'
        ],
},
}