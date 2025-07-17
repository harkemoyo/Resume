import React from 'react';
import Experience from '../components/sections/Experience';

/**
 * ExperiencePage
 *
 * Dedicated page for professional experience, reusing the main Experience component.
 */
const ExperiencePage: React.FC = () => {
  return (
    <main className="single-page-content">
      <section id="experience">
        <Experience />
      </section>
    </main>
  );
};

export default ExperiencePage;
