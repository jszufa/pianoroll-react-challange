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
      const svgMarginLeft = this.svgRef.current.getBoundingClientRect().left;

      this.setState({ endX: Math.max(e.clientX, svgMarginLeft) });
    }
  }

  handleMouseUp = () => {
    this.setState({ isSelecting: false });

    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const { startX, endX, svgWidth } = this.state;

    let svgMarginLeft = 0;

    if (this.svgRef.current) {
      svgMarginLeft = this.svgRef.current.getBoundingClientRect().left;
    }

    const left = Math.max(svgMarginLeft, Math.min(startX, endX));
    const width = Math.min(svgWidth - (left - svgMarginLeft), Math.abs(endX - startX));

    const selectionStyle = {
      left: left - svgMarginLeft + 'px',
      width: width + 'px',
    };


    return (
      <div className='piano-roll-card main-piano-roll'>
        <div className='description'>This is a piano roll number {this.props.rollId}</div>
        <div className='overlay-container relative w-3/5 m-auto'>
          <div
            className="selection-overlay absolute h-full z-50 bg-amber-400 opacity-30 border-l-[1px] border-r-[2px] border-amber-600 border-solid"
            style={selectionStyle}
          ></div>
          <svg
            ref={this.svgRef}
            className='w-full h-40 inline-block '
            onMouseDown={this.handleMouseDown}
          >
          </svg>
        </div>
      </div>
    )
  }
}

export default ActivePianoRollDisplay;