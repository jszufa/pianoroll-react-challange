import {render, screen} from '@testing-library/react';
import App from './App';

test('renders logo', ()=> {
    render(<App/>);
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
})