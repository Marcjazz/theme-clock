import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/Dark Mode/i)
  expect(linkElement).toBeInTheDocument()
  fireEvent(
    linkElement,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: false,
    })
  )
  expect(linkElement.innerHTML).toBe('Light Mode')
})
