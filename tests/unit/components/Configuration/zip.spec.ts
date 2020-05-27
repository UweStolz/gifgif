import zip from '@/components/Configuration/zip';

describe('Zip', () => {
  test('Generates a zip file', async () => {
    zip.createInstance();
    zip.addFileToZip('testFolder', 'testFile', new Blob());
    const zipResult: Blob = await zip.generateZip({ type: 'blob' });
    expect(zipResult.size > 0).toBe(true);
  });
});
