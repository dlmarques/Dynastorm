/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react'
import Button from './Button'


test('should button render with their props', () => { 
    const {getByText} = render(<Button role='btn' className='btn' type='button'>Button</Button>)

    expect(getByText('Button')).toBeInTheDocument();
 })