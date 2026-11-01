import React from 'react';
import pricing from './content/crochella-pricing.json';

const products = [
  ['panda','Panda Pal'],['turtle','Turtle Buddy'],['banana','Bananita'],['bow','Pink Bow'],['burger','Burger Buddy'],
  ['lion','Little Lion'],['avocado','Avo Cutie'],['penguin','Penguin Pal'],['handbag','Mini Tote'],['strawberry','Berry Sweet'],
  ['chilli','Chilli Pop'],['bee','Busy Bee'],['bear','Teddy Bear'],['evil-eye','Good Vibes'],['cherry','Cherry Duo'],['sunflower','Sunshine'],['heart','Love Note']
];

export default function UpiPaymentPage(){
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('product') || '';
  const product = products.find(([id])=>id===slug);
  const price = product ? pricing.products[slug]?.price : null;
  const payee = 'Ms Anshika Gupta';
  const upiId = '9044900495@ptaxis';
  const upi = price ? `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payee)}&am=${price}&cu=INR&tn=${encodeURIComponent('Crochella '+product[1])}` : `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payee)}&cu=INR`;
  const qrPayload = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payee)}&cu=INR`;
  const qr = 'https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=12&data='+encodeURIComponent(qrPayload);
  const message = `Hi Crochella! I have made a UPI payment ${price ? 'of ₹'+price+' for '+product[1] : ''}. Please confirm my order. I will attach the payment screenshot.`;
  return <main className="upi-page">
    <header className="upi-nav"><a href="/">Crochella<sup>®</sup></a><a href="/crochellas">Back to shop ↗</a></header>
    <section className="upi-card">
      <span className="upi-eyebrow">SECURE YOUR LITTLE CREATION</span>
      <h1>Pay with <em>UPI.</em></h1>
      <p className="upi-intro">Scan the code with any UPI app to complete your payment.</p>
      {product && <div className="upi-order"><span>{product[1]}</span><strong>₹{price}</strong></div>}
      <div className="upi-qr-frame"><img src={qr} alt="UPI payment QR code for Crochella" /><span>Paytm · PhonePe · Google Pay · BHIM</span></div>
      <p className="upi-id">UPI ID <strong>{upiId}</strong></p>
      <a className="upi-open-app" href={upi}>Open UPI app {price ? 'to pay ₹'+price : ''} ↗</a>
      <p className="upi-note">After payment, send your payment screenshot and delivery details to our WhatsApp support. Your order is confirmed once we verify the payment.</p>
      <a className="upi-whatsapp" href={`https://wa.me/919044900495?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">Share payment confirmation on WhatsApp ↗</a>
      <small>Never share your UPI PIN or OTP. Crochella will never ask for them.</small>
    </section>
    <footer className="upi-footer"><a href="/shipping-policy">Shipping</a><a href="/returns-refunds">Returns & refunds</a><a href="/contact">Support</a></footer>
  </main>;
}
