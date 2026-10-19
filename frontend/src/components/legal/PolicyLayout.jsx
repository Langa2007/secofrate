import React from 'react'
import { Link } from 'react-router-dom'

const PolicyLayout = ({ eyebrow, title, intro, children }) => (
  <main className="min-h-screen bg-white px-4 pb-20 pt-32">
    <div className="mx-auto max-w-5xl">
      <header className="mb-12 border-b border-sic-gray pb-8">
        <div className="mb-3 text-xs font-bold tracking-[3px] text-sic-red">{eyebrow}</div>
        <h1 className="mb-5 text-4xl font-bold text-sic-black md:text-5xl">{title}</h1>
        <p className="max-w-3xl text-base leading-relaxed text-sic-silver md:text-lg">{intro}</p>
        <p className="mt-5 text-xs font-semibold tracking-wide text-sic-silver">Effective date: 19 October 2026</p>
      </header>

      <div className="space-y-10 text-sm leading-7 text-sic-silver md:text-base">
        {children}
      </div>

      <div className="mt-14 border-t border-sic-gray pt-7 text-sm text-sic-silver">
        <p>
          Questions about this policy? Contact Secofrate at{' '}
          <a className="font-semibold text-sic-red hover:underline" href="mailto:intel@secofrate.com">intel@secofrate.com</a>{' '}
          or call <a className="font-semibold text-sic-red hover:underline" href="tel:+254726846599">+254 726 846 599</a>.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          <Link className="text-sic-red hover:underline" to="/privacy">Privacy Policy</Link>
          <Link className="text-sic-red hover:underline" to="/cookies">Cookie Policy</Link>
          <Link className="text-sic-red hover:underline" to="/contact">Contact Secofrate</Link>
        </div>
      </div>
    </div>
  </main>
)

export const PolicySection = ({ title, children }) => (
  <section>
    <h2 className="mb-3 text-xl font-bold leading-snug text-sic-black md:text-2xl">{title}</h2>
    <div className="space-y-3">{children}</div>
  </section>
)

export const PolicyList = ({ items }) => (
  <ul className="list-disc space-y-2 pl-6 marker:text-sic-red">
    {items.map((item) => <li key={item}>{item}</li>)}
  </ul>
)

export default PolicyLayout
