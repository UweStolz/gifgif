import Empty from '@/components/Favourites/Empty.vue';
import shallow from '../../../helper';

describe('Empty.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(Empty);
    expect(wrapper.element).toMatchSnapshot();
  });
});
