const mongoose = require('mongoose');

const ProjectModel = mongoose.model('project');

function propriedades() {
  const content = {
    create: async (data) => {
      const project = new ProjectModel(data);
      console.log(project);
      await project.save();
    },

    getProjects: async (id) => {
      // Busca todos os projetos pelo usuario
      const res = await ProjectModel.find({
        user: id,
      });
      return res;
    },
    delete: async (id) => {
      await ProjectModel.findByIdAndDelete(id);
    },
    update: async (data) => {
      // Busca um projeto especifico
      await ProjectModel.findByIdAndUpdate(data.id, {
        name: data.name,
        tasks: data.tasks,
      });
    },
  };
  return content;
}

module.exports = propriedades();
