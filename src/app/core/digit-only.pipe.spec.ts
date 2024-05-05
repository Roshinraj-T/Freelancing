import { DigitOnlyPipe } from './digit-only.pipe';

describe('DigitOnlyPipe', () => {
  it('create an instance', () => {
    const pipe = new DigitOnlyPipe();
    expect(pipe).toBeTruthy();
  });
});
