import Translate from '@/components/Translate/index.vue';
import shallow from '../../../helper';

describe('Translate.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(Translate);
    expect(wrapper).toMatchSnapshot();
  });
});
