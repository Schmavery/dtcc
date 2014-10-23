/** @jsx React.DOM */
var dict = {
  "cancer":"It's always hard to say...",
  "smoking":"Some studies point towards it being the case...",
  "kittens":"It's quite likely.",
  "nuclear waste":"Hard to tell.",
  "chemicals":"According to Ben."
};

var Main = React.createClass({
  getInitialState: function() {
    return {
      style: {
        position: "absolute",
        top: window.innerHeight / 2 - 150,
        left: window.innerWidth / 2 - 167,
        width: 350,
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
  	  var input = this.refs.textinput.getDOMNode().value;
      if(input.toLowerCase() === "does this cause cancer") {
        answer = (
          <iframe id="frame" src="http://cs.mcgill.ca/~amorin23/git/dtcc/?q=Does%20This%20Cause%20Cancer" width={334 * 1.25} height={300 * 1.25}>
          </iframe>
        );
      } else {
        answer = (
          <div>
            You asked if {input} causes cancer.
            <br/><br/>
  		  { dict[input.toLowerCase()] ? dict[input.toLowerCase()] : "YES." }
          </div>
        );
      }
    	 window.history.replaceState("", "Mhm", "?q="+encodeURIComponent(input));
    }
    return (
      <div id="main" style={this.state.style}>
        <h1>
        Does This Cause Cancer?
        </h1>
        <form onSubmit={this.submit}>
        <input type="text" ref="textinput" onKeyUp={this.onTextChange} style={{width: "100%"}}/>
        <button onClick={this.submit}>Search</button>&nbsp;&nbsp;
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
