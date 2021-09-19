import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Evaluation from './pages/Evaluation'
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
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
