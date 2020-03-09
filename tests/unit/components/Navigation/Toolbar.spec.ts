import Toolbar from '@/components/Navigation/Toolbar.vue';
import shallow, { Vue, deepMount } from '../../../helper';

describe('Toolbar.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(Toolbar);
    expect(wrapper.element).toMatchSnapshot();
  });

  it.skip('changes the GifMode', async () => {
    const wrapper = deepMount(Toolbar);
    const button = wrapper.get('#tb-inactive-button'); // .find({ name: 'v-btn' }).find('#tb-inactive-button');
    wrapper.vm.$store.subscribe((mutation, state) => {
      console.log(JSON.stringify(mutation, undefined, 2));
      console.log(JSON.stringify(state, undefined, 2));
    });

    button.trigger('click');
    await Vue.nextTick();
    const gifModeState = wrapper.vm.$store.state.gifMode;
    expect(gifModeState).toBe('random');
  });
});
