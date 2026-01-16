import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import * as useInitialDataModule from './hooks/useInitialData';

vi.mock('./hooks/useInitialData');

describe('App Component', () => {
  const mockUseInitialData = vi.mocked(useInitialDataModule.useInitialData);

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset window.location for each test
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
        search: '',
      },
      writable: true,
    });
  });

  it('shows loading skeleton when loading', () => {
    mockUseInitialData.mockReturnValue({
      countries: [],
      defaultValues: null,
      isLoading: true,
    });

    const { container } = render(<App />);
    const skeleton = container.querySelector('.skeleton-wrapper');
    expect(skeleton).toBeInTheDocument();
  });

  it('renders the UserForm when data is loaded', () => {
    const mockCountries = [
      { id: '1', name: 'United States' },
      { id: '2', name: 'Canada' },
    ];

    mockUseInitialData.mockReturnValue({
      countries: mockCountries,
      defaultValues: { fullname: 'John Doe', countryId: '1', address: '123 Main St' },
      isLoading: false,
    });

    const { container } = render(<App />);
    const userForm = container.querySelector('.user-form');
    expect(userForm).toBeInTheDocument();
  });

  it('renders the main container', () => {
    mockUseInitialData.mockReturnValue({
      countries: [],
      defaultValues: null,
      isLoading: false,
    });

    const { container } = render(<App />);
    const mainContainer = container.querySelector('.container');
    expect(mainContainer).toBeInTheDocument();
  });

  it('renders a card element', () => {
    mockUseInitialData.mockReturnValue({
      countries: [],
      defaultValues: null,
      isLoading: false,
    });

    const { container } = render(<App />);
    const card = container.querySelector('.card');
    expect(card).toBeInTheDocument();
  });

  it('handles go back with referrer parameter', async () => {
    const referrerUrl = 'https://example.com/return';
    window.location.search = `?referrer=${encodeURIComponent(referrerUrl)}`;

    mockUseInitialData.mockReturnValue({
      countries: [],
      defaultValues: null,
      isLoading: false,
    });

    render(<App />);
    const backButton = screen.getByRole('button', { name: /volver|voltar/i });
    
    const user = userEvent.setup();
    await user.click(backButton);

    expect(window.location.href).toBe(referrerUrl);
  });

  it('loads countries from useInitialData hook', () => {
    const mockCountries = [
      { id: '1', name: 'Argentina' },
      { id: '2', name: 'Brazil' },
    ];

    mockUseInitialData.mockReturnValue({
      countries: mockCountries,
      defaultValues: null,
      isLoading: false,
    });

    render(<App />);
    
    mockCountries.forEach(country => {
      expect(screen.getByText(country.name)).toBeInTheDocument();
    });
  });
});
