import Configuration from '@/components/Configuration/index.vue';
import zip from '@/components/Configuration/zip';
import shallow, {
  deepMount, store, actions, fetchMock,
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
    await wrapper.vm.$nextTick();
    expect(fullImageModeState).toBe(true);
  });

  it('Show deletion modal', async () => {
    // Hide vuetify warning:
    // [Vuetify] Unable to locate target [data-app]
    console.warn = jest.fn();
    const wrapper = deepMount(Configuration);
    store.state.gifCount = 3;
    await wrapper.vm.$nextTick();
    const deletionButton = wrapper.get({ name: 'v-btn' });
    deletionButton.trigger('click');
    await wrapper.vm.$nextTick();
    const dialog = wrapper.findAll({ name: 'v-alert' });
    expect(wrapper.vm.$data.showDialog).toBe(true);
    expect(dialog.wrappers[1].text()).toBe('Do you really want to delete your saved GIFs?');
  });

  it('Delete all saved Gifs', async () => {
    const wrapper = deepMount(Configuration);
    store.state.gifCount = 3;
    await wrapper.vm.$nextTick();
    const deletionButton = wrapper.get({ name: 'v-btn' });
    deletionButton.trigger('click');
    await wrapper.vm.$nextTick();
    const buttonInModal = wrapper.find('#c-modal-del-btn');
    buttonInModal.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper).toHaveDispatched('removeCompleteGifData');
    expect(wrapper.vm.$data.showDialog).toBe(false);
  });

  it('Generate Zip with Blob data', async () => {
    jest.spyOn(zip, 'createInstance').mockImplementationOnce(() => {});
    jest.spyOn(zip, 'addFileToZip').mockImplementation(() => {});
    jest.spyOn(zip, 'generateZip').mockResolvedValueOnce(new Blob());
    const mockData = {
      values: [
        { image: new Blob(undefined, { type: 'image/webp' }), rating: 1 },
        { image: new Blob(undefined, { type: 'image/webp' }), rating: 2 },
        { image: new Blob(undefined, { type: 'image/gif' }), rating: 3 },
      ],
    };
    store.state.gifCount = 3;
    const wrapper = deepMount(Configuration);
    actions.getAllData.mockResolvedValue(mockData);
    const createZipButton = wrapper.get('#c-create-zip-btn');
    createZipButton.trigger('click');
    await new Promise((resolve) => setTimeout(resolve));
    expect(wrapper).toHaveDispatched('getAllData');
    expect(wrapper.vm.$data.snackbarColor).toBe('success');
  });

  it('Generate Zip with String data', async () => {
    fetchMock.resetMocks();
    jest.spyOn(zip, 'createInstance').mockImplementationOnce(() => {});
    jest.spyOn(zip, 'addFileToZip').mockImplementation(() => {});
    jest.spyOn(zip, 'generateZip').mockResolvedValue(new Blob());
    fetchMock.mockResponse(async () => 'someData.webp');
    const mockData = {
      values: [
        { image: 'http://someImage.webp', rating: 1 },
        { image: 'http://someImage2.gif', rating: 2 },
      ],
    };
    store.state.gifCount = 2;
    const wrapper = deepMount(Configuration);
    actions.getAllData.mockResolvedValueOnce(mockData);
    const createZipButton = wrapper.get('#c-create-zip-btn');
    createZipButton.trigger('click');
    await new Promise((resolve) => setTimeout(resolve));
    expect(wrapper).toHaveDispatched('getAllData');
    expect(wrapper.vm.$data.snackbarColor).toBe('success');
  });

  it('Catches error while generating zip', async () => {
    jest.spyOn(zip, 'createInstance').mockImplementationOnce(() => { throw Error(); });
    store.state.gifCount = 3;
    const wrapper = deepMount(Configuration);
    actions.getAllData.mockResolvedValueOnce({});
    const createZipButton = wrapper.get('#c-create-zip-btn');
    createZipButton.trigger('click');
    await new Promise((resolve) => setTimeout(resolve));
    expect(wrapper).toHaveDispatched('getAllData');
    expect(wrapper.vm.$data.snackbarColor).toBe('error');
  });

  it('Downloads the created Zip', async () => {
    store.state.gifCount = 2;
    const mockDownloadZip = jest.fn();
    const wrapper = deepMount(Configuration, {
      methods: {
        downloadZip: mockDownloadZip,
      },
      data: () => ({
        finishedZipGeneration: true,
        zipFile: new Blob(),
      }),
    });
    const downloadZipButton = wrapper.get('#c-download-zip-btn');
    downloadZipButton.trigger('click');
    await wrapper.vm.$nextTick();
    expect(mockDownloadZip).toHaveBeenCalled();
  });
});
