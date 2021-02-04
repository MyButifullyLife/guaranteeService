'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    ctx.body = await app.mysql.select('user', { userId: 2 });
  }

  async getUser() {
    const { ctx, app } = this;
    const data = await app.mysql.get('user', { user_id: 1 }).catch(res => {
      ctx.body = res;
    });
    if (data) {
      ctx.body = data;
    }
  }

  async login() {
    const { ctx, app } = this;
    let tokenData;
    // const data = await app.mysql.get('engineer', { phone: ctx.query.phone, password: ctx.query.password })
    const data = await app.mysql.query(`SELECT * FROM engineer WHERE phone ='${ctx.request.body.phone}' AND password ='${ctx.request.body.password}'`).catch(res => {
      ctx.body = {
        data,
        success: res,
        code: 999,
      };
    });
    if (data && data.length) {
      tokenData = app.jwt.sign({ ...ctx.query }, app.config.jwt.secret, { expiresIn: '40m' });
      ctx.body = {
        data,
        token: tokenData,
        success: '登录成功',
        code: 200,
      };
    } else {
      ctx.body = {
        data,
        success: '账号或密码错误',
        code: 999,
      };
    }
  }
}

module.exports = HomeController;
