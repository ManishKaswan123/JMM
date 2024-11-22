import {render, screen} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import {MasterLayout} from '../MasterLayout'

const MockLinkAndI18 = () => {
  return (
    <BrowserRouter>
      <MasterLayout />
    </BrowserRouter>
  )
}

test('Check for theme provider exist or not', () => {
  render(<MockLinkAndI18 />) // Render the Component
  const input = screen.getByTestId(/master/i)
  expect(input).toBeInTheDocument()
})
