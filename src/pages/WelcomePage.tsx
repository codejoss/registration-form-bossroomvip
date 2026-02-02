import { Link } from "react-router";
import MainLayout from "../layouts/MainLayout";

function WelcomePage() {
  return (
    <MainLayout>
      <main className="">
        <div className="flex flex-col justify-center items-center gap-5 text-center text-bossDark my-10">
          {/* Title */}
          <div className="text-4xl text-center font-bold xl:text-5xl">
            <h1 className="text-bossPinkStrong">✨ ¡Preséntate ✨</h1>
            <h2>a la comunidad!</h2>
          </div>
          <div className="max-w-xl my-10">
            <p className="mb-5">
              Queremos darte la bienvenida como te mereces 💜
            </p>
            <p>
              Completa este formulario para que podamos presentarte en el Boss
              Board y conectar con otras mujeres increíbles que también están
              emprendiendo con propósito.
            </p>
          </div>
          <div className="hover:bg-bossDark w-40 text-center text-white font-bold h-10 flex items-center justify-center rounded-lg bg-bossPinkStrong cursor-pointer hover:scale-110 transition-all duration-300">
            <Link to="/registerform">Iniciar Registro</Link>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default WelcomePage;
