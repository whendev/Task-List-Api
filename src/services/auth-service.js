const jwt = require('jsonwebtoken');
require('dotenv').config()

function propriedades() {
  const content = {
    gerateToken: async (data) => {
      const token = await jwt.sign(data, process.env.SALT_KEY, { expiresIn: '1d' });
      return token;
    },
    decodeToken: async (token) => {
      const data = await jwt.verify(token, process.env.SALT_KEY);
      return data;
    },
    autorize: (req, res, next) => {
      const token = req.body.token || req.params.token || req.headers['x-access-token'];

      if (!token) {
        res.status(401).json({ message: 'Acesso Negado!' });
      } else {
        jwt.verify(token, process.env.SALT_KEY, (error, decode) => {
          if (error) {
            res.status(401).json({ message: 'Token invalido' });
          } else {
            next();
          }
        });
      }
    },
  };
  return content;
}

module.exports = propriedades();
