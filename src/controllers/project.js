const repositoryProject = require('../repositories/project');
const authService = require('../services/auth-service');

function propriedades() {
  const content = {
    create: async (req, res) => {
      const token = req.body.token || req.params.token || req.headers['x-access-token'];

      const data = await authService.decodeToken(token);

      // const data = {
      //   name: req.body.name,
      //   user: req.body.user,
      //   tasks: req.body.tasks,
      // };

      try {
        await repositoryProject.create({
          name: req.body.name,
          user: data.id,
          tasks: req.body.tasks,
        });
        res.status(201).send({ massage: 'Projeto cadastrado com sucesso!' });
      } catch (error) {
        res.status(201).send({ massage: 'O Projeto Não foi cadastrado com sucesso!' });
      }
    },
    listProjects: async (req, res) => {
      const token = req.body.token || req.params.token || req.headers['x-access-token'];
      const data = await authService.decodeToken(token);
      // Id do usuario
      const id = data.id;
      // const id = '5f305bf4c90f912e88c94945';
      try {
        const projects = await repositoryProject.getProjects(id);
        res.status(200).send(projects);
      } catch (error) {
        res.status(400).send(error);
      }
    },
    deleteProject: async (req, res) => {
      const id = req.params.id;
      try {
        await repositoryProject.delete(id);
        res.status(200).json({ message: 'Projeto deletado com sucesso!' });
      } catch (error) {
        res.status(400).json({ message: 'Não foi possivel deletar o projeto!' });
      }
    },
    updateProject: async (req, res) => {
      const data = {
        id: req.body.id,
        name: req.body.name,
        tasks: req.body.tasks,
      };

      try {
        await repositoryProject.update(data);
        res.status(200).json({ message: 'Projeto atualizado' });
      } catch (error) {
        res.status(200).json({ message: 'Não foi possivel atualizar o projeto' });
      }
    },
    // getProject: async (req, res) => {
    //   const projectId = req.body.id;

    //   try {
    //     const project = await repositoryProject.getById(projectId);
    //     res.status(200).send(project);
    //   } catch (error) {
    //     res.status(404).json({ message: 'Projeto não foi encontrado' });
    //   }
    // },
  };
  return content;
}

module.exports = propriedades();
