const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="4.5" y="5.5" width="15" height="15" rx="2" />
    <path d="M8 3v5M16 3v5M4.5 10h15" />
  </svg>
);

export default function Home() {
  return (
    <main className="site-shell">
      <section className="today-poster memorial-poster" aria-label="观世音菩萨圣诞佛历海报">
        <div className="paper-grain" />
        <div className="sacred-frame" aria-label="观世音菩萨圣像">
          <img src="/guanyin-memorial.jpg" alt="观世音菩萨圣像，程宗元绘" />
        </div>
        <div className="image-veil" aria-hidden="true" />
        <div className="editorial-title">
          <p>农历二月十九</p>
          <h1>观世音菩萨圣诞日</h1>
          <span>2026.04.06　星期一　·　佛历2570年</span>
        </div>
      </section>

      <section className="content-sheet sacred-sheet editorial-content">
        <section className="dharma-section">
          <header><div><i />东林法务</div><a href="/calendar">进入日历</a></header>
          <article className="timeline-event">
            <time><strong>04</strong><span>四月</span></time>
            <div><p>清明祭祖法会</p><span>庐山东林寺 · 查看官方公告</span></div>
            <b>›</b>
          </article>
          <p className="event-caveat">法务信息以主办寺院最新公告为准</p>
        </section>

        <div className="next-observance">
          <span>下一重要圣日</span>
          <p>文殊菩萨圣诞　<span>五月二十日</span></p>
          <b>›</b>
        </div>
      </section>

      <nav className="bottom-nav" aria-label="主导航">
        <a className="active" href="/"><span className="today-dot">●</span><b>今日</b></a>
        <a href="/calendar"><CalendarIcon /><b>日历</b></a>
      </nav>
    </main>
  );
}
