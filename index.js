const express = require('express');
const query = require('@abskmj/query');

module.exports = (schema, options) => {

    schema.statics._router = express.Router();

    schema.statics.attachRouter = function(router) {
        this._router.use(router);
    }

    schema.statics.getRouter = function() {
        let router = new express.Router();


        // attach model to request
        router.use((req, res, nxt) => {
            req.model = this;

            nxt();
        });

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

        router.use(this._router);

        return router;
    }
}
