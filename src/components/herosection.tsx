'use client';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-main py-20 px-4 sm:px-6 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black mb-6 sm:mb-8 leading-tight">
        Ace Your Next Interview with <span className="text-third">QMe</span>
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-fourth font-medium max-w-2xl sm:max-w-3xl mx-auto mb-10 sm:mb-12 px-2 sm:px-0">
        Generate personalized mock interviews tailored to your industry, role, and experience level.
        Practice, get feedback, and land your dream job.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Link href="/create-interview">
          <button className="bg-third hover:bg-purple-600 text-white text-base sm:text-lg font-semibold px-6 sm:px-7 py-3 rounded-full shadow-lg transition-all duration-300 w-full sm:w-auto">
            Create Interview →
          </button>
        </Link>
        <Link href="/demo">
          <button className="bg-second hover:bg-opacity-80 text-white text-base sm:text-lg font-medium px-6 sm:px-7 py-3 rounded-full shadow transition duration-300 w-full sm:w-auto">
            Watch Demo
          </button>
        </Link>
      </div>
    </section>
  );
}
