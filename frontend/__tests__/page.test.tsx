import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../app/page';
import { client } from '../lib/client';
import { Operation } from '../gen/proto/calculator/v1/calculator_pb';

// Mock the client
jest.mock('../lib/client', () => ({
  client: {
    calculate: jest.fn(),
  },
}));

describe('Calculator UI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders calculator interface', () => {
    render(<Home />);
    
    expect(screen.getByText('ConnectRPC Calculator')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Number A')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Number B')).toBeInTheDocument();
    expect(screen.getByText('Calculate')).toBeInTheDocument();
  });

  test('handles addition calculation', async () => {
    const mockCalculate = client.calculate as jest.Mock;
    mockCalculate.mockResolvedValue({ result: 15 });

    render(<Home />);
    
    const inputA = screen.getByPlaceholderText('Number A');
    const inputB = screen.getByPlaceholderText('Number B');
    const button = screen.getByText('Calculate');

    fireEvent.change(inputA, { target: { value: '10' } });
    fireEvent.change(inputB, { target: { value: '5' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('15')).toBeInTheDocument();
    });

    expect(mockCalculate).toHaveBeenCalledWith({
      a: 10,
      b: 5,
      op: Operation.ADD,
    });
  });

  test('shows error for empty inputs', async () => {
    render(<Home />);
    
    const button = screen.getByText('Calculate');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Please enter both numbers')).toBeInTheDocument();
    });
  });

  test('handles API error', async () => {
    const mockCalculate = client.calculate as jest.Mock;
    mockCalculate.mockRejectedValue(new Error('Network error'));

    render(<Home />);
    
    const inputA = screen.getByPlaceholderText('Number A');
    const inputB = screen.getByPlaceholderText('Number B');
    const button = screen.getByText('Calculate');

    fireEvent.change(inputA, { target: { value: '10' } });
    fireEvent.change(inputB, { target: { value: '5' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Network error/i)).toBeInTheDocument();
    });
  });

  test('changes operation', async () => {
    const mockCalculate = client.calculate as jest.Mock;
    mockCalculate.mockResolvedValue({ result: 5 });

    render(<Home />);
    
    const select = screen.getByRole('combobox');
    const inputA = screen.getByPlaceholderText('Number A');
    const inputB = screen.getByPlaceholderText('Number B');
    const button = screen.getByText('Calculate');

    fireEvent.change(select, { target: { value: Operation.SUBTRACT.toString() } });
    fireEvent.change(inputA, { target: { value: '10' } });
    fireEvent.change(inputB, { target: { value: '5' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockCalculate).toHaveBeenCalledWith({
        a: 10,
        b: 5,
        op: Operation.SUBTRACT,
      });
    });
  });
});
