import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, Chat, Heart } from '@phosphor-icons/react';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { Post } from '../../models/Post';
import Heading from '../Heading';
import Text from '../Text';
import { getAuthHeader } from '../../services/auth';

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const profileId = localStorage.getItem('user') as string;

  useEffect(() => {
    if (post.likes.includes(profileId)) {
      setLiked(true);
    }
  }, [profileId, post.likes]);

  const handlePostLike = async (postId: string) => {
    try {
      if (!liked) {
        await api.post(`/post/${postId}/like`, null, getAuthHeader());

        setLiked(true);
        setLikesCount(likesCount + 1);
      } else {
        await api.post(`/post/${postId}/unlike`, null, getAuthHeader());

        setLiked(false);
        setLikesCount(likesCount - 1);
      }
    } catch (err) {
      toast.error('Ocorreu um erro ao interagir com o Post');
    }
  };

  return (
    <div className='border-b border-slate-400 mt-5'>
      <Heading className='flex items-center ml-5'>
        {
          post.userProfile.photoUri ?
            <img src={post.userProfile.photoUri} className='w-12 h-12 rounded-full' />
            : <UserCircle size={48} weight='light' />
        }
        <Text size='lg' className='ml-2 font-bold'>{post.userProfile.name}</Text>
      </Heading>
      <Link to={`/post/${post.id}`} className='cursor-pointer'>
        <div className='ml-16 flex flex-col gap-2 mb-5'>
          <Heading size='sm'>{post.title}</Heading>
          {post.isImage ? (
            <img src={post.description} className='max-w-lg rounded-lg' />
          ) : (
            <Text asChild>
              <p>{post.description}</p>
            </Text>
          )}
        </div>
      </Link>
      <footer className='flex items-center ml-16 my-4 space-x-3'>
        {liked ?
          <Heart size={24} className='cursor-pointer' weight='fill' color='#81D8F7' onClick={() => handlePostLike(post.id)} />
          : <Heart size={24} className='cursor-pointer text-slate-50 hover:text-[#81D8F7]' onClick={() => handlePostLike(post.id)} />
        }
        <Text>{likesCount}</Text>
        <Link to={`/post/${post.id}`}>
          <Chat size={24} className='cursor-pointer text-slate-50 hover:text-[#81D8F7]' />
        </Link>
        <Text>{post.comments.length}</Text>
      </footer>
    </div>
  );
}

export default PostCard;
