const Task = require('../models/Task');

module.exports = {
    async store(req, res){
        const { title, description } = req.body;
        const { user_id } = req.headers;

        const response = await Task.create({
            title,
            description,
            user: user_id,
        });

        return res.json(response);
    },

    async show(req, res){
        const { task_id } = req.headers;
        if(!task_id){
            return res.json({ message: 'Tarefa não informada!'});
        }
        const response = await Task.findById({ _id:task_id });
        return res.json(response);
    },

    async update(req, res){
        const { title, description } = req.body;
        const { task_id, user_id } = req.headers;

        if(!task_id || !user_id){
            return res.json({ message: 'Usuário não logado ou tarefa não existe'});
        }
        if(!await Task.findOne({ user:user_id })){
            return res.json({ message: 'Usuário não é proprietário da tarefa'});
        }

        if(!title){
            await Task.findByIdAndUpdate({ _id:task_id }, { description });
            return res.json({ message: 'Descrição atualizada!'});
        }
        if(!description){
            await Task.findByIdAndUpdate({ _id:task_id }, { title });
            return res.json({ message: 'Título atualizado!'});
        }

        await Task.findByIdAndUpdate({ _id:task_id }, { title, description });
        return res.json({ message: 'Tarefa atualizada!' });

    },

    async destroy(req, res){
        const { task_id, user_id } = req.headers;

        if(!task_id || !user_id){
            return res.json({ message: 'Usuário não logado ou tarefa não existe'});
        }
        if(!await Task.findOne({ user:user_id })){
            return res.json({ message: 'Usuário não é proprietário da tarefa'});
        }

        await Task.findByIdAndDelete({ _id:task_id });
        return res.json({ message: 'Tarefa excluída!'});
    }
};