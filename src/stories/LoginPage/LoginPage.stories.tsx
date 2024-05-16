import { Meta, StoryObj } from '@storybook/react';
import Login from '@/pages/LogIn';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/test';

const meta: Meta<typeof Login> = {
  title: 'Page/Login',
  component: Login,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Login>;

export const Template: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getAllByRole('textbox')[0];
    await userEvent.type(emailInput, 'test@test.com', { delay: 100 });

    const passwordInput = canvas.getByPlaceholderText('비밀번호');
    await userEvent.type(passwordInput, 'test1234', { delay: 100 });

    const loginButton = canvas.getByRole('button', { name: '로그인' });
    await expect(loginButton).toBeEnabled();

    const signUpButton = canvas.getByRole('button', { name: '회원가입' });
    await expect(signUpButton).toBeInTheDocument();
  },
};
