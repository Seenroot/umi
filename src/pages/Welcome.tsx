import React from 'react';
import StatelessComponent from './TestReact/StatelessComponent';
import StateComponent from './TestReact/StateComponent';
import RenderPropsComponent, { ToggleableComponentProps } from './TestReact/RenderPropsComponent';
import Menu from './TestReact/Menu';

export default (): React.ReactNode => {
  const clickBtn = (e: React.MouseEvent): void => {
    console.log('e', e);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      Want to add more pages? Please refer to{' '}
      <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
        use block
      </a>
      。
      <StatelessComponent onClick={clickBtn}>
        <div>无状态组件的children</div>
      </StatelessComponent>
      <StateComponent></StateComponent>
      <RenderPropsComponent
        // 组件的props属性：render
        // 其值 类型已经被约束：是一个函数，参数是一个对象，返回值是一个Element
        // 该函数会在RenderPropsComponent中被调用，此处的 { show toggle }是通过对象的 解构赋值取 到在父组件中 定义的值
        render={({ show, toggle }: ToggleableComponentProps) => (
          <>
            <div onClick={toggle}>
              <h1>Some Title</h1>
            </div>
            {show ? <p>some render content {test}</p> : null}
          </>
        )}
      >
        {({ show, toggle }) => (
          <>
            <div onClick={toggle}>
              <h1>Some Title</h1>
            </div>
            {show ? <p>some children content</p> : null}
          </>
        )}
      </RenderPropsComponent>
      <Menu></Menu>
    </div>
  );
};
