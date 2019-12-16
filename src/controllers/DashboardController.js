const Task = require('../models/Task');

module.exports = {
    async show(req, res){
        const { user_id } = req.headers;

        if(!user_id){
            return res.json({ message: 'Usuário não existe ou não logado!' });
        }
        const tasks = await Task.find({ user:user_id });
        return res.json(tasks);
    }
}