process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import App from '@/app';
import CriteriasRoute from '@/routes/criterias.route';
import MethodsRoute from '@/routes/methods.route';
import AuthRoute from '@routes/auth.route';
import EvaluationRoute from '@routes/evaluations.route';
import IndexRoute from '@routes/index.route';
import ScoreRoute from '@routes/score.route';
import TeamsRoute from '@routes/teams.route';
import LgpdRoute from '@routes/lgpd.route';
import validateEnv from '@utils/validateEnv';
import 'dotenv/config';


validateEnv();

const app = new App([
  new AuthRoute(),
  new IndexRoute(),
  new EvaluationRoute(),
  new ScoreRoute(),
  new CriteriasRoute(),
  new MethodsRoute(),
  new TeamsRoute(),
  new LgpdRoute(),
]);

app.listen();
