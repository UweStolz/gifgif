import Footer from '@/components/Navigation/Footer.vue';
import shallow from '../../../helper';

describe('Footer.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(Footer);
    expect(wrapper.element).toMatchSnapshot();
  });
});
