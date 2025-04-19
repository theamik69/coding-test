import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AskQuestionSection from '../components/AskQuestionSection';
import { askAI } from '../features/ai/services/aiService';
import '@testing-library/jest-dom';

jest.mock('../features/ai/services/aiService', () => ({
    askAI: jest.fn(),
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

describe('AskQuestionSection', () => {
  it('renders input and button', () => {
    render(<AskQuestionSection />);
    expect(screen.getByPlaceholderText(/enter your question/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ask/i })).toBeInTheDocument();
  });

  it('calls askAI and displays answer on success', async () => {
    askAI.mockResolvedValue('This is a test answer from AI');

    render(<AskQuestionSection />);

    fireEvent.change(screen.getByPlaceholderText(/enter your question/i), {
      target: { value: 'Who is the top-selling?' },
    });
    fireEvent.click(screen.getByRole('button', { name: /ask/i }));

    expect(screen.getByRole('button', { name: /asking/i })).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText(/ai response/i)).toBeInTheDocument();
      expect(screen.getByText(/This is a test answer from AI/)).toBeInTheDocument();
    });
  });

  it('shows error message on API failure', async () => {
    askAI.mockRejectedValue(new Error('API down'));

    render(<AskQuestionSection />);

    fireEvent.change(screen.getByPlaceholderText(/enter your question/i), {
      target: { value: 'Who is the top-selling?' },
    });
    fireEvent.click(screen.getByRole('button', { name: /ask/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to get a response/i)).toBeInTheDocument();
    });
  });

  it('does nothing if question is empty', () => {
    render(<AskQuestionSection />);
    fireEvent.click(screen.getByRole('button', { name: /ask/i }));
    expect(askAI).not.toHaveBeenCalled();
  });
});
