process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import App from '@/app';
import CriteriasRoute from '@/routes/criterias.route';
import EvaluationRoute from '@routes/evaluations.route';
import IndexRoute from '@routes/index.route';
import ScoreRoute from '@routes/score.route';
import validateEnv from '@utils/validateEnv';
import 'dotenv/config';

validateEnv();

const app = new App([new IndexRoute(), new EvaluationRoute(), new ScoreRoute(), new CriteriasRoute()]);

app.listen();
