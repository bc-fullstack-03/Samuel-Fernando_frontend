import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import MainScreen from '../../components/MainScreen';
import PostCard from '../../components/PostCard';
import ProfileCard from '../../components/ProfileCard';
import Text from '../../components/Text';
import { Post } from '../../models/Post';
import api from '../../services/api';
import { getAuthHeader } from '../../services/auth';

function Profile() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function getMyPosts() {
      try {
        const { data } = await api.get('/post', getAuthHeader());
        setPosts(data);
      } catch (err) {
        toast.error('Ocorreu um erro ao obter seus Posts');
      }
    }

    getMyPosts();
  }, []);

  return (
    <MainScreen>
      <div className='flex flex-col w-full basis-5/6'>
        <ProfileCard />
        <section className='mt-4'>
          <Text className='font-extrabold ml-5' size='xlg'>Meus Posts</Text>
          {posts.map((post) => {
            return (
              <PostCard post={post} key={post.id} />
            );
          })}
        </section>
      </div>
    </MainScreen>
  );
}

export default Profile;
