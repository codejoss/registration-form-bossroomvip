import MainLayout from "../layouts/MainLayout";

function Welcome() {
  return (
    <MainLayout>
      <main className="">
        <div className="flex flex-col justify-center items-center gap-5 text-center text-bossDark">
          <h1 className="text-6xl font-bold ">
            ✨ ¡Preséntate a la comunidad! ✨
          </h1>
          <p className="max-w-3xl my-10">
            Queremos darte la bienvenida como te mereces 💜 Completa este
            formulario para que podamos presentarte en el Boss Board y conectar
            con otras mujeres increíbles que también están emprendiendo con
            propósito.
          </p>
          <div className="bg-bossDark w-40 text-center text-white font-bold h-10 flex items-center justify-center rounded-lg">
            <a href="/registerform">Iniciar Registro</a>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default Welcome;
