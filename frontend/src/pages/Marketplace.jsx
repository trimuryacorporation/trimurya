import { FiSearch, FiChevronRight, FiGlobe, FiShield } from 'react-icons/fi';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
export default function Marketplace() {
const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
return (
<div className="bg-slate-50 text-slate-950">
  <section className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
    <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-2xl">
        {/* Heading */}
        <h1 className="mt-6 text-4xl font-black leading-[1.1] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Enterprise AI Datasets
          <br />
          <span className="text-secondary">
          Built for Production
          </span>
        </h1>
        {/* Description */}
        <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
          Accelerate AI development with enterprise-grade datasets for
          Large Language Models, Speech AI, Computer Vision, OCR,
          NLP, and Generative AI. Every dataset is designed for
          scalability, compliance, and production-ready deployment.
        </p>
        {/* Highlights */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <FiShield className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">
                Enterprise Quality
              </h4>
              <p className="text-sm text-slate-500">
                Human validated datasets
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <FiGlobe className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">
                Global Coverage
              </h4>
              <p className="text-sm text-slate-500">
                150+ countries & 800+ languages
              </p>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#request-dataset"
            className="inline-flex items-center rounded-[10px] bg-secondary px-7 py-4 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
          Request Dataset →
          </a>
          <a
            href="#datasets"
            className="inline-flex items-center rounded-[10px] border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
          Browse Marketplace
          </a>
        </div>
      </div>
      <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
        <h3 className="text-2xl font-bold text-slate-900">
          Request a Consultation
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Share your requirements and our experts will contact you shortly.
        </p>
        <form className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10"
            />
          <input
            type="email"
            placeholder="Business Email"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10"
            />
          <input
            type="text"
            placeholder="Company Name"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10"
            />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10"
            />
          <textarea
            rows="4"
            placeholder="Tell us about your project..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10"
            />
          <label className="flex items-start gap-3 text-xs text-slate-500">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-slate-300 text-secondary"
            />
          <span>
          I agree to the Privacy Policy and Terms of Service.
          </span>
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-secondary py-3 font-semibold text-white transition hover:opacity-90"
            >
          Request Consultation
          </button>
        </form>
      </div>
    </div>
  </section>
  <main className="w-full px-6 py-16 lg:px-12 2xl:px-30">
    <section className="mt-20 rounded-[7px] bg-white p-8">
      <div className="grid gap-6 sm:grid-cols-3 xl:grid-cols-4">
        <div>
          <p className="text-4xl font-extrabold text-slate-950">150+</p>
          <p className="mt-2 text-sm text-slate-500">Countries Covered</p>
        </div>
        <div>
          <p className="text-4xl font-extrabold text-slate-950">800+</p>
          <p className="mt-2 text-sm text-slate-500">Languages Supported</p>
        </div>
        <div>
          <p className="text-4xl font-extrabold text-slate-950">10K+</p>
          <p className="mt-2 text-sm text-slate-500">Resource Network</p>
        </div>
        <div>
          <p className="text-4xl font-extrabold text-slate-950">50K+</p>
          <p className="mt-2 text-sm text-slate-500">Conversational Speech</p>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <label htmlFor="marketplace-search" className="sr-only">Search datasets wise</label>
          <input
            id="marketplace-search"
            placeholder="Search datasets wise"
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-900 outline-none transition focus:border-secondary/70 focus:ring-4 focus:ring-secondary/10"
          />
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
            Filter
          </span>
          {['Industry wise', 'Use Case wise', 'Language wise', 'Type wise', 'Dataset wise'].map((filter) => (
            <button
              key={filter}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <h2 className="text-3xl font-black text-slate-950">Enterprise AI Datasets</h2>
        <button className="rounded-full border border-amber-200 bg-amber-50 px-5 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100">
        Explore Datasets wise
        </button>
      </div>
      <div className="mt-8">
        <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
        }}
        className="py-4"
        >
        {[
        {
        title: 'Indian Agent to US Customer Speech Dataset in English for Finance 800Hrs',
        duration: '800 Hrs',
        type: 'ASR',
        language: 'English',
        regions: 'India → US',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'
        },
        {
        title: 'Indian Agent to US Customer Speech Dataset in English for Finance 50Hrs',
        duration: '50 Hrs',
        type: 'ASR',
        language: 'English',
        regions: 'India → US',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80'
        },
        {
        title: 'US Customer to US Customer Speech Dataset in English for Automobiles',
        duration: '50 Hrs',
        type: 'ASR',
        language: 'English',
        regions: 'US → US',
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80'
        },
        {
        title: 'Multilingual Design Interface Dataset for E-Commerce Platforms',
        duration: '120 Hrs',
        type: 'Design',
        language: 'Multi-language',
        regions: 'Global',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80'
        },
        {
        title: 'UI/UX Annotation Dataset for Mobile Applications',
        duration: '200 Hrs',
        type: 'Design',
        language: 'English + Regional',
        regions: 'India',
        image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d1a1?auto=format&fit=crop&w=800&q=80'
        },
        {
        title: 'Brand Identity Design Dataset for Enterprise Marketing',
        duration: '75 Hrs',
        type: 'Design',
        language: 'English',
        regions: 'Global',
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80'
        }
        ].map((dataset) => (
        <SwiperSlide key={dataset.title} className="h-full">
          <article className="h-full overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-lg">
            <div className="h-60 overflow-hidden bg-slate-900">
              <img src={dataset.image} alt={dataset.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-950">{dataset.title}</h3>
              <div className="mt-4 grid gap-2 text-sm text-slate-500 sm:grid-cols-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">{dataset.duration}</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">{dataset.type}</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">{dataset.language}</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">{dataset.regions}</span>
              </div>
              {dataset.type === 'ASR' 
               ? 'The audio dataset includes call center conversations featuring detailed metadata and accurate transcriptions for AI model training.' 
               : 'The design dataset includes annotated interface assets, brand elements, and visual annotations optimized for generative and computer vision models.'}
              <button className="mt-6 mx-auto flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-amber-600">
                Get Dataset
                <FiChevronRight className="h-4 w-4" />
            </button>
            </div>
          </article>
        </SwiperSlide>
        ))}
        </Swiper>
      </div>
    </section>
  </main>
</div>
);
}
