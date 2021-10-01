import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Evaluation from './pages/Evaluation'
import Results from './pages/Results'
import CreateEvaluation from './pages/CreateEvaluation'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/results" component={Results} />
        <Route path="/evaluation/:id" component={Evaluation} />
        <Route path="/create_evaluation" component={CreateEvaluation} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
