import { useInitialData } from "./hooks/useInitialData";
import { FormSkeleton } from "./components/FormSkeleton/FormSkeleton";
import { TitleHeader } from "./components/TitleHeader/TitleHeader";
import { UserForm } from "./components/UserForm/UserForm";
import type { UserFormData } from "./components/UserForm/UserForm";
import "./App.css";

function App() {
  // Hook personalizado que maneja toda la lógica de carga de datos
  const { countries, defaultValues, isLoading } = useInitialData();

  // Lógica de navegación (Go Back)
  const handleGoBack = () => {
    const params = new URLSearchParams(window.location.search);
    const referrer = params.get("referrer");
    if (referrer) {
      window.location.href = referrer;
    } else {
      console.warn("No referrer found in URL, staying on page.");
      // Fallback opcional: window.history.back();
    }
  };

  // Lógica de negocio final (Submit)
  const handleProcessForm = (data: UserFormData) => {
    console.log("Processing Form...", data);

    // 1. Obtener referrer
    const params = new URLSearchParams(window.location.search);
    const referrer = params.get("referrer") || "/home";

    // 2. Construir URL de redirección con el token del captcha
    // En un escenario real, aquí harías un POST al backend antes de redirigir.
    const targetUrl = `${referrer}?captcha_token=${data.captchaToken}&status=verified`;

    // 3. Redirigir
    window.location.href = targetUrl;
  };

  return (
    <div className="container">
      <TitleHeader />

      <main className="card">
        {isLoading ? (
          <FormSkeleton />
        ) : (
          <UserForm
            countries={countries}
            defaultValues={defaultValues}
            onSubmit={handleProcessForm}
            onBack={handleGoBack}
          />
        )}
      </main>
    </div>
  );
}

export default App;
