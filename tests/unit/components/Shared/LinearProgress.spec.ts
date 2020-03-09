import LinearProgress from '@/components/shared/LinearProgress.vue';
import shallow from '../../../helper';

describe('LinearProgress.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(LinearProgress);
    expect(wrapper.element).toMatchSnapshot();
  });
});
