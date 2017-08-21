import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer'

global.fetch = require('jest-fetch-mock');

beforeEach(() => {
  fetch.mockResponse(
    JSON.stringify({
      londonHapiness: [
        { label: 'positive', value: 10 },
        { label: 'negative', value: 10 }
      ]
    })
  )
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('matches a snapshot', () => {
  const component = renderer.create(
    <App />
  )

  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
