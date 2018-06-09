import { Component } from 'react';

class Responsive extends Component {
  state = { width: window.innerWidth };

  onWindowResize = () => {
    if (this.state.width !== window.innerWidth) {
      this.setState({ width: window.innerWidth });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  render() {
    return this.props.children(this.state.width);
  }
}

export default Responsive;
