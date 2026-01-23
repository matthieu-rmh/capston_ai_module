/** @odoo-module **/
import { rpc } from "@web/core/network/rpc";         // ← note: /rpc  not /rpc_service
// import ajax from "web.ajax";

// import { registry } from "@web/core/registry";
// import { Component } from "@odoo/owl";



$(document).ready(async function (){

    // Condition the logic to only apply on shop's product template
    if (/^\/shop\/[^/?#]+/.test(window.location.pathname)){

        var urlResponse = "";

        var description_score = 0; 
        var image_seo_score = 0; 
        var overall_score = 0;
        var title_score = 0;


        // Open SEO Analyzer iframe
        $('#seo_analyzer').on('click',async function(){

            // Get current product url
            var currentURL = $(location).attr('href');

            console.log("seo analyze");

            console.log(currentURL);

            
            showLoading();
            await fetchSeoAnalysisResult(currentURL);
            hideLoading();
            console.log(urlResponse);



            updateScoresValue();
            // toggle seo card
            $('#seo-card').show();

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

        function showLoading(){
            $('#vcl-modal-loading').show();
        };

        function hideLoading(){
            $('#vcl-modal-loading').hide();
        };

        function updateScoresValue(){


            $('#description-score').empty().append(description_score);
            $('#image-seo-score').empty().append(image_seo_score);
            $('#overall-score').empty().append(overall_score);
            $('#title-score').empty().append(title_score);
            $('#overall-rating').empty().append(`Overall: ${overall_score}/100`);
        }


        async function fetchSeoAnalysisResult(productUrl){
            return new Promise((resolve, reject) => {
                rpc('/get_seo_results_from_page', {
                    // It should be this
                                                    // "url_param": "productUrl"
                                                    "url_param": "https://cheinmalt.mg/shop/product/hkith1601-16pcs-insulated-hand-tools-set-37326#attr="
                                                }, {})
                    .then(function (response) {
                        urlResponse = response;
                        description_score = response.description_score;
                        image_seo_score = response.image_seo_score;
                        overall_score = response.overall_score;
                        title_score = response.title_score;

                        resolve(response);
                    })
                    .catch(reject);
            });
        }

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

