declare global {
    namespace Tenor {
        interface Response extends Array<GIFObject> {
            [elem: number]: GIFObject;
        }
        interface GIFObject {
            created: number;
            hasaudio: boolean;
            id: string;
            media: GIFFormat[];
            tags: string[];
            shares: number;
            composite: any|null;
            title: string;
            itemurl: string;
            url: string;
        }
        interface MediaObject {
            preview: string;
            url: string;
            dims: number[]
            size: number;
        }
        interface GIFFormat {
            gif: MediaObject;
            mediumgif: MediaObject;
            tinygif: MediaObject;
            nanogif: MediaObject;
            mp4: MediaObject;
            loopedmp4: MediaObject;
            tinymp4: MediaObject;
            nanomp4: MediaObject;
            webm: MediaObject;
            tinywebm: MediaObject;
            nanowebm: MediaObject;
    }
    }
}

export { };
