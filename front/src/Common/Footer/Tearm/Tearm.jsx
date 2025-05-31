import React from 'react';
import './Tearm.scss';

import { Helmet } from 'react-helmet';


const Terms = () => {
  return (
    <section id="terms-of-service">

<Helmet>
        <title>Terms and Conditions - VHX View</title>
        <meta name="description" content="Read our terms and conditions." />
        <meta name="keywords" content="terms and conditions, legal, agreement" />
        <meta property="og:title" content="Terms and Conditions - VHX View" />
        <meta property="og:description" content="Read our terms and conditions." />
        {/* <meta property="og:url" content="https://your-website.com/terms-conditions" /> */}
      </Helmet>
      <div className="card">
        <h1 className="primary-heading">Terms and Conditions</h1>

        <h2 className="section-heading">1. Acceptance of Terms</h2>
        <p className="paragraph">
          By accessing or using VHX (V-Ex Tech Solution)'s website, you agree to be bound by these Terms and Conditions.
        </p>

        <h2 className="section-heading">2. User Conduct</h2>
        <p className="paragraph">
          You agree not to engage in any activity that disrupts or interferes with the functioning of the website or its services.
        </p>

        <h2 className="section-heading">3. Intellectual Property</h2>
        <p className="paragraph">
          All content and materials available on the website are protected by intellectual property laws.
        </p>

        <h2 className="section-heading">4. Limitation of Liability</h2>
        <p className="paragraph">
          VHX shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of the website.
        </p>

        <h2 className="section-heading">5. Indemnification</h2>
        <p className="paragraph">
          You agree to indemnify and hold VHX harmless from any claims, losses, liabilities, damages, costs, and expenses arising out of or relating to your use of the website.
        </p>

        <h2 className="section-heading">6. Governing Law</h2>
        <p className="paragraph">
          These Terms and Conditions shall be governed by and construed in accordance with the laws of VHX.
        </p>

        <h1 className="primary-heading">Refund Policy</h1>

        <h2 className="section-heading">1. Eligibility for Refunds</h2>
        <p className="paragraph">
          Refunds are only available for products that are returned in their original condition within 7 days of purchase.
        </p>

        <h2 className="section-heading">2. Refund Process</h2>
        <p className="paragraph">
          To request a refund, please contact our customer support team with your order details.
        </p>

        <h2 className="section-heading">3. Refund Timeframe</h2>
        <p className="paragraph">
          Once your return is received and inspected, we will send you an email to notify you that we have received your returned item and the approval or rejection of your refund. Once approved, refunds will take 7 days to be credited into the beneficiary’s bank account.
        </p>

        <h2 className="section-heading">4. Exchanges</h2>
        <p className="paragraph">
          We only replace items if they are defective or damaged. In case of exchanges, we will initiate the process within 7 days and the replacement will be delivered within 7 days.
        </p>

        <h1 className="primary-heading">Return Policy</h1>

        <h2 className="section-heading">1. Eligibility for Returns</h2>
        <p className="paragraph">
          To be eligible for a return, your item must be unused and in the same condition that you received it.
        </p>

        <h2 className="section-heading">2. Return Process</h2>
        <p className="paragraph">
          To initiate a return, please contact our customer support team within 2 days of receiving your item.
        </p>

        <h2 className="section-heading">3. Return Shipping</h2>
        <p className="paragraph">
          You will be responsible for paying for your own shipping costs for returning your item.
        </p>

        <h2 className="section-heading">4. Return Time Frame</h2>
        <p className="paragraph">
          In case of an approved return, your replacement will be delivered within 3 days.
        </p>

        <h1 className="primary-heading">Shipping Policy</h1>

        <h2 className="section-heading">1. Shipping Rates</h2>
        <p className="paragraph">
          Shipping rates are calculated based on the weight of your order and your location.
        </p>

        <h2 className="section-heading">2. Shipping Times</h2>
        <p className="paragraph">
          Orders are typically processed, shipped, and delivered within 5 business days.
        </p>

        <h2 className="section-heading">3. International Shipping</h2>
        <p className="paragraph">
          We offer international shipping to select countries. Please note that customs duties and taxes may apply. Orders will be delivered within 5 business days.
        </p>

        <h2 className="section-heading">4. Order Tracking</h2>
        <p className="paragraph">
          Once your order has shipped, you will receive a tracking number via email.
        </p>

        <h1 className="primary-heading">Privacy Policy</h1>

        <h2 className="section-heading">1. Information We Collect</h2>
        <p className="paragraph">
          We collect personal information such as your name, email address, and payment details when you place an order or sign up for our newsletter.
        </p>

        <h2 className="section-heading">2. How We Use Your Information</h2>
        <p className="paragraph">
          We use your information to process your orders, communicate with you, and improve our services.
        </p>

        <h2 className="section-heading">3. Cookies</h2>
        <p className="paragraph">
          We use cookies to personalize content, analyze our traffic, and improve your browsing experience.
        </p>

        <h2 className="section-heading">4. Data Security</h2>
        <p className="paragraph">
          We take precautions to protect your information both online and offline.
        </p>

        <h2 className="section-heading">5. Changes to This Privacy Policy</h2>
        <p className="paragraph">
          We reserve the right to update or change our Privacy Policy at any time.
        </p>
      </div>
    </section>
  );
};

export default Terms;
