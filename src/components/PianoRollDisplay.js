import PianoRoll from '../helpers/pianoroll.js';
import { Component, createRef } from 'react';

class PianoRollDisplay extends Component {
  constructor(props) {
    super(props);
    this.svgRef = createRef();
  }

  componentDidMount() {
    const svgElement = this.svgRef.current;
    new PianoRoll(svgElement, this.props.partData);
  }

  componentDidUpdate() {
    const svgElement = this.svgRef.current;
    svgElement.innerHTML = '';
    new PianoRoll(svgElement, this.props.partData);
  }

  componentWillUnmount() {
    const svgElement = this.svgRef.current;
    svgElement.innerHTML = '';
  }


  render() {
    return (
      <div className='piano-roll-card'>
        <div className='description'>Piano roll number {this.props.rollId}</div>
        <svg ref={this.svgRef} className='piano-roll-svg' ></svg>
      </div>
    )
  }
}

export default PianoRollDisplay;