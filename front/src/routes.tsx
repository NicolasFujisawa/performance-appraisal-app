import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CreateCriteria from './pages/CreateCriteria'
import Evaluation from './pages/Evaluation'
import Method from './pages/Method'
import Results from './pages/Results'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/evaluation/:evaluation_id/evaluatedStudent/:evaluated_id/results"
          component={Results}
        />
        <Route path="/evaluation/:id" component={Evaluation} />
        <Route path="/method/new" component={Method} />
        <Route path="/criteria/new" component={CreateCriteria} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
