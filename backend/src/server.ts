process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import App from '@/app';
import CriteriasRoute from '@/routes/criterias.route';
import MethodsRoute from '@/routes/methods.route';
import EvaluationRoute from '@routes/evaluations.route';
import IndexRoute from '@routes/index.route';
import ScoreRoute from '@routes/score.route';
import MethodsRoute from './routes/method.route';
import validateEnv from '@utils/validateEnv';
import 'dotenv/config';

validateEnv();

const app = new App([new IndexRoute(), new EvaluationRoute(), new ScoreRoute(), new CriteriasRoute(), new MethodsRoute()]);

app.listen();
