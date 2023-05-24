import { FormEvent, useState } from 'react';
import { UserCircle } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '../Button';
import Dropzone from '../Dropzone';
import Heading from '../Heading';
import Text from '../Text';
import api from '../../services/api';
import { getAuthHeader } from '../../services/auth';

function ProfileCard() {
  const [selectedFile, setSelectedFile] = useState<File>();

  const userProfile = JSON.parse(localStorage.getItem('userProfile') as string);
  const navigate = useNavigate();

  async function handlePhotoUpload(event: FormEvent) {
    event.preventDefault();
    const photoData = new FormData();
    selectedFile && photoData.append('photo', selectedFile);

    try {
      await api.post('/profile/photo', photoData, getAuthHeader());
      const { data } = await api.get(`/profile/${userProfile.idUser}`, getAuthHeader());
      localStorage.removeItem('userProfile');
      localStorage.setItem('userProfile', JSON.stringify(data));
      toast.success('Foto salva com sucesso!');
      navigate('/profile');
    } catch (err) {
      toast.error('Ocorreu um erro ao salvar a foto');
    }
  }

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
        {userProfile.photoUri ? (null) : (
          <div>
            <Text className='ml-4' size='lg'>Adicionar foto de perfil</Text>
            <div className='max-w-xl mb-5 ml-5 mt-3 flex flex-row border rounded-md p-3 border-slate-400'>
              <Dropzone onFileUploaded={setSelectedFile} />
              <Button className='max-w-xs ml-5 mt-4 mb-4 align-middle' onClick={handlePhotoUpload}>
                Salvar foto de perfil
              </Button>
            </div>
          </div>
        )}
        <Button className='max-w-sm ml-5 mb-4 align-middle' onClick={handleLogout}>
          Sair
        </Button>
      </Heading>
    </div>
  );
}

export default ProfileCard;
