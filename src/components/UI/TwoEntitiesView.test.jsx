import React from 'react';
import { render } from '@testing-library/react'; //screen

import '@testing-library/jest-dom';

import TwoEntitiesView from './TwoEntitiesView';

describe('TwoEntitiesView', () => {
  it('render TwoEntitiesView component', () => {
    render(
      <>
        <TwoEntitiesView>
          <div>
            <h3>Name</h3>
            <p>Text</p>
          </div>
        </TwoEntitiesView>
      </>,
    );
  });
});
