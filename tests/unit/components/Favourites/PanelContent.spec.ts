import PanelContent from '@/components/Favourites/PanelContent.vue';
import shallow from '../../../helper';

describe('PanelContent.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(PanelContent);
    expect(wrapper).toMatchSnapshot();
  });
});
