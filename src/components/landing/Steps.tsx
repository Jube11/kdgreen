const STEPS = [
  {
    num: "01",
    title: "Call or book online",
    desc: "Tell us what's going on — we give you an honest quote upfront.",
  },
  {
    num: "02",
    title: "We come to you",
    desc: "Our mechanic arrives with parts and tools ready.",
  },
  {
    num: "03",
    title: "Fix & go",
    desc: "We diagnose, repair, and get you back on the road. No hidden fees.",
  },
];

export function Steps() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="mb-14">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}
          >
            How It Works
          </p>
          <h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Three simple steps
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((s) => (
            <div key={s.num}>
              <span className="text-4xl md:text-5xl font-black text-amber-400 dark:text-yellow-400 block tracking-tight">
                {s.num}
              </span>
              <h3
                className="font-semibold text-lg mt-3 mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
