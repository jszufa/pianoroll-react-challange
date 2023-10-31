import PianoRoll from './pianoroll.js';
import { Component, createRef } from 'react';


class PianoRollDisplay extends Component {
  constructor(props) {
    super(props);
    this.svgRef = createRef();
  }

  componentDidMount() {
    // Create a new instance of your class and attach it to the <svg> element
    const svgElement = this.svgRef.current;
    new PianoRoll(svgElement, this.props.partData); // Create a new instance
  }

  //???jaki argument tu wstawić?

  //stworzyć cadr divy z odpowiednimi numerami
  //potrzebuję
  //1. podzielić dane porcjami po 60 elementów tablicy
  //2. stworzyć odpowiednie divy i svg z dostępem do tych danych
  //3. czyli przydałaby mi się budowa pojedynczego pianoRoll (coś jak post)


  //pytanie za sto punktów - jak tworzyć odpowiednie instacje piano Roll w Reacie?
  //Czy muszę przerobić cały ten kod? Moim zdaniem, szkoda zachodu na przerabianie tworzenia svg na logikę funkcyjnych komponentów.



  render() {
    return (
      <div className='piano-roll-card'>
        <div className='description'>This is a piano roll number {this.props.rollId}</div>
        <svg ref={this.svgRef} className='piano-roll-svg'></svg>
      </div>
    )
  }
}

export default PianoRollDisplay;