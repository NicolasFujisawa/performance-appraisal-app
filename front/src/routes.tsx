import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CreateCriteria from './pages/CreateCriteria'
import Evaluation from './pages/Evaluation'
import CreateMethod from './pages/CreateMethod'
import Results from './pages/Results'
import CreateEvaluation from './pages/CreateEvaluation'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route
          path="/evaluation/:evaluation_id/evaluatedStudent/:evaluated_id/results"
          component={Results}
        />
        <Route path="/login" component={Login} />
        <Route path="/evaluation/new" component={CreateEvaluation} />
        <Route path="/evaluation/:id" component={Evaluation} />
        <Route path="/method/new" component={CreateMethod} />
        <Route path="/criteria/new" component={CreateCriteria} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
