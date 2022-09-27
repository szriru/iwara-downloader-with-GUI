import React, { useState } from 'react';

import Icon from '../assets/icons/linux/icon.png';

import UnstyledMenuList from './UnstyledMenuList';

function AppBar() {
  const [isMaximize, setMaximize] = useState(false);
  const [openMenu, setOpenMenu] = useState(false)
  const toggleMenu = () => {
    setOpenMenu(prev => !prev)
  }

  const handleToggle = () => {
    if (isMaximize) {
      setMaximize(false);
    } else {
      setMaximize(true);
    }
    window.Main.Maximize();
  };

  const menuProps = [
    {
      name: "File",
      something: "something"
    },
    {
      name: "Help",
      something: "something"
    }
  ]

  return (
    <>
      <div className="py-0.5 flex justify-between draggable bg-white">
        <div className="inline-flex items-center">
          <img className="lg:-ml-2 mr-2 ml-1 h-5" src={Icon} alt="app icon" />
          <p className="text-xs md:pt-1 md:-ml-1 lg:-ml-2">Iwara Downloader</p>
        </div>
        <div className="inline-flex -mt-1">
          <button onClick={window.Main.Minimize} className="undraggable md:px-4 lg:px-3 pt-1 hover:bg-gray-300">
            &#8211;
          </button>
          <button onClick={handleToggle} className="undraggable px-6 lg:px-5 pt-1 hover:bg-gray-300">
            {isMaximize ? '\u2752' : '⃞'}
          </button>
          <button onClick={window.Main.Close} className="undraggable px-4 pt-1 hover:bg-red-500 hover:text-white">
            &#10005;
          </button>
        </div>
      </div>

      <div className="bg-gray-900 text-white undraggable">
        <div className="flex text-center">
          <div className="flex space-x-2">
            <UnstyledMenuList {...menuProps[0]}/>
            <UnstyledMenuList {...menuProps[1]}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppBar;
