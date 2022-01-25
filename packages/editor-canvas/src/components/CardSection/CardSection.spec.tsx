import { render } from '@testing-library/react';

import { CardSection } from './CardSection';

describe('CardItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardSection />);
    expect(baseElement).toBeTruthy();
  });
});
