import PianoRoll from './pianoroll.js';
import { Component, createRef } from 'react';



class ActivePianoRollDisplay extends Component {
  constructor(props) {
    super(props);
    this.svgRef = createRef();
    this.state = {
      isSelecting: false,
      startX: 0,
      endX: 0,
      svgWidth: 0,
    };
  }

  //LIFECYCLE METHODS

  componentDidMount() {
    const svgElement = this.svgRef.current;
    new PianoRoll(svgElement, this.props.partData);
    this.setState({ svgWidth: svgElement.clientWidth });
  }

  componentDidUpdate() {
    const svgElement = this.svgRef.current;
    svgElement.innerHTML = '';
    new PianoRoll(svgElement, this.props.partData);
    /* this.setState({ svgWidth: svgElement.clientWidth }); */
  }

  componentWillUnmount() {
    const svgElement = this.svgRef.current;
    svgElement.innerHTML = '';
  }

  //HANDLING MOUSE EVENTS

  handleMouseDown = (e) => {
    this.setState({
      isSelecting: true,
      startX: e.clientX,
      endX: e.clientX,
    });

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove = (e) => {
    if (this.state.isSelecting) {
      this.setState({ endX: e.clientX });
    }
  }

  handleMouseUp = () => {
    this.setState({ isSelecting: false });

    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const { startX, endX, svgWidth } = this.state;

    const left = Math.max(0, Math.min(startX, endX));
    const width = Math.min(svgWidth - left, Math.abs(endX - startX));

    const selectionStyle = {
      left: left + 'px',
      width: width + 'px',
    };

    return (
      <div className='piano-roll-card main-piano-roll'>
        <div className='description'>This is a piano roll number {this.props.rollId}</div>
        <div className='overlay-container relative'>
          <div
            className="selection-overlay absolute h-full z-50 bg-black opacity-30"
            style={selectionStyle}
          ></div>
          <svg
            ref={this.svgRef}
            className='piano-roll-svg inline-block'
            onMouseDown={this.handleMouseDown}
          >
          </svg>
        </div>
      </div>
    )
  }
}

export default ActivePianoRollDisplay;