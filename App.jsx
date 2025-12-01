import React, { useState, useEffect } from 'react';

export default function App(){
  const BRAND = {
    name: 'SolarCareJND',
    tagline: 'તમારા સોલારમાં અમારી કાળજી — વધુ પાવર, વધુ બચત!',
    colors: {
      blue: '#0A4BAF',
      sky: '#3DB7F2',
      sun: '#F9C529',
      orange: '#EB7A20',
      navy: '#072A4A'
    }
  };

  const [bookings, setBookings] = useState(() => {
    try{ const raw = localStorage.getItem('scj_bookings'); return raw? JSON.parse(raw):[] }catch(e){return []}
  });

  useEffect(()=>{ localStorage.setItem('scj_bookings', JSON.stringify(bookings)); }, [bookings]);

  const [form, setForm] = useState({ name:'', phone:'', address:'', kwSize:'1-5 kW', preferredDate:'', notes:'' });
  const [message, setMessage] = useState('');

  function handleChange(e){
    const {name, value} = e.target; setForm(f=>({...f,[name]:value}));
  }

  function submitBooking(e){
    e.preventDefault();
    if(!form.name || !form.phone || !form.address){ setMessage('કૃપા કરી નામ, ફોન અને સરનામું ભરો.'); return; }
    const newBooking = { id: 'bk-'+Date.now(), ...form, status:'pending', createdAt: Date.now() };
    setBookings(b=>[newBooking,...b]);
    setMessage('તમારી બુકિંગ મળી ગઈ છે! અમે ટૂંકમાં સંપર્ક કરીશું.');
    setForm({ name:'', phone:'', address:'', kwSize:'1-5 kW', preferredDate:'', notes:'' });
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="SolarCareJND" className="w-14 h-14 rounded-md object-contain" />
            <div>
              <h1 className="text-2xl font-extrabold" style={{color:BRAND.colors.navy}}>{BRAND.name}</h1>
              <p className="text-sm text-gray-600">{BRAND.tagline}</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-4">
            <a href="#services" className="text-sm hover:underline">સેવાઓ</a>
            <a href="#pricing" className="text-sm hover:underline">પ્રાઇસિંગ</a>
            <a href="#booking" className="text-sm hover:underline">બુકિંગ</a>
            <a href="#contact" className="text-sm hover:underline">કોન્ટેક્ટ</a>
          </nav>
          <a href="#booking" className="ml-4 inline-flex items-center gap-2 bg-[#0A4BAF] text-white px-4 py-2 rounded-md text-sm">બુક કરો</a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        {/* HERO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold" style={{color:BRAND.colors.navy}}>SolarCareJND</h2>
            <p className="mt-3 text-gray-700 text-lg">{BRAND.tagline}</p>

            <ul className="mt-4 grid gap-2 text-gray-700">
              <li className="flex items-start gap-3"><span className="text-xl" style={{color:BRAND.colors.sun}}>☀️</span> <div><strong>Professional cleaning</strong> — Scratch-free, water-saving methods.</div></li>
              <li className="flex items-start gap-3"><span className="text-xl" style={{color:BRAND.colors.orange}}>🧹</span> <div><strong>Before/After photos</strong> & performance check.</div></li>
              <li className="flex items-start gap-3"><span className="text-xl" style={{color:BRAND.colors.sky}}>⚡</span> <div><strong>Boost power</strong> up to 20–30% by regular cleaning.</div></li>
            </ul>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="#booking" className="px-4 py-3 bg-[#0A4BAF] text-white rounded-md shadow">બુક કરો</a>
              <a href="#contact" className="px-4 py-3 border border-gray-200 rounded-md">અમારો સંપર્ક કરો</a>
            </div>

            <div className="mt-6 text-sm text-gray-600 bg-white p-3 rounded-md border">
              <strong>Junagadh Special:</strong> Residential cleaning starting at <strong>₹249</strong>.
            </div>
          </div>

          <div className="bg-white rounded shadow p-3 flex flex-col items-center">
            <img src="/demo-photo.jpg" alt="solar demo" className="w-full h-64 object-cover rounded" />
            <p className="mt-3 text-sm text-gray-600">Real field demo — safe, efficient cleaning.</p>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="mt-12">
          <h3 className="text-2xl font-semibold" style={{color:BRAND.colors.navy}}>અમારી સેવાઓ</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            <Card title="Dry Brush Cleaning" desc="Scratch-free brushes, light dust removal" icon="🧹" />
            <Card title="Water Wash" desc="Eco water usage, streak-free finish" icon="💧" />
            <Card title="Bird-droppings & Stains" desc="Special stain removal, safe for panels" icon="🐦" />
            <Card title="Inspection & Report" desc="Before/after photo report & performance check" icon="🔍" />
            <Card title="AMC Plans" desc="Monthly / Quarterly / Yearly maintenance" icon="🔁" />
            <Card title="Commercial Cleaning" desc="Large-scale cleaning for plants" icon="🏢" />
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mt-12">
          <h3 className="text-2xl font-semibold" style={{color:BRAND.colors.navy}}>પ્રાઇસિંગ & AMC</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <PriceCard title="Residential (1-5 kW)" price="₹249 – ₹499" features={["Basic Cleaning","Photo Report"]} color={BRAND.colors.sun} />
            <PriceCard title="Residential (5-10 kW)" price="₹699 – ₹899" features={["Deep Cleaning","Minor Stain Removal"]} color={BRAND.colors.orange} />
            <PriceCard title="Commercial (10-50 kW)" price="₹1499+" features={["Team Cleaning","Custom Quote"]} color={BRAND.colors.blue} />
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold">Basic AMC</h4>
              <p className="text-sm text-gray-600">4 cleans/year, inspection</p>
            </div>
            <div>
              <h4 className="font-semibold">Standard AMC</h4>
              <p className="text-sm text-gray-600">6 cleans/year, priority slots</p>
            </div>
            <div>
              <h4 className="font-semibold">Premium AMC</h4>
              <p className="text-sm text-gray-600">12 cleans/year, full coverage</p>
            </div>
          </div>
        </section>

        {/* BOOKING */}
        <section id="booking" className="mt-12 bg-white p-6 rounded shadow">
          <h3 className="text-2xl font-semibold" style={{color:BRAND.colors.navy}}>બુકિંગ ફોર્મ</h3>
          <p className="text-sm text-gray-600">1 મિનિટમાં બુક કરો — અમારા ટેકનોશિયન તમારો સંપર્ક કરશે.</p>

          <form onSubmit={submitBooking} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="નામ" className="p-3 border rounded" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="ફોન (e.g. +91...)" className="p-3 border rounded" />
            <input name="address" value={form.address} onChange={handleChange} placeholder="સરનામું" className="p-3 border rounded" />
            <select name="kwSize" value={form.kwSize} onChange={handleChange} className="p-3 border rounded">
              <option>1-5 kW</option>
              <option>5-10 kW</option>
              <option>10-50 kW</option>
            </select>
            <input name="preferredDate" type="date" value={form.preferredDate} onChange={handleChange} className="p-3 border rounded" />
            <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="નોટ્સ" className="p-3 border rounded md:col-span-2" rows={3}></textarea>

            <div className="md:col-span-2 flex items-center gap-3">
              <button type="submit" className="px-4 py-3 bg-[#0A4BAF] text-white rounded">બુક કરો</button>
              <div className="text-sm text-green-600">{message}</div>
            </div>
          </form>

          <div className="mt-6">
            <h4 className="font-semibold">આપની બુકિંગ લિસ્ટ</h4>
            <div className="mt-2 space-y-2">
              {bookings.map(b=> (
                <div key={b.id} className="p-3 border rounded flex items-center justify-between">
                  <div>
                    <div className="font-medium">{b.name} — {b.kwSize}</div>
                    <div className="text-sm text-gray-500">{b.address} • {b.phone}</div>
                  </div>
                  <div className="text-sm text-gray-600">{new Date(b.createdAt).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-12 bg-white p-6 rounded shadow">
          <h3 className="text-2xl font-semibold" style={{color:BRAND.colors.navy}}>સંપર્ક કરો</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 border rounded">
              <h4 className="font-semibold">Call / WhatsApp</h4>
              <div className="mt-2">+91 XXXXX XXXXX</div>
            </div>
            <div className="p-4 border rounded">
              <h4 className="font-semibold">Location</h4>
              <div className="mt-2">Junagadh, Gujarat</div>
            </div>
            <div className="p-4 border rounded">
              <h4 className="font-semibold">Hours</h4>
              <div className="mt-2">Mon–Sat 8:00–18:00</div>
            </div>
          </div>
        </section>

      </main>

      <footer className="mt-12 bg-[#072A4A] text-white">
        <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold">SolarCareJND</h4>
            <div className="text-sm">Junagadh • Trusted Solar Cleaning</div>
          </div>
          <div className="text-sm">© {new Date().getFullYear()} SolarCareJND. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

function Card({ title, desc, icon }){
  return (
    <div className="bg-white p-4 rounded shadow border">
      <div className="text-3xl">{icon}</div>
      <h4 className="font-semibold mt-2">{title}</h4>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </div>
  );
}

function PriceCard({ title, price, features, color }){
  return (
    <div className="p-4 rounded shadow border bg-white">
      <h4 className="font-bold" style={{color}}>{title}</h4>
      <div className="text-2xl font-extrabold mt-2">{price}</div>
      <ul className="mt-3 text-sm text-gray-600 space-y-1">
        {features.map((f,i)=>(<li key={i}>• {f}</li>))}
      </ul>
      <div className="mt-4">
        <button className="px-4 py-2 bg-[#0A4BAF] text-white rounded">Select</button>
      </div>
    </div>
  );
}