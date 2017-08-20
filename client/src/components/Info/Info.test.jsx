import React from 'react';
import renderer from 'react-test-renderer';
import Info from './Info';

it('matches a snapshot', () => {
  const component = renderer.create(
    <Info />
  );

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
})
