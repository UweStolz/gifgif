import Translate from '@/components/Translate/index.vue';
import { VEmojiPicker } from 'v-emoji-picker';
import shallow, { actions } from '../../../helper';

describe('Translate', () => {
  it('renders properly', () => {
    const wrapper = shallow(Translate);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Gets translated GIF from input, when weirdness slider changes', async () => {
    const mockResponse = {
      data: {
        id: 'id-123',
        images: {
          fixed_width: {
            webp: 'http://fixedWidthUrl.webp',
          },
          original: {
            webp: 'http://imageUrl.webp',
            url: 'http://imageUrl.gif',
          },
        },

      },
    };
    fetchMock.resetMocks();
    const mockedFetch = fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Translate);
    const textField = wrapper.findComponent({ name: 'v-text-field' });
    textField.vm.$emit('input', 'testInput');
    await wrapper.vm.$nextTick();
    await wrapper.setData({ weirdnessSlider: 1 });
    await new Promise((resolve) => setTimeout(resolve));
    expect(mockedFetch).toHaveBeenCalledTimes(2);
    expect(wrapper).toHaveDispatched('getGifData');
    expect(wrapper.vm.$data.wasSuccessful).toBe(true);
    expect(wrapper.vm.$data.hasError).toBe(false);
  });

  it('Clears data if text field was cleared', async () => {
    const mockResponse = {
      data: {
        id: 'id-123',
        images: {
          fixed_width: {
            webp: 'http://fixedWidthUrl.webp',
          },
          original: {
            webp: 'http://imageUrl.webp',
            url: 'http://imageUrl.gif',
          },
        },

      },
    };
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(mockResponse));
    const mockClearTextField = jest.fn();
    const wrapper = shallow(Translate, {
      // Overwriting methods will be deprecated in the future
      methods: {
        clearTextField: mockClearTextField,
      },
    });
    const textField = wrapper.findComponent({ name: 'v-text-field' });
    textField.vm.$emit('input', 'testInput');
    await wrapper.vm.$nextTick();
    textField.vm.$emit('click:clear');
    await wrapper.vm.$nextTick();
    expect(mockClearTextField).toHaveBeenCalled();
  });

  it('Gets translated GIF on input', async () => {
    const mockResponse = {
      data: {
        id: 'id-123',
        images: {
          fixed_width: {
            webp: 'http://fixedWidthUrl.webp',
          },
          original: {
            webp: 'http://imageUrl.webp',
            url: 'http://imageUrl.gif',
          },
        },

      },
    };
    fetchMock.resetMocks();
    const mockedFetch = fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Translate);
    const textField = wrapper.findComponent({ name: 'v-text-field' });
    textField.vm.$emit('input', 'testInput');
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve));
    expect(mockedFetch).toHaveBeenCalled();
    expect(wrapper).toHaveDispatched('getGifData');
    expect(wrapper.vm.$data.wasSuccessful).toBe(true);
    expect(wrapper.vm.$data.hasError).toBe(false);
  });

  it('Get GIF with given emoji as input', async () => {
    const mockResponse = {
      data: {
        id: 'id-123',
        images: {
          fixed_width: {
            webp: 'http://fixedWidthUrl.webp',
          },
          original: {
            webp: 'http://imageUrl.webp',
            url: 'http://imageUrl.gif',
          },
        },

      },
    };
    fetchMock.resetMocks();
    const mockedFetch = fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Translate, {
      stubs: {
        Picker: VEmojiPicker,
      },
    });
    const textField = wrapper.findComponent({ name: 'v-text-field' });
    textField.vm.$emit('click:prepend-inner');
    await wrapper.vm.$nextTick();
    const picker = wrapper.get(VEmojiPicker);
    picker.vm.$emit('select', { data: ':-)' });
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve));
    expect(mockedFetch).toHaveBeenCalled();
    expect(wrapper).toHaveDispatched('getGifData');
    expect(wrapper.vm.$data.wasSuccessful).toBe(true);
    expect(wrapper.vm.$data.hasError).toBe(false);
  });

  it('Do not get GIF with emoji if input is too long', async () => {
    const mockResponse = {
      data: {
        id: 'id-123',
        images: {
          fixed_width: {
            webp: 'http://fixedWidthUrl.webp',
          },
          original: {
            webp: 'http://imageUrl.webp',
            url: 'http://imageUrl.gif',
          },
        },
      },
    };
    fetchMock.resetMocks();
    const mockedFetch = fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Translate, {
      stubs: {
        Picker: VEmojiPicker,
      },
    });
    const textField = wrapper.findComponent({ name: 'v-text-field' });
    textField.vm.$emit('input', '1234567891012131415161718');
    await wrapper.vm.$nextTick();
    textField.vm.$emit('click:prepend-inner');
    await wrapper.vm.$nextTick();
    const picker = wrapper.findComponent(VEmojiPicker);
    picker.vm.$emit('select', { data: ':-(' });
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve));
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(wrapper).toHaveDispatched('getGifData');
    expect(wrapper.vm.$data.wasSuccessful).toBe(true);
    expect(wrapper.vm.$data.hasError).toBe(false);
  });

  it('Resets the data if the input changes to none', async () => {
    const mockResponse = {
      data: {
        id: 'id-123',
        images: {
          fixed_width: {
            webp: 'http://fixedWidthUrl.webp',
          },
          original: {
            webp: 'http://imageUrl.webp',
            url: 'http://imageUrl.gif',
          },
        },

      },
    };
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Translate);
    let watchedValue;
    wrapper.vm.$watch('inputValue', (n) => {
      watchedValue = n;
    });
    const textField = wrapper.findComponent({ name: 'v-text-field' });
    textField.vm.$emit('input', 'testInput');
    await wrapper.vm.$nextTick();
    textField.vm.$emit('input', '');
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve));
    expect(watchedValue).toBe('');
  });

  it('Gets translated GIF on input, from fallback', async () => {
    actions.getGifData.mockResolvedValueOnce({ data: '123', rating: 1 });
    const mockResponse = {
      data: {
        id: 'id-123',
        images: {
          fixed_width: {
            webp: 'http://fixedWidthUrl.webp',
          },
          original: {
            webp: '',
            url: 'http://imageUrl.gif',
          },
        },

      },
    };
    fetchMock.resetMocks();
    const mockedFetch = fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Translate);
    const textField = wrapper.findComponent({ name: 'v-text-field' });
    textField.vm.$emit('input', 'testInput');
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve));
    expect(mockedFetch).toHaveBeenCalled();
    expect(wrapper).toHaveDispatched('getGifData');
    expect(wrapper.vm.$data.wasSuccessful).toBe(true);
    expect(wrapper.vm.$data.hasError).toBe(false);
    expect(wrapper.vm.$data.rating).toBe(1);
  });

  it('Catches error while getting translated GIF on input', async () => {
    const wrapper = shallow(Translate);
    const textField = wrapper.findComponent({ name: 'v-text-field' });
    textField.vm.$emit('input', 'testInput');
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve));
    expect(wrapper).toHaveDispatched('getGifData');
    expect(wrapper.vm.$data.wasSuccessful).toBe(false);
    expect(wrapper.vm.$data.hasError).toBe(true);
  });

  it('Do not get translated gif if input is < 3', async () => {
    const wrapper = shallow(Translate);
    const textField = wrapper.findComponent({ name: 'v-text-field' });
    textField.vm.$emit('input', 'ab');
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve));
    expect(wrapper.vm.$data.translatedGif).toBe('');
    expect(wrapper.vm.$data.wasSuccessful).toBe(false);
  });
});
