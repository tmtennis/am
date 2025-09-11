'use client';

import Container from '@/components/Container';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PressEntry {
  outlet: string;
  title: string;
  month: string;
}

interface PressYear {
  year: number;
  entries: PressEntry[];
}

export default function StudioPage() {
  const [pressData, setPressData] = useState<PressYear[]>([]);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    fetch('/api/press')
      .then(res => res.ok ? res.json() : Promise.reject(`HTTP error! status: ${res.status}`))
      .then(setPressData)
      .catch(err => {
        console.error('Error fetching press data:', err);
        setPressData([]);
      });
  }, []);

  return (
    <Container>
      <motion.div className="relative z-10 py-16 md:py-24 space-y-16" style={{ y, opacity }}>
        <motion.div 
          className="mb-20 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h1 
            className="text-xl font-extrabold mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            STUDIO
          </motion.h1>
          
          <motion.div 
            className="space-y-8 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <p className="text-base leading-relaxed">
              Defined by a precise and architectural approach to design. Founded by Alexander May, the studio operates at the meeting point of space, object, and image, where every project is treated as a structure, measured, intentional, and complete.
            </p>
            <p className="text-sm leading-relaxed text-neutral-300">
              May's career has been shaped by an insistence on clarity and proportion. His work ranges from interiors and exhibitions to furniture and curatorial projects, always returning to the same principles: a disciplined use of material, a deep engagement with scale, and a refusal of excess.
            </p>
            <p className="text-sm leading-relaxed text-neutral-300">
              The studio's ethos is rooted in authorship. Projects are not styled but built, approached with the rigour of architecture and the sensibility of art.
            </p>
            <p className="text-sm leading-relaxed text-neutral-300">
              Light, surface, and proportion are not secondary concerns but the foundations of meaning. The results are environments and objects that stand with quiet authority, at once minimal and resonant.
            </p>
            <p className="text-sm leading-relaxed text-neutral-300">
              Alexander May Studio works across disciplines yet maintains a singular vision: to create forms that are exact, enduring, and unembellished, where nothing is arbitrary and every decision carries weight.
            </p>
          </motion.div>
        </motion.div>

        {/* Core information */}
        <div className="space-y-16 md:space-y-20 mb-20 md:mb-24">
          {/* Clients */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h2 
              className="text-lg font-extrabold mb-6 text-neutral-300"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              CLIENTS
            </motion.h2>
            
            <div className="max-w-4xl">
              <motion.p 
                className="text-sm leading-relaxed text-neutral-400 mb-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                Alexander May Studio collaborates with leading figures and institutions across design, fashion, art, and architecture.
              </motion.p>
              
              <motion.p 
                className="text-sm leading-relaxed text-neutral-400"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <span className="font-extrabold">Rick Owens</span>, <span className="font-extrabold">Dries Van Noten</span>, <span className="font-extrabold">Frieze</span>, <span className="font-extrabold">Carpenters Workshop Gallery</span>, <span className="font-extrabold">SKIMS</span>, <span className="font-extrabold">Design Miami</span>, <span className="font-extrabold">Bocci</span>, <span className="font-extrabold">Art Basel</span>, <span className="font-extrabold">USM Modular Furniture</span>, <span className="font-extrabold">SSENSE</span>, <span className="font-extrabold">ZARA</span>, <span className="font-extrabold">Edition Hotels</span>, <span className="font-extrabold">Lemaire</span>, <span className="font-extrabold">Pierre Augustin Rose</span>, <span className="font-extrabold">NM3</span>, <span className="font-extrabold">Inez & Vinoodh</span>, <span className="font-extrabold">North Six</span>, <span className="font-extrabold">Locatelli Partners</span>, <span className="font-extrabold">PIN–UP</span>, <span className="font-extrabold">Proper Hospitality</span>, among others.
              </motion.p>            </div>
          </motion.section>
        </div>

        {/* Press section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h2 
            className="text-xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            PRESS
          </motion.h2>
          <div className="space-y-6">
            {pressData.map((yearGroup: PressYear, yearIndex) => (
              <motion.div 
                key={yearGroup.year} 
                className={yearIndex > 0 ? "mt-8" : ""}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: yearIndex * 0.1,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.h3 
                  className="text-lg font-extrabold mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {yearGroup.year}
                </motion.h3>
                <div className="space-y-3">
                  {yearGroup.entries.map((entry, index) => (
                    <motion.div 
                      key={index} 
                      className="flex flex-col md:grid md:grid-cols-12 md:gap-4 gap-1 cursor-pointer group p-3 -m-3 rounded-lg transition-colors duration-300 hover:bg-black/30"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.05,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      viewport={{ once: true, margin: "-20px" }}
                      whileHover={{ 
                        x: 8,
                        scale: 1.01,
                        transition: { 
                          duration: 0.3,
                          ease: [0.25, 0.1, 0.25, 1]
                        }
                      }}
                    >
                      {/* Publication name - regular weight, left aligned */}
                      <div className="md:col-span-3">
                        <motion.span 
                          className="text-sm transition-colors duration-300 group-hover:text-white"
                          whileHover={{ 
                            scale: 1.02,
                            transition: { duration: 0.2 }
                          }}
                        >
                          {entry.outlet}
                        </motion.span>
                      </div>
                      
                      {/* Article title - regular weight, middle */}
                      <div className="md:col-span-7">
                        <motion.span 
                          className="text-sm text-neutral-300 transition-colors duration-300 group-hover:text-neutral-100"
                          whileHover={{ 
                            scale: 1.01,
                            transition: { duration: 0.2 }
                          }}
                        >
                          {entry.title}
                        </motion.span>
                      </div>
                      
                      {/* Month - left aligned, lighter */}
                      <div className="md:col-span-2">
                        <motion.span 
                          className="text-xs text-neutral-400 uppercase tracking-wide transition-colors duration-300 group-hover:text-neutral-300"
                          whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.2 }
                          }}
                        >
                          {entry.month}
                        </motion.span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </Container>
  );
}