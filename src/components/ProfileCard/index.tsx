import { UserCircle } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

import Button from '../Button';
import Heading from '../Heading';
import Text from '../Text';

function ProfileCard() {
  const userProfile = JSON.parse(localStorage.getItem('userProfile') as string);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate('/');
  }

  return (
    <div>
      <Heading className='border-b border-slate-400 mt-4'>
        <Text className='font-extrabold ml-4' size='xlg'>Perfil</Text>
        <div className='flex items-center pl-5 py-4'>
          {userProfile.photoUri ?
            <img src={userProfile.photoUri} className='w-14 h-14 rounded-full' />
            : <UserCircle size={56} weight='light' />
          }
          <Text className='font-extrabold ml-5' size='xlg'>{userProfile.name}</Text>
        </div>
        <Button className='max-w-sm ml-5 mb-4 align-middle' onClick={handleLogout}>
          Sair
        </Button>
      </Heading>
    </div>
  );
}

export default ProfileCard;
