import Frontpage from '@/components/Frontpage.vue';
import shallow, { store, fetchMock } from '../../helper';

describe('Frontpage', () => {
  it('renders properly', async () => {
    const mockResponse = {
      data:
      {
        id: 'id-123',
        images: {
          original: {
            webp: 'http://image.webp',
          },
          fixed_width: {
            webp: 'http://preview.webp',
          },
        },
      },
    };
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Frontpage);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Do not update if random GIF yields an error', async () => {
    store.state.gifMode = 'random';
    const mockResponse = {
      data:
      {
        id: '',
        images: {
          original: {
            webp: 'http://image.webp',
          },
          fixed_width: {
            webp: 'http://preview.webp',
          },
        },
      },
    };
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Frontpage);
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve));
    expect(wrapper).not.toHaveDispatched('getGifData');
  });

  it('Get trending GIFs on mount', async () => {
    store.state.gifMode = 'trending';
    const mockResponse = {
      data: [
        {
          id: 'id-123',
          images: {
            original: {
              webp: 'http://image.webp',
            },
            fixed_width: {
              webp: 'http://preview.webp',
            },
          },
        },
      ],
    };
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Frontpage);
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve));
    const mockRandomGifObj = [{ id: 'id-123', previewUrl: 'http://preview.webp', url: 'http://image.webp' }];
    expect(wrapper.vm.$data.gifsList).toStrictEqual(mockRandomGifObj);
    expect(wrapper).toHaveDispatched('getGifData');
  });

  it('Get trending GIFs on mount, with fallback', async () => {
    store.state.gifMode = 'trending';
    const mockResponse = {
      data: [
        {
          id: 'id-123',
          images: {
            original: {
              webp: '',
              url: 'http://image.gif',
            },
            fixed_width: {
              webp: 'http://preview.webp',
            },
          },
        },
      ],
    };
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Frontpage);
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve));
    const mockRandomGifObj = [{ id: 'id-123', previewUrl: 'http://preview.webp', url: 'http://image.gif' }];
    expect(wrapper.vm.$data.gifsList).toStrictEqual(mockRandomGifObj);
    expect(wrapper).toHaveDispatched('getGifData');
  });

  it('Get random GIF on mount', async () => {
    store.state.gifMode = 'random';
    const mockResponse = {
      data:
      {
        id: 'id-123',
        images: {
          original: {
            webp: 'http://image.webp',
          },
          fixed_width: {
            webp: 'http://preview.webp',
          },
        },
      },
    };
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Frontpage);
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve));
    const mockRandomGifObj = [{ id: 'id-123', previewUrl: 'http://preview.webp', url: 'http://image.webp' }];
    expect(wrapper.vm.$data.gifsList).toStrictEqual(mockRandomGifObj);
    expect(wrapper).toHaveDispatched('getGifData');
  });
});
