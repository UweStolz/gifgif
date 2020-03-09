import Snackbar from '@/components/shared/Snackbar.vue';
import shallow from '../../../helper';

describe('Snackbar.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(Snackbar);
    expect(wrapper.element).toMatchSnapshot();
  });
});
