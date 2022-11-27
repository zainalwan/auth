import { dataSource } from '../src/data-source';

describe('postgres', () => {
  it('should connected', async () => {
    await dataSource.initialize();
    expect(dataSource.isInitialized).toBe(true);
    await dataSource.destroy();
  });
});
