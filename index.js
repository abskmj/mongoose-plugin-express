const express = require('express');
const query = require('@abskmj/query');

module.exports = (schema, options) => {

    let getRouter = function() {
        let router = express.Router();

        // process query parameters
        router.use((req, res, nxt) => {
            const parts = req.originalUrl.split('?');

            if (parts.length == 2) {
                const queryString = parts[1];

                const json = query.parse(queryString);

                req.query = json;
            }

            nxt();

        });

        // attach http errors if not already
        router.use((req, res, nxt) => {
            req.errors = req.errors || require('@abskmj/http-errors');
            
            nxt();
        });

        let instance = function() {
            let modelRouter = express.Router();

            // attach model to request
            modelRouter.use((req, res, nxt) => {
                req.model = this;

                nxt();
            });

            modelRouter.use(router);

            return modelRouter;
        }

        instance.attach = function(r) {
            router.use(r);
        }

        return instance;
    }


    schema.static('router', getRouter());
}
