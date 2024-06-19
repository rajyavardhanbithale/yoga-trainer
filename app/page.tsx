import Navbar from "./components/Home/Navbar";
import Header from "./components/Home/Header";


export default function Home() {




  return (
    <main className="flex min-h-screen flex-col">
      <img src="/home/bg.svg" alt="" className="absolute -z-50" />
      <Navbar />
      
      <Header />
    </main>
  );
}
