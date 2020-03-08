import Dialog from '@/components/Search/Dialog.vue';
import shallow from '../../../helper';

describe('Dialog.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(Dialog);
    expect(wrapper).toMatchSnapshot();
  });
});
