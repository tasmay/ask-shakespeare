import ContentContainer from "./components/content-container";
import Footer from "./components/footer";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-6">
        <ContentContainer />
      </main>
      <Footer />
    </div>
  );
}
