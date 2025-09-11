'use client';

import { useEffect, useState } from 'react';
import Container from '@/components/Container';

interface SizedData {
  title: string;
  description: string;
}

export default function SizedPage() {
  const [sizedData, setSizedData] = useState<SizedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSizedText, setShowSizedText] = useState(false);
  const [showOtherText, setShowOtherText] = useState(false);

  useEffect(() => {
    async function fetchSizedData() {
      try {
        const response = await fetch('/api/sized');
        if (response.ok) {
          const data = await response.json();
          setSizedData(data);
        }
      } catch (error) {
        console.error('Error fetching sized data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSizedData();
  }, []);

  useEffect(() => {
    if (!loading && sizedData) {
      // Start showing SIZED text quickly
      const sizedTimer = setTimeout(() => {
        setShowSizedText(true);
      }, 200);

      // Start fading in other text much sooner for subtlety
      const otherTimer = setTimeout(() => {
        setShowOtherText(true);
      }, 800);

      return () => {
        clearTimeout(sizedTimer);
        clearTimeout(otherTimer);
      };
    }
  }, [loading, sizedData]);

  return (
    <div className="min-h-screen bg-black">
      {/* SIZED text aligned with description */}
      <Container>
        <div className="pt-4 md:pt-6">
          <div className="max-w-4xl">
            <h1 className="text-white font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight select-none">
              SIZED
            </h1>
          </div>
        </div>
      </Container>

      {/* Description content */}
      {!loading && sizedData && (
        <Container>
          <div className="mt-6 md:mt-8">
            <div className="max-w-4xl">
              <p className="text-white text-[10px] sm:text-xs md:text-sm leading-tight whitespace-pre-wrap">
                {sizedData.description.split(/(SIZED)/g).map((part, index) => 
                  part === 'SIZED' ? (
                    <span 
                      key={index} 
                      className={`font-black transition-opacity duration-500 ease-out ${
                        showSizedText ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      SIZED
                    </span>
                  ) : (
                    <span 
                      key={index} 
                      className={`transition-opacity duration-700 ease-out ${
                        showOtherText ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {part}
                    </span>
                  )
                )}
              </p>
              
              {/* SIZED link */}
              <div className="mt-6">
                <a 
                  href="https://www.sized.ltd/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`text-white font-black text-[10px] sm:text-xs md:text-sm underline hover:opacity-70 transition-opacity duration-200 ${
                    showOtherText ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-700 ease-out`}
                >
                  SIZED
                </a>
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}
