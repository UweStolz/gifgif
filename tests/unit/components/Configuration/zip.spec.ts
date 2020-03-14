import zip from '@/components/Configuration/zip';

describe('Zip', () => {
  test('Generates a zip file', async () => {
    zip.createInstance();
    zip.addFileToZip('testFolder', 'testFile', new Blob());
    const zipResult: string = await zip.generateZip({ type: 'string' });
    const searchResult = zipResult.match('testFolder/testFile') as RegExpMatchArray;
    expect(searchResult[0]).toBe('testFolder/testFile');
  });
});
