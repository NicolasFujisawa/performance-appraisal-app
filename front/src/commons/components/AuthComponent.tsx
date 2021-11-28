import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectUser } from '../../store/selectors';

function LoginCheck(Component: () => JSX.Element) {
  const { userId } = useSelector(selectUser)
  const isLoggedIn = Boolean(userId);

  return isLoggedIn ? <Component /> : <Redirect to="/login" />;
}

export default LoginCheck;