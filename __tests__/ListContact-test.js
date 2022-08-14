/**
 * @format
 */

import 'react-native';
import React from 'react';
import ListContact from '../src/screens/ListContact';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<ListContact />);
});
