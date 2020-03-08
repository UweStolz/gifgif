import Drawer from '@/components/Navigation/Drawer.vue';
import shallow from '../../../helper';

describe('Drawer.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(Drawer);
    expect(wrapper).toMatchSnapshot();
  });
});
