'use client';

import NavLink from '@/components/NavLink';
import useInView from '@/hooks/useInView';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { createContext, useContext, useRef, useState } from 'react';

type HomeContext = {
  activeSection: string | null;
  sectionRefs: Record<string, React.RefObject<HTMLElement | null>>;
};

const SECTIONS = ['About', 'Experience', 'Projects', 'Blog'];
const HomeContext = createContext<HomeContext | null>(null);

/**
 * TODO:
 * debounce or whatever the section headers, or just give preference to first
 * content
 * figure out image sizing for different layouts
 *
 */

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const sectionRefs = SECTIONS.reduce(
    (acc, section) => {
      acc[section] = useRef(null);
      return acc;
    },
    {} as Record<string, React.RefObject<HTMLElement | null>>,
  );

  const activeSection = useInView({ refs: Object.values(sectionRefs) });

  return (
    <HomeContext value={{ activeSection, sectionRefs }}>
      <main className='mx-auto'>
        <div className='min-h-screen max-w-screen-xl md:flex md:justify-between md:gap-10'>{children}</div>
      </main>
    </HomeContext>
  );
};

const SplashImage = () => {
  return (
    <header className='md:sticky md:top-0 md:self-start md:py-10'>
      <div className='relative w-fit'>
        <Image
          src='/bus_cones_photo.jpeg'
          alt='Photo of the author taking a picture of some traffic cones, as a city bus passes behind.'
          height='1242'
          width='897'
        />
        <div className='absolute top-0 right-0 flex h-full w-2/3 flex-col bg-gradient-to-l from-black/80 to-transparent'>
          {[1, 2, 3].map((val) => (
            <div key={val} className='h-full w-full backdrop-blur-xs mask-to-transparent' />
          ))}
        </div>
        <div className='justify-top items-right absolute top-0 right-0 flex h-full w-2/3 flex-col pt-10 pr-10 text-white text-shadow-lg/80'>
          <h1 className='mb-4 text-right text-4xl font-bold'>Gabriel&nbsp;Ytterberg</h1>
          <p className='text-md text-right'>
            Software engineer, web developer, itinerant tinkerer, compulsive learner.
          </p>
          <NavLinks />
        </div>
      </div>
    </header>
  );
};

const NavLinks = ({ children }: { children?: React.ReactNode }) => {
  const context = useContext(HomeContext);

  // TODO: this sucks
  if (!context) {
    throw new Error('NavLinks must be used within a HomeLayout');
  }

  const { activeSection, sectionRefs } = context;

  console.log('context', context);

  return (
    <div className='flex flex-col items-end pt-20'>
      {SECTIONS.map((section) => (
        <Link
          key={section}
          href={`#${section.toLowerCase()}`}
          className={classNames(
            'text-md relative pt-5 pr-8 text-right after:absolute after:bottom-0 after:left-0 after:block after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300',
            {
              'font-bold after:scale-x-100': activeSection === section.toLowerCase(),
            },
          )}
        >
          {section}
        </Link>
      ))}
    </div>
  );
};

// TODO: basic section headers, about info, scrollable indicated by overlay text on left
// section: About/short bio
// section: Experience/short CV
// section: Projects/portfolio pieces
// section: Blog/recent posts
const Content = () => {
  return (
    <div className='md:py-10'>
      <ContentSection title='About'>
        <p>This site serves as a public portfolio and CV, both for professional work and amateur projects.</p>
        <p>This site serves as a public portfolio and CV, both for professional work and amateur projects.</p>
        <p>
          AAAaaa aaa aAAA aaaaA. AAAaaa aaa aAAA aaaaA. AAAaaa aaa aAAA aaaaA. AAAaaa aaa aAAA aaaaA. AAAaaa aaa aAAA
          aaaaA.{' '}
        </p>
        <p>
          AAAaaa aaa aAAA aaaaA. AAAaaa aaa aAAA aaaaA. AAAaaa aaa aAAA aaaaA. AAAaaa aaa aAAA aaaaA. AAAaaa aaa aAAA
          aaaaA.{' '}
        </p>
        <p>
          AAAaaa aaa aAAA aaaaA. AAAaaa aaa aAAA aaaaA. AAAaaa aaa aAAA aaaaA. AAAaaa aaa aAAA aaaaA. AAAaaa aaa aAAA
          aaaaA.{' '}
        </p>
      </ContentSection>
      <ContentSection title='Experience'>
        <p>This site serves as a public portfolio and CV, both for professional work and amateur projects.</p>
        <p>Experience experience Experience EXPERIENCE... (experience.)</p>
        <p>Experience experience Experience EXPERIENCE... (experience.)</p>
        <p>Experience experience Experience EXPERIENCE... (experience.)</p>
        <p>Experience experience Experience EXPERIENCE... (experience.)</p>
        <p>Experience experience Experience EXPERIENCE... (experience.)</p>
        <p>Experience experience Experience EXPERIENCE... (experience.)</p>
      </ContentSection>
      <ContentSection title='Projects'>
        <p>
          Something about projects are always happening and how much I respect nerds who make youtube videos but I never
          will. Blah hasdfa asdfgoaha.
        </p>
        <p>
          Something about projects are always happening and how much I respect nerds who make youtube videos but I never
          will. Blah hasdfa asdfgoaha.
        </p>
        <p>
          Something about projects are always happening and how much I respect nerds who make youtube videos but I never
          will. Blah hasdfa asdfgoaha.
        </p>
        <p>
          Something about projects are always happening and how much I respect nerds who make youtube videos but I never
          will. Blah hasdfa asdfgoaha.
        </p>
        <p>
          Something about projects are always happening and how much I respect nerds who make youtube videos but I never
          will. Blah hasdfa asdfgoaha.
        </p>
      </ContentSection>
      <ContentSection title='Blog'>
        <p>Blog blog BLOG... (blog.)</p>
        <p>Blog blog BLOG... (blog.)</p>
        <p>Blog blog BLOG... (blog.)</p>
        <p>Blog blog BLOG... (blog.)</p>
        <p>Blog blog BLOG... (blog.)</p>
        <p>Blog blog BLOG... (blog.)</p>
        <p className='pb-200'>empty space</p>
      </ContentSection>
    </div>
  );
};

type ContentSectionProps = {
  title: string;
  children: React.ReactNode;
};

const ContentSection = ({ title, children }: ContentSectionProps) => {
  const context = useContext(HomeContext);

  // TODO: this sucks
  if (!context) {
    throw new Error('NavLinks must be used within a HomeLayout');
  }

  const { sectionRefs } = context;

  return (
    <section ref={sectionRefs[title]} id={title.toLowerCase()} className='mb-10'>
      <h2 className='mb-2 text-xl font-bold'>{title}</h2>
      {children}
    </section>
  );
};

function Home() {
  return (
    <HomeLayout>
      <SplashImage />
      <Content />
    </HomeLayout>
  );
}

export default Home;
