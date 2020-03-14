import CardActions from '@/components/shared/CardActions.vue';
import shallow, { store } from '../../../helper';

describe('CardActions.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(CardActions, {
      propsData: {
        imageData: 'http://someImage.webp',
        imageId: 'ggid-1',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Do not transform id', () => {
    const wrapper = shallow(CardActions, {
      propsData: {
        imageData: 'http://someImage.webp',
        imageId: 'ggid-1234',
      },
    });
    expect(wrapper.vm.$data.propImageId).toBe('ggid-1234');
  });

  it('Transform id with prefix', () => {
    const wrapper = shallow(CardActions, {
      propsData: {
        imageData: 'http://someImage.webp',
        imageId: '1234',
      },
    });
    expect(wrapper.vm.$data.propImageId).toBe('ggid-1234');
  });

  it('Do not transform, if there is no id', () => {
    const wrapper = shallow(CardActions, {
      propsData: {
        imageData: 'http://someImage.webp',
        imageId: '',
      },
    });
    expect(wrapper.vm.$data.propImageId).toBe('');
  });

  it('Saves the given GIF', async () => {
    const saveImageMock = jest.fn();
    const wrapper = shallow(CardActions, {
      methods: {
        saveImage: saveImageMock,
      },
      propsData: {
        imageData: 'http://someImage.webp',
        imageId: 'ggid-1234',
      },
    });
    const downloadButton = wrapper.get('#s-ca-download-btn');
    downloadButton.vm.$emit('click');
    await wrapper.vm.$nextTick();
    expect(saveImageMock).toHaveBeenCalled();
  });

  it('Removes the given GIF', async () => {
    const wrapper = shallow(CardActions, {
      propsData: {
        imageData: 'http://someImage.webp',
        imageId: 'ggid-1234',
      },
    });
    const removeButton = wrapper.get('#s-ca-remove-btn');
    removeButton.vm.$emit('click');
    await wrapper.vm.$nextTick();
    expect(wrapper).toHaveDispatched('removeGifData');
    expect(wrapper).toHaveEmitted('delete');
  });

  it('Updates the given GIF rating', async () => {
    const wrapper = shallow(CardActions, {
      propsData: {
        imageData: 'http://someImage.webp',
        imageId: 'ggid-1234',
        showRating: true,
      },
    });
    const rating = wrapper.get('#s-ca-rating');
    rating.vm.$emit('input');
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve));
    expect(wrapper).toHaveDispatched('setGifData');
  });

  it('Updates the given GIF rating, in fullImageMode', async () => {
    fetchMock.resetMocks();
    const mockOfFetch = fetchMock.mockResponse(async () => 'someImage.webp');
    store.state.fullImageMode = true;
    const wrapper = shallow(CardActions, {
      propsData: {
        imageData: 'http://someImage.webp',
        imageId: 'ggid-1234',
        showRating: true,
      },
    });
    const rating = wrapper.get('#s-ca-rating');
    rating.vm.$emit('input');
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve));
    expect(wrapper).toHaveDispatched('setGifData');
    expect(mockOfFetch).toBeCalledTimes(2);
  });
});
