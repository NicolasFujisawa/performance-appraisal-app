import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Evaluation from './pages/Evaluation'
import Results from './pages/Results'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/evaluation" component={Evaluation} />
        <Route path="/results" component={Results} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
