import JSZip, { JSZipGeneratorOptions } from 'jszip';

let zip: JSZip;

export default {
  createInstance() {
    zip = new JSZip();
  },

  addFileToZip(folderName: string, fileName: string, file: Blob): void {
    zip.folder(folderName).file(fileName, file);
  },

  async generateZip(options: JSZipGeneratorOptions, onUpdate?: any | undefined): Promise<any> {
    return zip.generateAsync(options, onUpdate);
  },
};
