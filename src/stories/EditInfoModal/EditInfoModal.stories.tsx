import EditInfoModal from '@/components/EditInfoModal';
import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/test';

const meta: Meta<typeof EditInfoModal> = {
  title: 'Component/EditInfoModal',
  component: EditInfoModal,
};

export default meta;

type Story = StoryObj<typeof EditInfoModal>;

export const EmailModal: Story = {
  args: {
    type: 'email',
    updateInfo: () => alert('이메일 변경 완료!'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const label = canvas.getByText('변경할 이메일');
    await expect(label).toBeInTheDocument();

    const input = canvas.getAllByRole('textbox')[0];
    await userEvent.type(input, 'test@test.com', { delay: 200 });
    await expect(input).toHaveValue('test@test.com');

    const updateButton = canvas.getByRole('button', { name: '변경하기' });
    await userEvent.click(updateButton, { delay: 200 });
  },
};

export const PasswordModal: Story = {
  args: {
    type: 'password',
    updateInfo: () => alert('비밀번호 변경 완료!'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const label = canvas.getByText('변경할 비밀번호');
    await expect(label).toBeInTheDocument();

    const input = canvas.getByTestId('password');
    await userEvent.type(input, 'test1234', { delay: 200 });
    await expect(input).toHaveValue('test1234');

    const updateButton = canvas.getByRole('button', { name: '변경하기' });
    await userEvent.click(updateButton, { delay: 200 });
  },
};
