import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiCalendar, FiChevronRight } from 'react-icons/fi';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Button from './Button.jsx';
import { fetchPublished } from '../services/contentApi.js';
import { useEffect, useState } from 'react';

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 24 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-secondary/40 shadow-[0_0_18px_rgba(242,178,24,0.45)]"
          style={{
            left: `${(index * 41) % 100}%`,
            top: `${(index * 29) % 100}%`,
            width: `${index % 3 === 0 ? 6 : 3}px`,
            height: `${index % 3 === 0 ? 6 : 3}px`
          }}
          animate={{ y: [0, -26, 0], opacity: [0.18, 0.8, 0.18], scale: [0.9, 1.35, 0.9] }}
          transition={{ duration: 4 + (index % 6), repeat: Infinity, ease: 'easeInOut', delay: index * 0.12 }}
        />
      ))}
    </div>
  );
}

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchPublished('hero-slides')
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setSlides(data);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const fallbackSlides = [
    {
      eyebrow: 'AI Project Management',
      heading: 'Keep AI initiatives organized, on time, and ready to launch.',
      description: 'We help teams structure delivery, manage priorities, and turn ambitious AI ideas into practical execution plans.',
      primary: 'See Our Service',
      secondary: 'Book Consultation',
      metrics: ['Roadmaps', 'Milestones', 'Automation'],
      accent: 'from-primary to-secondary',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80'
    },
    {
      eyebrow: 'Website Development',
      heading: 'Professional websites that look sharp and convert visitors.',
      description: 'From landing pages to full business websites, we build polished digital experiences that support growth.',
      primary: 'View Website Service',
      secondary: 'Get Started',
      metrics: ['Landing Pages', 'Business Sites', 'SEO Ready'],
      accent: 'from-secondary to-accent',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80'
    }
  ];

  const heroSlides = slides.length > 0 ? slides : fallbackSlides;

  return (
    <section className="relative h-[calc(100vh-86px)] min-h-[590px] w-full overflow-hidden bg-primary text-white">
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
        </div>
      ) : (
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          speed={1000}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{ nextEl: '.trimurya-hero-next', prevEl: '.trimurya-hero-prev' }}
          pagination={{ clickable: true, el: '.trimurya-hero-pagination' }}
          grabCursor
          className="h-full w-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.heading || slide.slug} className="relative h-full w-full">
              {({ isActive }) => (
                <div className="relative h-full w-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${slide.accent || 'from-primary to-secondary'} opacity-20`} />
                  <motion.div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(242,178,24,0.24),transparent_30%),radial-gradient(circle_at_20%_72%,rgba(255,122,18,0.24),transparent_38%),linear-gradient(115deg,#061d5c,#0f316f_52%,#061d5c)]"
                    animate={{ scale: isActive ? 1.04 : 1, backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ scale: { duration: 5.8, ease: 'easeOut' }, backgroundPosition: { duration: 10, repeat: Infinity, ease: 'easeInOut' } }}
                    style={{ backgroundSize: '180% 180%' }}
                  />
                  {slide.image && (
                    <img
                      src={slide.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ opacity: 0.35 }}
                      loading="eager"
                    />
                  )}
                  <div className="absolute inset-0 enterprise-grid opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/55 to-slate-950/20" />
                  <FloatingParticles />

                  <div className="relative z-10 mx-auto grid h-full max-w-7xl items-start gap-10 px-4 pb-20 pt-8 sm:pt-10 lg:grid-cols-1 lg:px-8 lg:pt-9">
                    <motion.div
                      key={slide.heading || slide.slug}
                      initial={{ opacity: 0, y: 32 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                      transition={{ duration: 0.75, ease: 'easeOut' }}
                      className="mt-0 max-w-2xl rounded-2xl border border-white/15 bg-slate-950/50 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:p-7 lg:mt-0 lg:p-8"
                    >
                      <p className="mb-3 text-[11px] font-black uppercase tracking-[0.24em] text-secondary/80 sm:text-xs">{slide.eyebrow}</p>
                      <h1 className="max-w-2xl text-3xl font-black leading-[1.08] text-white sm:text-4xl lg:text-5xl xl:text-[56px]">{slide.heading}</h1>
                      <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-slate-200 sm:text-base">{slide.description}</p>
                      <div className="mt-7 flex flex-wrap gap-3">
                        <Button to={slide.primary?.toLowerCase().includes('service') ? '/services' : '/projects'} className="group px-4 py-2.5 text-sm shadow-secondary/30">
                          {slide.primary}
                          <FiChevronRight className="transition group-hover:translate-x-1" />
                        </Button>
                        <Button to="/contact" variant="ghost" className="border-white/25 bg-white/10 px-4 py-2.5 text-sm text-white hover:border-secondary/50 hover:bg-white/15 hover:text-secondary/80">
                          <FiCalendar />
                          {slide.secondary}
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {!loading && (
        <div className="pointer-events-none absolute inset-x-0 bottom-16 z-20 mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="trimurya-hero-pagination pointer-events-auto flex min-h-8 items-center gap-2" />
          <div className="pointer-events-auto flex gap-3">
            <button className="trimurya-hero-prev focus-ring grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-primary" aria-label="Previous slide">
              <FiArrowLeft />
            </button>
            <button className="trimurya-hero-next focus-ring grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-primary" aria-label="Next slide">
              <FiArrowRight />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
