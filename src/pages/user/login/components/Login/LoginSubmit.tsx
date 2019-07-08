import { Button, Form } from 'antd';

import { ButtonProps } from 'antd/es/button';
import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

const FormItem = Form.Item;

interface LoginSubmitProps extends ButtonProps {
  className?: string;
}

/**
 * 设置了交叉类型，并赋值后
 * 在 index.tsx 中 import LoginSubmit from './LoginSubmit';
 * 引入后，鼠标移入到 LoginSubmit 上会显示 (alias) module LoginSubmit
 * 此时在 children: React.ReactElement<LoginSubmit>[] 可以作为类型使用
 */
const LoginSubmit: React.FunctionComponent<LoginSubmitProps> & { typeName: string } = ({
  className,
  ...rest
}) => {
  const clsString = classNames(styles.submit, className);
  return (
    <FormItem>
      <Button size="large" className={clsString} type="primary" htmlType="submit" {...rest} />
    </FormItem>
  );
};

LoginSubmit.typeName = 'submit';

export default LoginSubmit;
