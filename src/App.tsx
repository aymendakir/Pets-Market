import "./App.css";
import Category from "./Components/Pages/Home/Category";
import Header from "./Components/Pages/Home/Header";
import HeaderNav from "./Components/Pages/Home/HeaderNav";
import Heros from "./Components/Pages/Home/Heros";

function App() {
  return (
    <>
      <Header />
      <HeaderNav />
      <Heros />
      <Category />
    </>
  );
}

export default App;
