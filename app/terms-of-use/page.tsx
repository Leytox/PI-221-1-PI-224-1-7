import { FileText } from 'lucide-react';

export default function TermsOfUsePage() {
  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <FileText className="h-20 w-20 text-primary mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Terms of Use
          </h1>
          <p className="text-xl text-muted-foreground">
            Please read these terms carefully. Last updated: {new Date().toLocaleDateString()}.
          </p>
        </div>

        <div className="space-y-8 text-base text-foreground/90 prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto dark:prose-invert prose-headings:text-primary/90 prose-a:text-primary hover:prose-a:text-primary/80">
          <section>
            <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the SuperLibrary website and services (collectively, the "Service"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to all of these Terms, do not use the Service. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. Use of the Service</h2>
            <p>
              SuperLibrary grants you a non-exclusive, non-transferable, revocable license to access and use the Service strictly in accordance with these Terms. You agree not to use the Service for any purpose that is unlawful or prohibited by these Terms.
            </p>
            <p>
              You may not use the Service in any manner that could damage, disable, overburden, or impair the Service or interfere with any other party&apos;s use and enjoyment of the Service. You may not obtain or attempt to obtain any materials or information through any means not intentionally made available or provided for through the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">3. User Accounts</h2>
            <p>
              To access certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password.
            </p>
            <p>
              You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account. You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you, without appropriate authorization.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of SuperLibrary and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of SuperLibrary.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">5. User Conduct</h2>
            <p>
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul>
              <li>Copying, distributing, or disclosing any part of the Service in any medium, including without limitation by any automated or non-automated "scraping".</li>
              <li>Using any automated system, including without limitation "robots," "spiders," "offline readers," etc., to access the Service in a manner that sends more request messages to the SuperLibrary servers than a human can reasonably produce in the same period of time by using a conventional on-line web browser.</li>
              <li>Transmitting spam, chain letters, or other unsolicited email.</li>
              <li>Attempting to interfere with, compromise the system integrity or security or decipher any transmissions to or from the servers running the Service.</li>
              <li>Taking any action that imposes, or may impose at our sole discretion an unreasonable or disproportionately large load on our infrastructure.</li>
              <li>Uploading invalid data, viruses, worms, or other software agents through the Service.</li>
              <li>Collecting or harvesting any personally identifiable information, including account names, from the Service.</li>
              <li>Using the Service for any commercial solicitation purposes.</li>
              <li>Impersonating another person or otherwise misrepresenting your affiliation with a person or entity, conducting fraud, hiding or attempting to hide your identity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">6. Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
            </p>
            <p>
              If you wish to terminate your account, you may simply discontinue using the Service. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">7. Disclaimers</h2>
            <p>
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
            </p>
            <p>
              SuperLibrary, its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">8. Limitation of Liability</h2>
            <p>
              In no event shall SuperLibrary, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">9. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the State of [Your State/Country, e.g., California], United States, without regard to its conflict of law provisions.
            </p>
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have had between us regarding the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">10. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">11. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <ul>
              <li>By email: legal@superlibrary.example.com</li>
              <li>By visiting this page on our website: /contact</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
} 