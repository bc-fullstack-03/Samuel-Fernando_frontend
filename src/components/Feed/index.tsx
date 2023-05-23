import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UserCircle } from '@phosphor-icons/react';

import { Post } from '../../models/Post';
import Heading from '../Heading';
import Text from '../Text';
import PostCard from '../PostCard';

interface FeedProps {
  posts: Post[];
  hasMorePosts: boolean;
  loadMorePosts: () => void;
}

function Feed({ posts, hasMorePosts, loadMorePosts }: FeedProps) {
  const userProfile = JSON.parse(localStorage.getItem('userProfile') as string);

  return (
    <div className='basis-5/6 overflow-y-hidden scroll-smooth'>
      <Heading className='border-b border-slate-400 mt-4'>
        <Text className='font-extrabold ml-4' size='xlg'>Página inicial</Text>
        <div className='flex items-center ml-5 my-4'>
          {userProfile.photoUri ?
            <img src={userProfile.photoUri} className='w-14 h-14 rounded-full' />
            : <UserCircle size={56} weight='light' />
          }
          <Text className='font-extrabold ml-5' size='xlg'>{userProfile.name}</Text>
        </div>
      </Heading>
      <section>
        {posts.length > 0 ? (
          <InfiniteScroll
            height={800}
            dataLength={posts.length}
            next={loadMorePosts}
            hasMore={hasMorePosts}
            loader={
              <Text className='font-extrabold' size='xlg'>Carregando mais Posts...</Text>
            }
            endMessage={
              <Text className='font-extrabold flex justify-center py-8 mb-4' size='xlg'>
                Mais nada por enquanto... que tal
                {
                  <Link to='/friends' className='text-gray-400 underline hover:text-gray-200'>
                    <Text size='xlg' className='ml-1 mr-1'>seguir mais alguns perfis</Text>
                  </Link>
                }
                ?
              </Text>
            }
            initialScrollY={0}
          >
            {posts.map((post) => {
              return (
                <PostCard post={post} key={post.id} />
              );
            })}
          </InfiniteScroll>
        ) : (
          <div className='w-full flex items items-center justify-center mt-48'>
            <Text className='font-extralight' size='xlg'>
              Está meio vazio por aqui.. que tal
              {
                <Link to='/friends' className='text-gray-400 underline hover:text-gray-200'>
                  <Text size='xlg' className='ml-1 mr-1'>seguir algum perfil</Text>
                </Link>
              }
              para preencher seu feed?
            </Text>
          </div>
        )}
      </section>
    </div>
  );
}

export default Feed;
