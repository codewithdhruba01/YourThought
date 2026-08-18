export function Header() {
  return (
    <header className="w-full flex flex-col items-center justify-center text-center" style={{ marginBottom: 'clamp(2.25rem, 6vh, 3.75rem)' }}>
      <h1 className="font-brand text-[clamp(2.85rem,8vw,4.85rem)] font-medium leading-[0.92] tracking-[-0.035em] text-[#f3eee6] cursor-default">
        <span className="group/the">
          <span className="transition-colors duration-300 group-hover/the:text-paper-yellow">t</span>
          <span className="transition-colors duration-300 group-hover/the:text-paper-peach">h</span>
          <span className="transition-colors duration-300 group-hover/the:text-paper-green">e</span>
        </span>
        {' '}
        <span className="group/thought">
          <span className="transition-colors duration-300 group-hover/thought:text-paper-lavender">t</span>
          <span className="transition-colors duration-300 group-hover/thought:text-paper-green">h</span>
          <span className="transition-colors duration-300 group-hover/thought:text-paper-yellow">o</span>
          <span className="transition-colors duration-300 group-hover/thought:text-paper-peach">u</span>
          <span className="transition-colors duration-300 group-hover/thought:text-paper-green">g</span>
          <span className="transition-colors duration-300 group-hover/thought:text-paper-blue">h</span>
          <span className="transition-colors duration-300 group-hover/thought:text-paper-lavender">t</span>
        </span>
        <span className="group/ful">
          <span className="transition-colors duration-300 group-hover/ful:text-paper-green">f</span>
          <span className="transition-colors duration-300 group-hover/ful:text-paper-yellow">u</span>
          <span className="transition-colors duration-300 group-hover/ful:text-paper-peach">l</span>
          {' '}
          <span className="transition-colors duration-300 group-hover/ful:text-paper-blue">l</span>
          <span className="transition-colors duration-300 group-hover/ful:text-paper-lavender">i</span>
          <span className="transition-colors duration-300 group-hover/ful:text-paper-green">s</span>
          <span className="transition-colors duration-300">t</span>
        </span>
      </h1>
      <div className="mt-6 text-[1.1rem] font-serif text-[#f3eee66b]">
        Made with love by&nbsp;
        <a href="https://codewithdhruba.in/" className="text-[#f3eee6ad] underline decoration-[#7d9b80] decoration-[1.5px] decoration-wavy underline-offset-4 hover:text-[#f3eee6eb] transition-colors">
          codewithdhruba
        </a>
      </div>
    </header>
  );
}
