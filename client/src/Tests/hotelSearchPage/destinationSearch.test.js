// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import DestinationSearch from '../../searchBar/destinationSearch/destinationSearch.js';
// import destinations from '../../searchBar/destinationSearch/destinations.json';

// // Mock the FontAwesomeIcon component
// jest.mock('@fortawesome/react-fontawesome', () => ({
//   FontAwesomeIcon: () => <span>Icon</span>,
// }));

// describe('DestinationSearch Component', () => {
//   let setQueryMock, setDestinationIdMock;

//   beforeEach(() => {
//     setQueryMock = jest.fn();
//     setDestinationIdMock = jest.fn();
//   });

//   test('renders input field with placeholder', () => {
//     render(
//       <DestinationSearch 
//         query="" 
//         setQuery={setQueryMock} 
//         setDestinationId={setDestinationIdMock} 
//       />
//     );

//     const inputElement = screen.getByPlaceholderText('Where to?');
//     expect(inputElement).toBeInTheDocument();
//   });

//   test('displays suggestions when input value matches destinations', () => {
//     render(
//       <DestinationSearch 
//         query="Ba" 
//         setQuery={setQueryMock} 
//         setDestinationId={setDestinationIdMock} 
//       />
//     );

//     const inputElement = screen.getByPlaceholderText('Where to?');
//     fireEvent.change(inputElement, { target: { value: 'Ba' } });

//     const suggestionItem = screen.getByText('Bali, Indonesia');
//     expect(suggestionItem).toBeInTheDocument();
//   });

//   test('updates query when a suggestion is clicked', () => {
//     render(
//       <DestinationSearch 
//         query="Ba" 
//         setQuery={setQueryMock} 
//         setDestinationId={setDestinationIdMock} 
//       />
//     );

//     const inputElement = screen.getByPlaceholderText('Where to?');
//     fireEvent.change(inputElement, { target: { value: 'Ba' } });

//     const suggestionItem = screen.getByText('Bali, Indonesia');
//     fireEvent.click(suggestionItem);

//     expect(setQueryMock).toHaveBeenCalledWith('Bali, Indonesia');
//     expect(setDestinationIdMock).toHaveBeenCalledWith('WP3Z');
//   });

//   test('shows no suggestions when input is empty', () => {
//     render(
//       <DestinationSearch 
//         query="" 
//         setQuery={setQueryMock} 
//         setDestinationId={setDestinationIdMock} 
//       />
//     );

//     const inputElement = screen.getByPlaceholderText('Where to?');
//     fireEvent.focus(inputElement);

//     const suggestionList = screen.queryByRole('list');
//     expect(suggestionList).not.toBeInTheDocument();
//   });

//   test('shows suggestions when input is focused and query is not empty', () => {
//     render(
//       <DestinationSearch 
//         query="Ro" 
//         setQuery={setQueryMock} 
//         setDestinationId={setDestinationIdMock} 
//       />
//     );

//     const inputElement = screen.getByPlaceholderText('Where to?');
//     fireEvent.focus(inputElement);

//     const suggestionItem = screen.getByText('Rome, Italy');
//     expect(suggestionItem).toBeInTheDocument();
//   });

//   test('filters suggestions based on input value', () => {
//     render(
//       <DestinationSearch 
//         query="Ro" 
//         setQuery={setQueryMock} 
//         setDestinationId={setDestinationIdMock} 
//       />
//     );

//     const inputElement = screen.getByPlaceholderText('Where to?');
//     fireEvent.change(inputElement, { target: { value: 'Ro' } });

//     const suggestionItem = screen.getByText('Rome, Italy');
//     expect(suggestionItem).toBeInTheDocument();

//     const suggestionNotPresent = screen.queryByText('Bali, Indonesia');
//     expect(suggestionNotPresent).not.toBeInTheDocument();
//   });
// });
