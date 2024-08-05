import { render, screen } from '@testing-library/react';
import ListBlog from './ListBlog';

test('server not working', () => {
  
})

test('renders learn react link', () => {
  render(<ListBlog />);
  const linkElement = screen.getByText(/Error in fetching data .../i);
  expect(linkElement).toBeInTheDocument();
});
