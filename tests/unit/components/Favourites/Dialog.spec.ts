import Dialog from '@/components/Favourites/Dialog.vue';
import CardActions from '@/components/shared/CardActions.vue';
import * as blobToImage from '@/util/imageHelper';
import shallow from '../../../helper';

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

  it('Input image gets converted in watch', async () => {
    const mockImageData = 'someImageData';
    jest.spyOn(blobToImage, 'default').mockImplementation(() => mockImageData);
    const wrapper = shallow(Dialog, {
      propsData: {
        showDialog: true,
        fullImageData: 'http://someFullImage.webp',
        previewImageData: 'http://somePreviewImage.webp',
        imageId: 'ggid-123321',
      },
    });
    wrapper.setProps({ fullImageData: new Blob(undefined, { type: 'image/webp' }) });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.imageData).toBe(mockImageData);
  });

  it('Input image doesnt get converted in watch', async () => {
    const mockImageData = 'http://imageData.webp';
    const wrapper = shallow(Dialog, {
      propsData: {
        showDialog: true,
        fullImageData: 'http://someFullImage.webp',
        previewImageData: 'http://somePreviewImage.webp',
        imageId: 'ggid-123321',
      },
    });
    wrapper.setProps({ fullImageData: mockImageData });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.imageData).toBe(mockImageData);
  });

  it('Watch does nothing if no data is present', async () => {
    const wrapper = shallow(Dialog, {
      propsData: {
        showDialog: true,
        fullImageData: 'http://someFullImage.webp',
        previewImageData: 'http://somePreviewImage.webp',
        imageId: 'ggid-123321',
      },
    });
    wrapper.setProps({ fullImageData: null });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.imageData).toBe('');
  });

  it('Event gets re-emitted', async () => {
    const wrapper = shallow(Dialog, {
      stubs: {
        'card-actions': CardActions,
      },
      propsData: {
        showDialog: true,
        fullImageData: 'http://someFullImage.webp',
        previewImageData: 'http://somePreviewImage.webp',
        imageId: 'ggid-123321',
      },
    });
    const cardActions = wrapper.findComponent(CardActions);
    cardActions.vm.$emit('delete', { payload: 'gg-someId123' });
    await wrapper.vm.$nextTick();
    expect(wrapper).toHaveEmitted('delete');
  });
});
