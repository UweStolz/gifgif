import Frontpage from '@/components/Frontpage.vue';
import shallow from '../../helper';

describe('Frontpage.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(Frontpage);
    expect(wrapper).toMatchSnapshot();
  });
});
