const express = require('express');
const routes = express.Router();

const SessionController = require('./controllers/SessionController');
const TaskController = require('./controllers/TaskController');
const DashboardController = require('./controllers/DashboardController');

routes.post('/session', SessionController.store);

routes.get('/task', TaskController.show);
routes.post('/task', TaskController.store);
routes.put('/task', TaskController.update);
routes.delete('/task', TaskController.destroy);

routes.get('/dashboard', DashboardController.show);

module.exports = routes;