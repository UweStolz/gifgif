import Configuration from '@/components/Configuration/index.vue';
import fileSaver from 'file-saver';
import zip from '@/components/Configuration/zip';
import shallow, {
  deepMount, Vue, store, actions,
} from '../../../helper';

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

  it('Generate Zip', async () => {
    jest.spyOn(zip, 'addFileToZip').mockImplementationOnce(() => {});
    jest.spyOn(zip, 'generateZip').mockImplementationOnce(async () => new Blob());
    const mockData = {
      values: [
        { image: new Blob(undefined, { type: 'image/webp' }), rating: 1 },
        { image: new Blob(undefined, { type: 'image/webp' }), rating: 2 },
        { image: new Blob(undefined, { type: 'image/gif' }), rating: 3 },
      ],
    };
    store.state.gifCount = 3;
    const wrapper = deepMount(Configuration);
    actions.getAllData.mockImplementationOnce(async () => mockData);
    const createZipButton = wrapper.get('#c-create-zip-btn');
    createZipButton.trigger('click');
    await Vue.nextTick();
    await Vue.nextTick();
    expect(wrapper).toHaveDispatched('getAllData');
    expect(wrapper.vm.$data.snackbarColor).toBe('success');
  });

  it('Catches error while generating zip', async () => {
    jest.spyOn(zip, 'addFileToZip').mockImplementationOnce(() => {});
    jest.spyOn(zip, 'generateZip').mockImplementationOnce(async () => {});
    store.state.gifCount = 3;
    const wrapper = deepMount(Configuration);
    actions.getAllData.mockImplementationOnce(async () => {});
    const createZipButton = wrapper.get('#c-create-zip-btn');
    createZipButton.trigger('click');
    await Vue.nextTick();
    await Vue.nextTick();
    expect(wrapper).toHaveDispatched('getAllData');
    expect(wrapper.vm.$data.snackbarColor).toBe('error');
  });

  it.skip('Downloads the created Zip', () => {
    // const saveAsMock = jest.spyOn(fileSaver, 'saveAs').mockImplementationOnce(() => {});
    // expect(saveAsMock).toHaveBeenCalled();
  });
});
