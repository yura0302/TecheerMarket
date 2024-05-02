import EditInfoModal from '@/components/EditInfoModal';
import { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { userEvent, within, waitFor } from '@storybook/testing-library';

const meta: Meta<typeof EditInfoModal> = {
  title: 'Component/EditInfoModal',
  component: EditInfoModal,
};

export default meta;

type Story = StoryObj<typeof EditInfoModal>;

export const EmailModal: Story = {
  args: {
    openModal: true,
    type: 'email',
    updateInfo: () => alert('이메일 변경 완료!'),
  },
};

export const PasswordModal: Story = {
  args: {
    openModal: true,
    type: 'password',
    updateInfo: () => alert('비밀번호 변경 완료!'),
  },
};
