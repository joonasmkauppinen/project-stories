import { render } from '@testing-library/react';

import CardItem from './CardItem';

describe('CardItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardItem />);
    expect(baseElement).toBeTruthy();
  });
});
