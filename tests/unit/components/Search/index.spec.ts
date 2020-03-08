import Search from '@/components/Search/index.vue';
import shallow from '../../../helper';

describe('Search.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(Search);
    expect(wrapper).toMatchSnapshot();
  });
});
