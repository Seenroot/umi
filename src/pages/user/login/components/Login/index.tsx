import { Form, Tabs } from 'antd';
import React, { Component } from 'react';
import { FormComponentProps } from 'antd/es/form';
import classNames from 'classnames';
import LoginContext, { LoginContextProps } from './LoginContext';
import LoginItem, { LoginItemProps, LoginItemType } from './LoginItem';
import LoginSubmit from './LoginSubmit';
import LoginTab from './LoginTab';
import styles from './index.less';

export interface LoginProps {
  defaultActiveKey?: string;
  onTabChange?: (key: string) => void;
  style?: React.CSSProperties;
  onSubmit?: (error: any, values: any) => void;
  className?: string;
  form: FormComponentProps['form'];
  children: React.ReactElement<LoginTab>[];
}
interface LoginState {
  tabs?: string[];
  type?: string;
  active?: { [key: string]: any[] };
}

class Login extends Component<LoginProps, LoginState> {
  // 统一导出组件
  public static Tab = LoginTab; // 指定组件

  public static Submit = LoginSubmit;

  public static UserName: React.FunctionComponent<LoginItemProps>; // 指定组件类型

  public static Password: React.FunctionComponent<LoginItemProps>;

  public static Mobile: React.FunctionComponent<LoginItemProps>;

  public static Captcha: React.FunctionComponent<LoginItemProps>;

  static defaultProps = {
    className: '',
    defaultActiveKey: '',
    onTabChange: () => {},
    onSubmit: () => {},
  };

  constructor(props: LoginProps) {
    super(props);
    this.state = {
      type: props.defaultActiveKey,
      tabs: [],
      active: {},
    };
  }

  onSwitch = (type: string) => {
    this.setState(
      {
        type,
      },
      () => {
        const { onTabChange } = this.props;
        if (onTabChange) {
          onTabChange(type);
        }
      },
    );
  };

  // 下面的这个写法，返回值必须是严格符合接口约束才行
  /*
  getContext = (): LoginContextProps => {
    const { form } = this.props;
    const { tabs = [] } = this.state;
    return {
      tabUtil: {
        addTab: id => {
          this.setState({
            tabs: [...tabs, id],
          });
        },
        removeTab: id => {
          this.setState({
            tabs: tabs.filter(currentId => currentId !== id),
          });
        },
      },
      form: { ...form },
      updateActive: activeItem => {
        const { type = '', active = {} } = this.state;
        if (active[type]) {
          active[type].push(activeItem);
        } else {
          active[type] = [activeItem];
        }
        this.setState({
          active,
        });
      },
    };
  };
  */

  getContext: () => LoginContextProps = () => {
    const { form } = this.props;
    const { tabs = [] } = this.state;
    return {
      tabUtil: {
        addTab: id => {
          this.setState({
            tabs: [...tabs, id],
          });
        },
        removeTab: id => {
          this.setState({
            tabs: tabs.filter(currentId => currentId !== id),
          });
        },
      },
      form: { ...form },
      updateActive: activeItem => {
        const { type = '', active = {} } = this.state;
        if (active[type]) {
          active[type].push(activeItem);
        } else {
          active[type] = [activeItem];
        }
        this.setState({
          active,
        });
      },
    };
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { active = {}, type = '' } = this.state;
    const { form, onSubmit } = this.props;
    const activeFields = active[type] || [];
    if (form) {
      form.validateFields(activeFields, { force: true }, (err, values) => {
        if (onSubmit) {
          onSubmit(err, values);
        }
      });
    }
  };

  render() {
    const { className, children } = this.props;
    const { type, tabs = [] } = this.state;
    const TabChildren: React.ReactComponentElement<LoginTab>[] = [];
    const otherChildren: React.ReactElement<any>[] = [];
    React.Children.forEach(
      children,
      (child: React.ReactComponentElement<LoginTab> | React.ReactElement<any>) => {
        if (!child) {
          return;
        }
        if (child.type.typeName === 'LoginTab') {
          TabChildren.push(child);
        } else {
          otherChildren.push(child);
        }
      },
    );
    return (
      // 每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。
      <LoginContext.Provider value={this.getContext()}>
        <div className={classNames(className, styles.login)}>
          <Form onSubmit={this.handleSubmit}>
            {tabs.length ? (
              // 短语法
              <>
                <Tabs
                  animated={false}
                  className={styles.tabs}
                  activeKey={type}
                  onChange={this.onSwitch}
                >
                  {TabChildren}
                </Tabs>
                {otherChildren}
              </>
            ) : (
              children
            )}
          </Form>
        </div>
      </LoginContext.Provider>
    );
  }
}

// 类型断言 keyof
(Object.keys(LoginItem) as (keyof LoginItemType)[]).forEach(item => {
  // 对前面仅定义类型为 React.FunctionComponent<LoginItemProps> 的组件进行赋值
  Login[item] = LoginItem[item];
});

// 使用Form.create 包装的组件
export default Form.create<LoginProps>()(Login);
