/* eslint-disable camelcase */
import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }

  interface MergedGifLists extends Array<MergedGifListObject> {
    [index: number]: MergedGifListObject;
  }
  interface MergedGifListObject {
    id: string;
    url: string;
    previewUrl: string;
  }

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

  namespace Giphy {
    interface Response extends Array<GIFObject> {
      [elem: number]: GIFObject;
    }
    interface GIFObject {
      type: string
      id: string
      slug: string
      url: string
      bitly_gif_url: string
      bitly_url: string
      embed_url: string
      username: string
      source: string
      rating: string
      caption: string
      content_url: string
      source_tld: string
      source_post_url: string
      import_datetime: string
      trending_datetime: string
      images: ImageObject
      meta: MetaObject
      title: string
    }

    interface ImageObject {
      fixed_height: {
        url: string
        width: string
        height: string
        size: string
        mp4: string
        mp4_size: string
        webp: string
        webp_size: string
      }
      fixed_height_still: {
        url: string
        width: string
        height: string
      }
      fixed_height_downsampled: {
        url: string
        width: string
        height: string
        size: string
        webp: string
        webp_size: string
      }
      fixed_width: {
        url: string
        width: string
        height: string
        size: string
        mp4: string
        mp4_size: string
        webp: string
        webp_size: string
      }
      fixed_width_still: {
        url: string
        width: string
        height: string
      }
      fixed_width_downsampled: {
        url: string
        width: string
        height: string
        size: string
        webp: string
        webp_size: string
      }
      fixed_height_small: {
        url: string
        width: string
        height: string
        size: string
        webp: string
        webp_size: string
      }
      fixed_height_small_still: {
        url: string
        width: string
        height: string
      }
      fixed_width_small: {
        url: string
        width: string
        height: string
        size: string
        webp: string
        webp_size: string
      }
      fixed_width_small_still: {
        url: string
        width: string
        height: string
      }
      downsized: {
        url: string
        width: string
        height: string
        size: string
      }
      downsized_still: {
        url: string
        width: string
        height: string
      }
      downsized_large: {
        url: string
        width: string
        height: string
        size: string
      }
      original: {
        url: string
        width: string
        height: string
        size: string
        frames: string
        mp4: string
        mp4_size: string
        webp: string
        webp_size: string
      }
      original_still: {
        url: string
        width: string
        height: string
      }
      preview: {
        height: string;
        mp4: string;
        mp4_size: string;
        width: string;
      }
      preview_gif: {
        height: string;
        size: string;
        url: string;
        width: string;
      }
      looping: {
        mp4: string;
        mp4_size: string;
      }
      w480_still: {
        url: string;
        width: string;
        height: string;
      }
    }

    interface MetaObject {
      msg: string
      status: number
      response_id: string
    }

    interface PaginationObject {
      offset: number
      total_count: number
      count: number
    }

    interface UserObject {
      avatar_url: string
      banner_url: string
      profile_url: string
      username: string
      display_name: string
      twitter: string
    }

    interface ChildPackObject {
      id: number
      parent: number
      type: 'community' | 'editorial'
      slug: string
      display_name: string
      short_display_name: string
      description: string
      banner_image: string
      has_children: boolean
      user: UserObject
      featured_gif: GIFObject
    }

    interface StickerPackMetadataObject {
      id: number
      display_name: string
      slug: string
      content_type: string
      short_display_name: string
      description: string
      banner_image: string
      has_children: boolean
      user: UserObject
      featured_gif: GIFObject
      tags: {tag: string; rank: number}[]
      ancestors: {
        id: number
        slug: string
        display_name: string
        short_display_name: string
        featured_gif_id: string
        parent: string
        has_children: boolean
        banner_image: string
      }[]
    }

  }
}
