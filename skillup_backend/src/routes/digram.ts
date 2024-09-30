import express from 'express';
import { AuthAdmin } from '../middleware/AuthAdmin.js';
import { getBarCharts, getDashboardStats, getLineCharts, getPieCharts } from '../controllers/diagramcontroller.js';

const app = express.Router();


app.route("/stats").post(getDashboardStats);
app.route("/pie").post(getPieCharts);
app.route("/bar").post(getBarCharts);
app.route("/line").post(getLineCharts);




export default app;

