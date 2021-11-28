import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoginCheck from './commons/components/AuthComponent'
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
      <Route path="/login" component={Login} />
        <Route
          path="/evaluation/:evaluation_id/evaluatedStudent/:evaluated_id/results"
          component={() => LoginCheck(Results)}
        />
        <Route path="/evaluation/new" component={() => LoginCheck(CreateEvaluation)} />
        <Route path="/evaluation/:id" component={() => LoginCheck(Evaluation)} />
        <Route path="/method/new" component={() => LoginCheck(CreateMethod)} />
        <Route path="/criteria/new" component={() => LoginCheck(CreateCriteria)} />
        <Route path="/teams" exact component={() => LoginCheck(ListTeams)} />
        <Route path="/teams/:team_id" component={() => LoginCheck(TeamPage)} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
