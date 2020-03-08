import About from '@/components/About/index.vue';
import shallow from '../../../helper';

describe('About.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(About, {
      stubs: ['router-link'],
    });
    expect(wrapper).toMatchSnapshot();
  });
});
