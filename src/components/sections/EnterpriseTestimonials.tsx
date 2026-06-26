'use client';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function EnterpriseTestimonials() {
  const testimonials = [
    {
      quote: "Arbizu Labs transformed our field operations. Their offline-first architecture reduced data loss by 100% and increased operator productivity by 40%.",
      author: "Juan Pérez",
      role: "CTO at AgroTech Corp"
    },
    {
      quote: "The TitanFlow bot handles our DeFi trading with sub-10ms latency. Their blockchain expertise is unmatched.",
      author: "María González",
      role: "Head of Trading at CryptoFund"
    },
    {
      quote: "Their n8n automation workflows saved us 200+ hours per month in manual data entry. ROI was immediate.",
      author: "Carlos Rodríguez",
      role: "Operations Director at LogiTech"
    }
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-3">Testimonials</h2>
          <p className="text-3xl md:text-5xl font-serif text-white font-bold">Trusted by Industry Leaders</p>
          <p className="text-xs text-slate-500 mt-2 font-mono">*Illustrative examples of client results & references.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-8 rounded-2xl bg-zinc-950/60 border border-zinc-900 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm italic leading-relaxed mb-8">
                  "{t.quote}"
                </p>
              </div>
              <div>
                <div className="font-bold text-white text-base">{t.author}</div>
                <div className="text-xs text-zinc-500 font-mono mt-1">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
