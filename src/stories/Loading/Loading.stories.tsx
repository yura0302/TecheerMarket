import { Meta, StoryObj } from '@storybook/react';
import Loading from '../../components/Loading';

const meta: Meta<typeof Loading> = {
  title: 'Component/Loading',
  component: Loading,
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const Basic: Story = {};
