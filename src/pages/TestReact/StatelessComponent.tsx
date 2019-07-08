// 无状态组件: 无状态组件（Stateless Component）就是没有状态（state）的组件。大多数时候，它们就是纯函数。

// import React from 'react';

// const Button = ({ onClick: handleClick, children }) => (
//   <button onClick={handleClick}>{children}</button>
// );

// 编辑器报错：我们需要明确地告诉组件它的属性是什么类型。所以，让我们来定义组件属性

// import React, { MouseEvent, ReactNode } from 'react';

// interface Props {
//   onClick(e: MouseEvent<HTMLElement>): void;
//   children?: ReactNode;
// }

// const Button = ({ onClick: handleClick, children }: Props) => (
//   <button onClick={handleClick} type="button">
//     {children}
//   </button>
// );

// 在 @types/react 类型模块中预定了 type SFC<P>，
// 它是 interface StatelessComponent<P> 的类型别名，并且它预定义了 children 、displayName 和 defaultProps 等属性。
// 所以，我们用不着自己写，可以直接拿来用

import React, { MouseEvent } from 'react';

interface Props {
  onClick(e: MouseEvent<HTMLElement>): void;
  // 可选属性 color 的类型其实是联合类型 undefined | string
  color?: {
    value: string;
    depth: number;
  };
}

const Button: React.FunctionComponent<Props> = ({ onClick: handleClick, color, children }) => (
  // TypeScript 抛出错误：对象可能为“未定义”。因为编译器并不知道 color 已经被定义在 Component.defaultProps 了。
  // <button style={{ color: color.value }} onClick={handleClick} type="button">
  <button style={{ color: color && color.value }} onClick={handleClick} type="button">
    {/* {color} */}
    {children}
  </button>
);

Button.defaultProps = {
  color: {
    value: 'red',
    depth: 8,
  },
};

export default Button;
