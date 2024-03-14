import fastify from "fastify";

import { env } from "./env";

import { constructRoutes } from "./http/handlers";

const app = fastify();
constructRoutes(app);

const opts = {
  port: env.API_PORT,
  host: env.API_HOST
};

app.listen(opts).then(() => {
  console.log(`🚀 Server listening on http://${opts.host}:${opts.port}/`);
});