import { Component } from 'react';

export const MOBILE = 767;
export const TABLET = 990;

class Responsive extends Component {
  state = { width: MOBILE };

  onWindowResize = () => {
    if (this.state.width !== window.innerWidth) {
      this.setState({ width: window.innerWidth });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
    this.setState({ width: window.innerWidth });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  render() {
    return this.props.children(this.state.width);
  }
}

export default Responsive;
