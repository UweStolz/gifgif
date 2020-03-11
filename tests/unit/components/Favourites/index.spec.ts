import Favourites from '@/components/Favourites/index.vue';
import shallow from '../../../helper';

describe('Favourites', () => {
  it('renders properly', () => {
    const wrapper = shallow(Favourites);
    expect(wrapper.element).toMatchSnapshot();
  });
});
