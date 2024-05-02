import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './EditInfoModal.stories';
import { describe, test, expect } from 'vitest';

const { EmailModal, PasswordModal } = composeStories(stories);

describe('EditInfoModal snapshot 테스트', () => {
  test('EmailModal 테스트', () => {
    const rendered = render(<EmailModal />);
    expect(rendered.container).toMatchSnapshot();
  });

  test('PasswordModal 테스트', () => {
    const rendered = render(<PasswordModal />);
    expect(rendered.container).toMatchSnapshot();
  });
});
