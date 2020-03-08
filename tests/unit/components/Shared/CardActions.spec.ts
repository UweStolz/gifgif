import CardActions from '@/components/shared/CardActions.vue';
import shallow from '../../../helper';

describe('CardActions.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(CardActions);
    expect(wrapper).toMatchSnapshot();
  });
});
