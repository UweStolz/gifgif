import PanelContent from '@/components/Favourites/PanelContent.vue';
import shallow from '../../../helper';

describe('PanelContent.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(PanelContent, {
      propsData: {
        imageIds: ['id-1', 'id-2'],
        previewImages: ['previewImage1', 'previewImage2'],
        fullImages: ['fullImage1', 'fullImage2'],
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
