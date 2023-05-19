import { ReactNode } from 'react';

import Menu from '../../components/Menu';

interface MainScreenProps {
  children: ReactNode;
}

function MainScreen({ children }: MainScreenProps) {
  return (
    <div className='w-screen h-screen flex'>
      <Menu />
      {children}
    </div>
  );
}

export default MainScreen;
