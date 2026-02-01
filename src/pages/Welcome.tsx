import MainLayout from "../layouts/MainLayout";

function Welcome() {
  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-center text-6xl font-bold text-bossDark">
          Bienvenida
        </h1>
        <div className="bg-bossDark w-40 text-center text-white font-bold h-10 flex items-center justify-center rounded-lg">
          <a href="/registerform">Iniciar Registro</a>
        </div>
      </div>
    </MainLayout>
  );
}

export default Welcome;
