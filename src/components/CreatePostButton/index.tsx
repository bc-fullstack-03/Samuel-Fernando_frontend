import * as Dialog from '@radix-ui/react-dialog';

function CreatePostButton() {
  return (
    <Dialog.Trigger
      className='py-3 px-4 bg-[#81D8F7] rounded font-semibold text-black text-sm w-full transition-colors hover:bg-cyan-300'
    >
      Novo Post
    </Dialog.Trigger>
  );
}

export default CreatePostButton;
