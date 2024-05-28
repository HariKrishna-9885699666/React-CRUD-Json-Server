const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

exports.handler = (event, context, callback) => {
  const { method, path, body } = event;
  const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;

  server.use(middlewares);
  server.use(jsonServer.bodyParser);
  server.use('/api', router);

  return new Promise((resolve, reject) => {
    server.handle({ method, url: path, body: parsedBody }, (err, res) => {
      if (err) {
        reject(err);
      } else {
        const { statusCode, headers, body } = res;
        callback(null, {
          statusCode,
          headers,
          body: typeof body === 'string' ? body : JSON.stringify(body),
        });
        resolve();
      }
    });
  });
};
