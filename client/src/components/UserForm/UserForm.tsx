import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Captcha } from "../Captcha/Captcha"; // Tu componente existente
import { FooterActions } from "../FooterActions/FooterActions";
import './UserForm.css';

// Tipos definidos localmente o importados
export type UserFormData = {
  fullname: string;
  countryId: string;
  address: string;
  captchaToken: string; // Incluimos el token en el modelo del formulario
};

interface Country {
  id: string;
  name: string;
}

interface UserFormProps {
  defaultValues: Partial<UserFormData> | null;
  countries: Country[];
  onSubmit: (data: UserFormData) => void;
  onBack: () => void;
}

export const UserForm = ({
  defaultValues,
  countries,
  onSubmit,
  onBack,
}: UserFormProps) => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>();

  // Actualizar formulario cuando lleguen datos del API
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  // Wrapper para el submit que valida el captcha
  const handleFormSubmit = (data: UserFormData) => {
    if (!captchaToken) {
      setCaptchaError(true);
      return;
    }
    // Inyectamos el token en la data final
    onSubmit({ ...data, captchaToken });
  };

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    setCaptchaError(false); // Limpiar error si existe
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="user-form">
      {/* Input Fullname */}
      <div className="form-group">
        <label htmlFor="fullname">Fullname</label>
        <input
          id="fullname"
          {...register("fullname", { required: "Fullname is required" })}
          className={errors.fullname ? "input-error" : ""}
          placeholder="e.g. Juan Perez"
        />
        {errors.fullname && (
          <span className="error-msg">{errors.fullname.message}</span>
        )}
      </div>

      {/* Select Country */}
      <div className="form-group">
        <label htmlFor="countryId">Country</label>
        <select
          id="countryId"
          {...register("countryId", { required: "Select a country" })}
          className={errors.countryId ? "input-error" : ""}
        >
          <option value="">Select...</option>
          {countries.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.countryId && (
          <span className="error-msg">{errors.countryId.message}</span>
        )}
      </div>

      {/* Input Address */}
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          id="address"
          {...register("address", { required: "Address is required" })}
          className={errors.address ? "input-error" : ""}
          placeholder="e.g. Calle Falsa 123"
        />
        {errors.address && (
          <span className="error-msg">{errors.address.message}</span>
        )}
      </div>

      {/* Captcha Section */}
      <div className="form-group captcha-section">
        <Captcha onVerify={handleCaptchaVerify} />
        {captchaError && (
          <span
            className="error-msg"
            style={{ display: "block", marginTop: "8px" }}
          >
            Please verify you are not a robot.
          </span>
        )}
      </div>

      {/* Footer Buttons */}
      <FooterActions onBack={onBack} />
    </form>
  );
};
