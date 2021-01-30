function propriedades() {
  const rotas = {
    index: (req, res) => {
      res.status(200).json({
        message: 'Tudo Ok',
      });
    },
  };
  return rotas;
}

module.exports = propriedades();
