import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-10 px-6 mt-[100vh]">
      {/* >=770px — 4 колонки */}
      <div className="hidden min-[770px]:grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <ContactInfo />
        <OpeningHours />
        <FollowUs />
        <QuickLinks legal />
      </div>

      <div className="hidden min-[580px]:flex min-[770px]:hidden justify-between flex-wrap gap-8 max-w-5xl mx-auto">
        <div className="flex-1 min-w-[250px]">
          <ContactInfo />
          <QuickLinks legal />
        </div>
        <div className="flex-1 min-w-[250px]">
          <OpeningHours />
          <FollowUs />
        </div>
      </div>

      <div className="flex min-[580]:hidden flex-col items-center text-center gap-8 max-w-sm mx-auto">
        <ContactInfo />
        <OpeningHours />
        <FollowUs />
        <QuickLinks legal />
      </div>

      <p className="text-center text-sm text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} SuperLibrary. All rights reserved.
      </p>
    </footer>
  );
}

function ContactInfo() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
      <p>123 Main Street, Cityville, Country</p>
      <p>Phone: +1 (555) 123-4567</p>
      <p>Email: contact@superlibrary.com</p>
    </div>
  );
}

function OpeningHours() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
      <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
      <p>Sat: 10:00 AM - 4:00 PM</p>
      <p>Sun: Closed</p>
    </div>
  );
}

function FollowUs() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
      <ul className="space-y-2">
        <li><a href="https://facebook.com" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">Facebook</a></li>
        <li><a href="https://twitter.com" className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">Twitter</a></li>
        <li><a href="https://instagram.com" className="text-pink-500 hover:underline" target="_blank" rel="noreferrer">Instagram</a></li>
        <li><a href="https://linkedin.com" className="text-blue-700 hover:underline" target="_blank" rel="noreferrer">LinkedIn</a></li>
      </ul>
    </div>
  );
}

function QuickLinks({ legal = false }: { legal?: boolean }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li><Link href="/" className="hover:underline">Home</Link></li>
        <li><Link href="/about" className="hover:underline">About Us</Link></li>
        <li><Link href="/catalog" className="hover:underline">Catalog</Link></li>
        <li><Link href="/contact" className="hover:underline">Contact</Link></li>
      </ul>
      {legal && (
        <>
          <h3 className="text-lg font-semibold mt-8 mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms-of-use" className="hover:underline">Terms of Use</Link></li>
          </ul>
        </>
      )}
    </div>
  );
}
