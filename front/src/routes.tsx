import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CreateCriteria from './pages/CreateCriteria'
import CreateEvaluation from './pages/CreateEvaluation'
import CreateMethod from './pages/CreateMethod'
import Evaluation from './pages/Evaluation'
import { Landing } from './pages/Landing'
import ListTeams from './pages/ListTeams'
import { Login } from './pages/Login'
import Results from './pages/Results'
import { TeamPage } from './pages/TeamPage'

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
        <Route path="/teams" exact component={ListTeams} />
        <Route path="/teams/:team_id" component={TeamPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
