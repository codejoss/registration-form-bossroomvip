import MainLayout from "../layouts/MainLayout";

function GratefulnessPage() {
  return (
    <MainLayout>
      <main className="text-center self-center my-10">
        <div className="flex flex-col justify-around items-center gap-10 text-bossDark max-w-xl px-10">
          <div className="max-w-xl text-3xl font-bold xl:text-5xl gap-2 flex flex-col justify-evenly items-center">
            <h1>¡Registro Exitoso!</h1>
            <h2>✨🎉</h2>
          </div>
          <p className="text-xl font-bold">Felicidades por dar este paso.</p>
          <p>
            Tu información está siendo confirmada y muy pronto tu nombre
            aparecerá en nuestro{" "}
            <span className="text-bossPinkStrong font-bold">Boss Board</span>{" "}
            junto al de mujeres que decidieron apostar por su crecimiento y su
            poder personal.
          </p>

          {/* Extra Info */}
          <article className=" py-5 px-5 border-4 border-bossPink rounded-2xl flex flex-col gap-3">
            <h2 className="text-xl font-bold text-bossPinkStrong">
              ✨ Bienvenida a tu nueva Sala de Poder Digital. ✨
            </h2>
            <p>
              Aquí no vienes a improvisar:{" "}
              <span className="font-bold text-bossDark">
                Vienes a aprender, construir y monetizar
              </span>{" "}
              con intención.
            </p>
            <p>Puedes comenzar hoy mismo.</p>
            <p>
              Accede ahora a tu{" "}
              <span className="font-bold text-bossPinkStrong">
                Biblioteca Boss
              </span>
              , donde encontrarás los recursos que marcarán el inicio de tu
              nueva etapa{" "}
            </p>
            <p className="text-5xl">👇🏻</p>
            {/* Boton */}
            <a
              href="https://codejoss.github.io/librarythebossroomvip"
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-72 self-center mt-3 inline-block bg-bossPinkStrong border-bossPinkStrong border-2 text-white font-bold py-3 px-6 rounded-2xl hover:bg-white  hover:text-bossPinkStrong transition hover:scale-105"
            >
              Ir a la Biblioteca Boss
            </a>
          </article>
        </div>
      </main>
    </MainLayout>
  );
}

export default GratefulnessPage;
