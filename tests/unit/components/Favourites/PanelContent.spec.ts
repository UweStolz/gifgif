import PanelContent from '@/components/Favourites/PanelContent.vue';
import Dialog from '@/components/Favourites/Dialog.vue';
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
    expect(wrapper.element).toMatchSnapshot();
  });
  it('Deletes selected GIF on event delete', async () => {
    const wrapper = shallow(PanelContent, {
      stubs: {
        Dialog,
      },
      propsData: {
        selectedIndex: 1,
        imageIds: ['id-1', 'id-2'],
        previewImages: ['previewImage1', 'previewImage2'],
        fullImages: ['fullImage1', 'fullImage2'],
      },
    });
    const dialog = wrapper.find(Dialog);
    dialog.vm.$emit('delete', { payload: 'gg-someId123' });
    await wrapper.vm.$nextTick();
    expect(wrapper).toHaveDispatched('removeGifData');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$props.imageIds.length).toBe(1);
  });

  it('Opens the dialog on click', async () => {
    const wrapper = shallow(PanelContent, {
      propsData: {
        imageIds: ['id-1', 'id-2'],
        previewImages: ['previewImage1', 'previewImage2'],
        fullImages: ['fullImage1', 'fullImage2'],
      },
    });
    const images = wrapper.findAll('#imageHover');
    expect(images.wrappers.length).toBe(2);
    images.wrappers[1].vm.$emit('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.selectedIndex).toBe(1);
  });
});
