import Search from '@/components/Search/index.vue';
import shallow, { fetchMock } from '../../../helper';

const mockResponse = {
  results: ['tag1', 'tag2', 'tag3'],
};

describe('Search.vue', () => {
  it('renders properly', () => {
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Search);
    expect(wrapper.element).toMatchSnapshot();
  });
});
