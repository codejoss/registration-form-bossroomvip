import MainLayout from "./layouts/MainLayout";
import Welcome from "./pages/Welcome";
function App() {
  return (
    <div>
      <MainLayout>
        <Welcome />
      </MainLayout>
    </div>
  );
}

export default App;
