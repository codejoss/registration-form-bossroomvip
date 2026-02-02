import { useNavigate } from "react-router";
import MainLayout from "../layouts/MainLayout";

function NotFoundPage() {
  const navigate = useNavigate();

  // Redirect to home after 3 seconds
  setTimeout(() => {
    navigate("/welcome", { replace: true });
  }, 3000);

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center text-bossDark text-center">
        <h1 className="text-6xl font-bold text-bossPinkStrong">Error 404</h1>
        <h2 className="text-2xl font-bold">Página no encontrada</h2>
        <p className="mt-10 animate-bounce ">
          Redirigiendo a la página de inicio...
        </p>
        {}
      </div>
    </MainLayout>
  );
}

export default NotFoundPage;
