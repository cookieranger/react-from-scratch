function component() {
  var element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(["Hello", "webpack asdfadsfds"], " ");

  return element;
}

document.body.appendChild(component());
var Lithium = require('./lithium')


class CounterButton extends Dilithium.Component {
  constructor(props) {
    super(props)
    this.state = { counter: 0 }
    setInterval(() => {
      this.setState({ count: this.state.count + 1})
    }, 500)
  }
  render() {
    return <div>
      <h1>{this.props.title}</h1>
      <ColorSwatch number={this.state.count}></ColorSwatch>
      <div>
        Count: <span>{this.state.count}</span>
      </div>
    </div>
  }
}

class ColorSwatch extends Dilithium.Component {
  render() {
    const red = this.props.number % 10 * (256 * 10);
    return (
      <div style={{
        backgroundColor: `rgb(${red}, 0, 0)`,
        height: '50px',
        width: '50px'
      }}/>
    )
  }
}

Dilithium.render(
  <CounterButton title="Hello React Framework!" />,
  document.getElementById('app')
)