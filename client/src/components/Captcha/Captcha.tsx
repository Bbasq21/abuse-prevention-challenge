import { useState } from "react";
import { useTranslations } from '../../i18n/translations';
import "./Captcha.css";

interface CaptchaProps {
  onVerify: (token: string) => void;
}

export const Captcha = ({ onVerify }: CaptchaProps) => {
  const t = useTranslations();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isVerified || isLoading) return;

    setIsLoading(true);

    // SIMULACIÓN: Aquí cargarías el script real de ReCaptcha dinámicamente.
    // window.grecaptcha.execute(...)

    // Simulamos un delay de red para la validación del captcha (1 seg)
    setTimeout(() => {
      setIsLoading(false);
      setIsVerified(true);
      // Devolvemos un token simulado al padre
      onVerify("fake-captcha-token-12345");
    }, 1000);
  };

  return (
    <div className="captcha-container" onClick={handleClick}>
      <div
        className={`captcha-checkbox ${isLoading ? "loading" : ""} ${
          isVerified ? "checked" : ""
        }`}
      >
        {isVerified && <span className="checkmark">✔</span>}
      </div>
      <span className="captcha-label">{t.captchaLabel}</span>

      {/* Icono de recarga simulado si está cargando */}
      {isLoading && <div className="spinner-ring"></div>}

      <div className="captcha-logo">
        <small>reCAPTCHA</small>
        <small>Privacy - Terms</small>
      </div>
    </div>
  );
};
