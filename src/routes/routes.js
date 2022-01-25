
const {body, validationResult } = require('express-validator');

module.exports = app => {
    const controller = app.controllers.TaskController;
    app.route('/api/v1/create-task')
      .post(
        body('name').not().isEmpty().withMessage('O Campo nome da tarefa não pode ficar vazio!'),
        body('description').not().isEmpty().withMessage('O Campo nome da descrição não pode ficar vazio!'),
        body('duedate').not().isEmpty().withMessage('O Campo nome da data de vencimento não pode ficar vazio!')
      ,controller.createTask);

    app.route('/api/v1/list-task')
      .get(controller.createTask);

    app.route('/api/v1/list-tasks')
    .get(controller.listTasks);

    app.route('/api/v1/update-task')
      .post(controller.updateTask);

    app.route('/api/v1/delete-task')
      .post(body('id').not().isEmpty().withMessage('Por favor informe a tarefa!'),controller.deleteTask);
}