import { Button, Col, Form, Input, Row } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from 'antd/es/form';
import omit from 'omit.js';
import ItemMap from './map';
import LoginContext, { LoginContextProps } from './LoginContext';
import styles from './index.less';

// 此处Omit的实现中，第二个泛型的类型限制为第一个泛型的类型interface的键
// Pick工具泛型 返回值 是一个 type
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// WrappedLoginItemProps约束为LoginItemProps中去除联合类型 'form' | 'type' | 'updateActive'
// 好处就是不用再去定义一个类型，去单独维护
export type WrappedLoginItemProps = Omit<LoginItemProps, 'form' | 'type' | 'updateActive'>;
export type LoginItemKeyType = keyof typeof ItemMap;
export interface LoginItemType {
  UserName: React.FC<WrappedLoginItemProps>;
  Password: React.FC<WrappedLoginItemProps>;
  Mobile: React.FC<WrappedLoginItemProps>;
  Captcha: React.FC<WrappedLoginItemProps>;
}

// typescript提示：使用interface 代替 type
// export type LoginItemType = {
//   UserName: React.FC<WrappedLoginItemProps>;
//   Password: React.FC<WrappedLoginItemProps>;
//   Mobile: React.FC<WrappedLoginItemProps>;
//   Captcha: React.FC<WrappedLoginItemProps>;
// };
export interface LoginItemProps {
  name?: string;
  rules?: any[];
  style?: React.CSSProperties;
  onGetCaptcha?: (event?: MouseEvent) => void | Promise<any> | false;
  placeholder?: string;
  buttonText?: React.ReactNode;
  onPressEnter?: (e: any) => void;
  countDown?: number;
  getCaptchaButtonText?: string;
  getCaptchaSecondText?: string;
  updateActive?: LoginContextProps['updateActive'];
  type?: string;
  defaultValue?: string;
  form?: FormComponentProps['form'];
  customProps?: { [key: string]: any };
  onChange?: (e: any) => void;
  tabUtil?: any;
}

interface LoginItemState {
  count: number;
}

const FormItem = Form.Item;

class WrapFormItem extends Component<LoginItemProps, LoginItemState> {
  static defaultProps = {
    getCaptchaButtonText: 'captcha',
    getCaptchaSecondText: 'second',
  };

  interval: number | undefined = undefined;

  constructor(props: LoginItemProps) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    const { updateActive, name = '' } = this.props;
    if (updateActive) {
      updateActive(name);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    const { onGetCaptcha } = this.props;
    const result = onGetCaptcha ? onGetCaptcha() : null;
    if (result === false) {
      return;
    }
    if (result instanceof Promise) {
      result.then(this.runGetCaptchaCountDown);
    } else {
      this.runGetCaptchaCountDown();
    }
  };

  getFormItemOptions = ({ onChange, defaultValue, customProps = {}, rules }: LoginItemProps) => {
    const options: {
      rules?: any[];
      onChange?: LoginItemProps['onChange'];
      initialValue?: LoginItemProps['defaultValue'];
    } = {
      rules: rules || customProps.rules,
    };
    if (onChange) {
      options.onChange = onChange;
    }
    if (defaultValue) {
      options.initialValue = defaultValue;
    }
    return options;
  };

  runGetCaptchaCountDown = () => {
    const { countDown } = this.props;
    let count = countDown || 59;
    this.setState({ count });
    this.interval = window.setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  render() {
    const { count } = this.state;

    // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
    const {
      onChange,
      customProps,
      defaultValue,
      rules,
      name,
      getCaptchaButtonText,
      getCaptchaSecondText,
      updateActive,
      type,
      form,
      tabUtil,
      ...restProps
    } = this.props;
    if (!name) {
      return null;
    }
    if (!form) {
      return null;
    }
    const { getFieldDecorator } = form;
    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);
    const otherProps = restProps || {};

    if (type === 'Captcha') {
      const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);

      return (
        <FormItem>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator(name, options)(<Input {...customProps} {...inputProps} />)}
            </Col>
            <Col span={8}>
              <Button
                disabled={!!count}
                className={styles.getCaptcha}
                size="large"
                onClick={this.onGetCaptcha}
              >
                {count ? `${count} ${getCaptchaSecondText}` : getCaptchaButtonText}
              </Button>
            </Col>
          </Row>
        </FormItem>
      );
    }
    return (
      <FormItem>
        {getFieldDecorator(name, options)(<Input {...customProps} {...otherProps} />)}
      </FormItem>
    );
  }
}

// 变量LoginItem 是 LoginItemType接口约束的可选值，初始值为{}
const LoginItem: Partial<LoginItemType> = {};

// 给 LoginItem 添加属性
Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  // 属性值是 函数式组件
  LoginItem[key] = (props: LoginItemProps) => (
    // 函数式组件完成订阅 context
    // 类组件使用 Class.contextType，订阅 context
    // context 的值是 该组件最近的最近的 Provider 组件提供的 value 值
    <LoginContext.Consumer>
      {context => (
        <WrapFormItem
          customProps={item.props}
          rules={item.rules}
          {...props}
          type={key}
          {...context}
          updateActive={context.updateActive}
        />
      )}
    </LoginContext.Consumer>
  );
});

// LoginItem.test = ''; // 类型“Partial<LoginItemType>”上不存在属性“test”。

// console.log('LoginItem', LoginItem);

// 将 LoginItem 类型断言 为 LoginItemType，前面定义松散是为了 便于添加 属性，最终导出时限制为 LoginItemType 类型
export default LoginItem as LoginItemType;

// 此处 as 类型断言，并不是 重命名
// 针对值进行类型转换，它没有运行时的影响，只是在编译阶段起作用。
