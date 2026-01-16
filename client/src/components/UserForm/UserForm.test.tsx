import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserForm } from './UserForm';
import type { UserFormData } from './UserForm';

const mockCountries = [
  { id: '1', name: 'United States' },
  { id: '2', name: 'Canada' },
  { id: '3', name: 'Mexico' },
];

const mockDefaultValues: Partial<UserFormData> = {
  fullname: 'John Doe',
  countryId: '1',
  address: '123 Main St',
};

describe('UserForm Component', () => {
  it('renders the form element', () => {
    const mockOnSubmit = vi.fn();
    const mockOnBack = vi.fn();
    const { container } = render(
      <UserForm
        defaultValues={null}
        countries={mockCountries}
        onSubmit={mockOnSubmit}
        onBack={mockOnBack}
      />
    );

    const form = container.querySelector('.user-form');
    expect(form).toBeInTheDocument();
  });

  it('renders the captcha component', () => {
    const mockOnSubmit = vi.fn();
    const mockOnBack = vi.fn();
    const { container } = render(
      <UserForm
        defaultValues={null}
        countries={mockCountries}
        onSubmit={mockOnSubmit}
        onBack={mockOnBack}
      />
    );

    const captchaContainer = container.querySelector('.captcha-container');
    expect(captchaContainer).toBeInTheDocument();
  });

  it('renders all country options', () => {
    const mockOnSubmit = vi.fn();
    const mockOnBack = vi.fn();

    render(
      <UserForm
        defaultValues={null}
        countries={mockCountries}
        onSubmit={mockOnSubmit}
        onBack={mockOnBack}
      />
    );

    mockCountries.forEach(country => {
      expect(screen.getByText(country.name)).toBeInTheDocument();
    });
  });

  it('renders footer actions with buttons', () => {
    const mockOnSubmit = vi.fn();
    const mockOnBack = vi.fn();
    const { container } = render(
      <UserForm
        defaultValues={null}
        countries={mockCountries}
        onSubmit={mockOnSubmit}
        onBack={mockOnBack}
      />
    );

    const footerActions = container.querySelector('.footer-actions');
    expect(footerActions).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', async () => {
    const mockOnSubmit = vi.fn();
    const mockOnBack = vi.fn();
    const user = userEvent.setup();

    render(
      <UserForm
        defaultValues={null}
        countries={mockCountries}
        onSubmit={mockOnSubmit}
        onBack={mockOnBack}
      />
    );

    const backButton = screen.getByRole('button', { name: /volver|voltar/i });
    await user.click(backButton);

    expect(mockOnBack).toHaveBeenCalled();
  });

  it('renders form with default values when provided', () => {
    const mockOnSubmit = vi.fn();
    const mockOnBack = vi.fn();
    const { container } = render(
      <UserForm
        defaultValues={mockDefaultValues}
        countries={mockCountries}
        onSubmit={mockOnSubmit}
        onBack={mockOnBack}
      />
    );

    const fullnameInput = container.querySelector('#fullname') as HTMLInputElement;
    expect(fullnameInput.value).toBe('John Doe');
  });

  it('has captcha section with error message container', () => {
    const mockOnSubmit = vi.fn();
    const mockOnBack = vi.fn();
    const { container } = render(
      <UserForm
        defaultValues={null}
        countries={mockCountries}
        onSubmit={mockOnSubmit}
        onBack={mockOnBack}
      />
    );

    const captchaSection = container.querySelector('.captcha-section');
    expect(captchaSection).toBeInTheDocument();
  });

  it('calls onVerify callback when captcha is verified', async () => {
    const mockOnSubmit = vi.fn();
    const mockOnBack = vi.fn();
    const { container } = render(
      <UserForm
        defaultValues={mockDefaultValues}
        countries={mockCountries}
        onSubmit={mockOnSubmit}
        onBack={mockOnBack}
      />
    );

    // Click the captcha
    const captchaContainer = container.querySelector('.captcha-container');
    if (captchaContainer) {
      fireEvent.click(captchaContainer);
    }

    // Wait for captcha to be verified
    await new Promise(resolve => setTimeout(resolve, 1100));

    // Now submit should work
    const submitButton = screen.getByRole('button', { name: /continuar/i });
    const user = userEvent.setup();
    await user.click(submitButton);

    // onSubmit should be called since captcha is verified
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        captchaToken: 'fake-captcha-token-12345',
      })
    );
  });
});
