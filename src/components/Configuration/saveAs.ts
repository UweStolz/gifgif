import fileSaver, { FileSaverOptions } from 'file-saver';

export default function saveAs(data: string|Blob, filename?: string, options?: FileSaverOptions): void {
  fileSaver.saveAs(data, filename, options);
}
