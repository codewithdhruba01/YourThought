export function Header() {
  return (
    <header className="w-full flex flex-wrap items-center justify-between gap-x-7 gap-y-4" style={{ marginBottom: 'clamp(2.25rem, 6vh, 3.75rem)' }}>
      <div>
        <h1 className="font-brand text-[clamp(2.85rem,8vw,4.85rem)] font-medium leading-[0.92] tracking-[-0.035em] text-[#f3eee6]">
          the thoughtful list
        </h1>
        <p className="font-serif text-[1.02rem] text-[#f3eee680] mt-[1.2rem] inline-block underline decoration-[#7d9b80] decoration-[1.5px] decoration-wavy underline-offset-4">
          small things worth doing for someone else.
        </p>
      </div>
      <div className="text-[0.98rem] font-serif text-[#f3eee66b] flex items-center whitespace-nowrap ml-auto">
        Made with love by&nbsp;
        <a href="https://codewithdhruba.in/" className="text-[#f3eee6ad] underline decoration-[#7d9b80] decoration-[1.5px] decoration-wavy underline-offset-4 hover:text-[#f3eee6eb] transition-colors">
          codewithdhruba
        </a>
      </div>
    </header>
  );
}
