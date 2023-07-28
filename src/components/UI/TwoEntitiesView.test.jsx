import React from 'react';
import { render, screen } from '@testing-library/react';

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
