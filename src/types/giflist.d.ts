declare global {
      interface BuiltGifLists extends Array<BuiltGifListObject> {
    [index: number]: BuiltGifListObject;
  }
  interface BuiltGifListObject {
    id: string;
    url: string;
    previewUrl: string;
  }
}

export { };
