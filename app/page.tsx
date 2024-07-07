import ContentContainer from "./components/content-container";
import Footer from "./components/footer";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="">
      <header className="flex flex-col items-center">
        <Header></Header>
      </header>
      <main className="">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <ContentContainer></ContentContainer>
        </div>
      </main>
      {/* <Footer></Footer> */}
    </div>
  );
}
