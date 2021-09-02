import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Evaluation from './pages/Evaluation'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/evaluation" component={Evaluation} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
