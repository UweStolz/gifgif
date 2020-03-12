import JSZip, { JSZipGeneratorOptions } from 'jszip';

const zip = new JSZip();

export default {
  addFileToZip(folderName: string, fileName: string, file: Blob): void {
    zip.folder(folderName).file(fileName, file);
  },

  async generateZip(options: JSZipGeneratorOptions, onUpdate?: any | undefined): Promise<any> {
    return zip.generateAsync(options, onUpdate);
  },
};
