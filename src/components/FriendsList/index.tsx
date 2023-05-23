import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Heading from '../Heading';
import Text from '../Text';
import FriendCard from '../FriendCard';
import api from '../../services/api';
import { getAuthHeader } from '../../services/auth';
import { Profile } from '../../models/Profile';

function FriendsList() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const userProfile = JSON.parse(localStorage.getItem('userProfile') as string);

  useEffect(() => {
    async function getProfiles() {
      try {
        const { data } = await api.get('/profile', getAuthHeader());
        setProfiles(data);
      } catch (err) {
        toast.error('Ocorreu um erro ao fazer a busca por perfis');
      }
    }

    getProfiles();
  }, []);

  return (
    <div className='basis-5/6'>
      <Heading className='mt-4'>
        <div className='ml-5'>
          <Text className='font-extrabold' size='xlg'>Amigos</Text>
        </div>
      </Heading>
      {profiles && profiles.map((profile) => {
        return profile.idUser != userProfile.idUser && (
          <FriendCard profile={profile} key={profile.idUser} />
        );
      })}
    </div>
  );
}

export default FriendsList;
