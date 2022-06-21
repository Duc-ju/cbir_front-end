import { useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./components/main";

function App() {
  useEffect(() => {
    document.title = "Hệ thống tìm kiếm ảnh món ăn";
  }, []);
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
