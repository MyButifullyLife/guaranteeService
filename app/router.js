'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  router.post('/login', controller.home.login);
  router.get('/getUser', middleware.jwt(app.config.jwt), controller.home.getUser);
};
