import React, { Component } from 'react';
import ToggleableMenu from './ToggleableMenu';

// export default class Menu extends Component {
//   render() {
//     return (
//       <>
//         <ToggleableMenu></ToggleableMenu>
//       </>
//     );
//   }
// }

// SFC的泛型实参可以省略，默认是 {}
const Menu: React.FunctionComponent = () => (
  <>
    <ToggleableMenu title="First Menu">First Menu Content</ToggleableMenu>
    <ToggleableMenu title="Second Menu">Second Menu Content</ToggleableMenu>
    <ToggleableMenu title="Third Menu">Third Menu Content</ToggleableMenu>
  </>
);

export default Menu;
