import Configuration from '@/components/Configuration/index.vue';
import shallow from '../../../helper';

describe('Configuration.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(Configuration);
    expect(wrapper.element).toMatchSnapshot();
  });
});
