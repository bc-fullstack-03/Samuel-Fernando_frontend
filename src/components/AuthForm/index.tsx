import { FormEvent, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { Envelope, Lock } from '@phosphor-icons/react';

import logo from '../../assets/logo.svg';
import Button from '../Button';

import Heading from '../Heading';
import Text from '../Text';
import { TextInput } from '../TextInput';

interface AuthFormProps {
  authFormTitle: string;
  submitButtonText: string;
  routeName: string;
  routeText: string;
  submitAction: (auth: Auth) => void;
  children?: ReactNode;
}

export interface Auth {
  name?: string;
  email: string;
  password: string;
}

interface AuthFormElements extends HTMLFormControlsCollection {
  name?: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface AuthFormElement extends HTMLFormElement {
  readonly elements: AuthFormElements;
}

function AuthForm(props: AuthFormProps) {
  const [hasErrors, setHasErrors] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  function handleSubmit(event: FormEvent<AuthFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const isRegister = form.elements.name ? true : false;

    const auth = {
      ...(isRegister) && { name: form.elements.name?.value },
      email: form.elements.email.value,
      password: form.elements.password.value,
    };

    if (auth.email.length < 3) {
      setHasErrors(true);
      setErrorEmail('O email precisa ter ao menos 3 caracteres');
    }

    if (auth.password.length < 3) {
      setHasErrors(true);
      setErrorPassword('A senha precisa ter ao menos 3 caracteres');
    }

    if (hasErrors) {
      return;
    }

    props.submitAction(auth);
  }

  return (
    <>
      <div className='flex flex-col items items-center mt-16'>
        <header className='flex flex-col items-center'>
          <img src={logo} alt='SysMap Parrot SVG logo' />
          <Heading size='xlg' className='mt-4'>SysMap Parrot</Heading>
          <Text size='lg' className='mt-2 opacity-60'>{props.authFormTitle}</Text>
        </header>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-stretch gap-3 w-full max-w-sm mt-12'
        >
          {props.children}
          <Text>Endereço de e-mail</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Envelope />
            </TextInput.Icon>
            <TextInput.Input
              type='email'
              placeholder='Digite seu e-mail'
              id='email'
              onChange={() => setHasErrors(false)}
            />
          </TextInput.Root>
          {errorEmail && <Text className='text-red-600' size='sm'>{errorEmail}</Text>}
          <Text>Senha</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Input
              type='password'
              placeholder='Digite sua senha'
              id='password'
              onChange={() => setHasErrors(false)}
            />
          </TextInput.Root>
          {errorPassword && <Text className='text-red-600' size='sm'>{errorPassword}</Text>}
          <Button type='submit' className='mt-7'>{props.submitButtonText}</Button>
        </form>
        <footer className='flex flex-col items-center gap-4 mt-6'>
          <Text asChild size='sm'>
            <Link
              to={props.routeName}
              className='text-gray-400 underline hover:text-gray-200'
            >
              {props.routeText}
            </Link>
          </Text>
        </footer>
      </div>
    </>
  );
}

export default AuthForm;
