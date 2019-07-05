import React from 'react';
import StatelessComponent from './TestReact/StatelessComponent';
import StateComponent from './TestReact/StateComponent';

export default (): React.ReactNode => {
  const clickBtn = (e: React.MouseEvent): void => {
    console.log('e', e);
  };

  return (
    <p style={{ textAlign: 'center' }}>
      Want to add more pages? Please refer to{' '}
      <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
        use block
      </a>
      。
      <StatelessComponent onClick={clickBtn}>
        <div>无状态组件的children</div>
      </StatelessComponent>
      <StateComponent></StateComponent>
    </p>
  );
};
