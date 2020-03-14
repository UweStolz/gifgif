import Dialog from '@/components/Search/Dialog.vue';
import shallow, { actions } from '../../../helper';

describe('Dialog.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(Dialog, {
      propsData: {
        showDialog: false,
        fullImageData: 'http://someFullImage.webp',
        previewImageData: 'http://somePreviewImage.webp',
        imageId: 'ggid-123321',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Does not get data is there is no dialog', async () => {
    const wrapper = shallow(Dialog, {
      propsData: {
        showDialog: true,
        fullImageData: 'http://someFullImage.webp',
        previewImageData: 'http://somePreviewImage.webp',
        imageId: 'ggid-123321',
      },
    });
    wrapper.setProps({ showDialog: false });
    await wrapper.vm.$nextTick();
    expect(wrapper).not.toHaveDispatched('getGifData');
  });

  it('Get data if there is a dialog', async () => {
    const wrapper = shallow(Dialog, {
      propsData: {
        showDialog: false,
        fullImageData: 'http://someFullImage.webp',
        previewImageData: 'http://somePreviewImage.webp',
        imageId: 'ggid-123321',
      },
    });
    wrapper.setProps({ showDialog: true });
    await wrapper.vm.$nextTick();
    expect(wrapper).toHaveDispatched('getGifData');
    expect(wrapper.vm.$data.rating).toBe(0);
  });

  it('Get data if there is a dialog', async () => {
    actions.getGifData.mockImplementationOnce(async () => ({ rating: 1 }));
    const wrapper = shallow(Dialog, {
      propsData: {
        showDialog: false,
        fullImageData: 'http://someFullImage.webp',
        previewImageData: 'http://somePreviewImage.webp',
        imageId: 'ggid-123321',
      },
    });
    wrapper.setProps({ showDialog: true });
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve));
    expect(wrapper).toHaveDispatched('getGifData');
    expect(wrapper.vm.$data.rating).toBe(1);
  });

  it('Resets data and closes the dialog if clicked outside of it', async () => {
    const mockResetProp = jest.fn();
    const wrapper = shallow(Dialog, {
      methods: {
        resetProps: mockResetProp,
      },
      propsData: {
        showDialog: false,
        fullImageData: 'http://someFullImage.webp',
        previewImageData: 'http://somePreviewImage.webp',
        imageId: 'ggid-123321',
      },
    });
    wrapper.setProps({ showDialog: true });
    await wrapper.vm.$nextTick();
    const dialog = wrapper.find({ name: 'v-dialog' });
    dialog.vm.$emit('click:outside');
    await wrapper.vm.$nextTick();
    expect(mockResetProp).toHaveBeenCalled();
  });
});
