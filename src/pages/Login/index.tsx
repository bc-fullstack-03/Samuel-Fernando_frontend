import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

import AuthForm, { Auth } from '../../components/AuthForm';
import api from '../../services/api';

interface UserToken {
  sub: string;
}

function Login() {
  const navigate = useNavigate();

  async function handleLogin(auth: Auth) {
    try {
      const { data } = await api.post('/authentication', auth);
      const decodedToken = jwtDecode(data.token) as UserToken;
      localStorage.setItem('user', decodedToken.sub);
      localStorage.setItem('accessToken', data.token);
      toast.info('Seja bem vindo!');
      navigate('/home');
    } catch (err) {
      toast.error('Ocorreu um erro na autenticação');
    }
  }

  return (
    <AuthForm
      authFormTitle='Faça login e comece a usar!'
      submitButtonText='Entrar'
      routeName='/register'
      routeText='Não tem uma conta? Crie uma agora!'
      submitAction={handleLogin}
    />
  );
}

export default Login;
