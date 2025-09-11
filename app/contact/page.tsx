'use client';

import { useEffect, useState } from 'react';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';

export default function ContactPage() {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Format date as MM/DD/YY
      const date = now.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit'
      });
      
      // Format time as HH:MM:SS AM/PM
      const time = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      setCurrentDate(date);
      setCurrentTime(time);
    };

    // Update immediately
    updateDateTime();
    
    // Update every second
    const interval = setInterval(updateDateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);
  return (
    <Container>
      <div className="pt-4 md:pt-6">
        <div className="max-w-4xl">
          <h1 className="text-white text-xl font-extrabold mb-6 md:mb-8">
            CONTACT
          </h1>
        </div>
      </div>
      
      <div className="mt-6 md:mt-8">
        <div className="max-w-4xl space-y-6">
          <section>
            <h3 className="text-white font-black text-[10px] sm:text-xs md:text-sm leading-tight mb-1">General</h3>
            <p>
              <a 
                href="mailto:hello@alexandermay.studio" 
                className="text-white text-[10px] sm:text-xs md:text-sm leading-tight transition-opacity duration-200 hover:opacity-70"
              >
                hello@alexandermay.studio
              </a>
            </p>
          </section>

          <section>
            <h3 className="text-white font-black text-[10px] sm:text-xs md:text-sm leading-tight mb-1">Press</h3>
            <p>
              <a 
                href="mailto:press@alexandermay.studio" 
                className="text-white text-[10px] sm:text-xs md:text-sm leading-tight transition-opacity duration-200 hover:opacity-70"
              >
                press@alexandermay.studio
              </a>
            </p>
          </section>

          <section>
            <h3 className="text-white font-black text-[10px] sm:text-xs md:text-sm leading-tight mb-1">Jobs</h3>
            <p>
              <a 
                href="mailto:jobs@alexandermay.studio"
                className="text-white text-[10px] sm:text-xs md:text-sm leading-tight transition-opacity duration-200 hover:opacity-70"
              >
                jobs@alexandermay.studio
              </a>
            </p>
          </section>

          <section className="pt-3 border-t border-white/20">
            <div className="space-y-1">
              <p className="text-white text-[10px] sm:text-xs md:text-sm leading-tight">New York City</p>
              <p className="text-white text-[10px] sm:text-xs md:text-sm leading-tight">{currentDate}</p>
              <p className="text-white text-[10px] sm:text-xs md:text-sm leading-tight">{currentTime}</p>
            </div>
          </section>

          <section className="pt-3 border-t border-white/20">
            <p>
              <a 
                href="https://instagram.com/alexandermaystudio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-[10px] sm:text-xs md:text-sm leading-tight transition-opacity duration-200 hover:opacity-70"
              >
                Instagram
              </a>
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
