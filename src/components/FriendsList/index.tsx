import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Heading from '../Heading';
import Text from '../Text';
import FriendCard from '../FriendCard';
import api from '../../services/api';
import { getAuthHeader } from '../../services/auth';
import { Profile } from '../../models/Profile';
import { TextInput } from '../TextInput';

function FriendsList() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchResult, setSearchResult] = useState<Profile[]>([]);
  const renderProfiles = searchResult.length > 0 ? searchResult : profiles;

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

  async function searchProfiles(search: string) {
    try {
      const response = await api.get(`/profile?name=${search}`, getAuthHeader());
      setSearchResult(response.data);
    } catch (err) {
      toast.error('Ocorreu um erro ao buscar um usuário');
    }
  }

  return (
    <div className='basis-5/6'>
      <Heading className='mt-4'>
        <div className='ml-5'>
          <Text className='font-extrabold' size='xlg'>Amigos</Text>
          <div className='mt-3 mr-5'>
            <TextInput.Root>
              <TextInput.Input
                placeholder='Buscar por nome'
                onChange={(event) => searchProfiles(event.target.value)}
              />
            </TextInput.Root>
          </div>
        </div>
      </Heading>
      {renderProfiles.map((profile) => {
        return profile.idUser != userProfile.idUser && (
          <FriendCard profile={profile} key={profile.idUser} />
        );
      })}
    </div>
  );
}

export default FriendsList;
