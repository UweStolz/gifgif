import Dialog from '@/components/Favourites/Dialog.vue';
import shallow from '../../../helper';

describe('Dialog.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(Dialog);
    expect(wrapper).toMatchSnapshot();
  });
});
