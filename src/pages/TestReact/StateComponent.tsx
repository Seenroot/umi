// 有状态的计数组件

import React, { Component } from 'react';

// 首先，定义好初始状态 initialState

const initialState = { clicksCount: 22 };

/**
 * typeof initialState
 * 使用 TypeScript 来对它进行类型推断
 * 这种做法可以让我们不用分别独立维护 类型和实现，如果实现变更了类型也会随之自动改变，妙!
 */

/**
 * 这里也明确地把所有属性都标记为只读。
 * 在使用的时候，我们还需要显式地把状态定义为只读，并声明为 State 类型。
 *
 * 为什么声明为只读呢？
 * 这是因为 React 不允许直接更新 state 及其属性。类似下面的做法是错误的：
 * this.state.clicksCount = 2
 * this.state = { clicksCount: 2 }
 * 该做法在编译时不会出错，但是会导致运行时错误。
 * 通过使用 Readonly 显式地把类型 type State 的属性都标记为只读属性，以及声明 state 为只读对象，TypeScript 可以实时地把错误用法反馈给开发者，从而避免错误。
 */
type State = Readonly<typeof initialState>;

/**
 * 由于容器组件 ButtonCounter 还没有任何属性，所以我们把 Component 的第一个泛型参数组件属性类型设置为 object，因为 props 属性在 React 中总是 {}。
 * 第二个泛型参数是组件状态类型，所以这里使用我们前面定义的 State 类型。
 */
class ButtonCounter extends Component<object, State> {
  // state: State = initialState;
  readonly state: State = initialState;

  handleIncrement = () => {
    // this.state.clicksCount = 19;
    // this.state = {
    //   clicksCount: 12,
    // };
    this.setState((prevState: State) => ({
      clicksCount: prevState.clicksCount + 1,
    }));
  };

  handleDecrement = () => {
    this.setState((prevState: State) => ({
      clicksCount: prevState.clicksCount - 1,
    }));
  };

  render() {
    const { clicksCount } = this.state;
    return (
      <>
        <button type="button" onClick={this.handleIncrement}>
          增加
        </button>
        <button type="button" onClick={this.handleDecrement}>
          减少
        </button>
        当前计数器是 {clicksCount} 次
      </>
    );
  }
}

export default ButtonCounter;
