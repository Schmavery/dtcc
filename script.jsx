/** @jsx React.DOM */

var Main = React.createClass({
  getInitialState: function() {
    return {
      style: {
        position: "absolute",
        top: window.innerHeight / 2 - 150,
        left: window.innerWidth / 2 - 167,
        width: 334,
        height: 300,
        textAlign: "center"
      },
      showAnswer: false
    };
  },
  componentDidMount: function () {
    window.onresize = this.resize;
  },
  resize: function() {
    this.setState({
      style: {
        position: "absolute",
        top: window.innerHeight / 2 - 150,
        left: window.innerWidth / 2 - 167,
        width: 334,
        height: 300,
        textAlign: "center"
      }
    });
  },
  render: function() {
    var answer;
    if(this.state.showAnswer) {
      answer = (
        <div>
          You asked if &#39;{this.refs.textinput.getDOMNode().value}&#39; causes cancer.
          <br/><br/>
          YES.
        </div>
      );
    }
    return (
      <div id="main" style={this.state.style}>
        <h1>
        Does this causes cancer?
        </h1>
        <form onSubmit={this.submit}>
        <input type="text" ref="textinput" onKeyUp={this.onTextChange} style={{width: "100%"}}/>
        <button onClick={this.submit}>Search</button>
        <button onClick={this.submit}>I&#39;m feeling lucky</button>
        </form>
        <br />
        {answer}
      </div>
    );
  },

  submit: function(e) {
    e.preventDefault();
    this.setState({
      showAnswer: true
    });
    return false;
  }
});

React.renderComponent(<Main />, document.getElementById("react"));
