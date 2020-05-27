import Search from '@/components/Search/index.vue';
import shallow, { deepMount, fetchMock } from '../../../helper';

describe('Search', () => {
  it('renders properly', () => {
    const mockResponse = {
      results: ['tag1', 'tag2', 'tag3'],
    };
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Search);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders properly with enabled filter', async () => {
    const mockResponse = {
      results: ['tag1', 'tag2', 'tag3'],
    };
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = deepMount(Search);
    const filterButton = wrapper.get('#s-filter-icn');
    filterButton.vm.$emit('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Perform search with given query and rating', async () => {
    const mockResponse = [{ data: '123' }];
    fetchMock.resetMocks();
    const mockedFetch = fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Search);
    wrapper.vm.$data.searchQuery = 'test';
    wrapper.vm.$data.selectedRating = 'R';
    await wrapper.vm.$nextTick();
    expect(mockedFetch).toHaveBeenCalled();
  });

  it('Do not search with rating but no query', async () => {
    const mockResponse = [{ data: '123' }];
    fetchMock.resetMocks();
    const mockedFetch = fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Search);
    wrapper.vm.$data.searchQuery = '';
    wrapper.vm.$data.selectedRating = 'R';
    await wrapper.vm.$nextTick();
    expect(mockedFetch).toHaveBeenCalled();
  });

  it('Perform search with given query', async () => {
    const mockResponse = [{ data: '123' }];
    fetchMock.resetMocks();
    const mockedFetch = fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Search);
    wrapper.vm.$data.searchQuery = 'test';
    await wrapper.vm.$nextTick();
    expect(mockedFetch).toHaveBeenCalled();
  });

  it('Do not search with a query < 2', async () => {
    const mockResponse = [{ data: '123' }];
    fetchMock.resetMocks();
    const mockedFetch = fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Search);
    wrapper.vm.$data.searchQuery = 'AB';
    await wrapper.vm.$nextTick();
    expect(mockedFetch).toHaveBeenCalled();
  });

  it('Perform search with given tag and rating', async () => {
    const mockResponse = [{ data: '123' }];
    fetchMock.resetMocks();
    const mockedFetch = fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Search);
    wrapper.vm.$data.selectedTerm = 'test';
    wrapper.vm.$data.selectedRating = 'R';
    await wrapper.vm.$nextTick();
    expect(mockedFetch).toHaveBeenCalled();
  });

  it('Perform search with given tag', async () => {
    const mockResponse = [{ data: '123' }];
    fetchMock.resetMocks();
    const mockedFetch = fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Search);
    wrapper.vm.$data.selectedTerm = 'test';
    await wrapper.vm.$nextTick();
    expect(mockedFetch).toHaveBeenCalled();
  });

  it('Do not search with empty tag', async () => {
    const mockResponse = [{ data: '123' }];
    fetchMock.resetMocks();
    const mockedFetch = fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Search);
    wrapper.vm.$data.selectedTerm = '';
    await wrapper.vm.$nextTick();
    expect(mockedFetch).toHaveBeenCalled();
  });

  it('Show dialog with fullImage (fallback) if preview is clicked', async () => {
    const mockResponse = {
      data: [
        {
          id: 'id-1',
          images: {
            original: {
              webp: 'http://image1.webp',
            },
            fixed_width: {
              webp: 'http://preview1.webp',
            },
          },
        },
        {
          id: 'id-2',
          images: {
            original: {
              webp: '',
              url: 'http://image2.gif',
            },
            fixed_width: {
              webp: 'http://preview2.webp',
            },
          },
        },
      ],
    };
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = deepMount(Search);
    wrapper.vm.$data.selectedTerm = 'test';
    await wrapper.vm.$nextTick();
    wrapper.vm.$data.searchResults = mockResponse.data;
    await wrapper.vm.$nextTick();
    const img = wrapper.get('#s-img-n1');
    await img.trigger('click');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Show dialog with fullImage if preview is clicked', async () => {
    // Hide vuetify warning:
    // [Vuetify] Unable to locate target [data-app]
    console.warn = jest.fn();
    const mockResponse = {
      data: [
        {
          id: 'id-1',
          images: {
            original: {
              webp: 'http://image1.webp',
            },
            fixed_width: {
              webp: 'http://preview1.webp',
            },
          },
        },
        {
          id: 'id-2',
          images: {
            original: {
              webp: '',
              url: 'http://image2.gif',
            },
            fixed_width: {
              webp: 'http://preview2.webp',
            },
          },
        },
      ],
    };
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = deepMount(Search);
    wrapper.vm.$data.selectedTerm = 'test';
    await wrapper.vm.$nextTick();
    wrapper.vm.$data.searchResults = mockResponse.data;
    await wrapper.vm.$nextTick();
    const img = wrapper.get('#s-img-n0');
    await img.trigger('click');
    expect(wrapper.element).toMatchSnapshot();
  });
});
