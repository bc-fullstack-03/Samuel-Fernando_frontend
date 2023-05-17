import { Envelope, Lock } from '@phosphor-icons/react';

import logo from './assets/logo.svg';
import Button from './components/Button';

import Heading from './components/Heading';
import Text from './components/Text';
import { TextInput } from './components/TextInput';

function App() {
  return (
    <>
      <div className='flex flex-col items items-center mt-16'>
        <header className='flex flex-col items-center'>
          <img src={logo} alt='SysMap Parrot SVG logo' />
          <Heading size='xlg' className='mt-4'>SysMap Parrot</Heading>
          <Text size='lg' className='mt-2 opacity-60'>Faça login e comece a usar!</Text>
        </header>
        <form className='flex flex-col items-stretch gap-3 w-full max-w-sm mt-12'>
          <Text>Endereço de e-mail</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Envelope />
            </TextInput.Icon>
            <TextInput.Input
              type='email'
              placeholder='Digite seu e-mail'
            />
          </TextInput.Root>
          <Text>Senha</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Input
              type='password'
              placeholder='Digite sua senha'
            />
          </TextInput.Root>
          <Button type='submit' className='mt-7'>Entrar</Button>
        </form>
        <footer className='flex flex-col items-center gap-4 mt-6'>
          <Text asChild size='sm'>
            <a href="" className='text-gray-400 underline hover:text-gray-200'>
              Não pussui uma conta? Crie uma agora!
            </a>
          </Text>
        </footer>
      </div>
    </>
  );
}

export default App;
