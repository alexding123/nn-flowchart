import React from 'react';
import "./SetInput.css";

export class SetInput extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      err: null,
      name: "",
      link: "",
      inputShape: [],
      outputShape: [],
      inputShapeDisplay: "",
      outputShapeDisplay: "",
    }

    this.onChange = this.onChange.bind(this);
    this.noChange = this.noChange.bind(this);
    this.setError = this.setError.bind(this);
    this.onChangeShapeInput = this.onChangeShapeInput.bind(this);
    this.onChangeShapeOutput = this.onChangeShapeOutput.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onBlurInput = this.onBlurInput.bind(this);
    this.onBlurOutput = this.onBlurOutput.bind(this);
  }

  setError(err) {
    this.setState({err:err})
  }

  onChange(e) {
    this.setState({link:e.target.value});
  }

  breakShape(value) {
    let components = String(value).split(",");

    // do not accept empty inputs
    if (components.length === 0) {
      return [];
    }
    for (var i = 0; i < components.length; i++) {
      const num = parseInt(components[i]);
      // do not update if any member of tuple is not a number
      if (isNaN(num)) {
        return null;
      }
      components[i] = num;
    }
    return components;
  }
  toString(shape) {
    if (shape.length === 0) {
      return "";
    }
    return shape.join(",");
  }
  onChangeShapeInput(e) {
    this.setState({
      inputShapeDisplay: e.target.value,
    })
  }

  onBlurInput(e) {
    const components = this.breakShape(e.target.value);
    if (components === null) {
      this.setState({
        inputShapeDisplay: this.toString(this.state.inputShape),
      });
      return;
    }
    this.setState({
      inputShape: components,
      inputShapeDisplay: this.toString(components)
    });
  }

  onChangeShapeOutput(e) {
    this.setState({
      outputShapeDisplay: e.target.value,
    });
  }

  onBlurOutput(e) {
    const components = this.breakShape(e.target.value);
    if (components === null) {
      this.setState({
        outputShapeDisplay: this.toString(this.state.outputShape),
      });
      return;
    }
    this.setState({
      outputShape: components,
      outputShapeDisplay: this.toString(components),
    });
  }
  
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    })
  }

  noChange(e) {
    if (e.target.id === "background-input-set" || e.target.id === "input-blocker") {
      this.props.toggle();
    }
  }

  render() {
    if (!this.props.display) {
      return null;
    }
    return (
      <div id="background-input-set" onClick={this.noChange} className="set-input-container">
      <h1>Load Input Dataset</h1>
      <div className="input-container">
        <div className="input-preset">
          <h2>Load Preset</h2>
          <div className="d-flex flex-wrap p-2">
            <div className="p-2"><button type="button" onClick={() => this.props.loadDefaultInput("MNIST")} className="btn btn-secondary">MNIST</button></div>
            <div className="p-2"><button type="button" onClick={() => this.props.loadDefaultInput("IMDB")} className="btn btn-secondary">IMDB</button></div>
          </div>
          
        </div>
        <div id="input-blocker" className="input-blocker"></div>
        <div className="input-load">
          <h2>Load Custom Dataset</h2>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Enter input URL" onChange={this.onChange} value={this.state.link}></input>
          </div>
          <input type="text" className="form-control" placeholder="Name" onChange={this.onChangeName} value={this.state.name}></input>
          <small className="form-text">Shape does not include batchSize</small>
          <div className="form-row">
            
            <div className="col">
              <input type="text" className="form-control" placeholder="Input shape" onChange={this.onChangeShapeInput} onBlur={this.onBlurInput} value={this.state.inputShapeDisplay}></input>
            </div>
            <div className="col">
              <input type="text" className="form-control" placeholder="Output shape" onChange={this.onChangeShapeOutput} onBlur={this.onBlurOutput} value={this.state.outputShapeDisplay}></input>
            </div>
          </div>         
          
          <small className="form-text text-muted">{this.state.err}</small> 
          <br></br>
          <button type="button" className="btn btn-secondary" onClick={()=>this.props.loadInput(this.state.link, this.state.name, this.state.inputShape, this.state.outputShape, this.setError)}>Load</button>
        </div>
      </div>
    </div>
    );
  }
}