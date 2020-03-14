import Drawer from '@/components/Navigation/Drawer.vue';
import shallow, { store } from '../../../helper';

describe('Drawer.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(Drawer);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Set local gifCount to value from state', async () => {
    const wrapper = shallow(Drawer);
    store.state.gifCount = 3;
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.gifCount).toBe(3);
  });
});
