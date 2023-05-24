import { FormEvent, useState } from 'react';
import { UserCircle } from '@phosphor-icons/react';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { Post } from '../../models/Post';
import { getAuthHeader } from '../../services/auth';
import PostCard from '../PostCard';
import Text from '../Text';
import { Comment } from '../../models/Comment';
import { TextInput } from '../TextInput';
import Button from '../Button';

interface PostDetailItemProps {
  post: Post;
  setPostDetail: (postDetail: Post) => void;
}

interface CommentFormElements extends HTMLFormControlsCollection {
  description: HTMLInputElement;
}

interface CommentFormElement extends HTMLFormElement {
  readonly elements: CommentFormElements;
}

function PostDetailItem({ post, setPostDetail }: PostDetailItemProps) {
  const [errorComment, setErrorComment] = useState('');

  async function handleCommentSubmit(event: FormEvent<CommentFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const data = {
      description: form.elements.description.value,
    };

    if (data.description.length < 3) {
      setErrorComment('O comentário precisa ter ao menos 3 caracteres');
      return;
    }

    try {
      await api.post(`/post/${post.id}/comments`, data, getAuthHeader());
      const response = await api.get(`/post/${post.id}`, getAuthHeader());
      setPostDetail(response.data);
      setErrorComment('');
      form.elements.description.value = '';
    } catch (err) {
      toast.error('Ocorreu um erro ao comentar');
    }
  }

  return (
    <div className='flex flex-col w-full overflow-auto scroll-smooth'>
      {post && <PostCard post={post} />}
      <form onSubmit={handleCommentSubmit} className='h-fit pt-5 px-5'>
        <Text size='lg'>Novo comentário</Text>
        <TextInput.Root>
          <TextInput.Input
            id='description'
            placeholder='Digite seu comentário'
          />
        </TextInput.Root>
        <div className='flex flex-col'>
          {errorComment && <Text className='text-red-600 mt-2' size='sm'>{errorComment}</Text>}
          <Button type='submit' className='max-w-xs mt-4'>Comentar</Button>
        </div>
      </form>
      <section className='border-t border-slate-400 w-full pt-5 mt-8'>
        <Text size='lg' className='mx-5 mb-4 font-extrabold'>Comentários:</Text>
        <ul>
          {post.comments && post.comments.map((comment: Comment) => {
            return (
              <li className='py-5 px-5 border-b' key={comment.id}>
                <div className='flex items-center pl-1 mb-2'>
                  {comment.userProfile.photoUri ?
                    <img src={comment.userProfile.photoUri} className='w-9 h-9 rounded-full' />
                    : <UserCircle size={36} weight='light' className='text-gray-100' />
                  }
                  <Text size='lg' className='ml-2 font-bold'>{comment.userProfile.name}</Text>
                </div>
                <Text size='lg' className='ml-2'>{comment.description}</Text>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default PostDetailItem;
