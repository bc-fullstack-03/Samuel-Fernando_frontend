import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@phosphor-icons/react';
import { toast } from 'react-toastify';

import AuthForm, { Auth } from '../../components/AuthForm';
import Text from '../../components/Text';
import { TextInput } from '../../components/TextInput';
import api from '../../services/api';

function Register() {
  const [errorUsername, setErrorUsername] = useState('');

  const navigate = useNavigate();

  async function handleRegister(auth: Auth) {
    if (auth.name && auth.name.length < 3) {
      setErrorUsername('O nome precisa ter ao menos 3 caracteres');
      return;
    }

    try {
      await api.post('/user', auth);
      toast.success('Conta criada com sucesso!');
      navigate('/');
    } catch (err) {
      toast.error('Ocorreu um erro na criação da conta');
    }
  }

  return (
    <AuthForm
      authFormTitle='Faça o cadastro agora mesmo!'
      submitButtonText='Cadastrar-se'
      routeName='/'
      routeText='Já tem uma conta? Faça login agora!'
      submitAction={handleRegister}
    >
      <Text>Nome de usuário</Text>
      <TextInput.Root>
        <TextInput.Icon>
          <User />
        </TextInput.Icon>
        <TextInput.Input
          type='text'
          placeholder='Digite seu nome'
          id='name'
        />
      </TextInput.Root>
      {errorUsername && <Text className='text-red-600' size='sm'>{errorUsername}</Text>}
    </AuthForm>
  );
}

export default Register;
