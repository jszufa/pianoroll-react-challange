import PianoRoll from '../helpers/pianoroll.js';
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
      selectionVisible: false,
    };
  }

  //LIFECYCLE METHODS

  componentDidMount() {
    const svgElement = this.svgRef.current;
    new PianoRoll(svgElement, this.props.partData);
    this.setState({ svgWidth: svgElement.clientWidth });

    //Event to remove selection
    document.addEventListener('dblclick', this.handleClickOutside);
  }

  componentDidUpdate() {
    const svgElement = this.svgRef.current;
    svgElement.innerHTML = '';
    new PianoRoll(svgElement, this.props.partData);
  }

  componentWillUnmount() {
    const svgElement = this.svgRef.current;
    svgElement.innerHTML = '';

    document.removeEventListener('click', this.handleClickOutside);
  }

  //HANDLING MOUSE EVENTS

  handleMouseDown = (e) => {
    this.setState({
      isSelecting: true,
      startX: e.clientX,
      endX: e.clientX,
      selectionVisible: true,
    });

    //Attaching event listeners to the window object
    //to ensure that the mousemove and mouseup events are detected 
    //even when the mouse pointer moves outside the component's boundaries
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove = (e) => {
    if (this.state.isSelecting) {
      const svgMarginLeft = this.svgRef.current.getBoundingClientRect().left;
      
      this.setState({ endX: Math.max(e.clientX, svgMarginLeft) }); //To handle case, when mouse is moved to the left of svg
    }
  }

  handleMouseUp = () => {
    this.setState({ isSelecting: false, });
    
    //these lines of code are repeated...
    const { startX, endX, svgWidth } = this.state;

    let svgMarginLeft = 0;
    if (this.svgRef.current) {
      svgMarginLeft = this.svgRef.current.getBoundingClientRect().left;
    }

    const left = Math.max(svgMarginLeft, Math.min(startX, endX));
    const width = Math.min(svgWidth - (left - svgMarginLeft), Math.abs(endX - startX));
    const selectionX = left - svgMarginLeft;
    //.....

    this.countNotes(svgWidth, selectionX, width);
    console.log('----------------------------'); //Logging values relative to the top-left of the viewport.
    console.log(`Start point: ${(left)}`); 
    console.log(`End point: ${(left + width)}`);
    

    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleClickOutside = (e) => {
    // Check if the dblclick event target is not within the SVG element
    if (
      this.svgRef.current &&
      !this.svgRef.current.contains(e.target)
    ) {
      // The dblclick is outside the SVG, so we can hide the selection
      this.setState({
        selectionVisible: false,
      })
    }
  }


  countNotes = (svgWidth, selectionX, selectionWidth) => {

    //SelectionX is a relative value to the svg, here this is not a viewportx value (absolute)
    const selectionStart = (selectionX / svgWidth);
    const selectionEnd = ((selectionX + selectionWidth) / svgWidth);
    
    const sequence = this.props.partData;
    const start = sequence[0].start;
    const range = sequence[sequence.length - 1].end - start;

    let selectionData = [];

    sequence.forEach((note) => {
      const noteX = (note.start - start) / range;
      /* const noteWidth = (note.end - note.start) / range; */
      /* If we would like to count notes that for example end within selection, but not necessarily start */
      
      if (((noteX) >= selectionStart && noteX <= selectionEnd)) {
        selectionData.push(note);
      }
    })

    console.log(`Number of notes: ${selectionData.length}`);
  }


  render() {

    //Handling visual layer to the selection
    const { startX, endX, svgWidth, selectionVisible } = this.state;

    let svgMarginLeft = 0;

    if (this.svgRef.current) {
      svgMarginLeft = this.svgRef.current.getBoundingClientRect().left;
    }

    const left = Math.max(svgMarginLeft, Math.min(startX, endX));
    const width = Math.min(svgWidth - (left - svgMarginLeft), Math.abs(endX - startX));

    let selectionStyle = {
      left: left - svgMarginLeft + 'px',
      width: width + 'px',
    };

    if (!selectionVisible) {
      selectionStyle = {
        width: 0,
        border: 'none',
      };
    }

    return (
      <div className='main-piano-roll'>
        <div className='description mb-4 font-bold'>This is a piano roll number {this.props.rollId}</div>
        <div className='overlay-container relative sm:w-11/12 lg:w-4/5 m-auto rounded-xl border border-sky-900'>
          <div
            className="selection-overlay absolute h-full z-50 bg-amber-400 opacity-30 border-l-[1px] border-r-[2px] border-amber-600 border-solid rounded-xl"
            style={selectionStyle}
          ></div>
          <svg
            ref={this.svgRef}
            className='w-full h-52 sm:h-56 md:h-72 inline-block rounded-xl'
            onMouseDown={this.handleMouseDown}
          >
          </svg>
        </div>
      </div>
    )
  }
}

export default ActivePianoRollDisplay;