import { useTranslations } from "../../i18n/translations";
import "./TitleHeader.css";

export const TitleHeader = () => {
	const t = useTranslations();

	return (
		<section className="app-header">
			<h2>{t.headerTitle}</h2>
			<p>{t.headerSubtitle}</p>
		</section>
	);
};
