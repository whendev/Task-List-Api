const md5 = require('md5');
const userRepository = require('../repositories/user');
const authService = require('../services/auth-service');

function propriedades() {
  const content = {
    create: async (req, res) => {
      try {
        await userRepository.createUserDB({
          name: req.body.name,
          email: req.body.email,
          password: md5(req.body.password + global.SALT_KEY),
        });
        res.status(201).send({ massage: 'Cliente cadastrado com sucesso!' });
      } catch (error) {
        res.status(400).send({ massage: 'Não foi possivel cadastrar novo user!' });
      }
    },
    login: async (req, res) => {
      try {
        const user = await userRepository.authenticate({
          email: req.body.email,
          password: md5(req.body.password + global.SALT_KEY),
        });

        if (!user) {
          // eslint-disable-next-line no-undef
          res.status(404).send({ message: 'Email ou senha invalidos!', data: error });
        }

        const token = await authService.gerateToken({
          id: user._id,
          email: user.email,
          name: user.name,
        });

        res.status(201).send({
          token,
          data: {
            email: user.email,
            name: user.name,
          },
        });
      } catch (error) {
        res.status(400).send({ message: 'Email ou senha invalidos!', data: error });
      }
    },
  };
  return content;
}

module.exports = propriedades();
