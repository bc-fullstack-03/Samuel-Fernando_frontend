import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import Text from '../Text';

interface DropzoneProps {
  onFileUploaded: (file: File) => void;
}

function Dropzone({ onFileUploaded }: DropzoneProps) {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback((acceptedFiles: any[]) => {
    const file = acceptedFiles[0];
    const fileURL = URL.createObjectURL(file);

    setSelectedFileUrl(fileURL);
    onFileUploaded(file);
  }, [onFileUploaded]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className='flex mt-4 border-2 py-2 px-2 border-dashed border-[#81D8F7] cursor-pointer rounded-md'
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {selectedFileUrl ? (
        <img src={selectedFileUrl} className='max-h-96' />
      ): (
        <Text>Arraste a imagem até aqui ou clique para selecionar</Text>
      )}
    </div>
  );
}

export default Dropzone;
