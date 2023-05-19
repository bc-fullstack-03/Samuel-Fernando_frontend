import { House, User, UsersThree } from '@phosphor-icons/react';

import menuLogo from '../../assets/menuLogo.svg';
import Text from '../Text';
import MenuItem from '../MenuItem';
import Button from '../Button';

function Menu() {
  return (
    <div className='basis-1/6 border-r border-slate-400 ml-4 pt-4'>
      <div className='flex items-center ml-4'>
        <img src={menuLogo} alt="SysMap Parrot menu logo" className='w-12 h-12' />
        <Text className='font-extrabold ml-4' size='xlg'>Parrot</Text>
      </div>
      <ul className='pr-2 mr-4'>
        <MenuItem
          menuItemTitle='Página inicial'
          menuItemRoute='/home'
        >
          <House size={40} weight='fill' className='text-slate-50' />
        </MenuItem>
        <MenuItem
          menuItemTitle='Perfil'
          menuItemRoute='/profile'
        >
          <User size={40} weight='fill' className='text-slate-50' />
        </MenuItem>
        <MenuItem
          menuItemTitle='Amigos'
          menuItemRoute='/friends'
        >
          <UsersThree size={40} weight='fill' className='text-slate-50' />
        </MenuItem>
      </ul>
      <div className='ml-2 pr-2 mt-5 mr-4'>
        <Button>Novo Post</Button>
      </div>
    </div>
  );
}

export default Menu;
