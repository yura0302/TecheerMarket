import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './ProductForm.stories';
import { describe, test, expect } from 'vitest';

const composedStories = composeStories(stories);

describe('ProductForm snapshot 테스트', () => {
  Object.entries(composedStories).forEach(([storyName, StoryComponent]) => {
    test(`${storyName} 스냅샷 테스트`, () => {
      const rendered = render(<StoryComponent />);
      expect(rendered.container).toMatchSnapshot();
    });
  });
});
