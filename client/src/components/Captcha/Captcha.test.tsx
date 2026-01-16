import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Captcha } from './Captcha';

describe('Captcha Component', () => {
  it('renders the captcha checkbox and label', () => {
    const mockOnVerify = vi.fn();
    render(<Captcha onVerify={mockOnVerify} />);

    const label = screen.getByText(/No soy un robot/i);
    expect(label).toBeInTheDocument();
  });

  it('displays the captcha logo with branding', () => {
    const mockOnVerify = vi.fn();
    render(<Captcha onVerify={mockOnVerify} />);

    const logo = screen.getByText('reCAPTCHA');
    expect(logo).toBeInTheDocument();
  });

  it('renders the checkbox element', () => {
    const mockOnVerify = vi.fn();
    const { container } = render(<Captcha onVerify={mockOnVerify} />);

    const checkbox = container.querySelector('.captcha-checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders Privacy and Terms text', () => {
    const mockOnVerify = vi.fn();
    render(<Captcha onVerify={mockOnVerify} />);

    const privacyLink = screen.getByText('Privacy - Terms');
    expect(privacyLink).toBeInTheDocument();
  });

  it('has clickable container element', () => {
    const mockOnVerify = vi.fn();
    const { container } = render(<Captcha onVerify={mockOnVerify} />);

    const captchaContainer = container.querySelector('.captcha-container');
    expect(captchaContainer).toBeInTheDocument();
    expect(captchaContainer).toHaveClass('captcha-container');
  });

  it('renders spinner during loading state', async () => {
    const mockOnVerify = vi.fn();
    const { container } = render(<Captcha onVerify={mockOnVerify} />);

    const captchaContainer = container.querySelector('.captcha-container');
    if (captchaContainer) {
      captchaContainer.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }

    // Wait a bit for state update
    await new Promise(resolve => setTimeout(resolve, 100));

    const spinner = container.querySelector('.spinner-ring');
    expect(spinner).toBeInTheDocument();
  });
});
