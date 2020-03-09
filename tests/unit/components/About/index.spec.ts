import About from '@/components/About/index.vue';
import shallow from '../../../helper';

describe('About.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(About);
    expect(wrapper.element).toMatchSnapshot();
  });
});
