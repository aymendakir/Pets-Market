import "./App.css";
import Category from "./Components/Pages/Home/Category";
import Featured from "./Components/Pages/Home/Featured";
import Header from "./Components/Pages/Home/Header";
import HeaderNav from "./Components/Pages/Home/HeaderNav";
import Heros from "./Components/Pages/Home/Heros";
import InfoBlock from "./Components/Pages/Home/InfoBlock";

function App() {
  return (
    <>
      <Header />
      <HeaderNav />
      <Heros />
      <Category />
      <Featured />
      <InfoBlock />
    </>
  );
}

export default App;
