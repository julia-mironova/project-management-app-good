import { Login } from './Login';
import { render, screen } from '../../utils/test-utils';
describe('login test', () => {
  test('renders icon', async () => {
    render(<Login />);
    expect(screen.getByTestId('LockOutlinedIcon')).toBeInTheDocument();
    expect(screen.getByTestId('VisibilityIcon')).toBeInTheDocument();
    expect(screen.getByTestId('SendIcon')).toBeInTheDocument();
  });
});
