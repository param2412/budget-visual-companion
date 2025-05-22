import AppLayout from "@/components/layouts/AppLayout";

const Privacy = () => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Budget Visual Companion is designed with privacy in mind. We collect minimal information necessary to provide our service:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Account information (name, email) for authentication purposes</li>
              <li>Financial data you voluntarily enter (transactions, budgets, goals)</li>
              <li>Application usage data for improving user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your information is used solely to provide and improve our service:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>To authenticate your account and provide personalized experience</li>
              <li>To store and display your financial data within the application</li>
              <li>To generate reports and insights based on your financial data</li>
              <li>To improve application features and user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Data Storage and Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your financial data is primarily stored locally on your device. When cloud synchronization is enabled, data is encrypted and stored securely. We implement industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties. Your financial data remains private and is not shared with external services except:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>When required by law or legal process</li>
              <li>To protect our rights, property, or safety</li>
              <li>With your explicit consent for specific integrations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use minimal cookies and local storage to maintain your session and application preferences. We do not use tracking cookies for advertising purposes or share data with advertising networks.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access and review your personal data</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data in a portable format</li>
              <li>Opt-out of non-essential data collection</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your data only as long as necessary to provide our service or as required by law. You can delete your account and data at any time through the application settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this privacy policy from time to time. We will notify users of any material changes and obtain consent where required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact P & D Technology through the application's support channels.
            </p>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default Privacy;
