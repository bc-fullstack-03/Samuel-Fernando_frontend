import { ReactNode } from 'react';

import Menu from '../../components/Menu';
import { Post } from '../../models/Post';

interface MainScreenProps {
  children: ReactNode;
  postCreated?: (post: Post) => void;
}

function MainScreen({ children, postCreated }: MainScreenProps) {
  return (
    <div className='w-screen h-full flex'>
      <Menu postCreated={postCreated ? postCreated : () => null} />
      {children}
    </div>
  );
}

export default MainScreen;
