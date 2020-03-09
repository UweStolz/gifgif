import Toolbar from '@/components/Navigation/Toolbar.vue';
import shallow, { Vue, deepMount } from '../../../helper';

describe('Toolbar.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(Toolbar);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('changes the state of gifMode', async () => {
    const wrapper = deepMount(Toolbar);
    const button = wrapper.get('#tb-inactive-button');
    let gifModeState: string = '';
    wrapper.vm.$store.subscribe((mutation, state) => {
      gifModeState = mutation.payload;
    });
    button.trigger('click');
    await Vue.nextTick();
    expect(gifModeState).toBe('random');
  });
});
