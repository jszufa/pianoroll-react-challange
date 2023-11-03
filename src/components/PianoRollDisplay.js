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
      <div className='piano-roll-card rounded-2xl border border-zinc-200 shadow-md pb-4 hover:opacity-70 duration-300 hover:scale-105'>
        <div className='description text-gray-600 mb-2'>Piano roll number {this.props.rollId}</div>
        <svg ref={this.svgRef} className='piano-roll-svg inline-block rounded-2xl border border-sky-900 ' ></svg>
      </div>
    )
  }
}

export default PianoRollDisplay;