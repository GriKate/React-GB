import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import SubmitButton from './SubmitButton';

describe('SubmitButton', () => {
  it('render SubmitButton component', () => {
    render(<SubmitButton>Send message</SubmitButton>);
  });

  it('render with snapshot', () => {
    const { asFragment } = render(<SubmitButton>Send message</SubmitButton>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('render component with button text', () => {
    render(<SubmitButton>Send message</SubmitButton>);
    expect(screen.getByText(/Send message/)).toBeInTheDocument();
  });

  it('render many components', () => {
    render(
      <>
        <SubmitButton>Add Chat</SubmitButton>
        <SubmitButton>Send message</SubmitButton>
        <SubmitButton>Get Idea!</SubmitButton>
      </>,
    );
    expect(screen.queryAllByRole('button').length).toBe(3);
  });

  it('is button disabled', () => {
    render(<SubmitButton disabled>Send message</SubmitButton>);
    expect(screen.getByText(/Send message/)).toBeDisabled();
  });

  it('is button have style color: black', () => {
    render(<SubmitButton disabled>Send message</SubmitButton>);
    expect(screen.getByText(/Send message/)).toHaveStyle({ color: 'black' });
  });

  // it('button click with userEvent', async () => {
  //   const fakeHandler = jest.fn();

  //   render(<SubmitButton click={fakeHandler}>Send message</SubmitButton>);

  //   // кликаем джестом по кнопке
  //   await userEvent.click(screen.getByText(/Send message/));
  //   // ожидаем, что метод fakeHandler был вызван 1 раз
  //   expect(fakeHandler).toHaveBeenCalledTimes(1);
  // });

  // it('timeout', async () => {
  //   const mockHandler = jest.fn();
  //   render(
  //     <SubmitButton click={() => setTimeout(mockHandler, 1000)}>
  //       Send message
  //     </SubmitButton>,
  //   );
  //   await userEvent.click(screen.getByText(/Send message/));
  //   await waitFor(() => expect(mockHandler).toHaveBeenCalledTimes(1), {
  //     timeout: 1500,
  //   });
  // });

  it('checkbox test', async () => {
    const onChange = jest.fn();
    render(<input type="checkbox" onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox');
    await userEvent.dblClick(checkbox);

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(checkbox).not.toBeChecked();
  });
});
