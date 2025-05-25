import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <ShieldCheck className="h-20 w-20 text-primary mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Your privacy is important to us. Last updated: {new Date().toLocaleDateString()}.
          </p>
        </div>

        <div className="space-y-8 text-base text-foreground/90 prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto dark:prose-invert prose-headings:text-primary/90 prose-a:text-primary hover:prose-a:text-primary/80">
          <section>
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p>
              Welcome to SuperLibrary! This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. We respect your privacy and are committed to protecting it through our compliance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
            <p>
              We may collect personal information that you voluntarily provide to us when you register on the website, place an order, subscribe to our newsletter, respond to a survey, fill out a form, or otherwise interact with the site. This information may include:
            </p>
            <ul>
              <li>Personal identification information (Name, email address, phone number, etc.)</li>
              <li>Account login credentials</li>
              <li>Order history and preferences</li>
              <li>Information you provide when contacting customer support</li>
              <li>Usage data (e.g., pages visited, features used)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
            <p>
              We use the information we collect in various ways, including to:
            </p>
            <ul>
              <li>Provide, operate, and maintain our website and services</li>
              <li>Improve, personalize, and expand our website and services</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Process your transactions and manage your orders</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. Information Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential. We may also release information when it&apos;s release is appropriate to comply with the law, enforce our site policies, or protect ours or others&apos; rights, property or safety.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">5. Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. However, no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">6. Your Data Protection Rights</h2>
            <p>
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul>
              <li>The right to access – You have the right to request copies of your personal data.</li>
              <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
              <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
              <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
              <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
            <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">7. Cookies and Tracking Technologies</h2>
            <p>
              We may use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul>
              <li>By email: privacy@superlibrary.example.com</li>
              <li>By visiting this page on our website: /contact</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
} 