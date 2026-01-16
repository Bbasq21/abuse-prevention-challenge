import { useTranslations } from '../../i18n/translations';
import "./FooterActions.css";

interface FooterActionsProps {
  onBack: () => void;
  isSubmitting?: boolean;
  disableSubmit?: boolean;
}

export const FooterActions = ({
  onBack,
  isSubmitting = false,
  disableSubmit = false,
}: FooterActionsProps) => {
  const t = useTranslations();
  return (
    <div className="footer-actions">
      <button type="button" onClick={onBack} className="btn-secondary">
        {t.btnBack}
      </button>
      <button
        type="submit"
        className="btn-primary"
        disabled={disableSubmit || isSubmitting}
      >
        {isSubmitting ? t.btnLoading : t.btnNext}
      </button>
    </div>
  );
};
