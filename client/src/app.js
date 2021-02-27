import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { LoginForm } from "./components/users/LoginForm.js";

export const App = () => {
  return (
    <Router>
      <div>
        <Link to="/login">
          <button type="submit" id="login-button" class="btn btn-primary">
            Login
          </button>
        </Link>
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
