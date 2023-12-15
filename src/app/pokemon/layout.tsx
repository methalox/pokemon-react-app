import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    // I'm not a big fan of mixing tailwind classes with custom ones, but it's a personal decision.
    // Your design is not responsive, now it is
    // If the screen is small, it takes up the whole width
    // From the sm breakpoint onwards, it takes up a maximum of "md"
    <main className="pokemon-card center max-w-full sm:max-w-md">
      {children}
    </main>
  );
};

export default Layout;
