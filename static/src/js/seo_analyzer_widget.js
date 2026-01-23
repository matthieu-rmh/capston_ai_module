/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component } from "@odoo/owl";


$(document).ready(async function (){

    // Condition the logic to only apply on shop's product template
    if (/^\/shop\/[^/?#]+/.test(window.location.pathname)){

        // Open SEO Analyzer iframe
        $('#seo_analyzer').on('click',async function(){
            console.log("seo analyze");

            const productId = "ev.currentTarget.dataset.productId";
            const productUrl = "ev.currentTarget.dataset.productUrl";


            // 1. Get embed token from SaaS
            const token = await getEmbedToken();

            // 2. Build iframe URL
            const iframeUrl =
                `https://app.capston.ai/embed/seo-analyzer?token=${token}&url=${encodeURIComponent(productUrl)}`;

            // 3. Open iframe (dialog example)
            openIframeDialog(iframeUrl);

            // 4. Listen for postMessage from iframe
            window.addEventListener("message", (event) => {
                if (event.origin !== "https://api.capston.ai") return;

                if (event.data.type === "CAPSTON_SEO_APPLY") {
                    applySuggestions(productId, event.data.suggestions);
                }
            });

        });

        async function getEmbedToken() {
            return {}
            // return await this.env.services.rpc({
            //     // NOTE: This method route doesn't exist (404 Not Found)
            //     route: "https://api.capston.ai/api/v1/integrations/embed/token",
            //     params: {},
            // });
        }
            
        function openIframeDialog(url) {
            // this.env.services.dialog.add({
            //     title: "SEO Analyzer",
            //     body: `
            //         <iframe src="${url}"
            //                 width="100%"
            //                 height="600"
            //                 frameborder="0">
            //         </iframe>
            //     `,
            // });
        }

        function applySuggestions(productId, suggestions) {
            console.log("Apply SEO suggestions", productId, suggestions);
            // TODO: RPC call to write product fields
        }

    }

});

