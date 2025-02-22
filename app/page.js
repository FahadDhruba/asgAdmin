import BooksSection from "./components/BooksSection";
import EcomNavbar from "./components/EcomNavbar";
import Footer from "./components/Footer";

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  let masterBookData = [];
  try {
    const response = await fetch(`${baseUrl}/api/ecomrowdata`, { cache: 'no-store' });

    const data = await response.json();
    masterBookData = data.data;

  } catch (error) {
    console.error("Error fetching data: ", error);
  }

  return (
    <main>
      <EcomNavbar />

      <div id="bookSectionContainer">
        {masterBookData.length > 0 ? (
          masterBookData.map((rowData, index) => (
            <BooksSection key={index} rowData={rowData} uqIndex={index} />
          ))
        ) : (
          <p>Failed to load data or no books available.</p>
        )}
      </div>

      <Footer />
    </main>
  );
}
