import React from 'react';

const supportPhone = '9044900495';
const supportLink = 'https://wa.me/919044900495';

const pages = {
  '/privacy-policy': {
    eyebrow: 'YOUR PRIVACY, OUR PROMISE',
    title: 'Privacy Policy',
    updated: 'Last updated: 1 November 2026',
    sections: [
      ['Who we are', 'Crochella is a handmade crochet brand based in Fatehpur, Uttar Pradesh, India. For privacy questions, contact us at hello@crochella.in or 9044900495.'],
      ['Information we collect', 'When you enquire or place an order, we may collect your name, phone number, email address, delivery address, order details, and messages you send us. Payment information is processed by the payment provider you choose; we do not ask you to send card PINs, passwords, or OTPs to us.'],
      ['How we use information', 'We use your information to respond to enquiries, confirm and fulfil orders, arrange delivery, provide support, prevent fraud, and meet applicable legal and accounting obligations. We will use your contact details for promotional messages only where you have agreed or where permitted by law.'],
      ['Sharing', 'We share only the information needed with service providers that help us operate, such as payment processors, delivery partners, and website/hosting providers. We do not sell your personal information. We may disclose information where required by law or to protect our rights and customers.'],
      ['Payments', 'Payments may be handled by Cashfree or another payment method shown at checkout. Their own privacy terms apply to information they process. If a QR/manual payment option is offered, we use the payment reference and order details to reconcile your payment.'],
      ['Retention and security', 'We keep order and transaction records for as long as needed to fulfil orders, provide support, and comply with legal requirements. We use reasonable safeguards, but no online system can be guaranteed completely secure.'],
      ['Your choices', 'You may ask to access, correct, or delete personal information, subject to records we must retain by law. You may also ask us to stop promotional communications. Contact hello@crochella.in or 9044900495.'],
      ['Updates', 'We may update this policy as our services change. The revised policy will be posted on this page with an updated date.']
    ]
  },
  '/shipping-policy': {
    eyebrow: 'FROM OUR HANDS TO YOUR HOME',
    title: 'Shipping & Delivery',
    updated: 'Delivery estimates',
    sections: [
      ['Estimated delivery', 'Orders are handmade and packed with care. Delivery is usually 2–4 days in Tier 1 cities, including Delhi NCR, and approximately 1 week for other serviceable locations. These are estimates, not guaranteed dates; remote locations, courier delays, weather, or peak-season demand may take longer.'],
      ['Order processing', 'We will confirm your order and share an expected dispatch window. Handmade or made-to-order items may need additional preparation time; we will tell you before confirming the order.'],
      ['Shipping charges', 'Any applicable shipping fee will be shown and confirmed before you pay. We will not add an undisclosed shipping charge after order confirmation.'],
      ['Tracking and delivery', 'Where tracking is available, we will share the tracking details by phone, email, or message. Please provide a complete address and reachable phone number. If a parcel is delayed or marked delivered but not received, contact us promptly.'],
      ['Questions', 'For delivery updates, call or WhatsApp 9044900495 or email hello@crochella.in.']
    ]
  },
  '/returns-refunds': {
    eyebrow: 'A LITTLE CARE, IF SOMETHING ISN’T RIGHT',
    title: 'Returns & Refunds',
    updated: 'Please read before ordering',
    sections: [
      ['Handmade nature', 'Each Crochella piece is handmade, so small variations in shape, colour, and stitch are part of its character and are not defects. Product photos are representative; colours may look slightly different across screens.'],
      ['Damaged or incorrect orders', 'If your order arrives damaged or you receive the wrong item, contact us within 48 hours of delivery at 9044900495 or hello@crochella.in. Please include your order details and clear photos of the item and packaging so we can review and help.'],
      ['Resolution', 'After review, we will confirm an appropriate resolution, which may include replacement, repair, or refund where applicable. Refunds, when approved, will be returned through the original payment method where possible. Processing time depends on the payment provider or bank.'],
      ['Change of mind', 'Because products are handmade and may be made or packed for your order, change-of-mind returns are not guaranteed. Please contact us before sending anything back; unauthorised returns may not be accepted.'],
      ['Order cancellation', 'Contact us as soon as possible to request cancellation. An order already dispatched or custom-made may not be cancellable. Any eligible refund will be confirmed by our support team.']
    ]
  },
  '/terms': {
    eyebrow: 'THE LITTLE DETAILS',
    title: 'Terms & Conditions',
    updated: 'Last updated: 1 November 2026',
    sections: [
      ['Using this website', 'By browsing or ordering from Crochella, you agree to these terms and the policies linked on this website. If you have questions, contact us before placing an order.'],
      ['Products and availability', 'Our products are handmade. Minor variations are expected and make each piece unique. Product listings, prices, and availability may change; an order is accepted only after we confirm it.'],
      ['Pricing and payment', 'Prices are shown in Indian rupees (INR). Applicable shipping charges and the total payable amount will be disclosed before payment. Payments are processed through the payment method displayed at checkout. Never share an OTP, UPI PIN, or payment password with Crochella or anyone claiming to represent us.'],
      ['Orders and delivery', 'Order confirmation, delivery estimates, shipping, and tracking are governed by our Shipping & Delivery page. Delivery dates are estimates and may be affected by circumstances outside our control.'],
      ['Returns and refunds', 'Requests for damaged, incorrect, cancelled, or other eligible orders are handled under our Returns & Refunds policy. Contact us before returning an item.'],
      ['Intellectual property', 'Website text, branding, photographs, and original designs belong to Crochella or their respective rights holders. Do not copy or reuse them commercially without written permission.'],
      ['Limitation and changes', 'We make reasonable efforts to keep website information accurate, but the site is provided on an “as available” basis. Nothing in these terms limits rights that cannot be excluded under applicable law. We may update these terms by posting a revised version.'],
      ['Contact', 'Crochella, Fatehpur, Uttar Pradesh, India. Email: hello@crochella.in. Phone/WhatsApp: 9044900495.']
    ]
  },
  '/contact': {
    eyebrow: 'WE’D LOVE TO HEAR FROM YOU',
    title: 'Contact Crochella',
    updated: 'Customer support',
    sections: [
      ['Phone & WhatsApp', 'Call or WhatsApp 9044900495 for product questions, order updates, delivery help, and returns.'],
      ['Email', 'Write to hello@crochella.in. Please include your order number when contacting us about an existing order.'],
      ['Instagram', 'Follow and message @crochellaart for new handmade drops and behind-the-scenes stories.'],
      ['Our home', 'Crochella is handmade with love in Fatehpur, Bahua, Uttar Pradesh, India.']
    ]
  }
};

export default function PolicyPages({ path }) {
  const page = pages[path] || pages['/privacy-policy'];
  return <main className="policy-page">
    <header className="policy-nav"><a href="/" className="policy-brand">Crochella<sup>®</sup></a><a href="/crochellas">Shop handmade ↗</a></header>
    <section className="policy-hero"><span>{page.eyebrow}</span><h1>{page.title}</h1><p>{page.updated}</p></section>
    <article className="policy-content">{page.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}</article>
    <aside className="policy-help"><div><span>NEED A HAND?</span><h2>Ask us anything.</h2></div><a href={supportLink} target="_blank" rel="noreferrer">WhatsApp {supportPhone} ↗</a></aside>
    <footer className="policy-footer"><a href="/">Crochella®</a><nav><a href="/privacy-policy">Privacy</a><a href="/shipping-policy">Shipping</a><a href="/returns-refunds">Returns</a><a href="/terms">Terms</a><a href="/contact">Contact</a></nav></footer>
  </main>;
}
