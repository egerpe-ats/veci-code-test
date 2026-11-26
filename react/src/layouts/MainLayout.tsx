import type { PropsWithChildren } from 'react';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <nav className="switcher" aria-label="Implementation">
        <a className="switcher__link" href="./index.html" aria-current="page">
          React
        </a>
        <a className="switcher__link" href="./vanilla/index.html">
          Vanilla JS
        </a>
      </nav>

      <main className="page">{children}</main>
    </>
  );
};

export default MainLayout;
