import CardActions from '@/components/shared/CardActions.vue';
import shallow from '../../../helper';

describe('CardActions.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(CardActions, {
      propsData: {
        imageData: 'http://someImage.webp',
        imageId: 'ggid-1',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
