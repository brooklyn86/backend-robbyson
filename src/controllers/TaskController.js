const {body, validationResult } = require('express-validator');
module.exports = app => {
    const TaskModel = app.models.Task;
    const controller = {};
    controller.createTask = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(202).json({ errors: errors.array() });
        }
        try {
          const task = await TaskModel.create(req.body);
          res.status(200).json({erro: false, task});

        } catch (error) {
            res.status(200).json({erro: true, msg : 'Falha ao criar a tarefa'})
        }
    }
    controller.listTask = async (req, res) => {
        try {
          const task = await TaskModel.findByIdAndUpdate(req.id, req.body);
          res.status(200).json({erro: false, task});
        } catch (error) {
            res.status(200).json({erro: true, msg : 'Falha ao listar a tarefa'})
        
        }
    }
    controller.listTasks = async (req, res) => {
        try {
            let task = []
            if(req.query?.name){
                task = await TaskModel.find({name: { $regex: new RegExp(req.query?.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')), $options: 'i' }});
            }else{
                task = await TaskModel.find({ hide: false});

            }
            res.status(200).json({erro: false, task});
        } catch (error) {
            console.log(error)
            res.status(200).json({erro: true, msg : 'Falha ao listar as tarefa'})
            
        }
    }
    controller.updateTask = async(req, res) => {
        await TaskModel.findOneAndUpdate({ _id : req.body.id}, req.body, {upsert: true}, function(err, doc) {
            if (err) return res.status(200).json({erro: true, msg : 'Falha ao atualizar tarefa'});
            return res.status(200).json({erro: false, msg : 'Tarefa atualizada com sucesso'})
        });
    }

    controller.deleteTask = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(202).json({ errors: errors.array() });
        }
        try {
          TaskModel.findOneAndDelete({_id : req.body.id }, function (err, docs) {
            if (err){
                res.status(200).json({ error : true, msg : 'Falha ao deletar'});

            }
            else{
                res.status(200).json({ error : false , msg : 'Sucesso ao deletar'});

            }
        });
        } catch (error) {
            console.log(error)
            return res.status(400).send({error: 'Falha ao criar a Task'});  
        }
    }

    return controller;
}
