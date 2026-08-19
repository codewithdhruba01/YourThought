export function Header() {
  return (
    <header
      className="w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4"
      style={{ marginBottom: 'clamp(2.25rem, 6vh, 3.75rem)' }}
    >
      <h1 className="font-brand text-[clamp(2.85rem,8vw,4.85rem)] font-medium leading-[0.92] tracking-[-0.035em] text-[#f3eee6] cursor-default text-center md:text-left">
        <span className="group/yours">
          <span className="transition-colors duration-300 group-hover/yours:text-paper-yellow">
            Y
          </span>
          <span className="transition-colors duration-300 group-hover/yours:text-paper-peach">
            o
          </span>
          <span className="transition-colors duration-300 group-hover/yours:text-paper-green">
            u
          </span>
          <span className="transition-colors duration-300 group-hover/yours:text-paper-blue">
            r
          </span>
          <span className="transition-colors duration-300 group-hover/yours:text-paper-lavender">
            '
          </span>
          <span className="transition-colors duration-300 group-hover/yours:text-paper-yellow">
            s
          </span>
        </span>{' '}
        <span className="group/thought">
          <span className="transition-colors duration-300 group-hover/thought:text-paper-lavender">
            t
          </span>
          <span className="transition-colors duration-300 group-hover/thought:text-paper-green">
            h
          </span>
          <span className="transition-colors duration-300 group-hover/thought:text-paper-yellow">
            o
          </span>
          <span className="transition-colors duration-300 group-hover/thought:text-paper-peach">
            u
          </span>
          <span className="transition-colors duration-300 group-hover/thought:text-paper-green">
            g
          </span>
          <span className="transition-colors duration-300 group-hover/thought:text-paper-blue">
            h
          </span>
          <span className="transition-colors duration-300 group-hover/thought:text-paper-lavender">
            t
          </span>
        </span>{' '}
        <span className="group/list">
          <span className="transition-colors duration-300 group-hover/list:text-paper-blue">
            l
          </span>
          <span className="transition-colors duration-300 group-hover/list:text-paper-lavender">
            i
          </span>
          <span className="transition-colors duration-300 group-hover/list:text-paper-green">
            s
          </span>
          <span className="transition-colors duration-300 group-hover/list:text-paper-peach">
            t
          </span>
        </span>
      </h1>
      <div className="text-[1.1rem] font-serif text-[#f3eee66b] flex-shrink-0">
        Made with love by&nbsp;
        <a
          href="https://codewithdhruba.in/"
          className="text-[#f3eee6ad] underline decoration-[#7d9b80] decoration-[1.5px] decoration-wavy underline-offset-4 hover:text-[#f3eee6eb] transition-colors"
        >
          codewithdhruba
        </a>
      </div>
    </header>
  );
}
