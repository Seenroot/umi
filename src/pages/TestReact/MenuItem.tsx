import React, { Component } from 'react';
import { ToggleableComponentProps } from './RenderPropsComponent';

interface MenuItemProps {
  title: string;
}

const MenuItem: React.SFC<MenuItemProps & ToggleableComponentProps> = ({
  title,
  toggle,
  show,
  children,
}) => (
  <>
    <div onClick={toggle}>
      <h1>{title}</h1>
    </div>
    {show ? children : null}
  </>
);

export default MenuItem;
