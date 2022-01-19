import { render } from '@testing-library/react';

import EditorCanvas from './EditorCanvas';

describe('EditorCanvas', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditorCanvas />);
    expect(baseElement).toBeTruthy();
  });
});
