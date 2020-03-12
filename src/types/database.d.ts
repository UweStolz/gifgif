import { DBSchema } from 'idb';

declare global {
    namespace Database {
        interface GifGif extends DBSchema {
            gifdata: {
                key: string;
                value: GifData;
            };
            configs: {
                key: string;
                value: boolean|string|number;
            }
        }

        type GifData = {
            rating: number;
      image: Blob|string;
      preview: Blob | string;
    }

    type GifStore = {
        values: GifData[];
        keys: string[];
    }
    type ConfigStore = {
        values: (boolean|string|number)[];
        keys: string[];
    }
}
}
