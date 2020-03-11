import Frontpage from '@/components/Frontpage.vue';
import shallow, { fetchMock } from '../../helper';

const mockResponse = {
  data:
    {
      id: 'id-123',
      images: {
        original: {
          webp: 'http://image.webp',
        },
        fixed_width: {
          webp: 'http://preview.webp',
        },
      },
    },
};

describe('Frontpage.vue', () => {
  it('renders properly', () => {
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify(mockResponse));
    const wrapper = shallow(Frontpage);
    expect(wrapper.element).toMatchSnapshot();
  });
});
