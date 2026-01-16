import './formSkeleton.css'; // Crearemos este CSS abajo

export const FormSkeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-field" style={{ width: '60%' }}></div> {/* Label simulado */}
      <div className="skeleton-input"></div> {/* Input simulado */}
      
      <div className="skeleton-field" style={{ width: '40%' }}></div>
      <div className="skeleton-input"></div>
      
      <div className="skeleton-field" style={{ width: '50%' }}></div>
      <div className="skeleton-input"></div>
    </div>
  );
};