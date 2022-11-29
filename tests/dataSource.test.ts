import { dataSource } from '../src/dataSource';

describe('postgres', () => {
  it('should connected', async () => {
    await dataSource.initialize();
    expect(dataSource.isInitialized).toBe(true);
    await dataSource.destroy();
  });
});
