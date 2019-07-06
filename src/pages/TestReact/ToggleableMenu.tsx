import React, { Component } from 'react';
import RenderPropsComponent from './RenderPropsComponent';
import MenuItem from './MenuItem';

interface Props {
  title: string;
}

const ToggleableMenu: React.SFC<Props> = ({ children, title }) => (
  <RenderPropsComponent
    render={({ show, toggle }) => (
      // <>
      //   <div onClick={toggle}>
      //     <h1>{title}</h1>
      //   </div>
      //   {show ? children : null}
      // </>
      <MenuItem show={show} toggle={toggle} title={title}>
        {children}
      </MenuItem>
    )}
  />
);

export default ToggleableMenu;
