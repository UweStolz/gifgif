import JSZip, { JSZipGeneratorOptions } from 'jszip';

let zip: JSZip;

export default {
  createInstance(): void {
    zip = new JSZip();
  },

  addFileToZip(folderName: string, fileName: string, file: Blob): void {
    const jszip = zip.folder(folderName);
    if (jszip) {
      jszip.file(fileName, file);
    }
  },

  async generateZip(options: JSZipGeneratorOptions, onUpdate?: any | undefined): Promise<any> {
    return zip.generateAsync(options, onUpdate);
  },
};
