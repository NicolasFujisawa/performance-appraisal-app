import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import CreateCriteria from './pages/CreateCriteria'
import CreateEvaluation from './pages/CreateEvaluation'
import CreateMethod from './pages/CreateMethod'
import Evaluation from './pages/Evaluation'
import { Landing } from './pages/Landing'
import ListTeams from './pages/ListTeams'
import { Login } from './pages/Login'
import Results from './pages/Results'
import { TeamPage } from './pages/TeamPage'


const renderComponent = (route: string, component: () => JSX.Element) => {
  const shouldRedirectToLogin = true;

  if (shouldRedirectToLogin) {
    return <Redirect to="/login" />
  }

  return <Route path={route} component={component} />;
}

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />

        {renderComponent('/', Landing)}
        {renderComponent("/evaluation/:evaluation_id/evaluatedStudent/:evaluated_id/results", Results)}
        {renderComponent("/evaluation/new", CreateEvaluation)}
        {renderComponent("/evaluation/:id", Evaluation)}
        {renderComponent("/method/new", CreateMethod)}
        {renderComponent("/criteria/new", CreateCriteria)}
        {renderComponent("/teams", ListTeams)}
        {renderComponent("/teams/:team_id", TeamPage)}
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
