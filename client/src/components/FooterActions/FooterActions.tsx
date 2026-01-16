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
  return (
    <div className="footer-actions">
      <button type="button" onClick={onBack} className="btn-secondary">
        Go back
      </button>
      <button
        type="submit"
        className="btn-primary"
        disabled={disableSubmit || isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Next"}
      </button>
    </div>
  );
};
