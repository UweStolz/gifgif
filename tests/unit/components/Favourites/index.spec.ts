import Favourites from '@/components/Favourites/index.vue';
import * as blobToImage from '@/util/imageHelper';
import shallow, { actions } from '../../../helper';

describe('Favourites', () => {
  it('renders properly', () => {
    const wrapper = shallow(Favourites);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Display no data if there is none', async () => {
    const wrapper = shallow(Favourites);
    await wrapper.vm.$nextTick();
    expect(wrapper).toHaveDispatched('getAllData');
    expect(wrapper.vm.$data.isDataAvailable).toBe(false);
  });

  it('Processes data, with previews as Strings', async () => {
    actions.getAllData.mockResolvedValueOnce(
      {
        values: [
          { rating: 1, image: 'image1.webp', preview: 'preview1.webp' },
          { rating: 2, image: 'image2.webp', preview: 'preview2.webp' },
          { rating: 10, image: 'image3.webp', preview: 'preview3.webp' },
        ],
        keys: ['key-1', 'key-2', 'key-3'],
      },
    );
    const wrapper = shallow(Favourites);
    await new Promise((resolve) => setTimeout(resolve));
    expect(wrapper).toHaveDispatched('getAllData');
    expect(wrapper.vm.$data.isDataAvailable).toBe(true);
    expect(wrapper.vm.$data.data.previewUrl[2].images[0]).toBe('image2.webp');
  });
  it('Processes data, with a preview as blob', async () => {
    jest.spyOn(blobToImage, 'default').mockImplementation(() => 'someImage.webp');
    actions.getAllData.mockResolvedValueOnce(
      {
        values: [
          { rating: 1, image: 'image1.webp', preview: new Blob() },
        ],
        keys: ['key-1'],
      },
    );
    const wrapper = shallow(Favourites);
    await new Promise((resolve) => setTimeout(resolve));
    expect(wrapper).toHaveDispatched('getAllData');
    expect(wrapper.vm.$data.isDataAvailable).toBe(true);
    expect(wrapper.vm.$data.data.previewUrl[1].previews[0]).toBe('someImage.webp');
  });
});
