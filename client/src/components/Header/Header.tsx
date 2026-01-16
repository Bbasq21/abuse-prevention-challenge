import { useTranslations } from '../../i18n/translations';
import './Header.css';

export const Header = () => {
  const t = useTranslations();

  return (
    <header className="app-header">
      <h1>{t.headerTitle}</h1>
      <p>{t.headerSubtitle}</p>
    </header>
  );
};