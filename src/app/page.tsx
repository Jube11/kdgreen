import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { Steps } from "@/components/landing/Steps";
import { BookingForm } from "@/components/landing/BookingForm";
import { Footer } from "@/components/landing/Footer";
import { StickyCallButton } from "@/components/landing/StickyCallButton";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Steps />
      <BookingForm />
      <Footer />
      <StickyCallButton />
    </main>
  );
}
