const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v3M18 3v3M4.5 8.5h15M5.5 5h13a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" /></svg>
);

export default function Home() {
  return (
    <main className="site-shell ordinary-site">
      <section className="ordinary-poster" aria-label="普通日佛历海报">
        <img className="amitabha-background" src="/amitabha-companion.jpg" alt="西方三圣行云图" />
        <div className="ordinary-veil" />
        <div className="paper-grain" />

        <div className="season-note"><i />立秋 · 三候</div>
        <div className="companion-seal">常随弥陀</div>

        <div className="ordinary-date">
          <p>二〇二六年八月</p>
          <strong>15</strong>
          <div><span>星期六</span><i /><span>农历七月初三</span></div>
        </div>

        <div className="ordinary-footer">
          <p>佛历二五七〇年</p>
          <span>暑气渐敛，山色初澄</span>
        </div>
      </section>

      <section className="content-sheet editorial-content ordinary-content">
        <section className="dharma-section">
          <header><div><i />近期东林法务</div><a href="#calendar">进入日历</a></header>
          <article className="timeline-event">
            <time><strong>27</strong><span>八月</span></time>
            <div><p>盂兰盆会</p><span>庐山东林寺 · 距今十二日</span></div>
            <b>›</b>
          </article>
          <p className="event-caveat">法务信息以主办寺院最新公告为准</p>
        </section>

        <div className="next-observance">
          <span>下一重要圣日</span>
          <p>大势至菩萨圣诞　<span>八月二十五日</span></p>
          <b>›</b>
        </div>

        <a className="template-link" href="/memorial">查看佛菩萨纪念日母版</a>
      </section>

      <nav className="bottom-nav" aria-label="主导航">
        <a className="active" href="#"><span className="today-dot">●</span><b>今日</b></a>
        <a href="#calendar"><CalendarIcon /><b>日历</b></a>
      </nav>
    </main>
  );
}
