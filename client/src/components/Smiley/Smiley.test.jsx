import React from 'react';
import renderer from 'react-test-renderer';
import Smiley from './Smiley';

it('matches a snapshot', () => {
  const component = renderer.create(
    <Smiley />
  );

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
