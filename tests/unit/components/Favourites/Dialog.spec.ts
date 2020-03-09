import Dialog from '@/components/Favourites/Dialog.vue';
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
});
