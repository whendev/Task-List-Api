const mongoose = require('mongoose');

const UserModel = mongoose.model('users');
function propriedades() {
  const content = {
    createUserDB: async (data) => {
      const user = new UserModel(data);
      console.log(user);
      await user.save();
    },
    authenticate: async (data) => {
      const res = await UserModel.findOne({
        email: data.email,
        password: data.password,
      });
      return res;
    },
  };
  return content;
}

module.exports = propriedades();
