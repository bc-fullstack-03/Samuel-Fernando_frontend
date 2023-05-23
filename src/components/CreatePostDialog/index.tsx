import { FormEvent, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { toast } from 'react-toastify';

import Button from '../Button';
import Text from '../Text';
import { TextInput } from '../TextInput';
import api from '../../services/api';
import { getAuthHeader } from '../../services/auth';
import { Post } from '../../models/Post';
import Dropzone from '../Dropzone';

interface PostFormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  description: HTMLInputElement;
}

interface PostFormElement extends HTMLFormElement {
  readonly elements: PostFormElements;
}

interface CreatePostDialogProps {
  postCreated: (post: Post) => void;
}

function CreatePostDialog({ postCreated }: CreatePostDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File>();

  async function handleSubmit(event: FormEvent<PostFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const newPost = {
      'title': form.elements.title.value,
      'description': selectedFile ? '' : form.elements.description.value,
      'isImage': selectedFile ? true : false,
    };

    const postData = new FormData();
    postData.append('post', new Blob([JSON.stringify(newPost)], { type: 'application/json' }));

    if (selectedFile) {
      postData.append('photo', selectedFile);
    } else {
      postData.append('photo', new Blob());
    }

    try {
      await api.post('/post', postData, getAuthHeader());
      const { data } = await api.get('/post', getAuthHeader());
      postCreated(data[data.length - 1]);
      toast.success('Post criado com sucesso!');
    } catch (err) {
      toast.error('Ocorreu um erro ao criar um Post');
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
      <Dialog.Content
        className='fixed bg-[#121214] py-6 px-6 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-96'
      >
        <Dialog.Title>
          <Text className='font-extrabold' size='xlg'>Novo Post</Text>
        </Dialog.Title>
        <Dialog.Description>
          <Text size='lg'>Crie um novo Post agora mesmo!</Text>
        </Dialog.Description>
        <form className='flex flex-col gap-3 mt-4' onSubmit={handleSubmit}>
          <Text>Título do Post</Text>
          <TextInput.Root>
            <TextInput.Input id='title' placeholder='Digite o título do Post' />
          </TextInput.Root>
          {selectedFile ? null : (
            <>
              <Text>Conteúdo do Post</Text>
              <TextInput.Root>
                <TextInput.Input id='description' placeholder='Digite a descrição do Post' />
              </TextInput.Root>
            </>
          )}
          <Dropzone onFileUploaded={setSelectedFile} />
          <div className='mt-4 flex justify-end gap-4'>
            <Button type='submit' className='font-extrabold'>
              Postar
            </Button>
            <Dialog.Close
              type='button'
              className='bg-zinc-500 px-5 h-12 rounded-md hover:bg-zinc-600'
              onClick={() => setSelectedFile(undefined)}
            >
              Fechar
            </Dialog.Close>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export default CreatePostDialog;
