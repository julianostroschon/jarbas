import type { FastifyInstance } from 'fastify';

import { handlersGet } from "./get";
// import { handlersPost } from "./post";

const avaliableRoutes = [
  ...handlersGet, 
  // ...handlersPost
]

export enum ValidMethods {
  // POST = 'post',
  GET = 'get',
}

export const constructRoutes = (app: FastifyInstance) => avaliableRoutes.forEach(route => {
  const { path, handler } = route

  app.get(path, handler)
})