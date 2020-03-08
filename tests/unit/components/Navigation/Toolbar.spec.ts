import Toolbar from '@/components/Navigation/Toolbar.vue';
import shallow from '../../../helper';

describe('Toolbar.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(Toolbar);
    expect(wrapper).toMatchSnapshot();
  });
});
