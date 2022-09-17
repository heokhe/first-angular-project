import { ToSymbolPipe } from './to-symbol.pipe';

describe('ToSymbolPipe', () => {
  let pipe: ToSymbolPipe;

  beforeEach(() => {
    pipe = new ToSymbolPipe();
  });

  it('should convert common operations to symbols', () => {
    expect(pipe.transform('add')).toEqual('+');
    expect(pipe.transform('multiply')).toEqual('*');
  });
  it('should skip transforming other inputs', () => {
    expect(pipe.transform('some other input')).toEqual('some other input');
  });
});
