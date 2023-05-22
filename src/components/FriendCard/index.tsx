import { useEffect, useState } from 'react';
import { UserCircle } from '@phosphor-icons/react';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { Profile } from '../../models/Profile';

import Text from '../Text';
import { getAuthHeader } from '../../services/auth';
import Button from '../Button';

interface FriendCardProps {
  profile: Profile;
}

function FriendCard({ profile }: FriendCardProps) {
  const [followed, setFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(profile.followers.length);

  const profileId = localStorage.getItem('user') as string;

  useEffect(() => {
    if (profile.followers.includes(profileId)) {
      setFollowed(true);
    }
  }, [profileId, profile.followers]);

  const handleProfileFollow = async (profileId: string) => {
    try {
      if (!followed) {
        await api.post(`/profile/${profileId}/follow`, null, getAuthHeader());

        setFollowed(true);
        setFollowersCount(followersCount + 1);
      } else {
        await api.post(`/profile/${profileId}/unfollow`, null, getAuthHeader());

        setFollowed(false);
        setFollowersCount(followersCount - 1);
      }
    } catch (err) {
      toast.error('Ocorreu um erro ao interagir com o Post');
    }
  };

  return (
    <div className='flex flex-col mt-5 pb-5 border-b border-slate-400' key={profile.idUser}>
      <div className='flex items-center ml-5'>
        {profile.photoUri != '' ?
          <img src={profile.photoUri} className='w-12 h-12 rounded-full' />
          : <UserCircle size={48} weight='thin' className='text-slate-50' />
        }
        <Text className='ml-2 font-extrabold' size='xlg'>{profile.name}</Text>
      </div>
      <div className='flex flex-col ml-7 mt-1'>
        <Text>{followersCount} seguidores</Text>
        <Text>Seguindo {profile.following.length} perfis</Text>
        <Button className='my-2 max-w-xs' onClick={() => handleProfileFollow(profile.idUser)}>
          {followed ? 'Deixar de seguir' : 'Seguir'}
        </Button>
      </div>
    </div>
  );
}

export default FriendCard;
