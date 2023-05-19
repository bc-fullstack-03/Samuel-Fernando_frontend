import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import Text from '../Text';

interface MenuItemProps {
  menuItemTitle: string;
  menuItemRoute: string;
  children: ReactNode;
}

function MenuItem(props: MenuItemProps) {
  return (
    <li className='mt-5'>
      <Link to={props.menuItemRoute}>
        <div className='flex items-center px-4 rounded hover:bg-[#81D8F7] ml-2 cursor-pointer py-2'>
          {props.children}
          <Text size='xlg' className='ml-4'>{props.menuItemTitle}</Text>
        </div>
      </Link>
    </li>
  );
}

export default MenuItem;
