import Configuration from '@/components/Configuration/index.vue';
import shallow, { deepMount, Vue, store } from '../../../helper';
// import { saveAs } from 'file-saver';
// import JSZip from 'jszip';

describe('Configuration.vue', () => {
  it('renders properly', () => {
    const wrapper = shallow(Configuration);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('changes the state of fullImageMode', async () => {
    const wrapper = deepMount(Configuration);
    const vSwitch = wrapper.find({ name: 'v-switch' });
    const selectionControl = vSwitch.get('.v-input--selection-controls__ripple');
    let fullImageModeState: boolean = false;
    wrapper.vm.$store.subscribe((mutation) => {
      fullImageModeState = mutation.payload;
    });
    selectionControl.trigger('click');
    await Vue.nextTick();
    expect(fullImageModeState).toBe(true);
  });

  it('Show deletion modal', async () => {
    // Hide vuetify warning:
    // [Vuetify] Unable to locate target [data-app]
    console.warn = jest.fn();
    const wrapper = deepMount(Configuration);
    store.state.gifCount = 3;
    await Vue.nextTick();
    const deletionButton = wrapper.get({ name: 'v-btn' });
    deletionButton.trigger('click');
    await Vue.nextTick();
    const dialog = wrapper.findAll({ name: 'v-alert' });
    expect(wrapper.vm.$data.showDialog).toBe(true);
    expect(dialog.wrappers[1].text()).toBe('Do you really want to delete your saved GIFs?');
  });

  it('Delete all saved Gifs', async () => {
    const wrapper = deepMount(Configuration);
    store.state.gifCount = 3;
    await Vue.nextTick();
    const deletionButton = wrapper.get({ name: 'v-btn' });
    deletionButton.trigger('click');
    await Vue.nextTick();
    const buttonInModal = wrapper.find('#c-modal-del-btn');
    buttonInModal.trigger('click');
    await Vue.nextTick();
    expect(wrapper).toHaveDispatched('removeCompleteGifData');
    expect(wrapper.vm.$data.showDialog).toBe(false);
  });
});
