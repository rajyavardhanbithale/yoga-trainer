import Navbar from "./components/Home/Navbar";
import Header from "./components/Home/Header";


export default function Home() {




  return (
    <main className="flex min-h-screen flex-col">
      <img src="/home/bg.svg" alt="" className="xl:flex hidden absolute  -z-50" />
      <img src="/home/bg-md.svg" alt="" className="absolute inset-0 w-full h-full object-cover -z-50 xl:hidden" />
      <Navbar />
      
      <Header />
    </main>
  );
}
