/**
 * defines a few interceptors that can catch every
 * request or response to insert metadata
 * or perform cleaning
 */
const interceptor = require('express-interceptor');

const version = require('../config').VERSION;

module.exports = (app) => {
  app.use(interceptor((req, res) => {
    const url = req.originalUrl;
    return {
      isInterceptable: () => /json/.test(res.get('Content-Type')),
      intercept: (body, send) => {
        const parsed = JSON.parse(body);
        const data = {
          _meta: {
            url,
            version: version,
            duration: `${Date.now() - req.start}ms`,
            status: res.statusCode,
          },
          response: parsed,
        };
        return send(JSON.stringify(data));
      },
    };
  }));
}
