import AppLayout from "@/components/layouts/AppLayout";

const Terms = () => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using the Budget Visual Companion application ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Budget Visual Companion is a personal finance management application that helps users track their income, expenses, and financial goals. The service is provided by P & D Technology.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You agree to provide accurate and complete information when using the service</li>
              <li>You will not use the service for any unlawful or prohibited activities</li>
              <li>You are responsible for all activities that occur under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data and Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your privacy is important to us. All financial data entered into the application is stored locally on your device. We do not collect, store, or transmit your personal financial information to external servers without your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              P & D Technology shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Service Availability</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to maintain the service's availability but do not guarantee uninterrupted access. The service may be temporarily unavailable due to maintenance, updates, or technical issues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Modifications to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. Users will be notified of significant changes, and continued use of the service constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms & Conditions, please contact P & D Technology through the application's support channels.
            </p>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default Terms;
