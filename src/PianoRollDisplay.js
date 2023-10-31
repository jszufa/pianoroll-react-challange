import PianoRoll from './pianoroll.js';
import { useState } from 'react';


function PianoRollDisplay(props) {

  const [csvURL, setCsvURL] = useState(null); //???jaki argument tu wstawić?

  //stworzyć cadr divy z odpowiednimi numerami
  //potrzebuję
  //1. podzielić dane porcjami po 60 elementów tablicy
  //2. stworzyć odpowiednie divy i svg z dostępem do tych danych
  //3. czyli przydałaby mi się budowa pojedynczego pianoRoll (coś jak post)

  return(
    <div className='piano-roll-card'>
      <div className='description'>This is a piano roll number {props.rollId}</div>
      <svg className='piano-roll-svg'></svg>
    </div>
      
  )
}

export default PianoRollDisplay;