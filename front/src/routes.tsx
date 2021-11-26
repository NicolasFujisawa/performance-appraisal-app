import { useSelector } from 'react-redux'
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
import { selectUser } from './store/selectors'

const renderComponent = (route: string, component: () => JSX.Element, userId: number | undefined) => {
  const shouldRedirectToLogin = userId === undefined ? true : false;

  if (shouldRedirectToLogin) {
    return <Redirect to="/login" />
  }

  return <Route path={route} component={component} />;
}

function Routes() {
  const { userId } = useSelector(selectUser)

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />

        {renderComponent('/', Landing, userId)}
        {renderComponent("/evaluation/:evaluation_id/evaluatedStudent/:evaluated_id/results", Results, userId)}
        {renderComponent("/evaluation/new", CreateEvaluation, userId)}
        {renderComponent("/evaluation/:id", Evaluation, userId)}
        {renderComponent("/method/new", CreateMethod, userId)}
        {renderComponent("/criteria/new", CreateCriteria, userId)}
        {renderComponent("/teams", ListTeams, userId)}
        {renderComponent("/teams/:team_id", TeamPage, userId)}
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
