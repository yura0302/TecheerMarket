import type { Preview } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { getClient } from './../src/queryClient';
import '../src/GlobalStyle.tsx';

export const decorators = [
  (Story) => (
    <MemoryRouter>
      <QueryClientProvider client={getClient()}>
        <Story />
      </QueryClientProvider>
    </MemoryRouter>
  ),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      element: '#root',
      options: {},
      manual: false,
    },
  },
};

export default preview;
