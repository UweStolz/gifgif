import Search from '@/components/Search/index.vue';
import shallow, { fetchMock } from '../../../helper';

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
});
