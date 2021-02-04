
module.exports = options => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.token;
    let decode;
    if (token) {
      try {
        // 解码token
        decode = ctx.app.jwt.verify(token, options.secret);
        await next();
        console.log(decode);
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          message: 'token无效，登录过期',
        };
        return;
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        message: '没有token',
      };
      return;
    }
  };
};
