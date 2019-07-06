// 渲染回调/渲染属性模式

import React, { Component, MouseEvent } from 'react';

const initialState = {
  show: false,
};

type Props = Partial<{
  children: RenderCallback;
  render: RenderCallback;
}>;
type State = Readonly<typeof initialState>;

// type RenderCallback = (args: ToggleableComponentProps) => JSX.Element;
// 使用函数接口
interface RenderCallback {
  (args: ToggleableComponentProps): JSX.Element;
}

export interface ToggleableComponentProps {
  show: State['show'];
  toggle: Toggleable['toggle'];
}

const updateShowState = (prevState: State) => ({
  show: !prevState.show,
});

export default class Toggleable extends Component<Props, State> {
  readonly state: State = initialState;

  // private toggle = (e: MouseEvent<HTMLElement>) => this.setState(updateShowState);

  toggle = () => {
    this.setState((prevState: State) => ({
      show: !prevState.show,
    }));
  };

  render() {
    const { children, render } = this.props;
    const renderProps = { show: this.state.show, toggle: this.toggle };
    if (render) {
      return render(renderProps);
    }
    if (children) {
      return children(renderProps);
    }
    return null;
  }
}
