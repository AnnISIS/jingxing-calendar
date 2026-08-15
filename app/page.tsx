const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v3M18 3v3M4.5 8.5h15M5.5 5h13a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" /></svg>
);

export default function Home() {
  return (
    <main className="site-shell">
      <section className="today-poster" aria-label="今日佛历海报">
        <div className="paper-grain" />
        <header className="topbar">
          <div className="brand"><span className="brand-mark">净</span><span>东林净行日历</span></div>
          <button className="ghost-button" aria-label="分享今日海报">分享</button>
        </header>

        <div className="solar-term"><i />处暑将至<i /></div>

        <div className="date-block">
          <p className="year">二〇二六 · 丙午年</p>
          <div className="day-row"><span className="month">八月</span><strong>15</strong></div>
          <p className="weekday">星期六</p>
          <p className="lunar">农历七月初三</p>
          <p className="buddhist-year">佛历二五七〇年</p>
        </div>

        <div className="sun-disc" aria-hidden="true" />
        <div className="mountains far" aria-hidden="true"><span /><span /><span /></div>
        <div className="mountains near" aria-hidden="true"><span /><span /><span /></div>
        <div className="mist mist-one" aria-hidden="true" />
        <div className="mist mist-two" aria-hidden="true" />
        <div className="lotus" aria-hidden="true"><i /><i /><i /><i /><i /></div>

        <div className="poster-note">
          <span className="seal">今日</span>
          <p>暑气渐敛，山色初澄</p>
        </div>
        <div className="scroll-cue"><span>向下查看今日法务</span><b>⌄</b></div>
      </section>

      <section className="content-sheet">
        <div className="section-heading">
          <div><p>今日 · 七月初三</p><h2>清净一日</h2></div>
          <span className="quiet-tag">普通日</span>
        </div>

        <article className="notice-card calm">
          <div className="notice-icon">莲</div>
          <div><p className="eyebrow">今日纪念</p><h3>今日无核心纪念日</h3><p className="description">下一重要圣日：大势至菩萨圣诞</p></div>
          <time>十日后</time>
        </article>

        <div className="section-title"><div><span />东林法务</div><button>查看日历</button></div>
        <article className="notice-card event-card">
          <div className="date-chip"><b>27</b><span>八月</span></div>
          <div className="event-copy"><p className="eyebrow">庐山东林寺 · 近期</p><h3>盂兰盆会</h3><p className="description">东林寺相关 · 距今12日</p></div>
          <span className="review-badge">待核验</span>
        </article>

        <details className="details-card">
          <summary><span><b>今日历法详情</b><small>公历 · 农历 · 佛历</small></span><i>＋</i></summary>
          <div className="details-grid">
            <p><span>公历</span>2026年8月15日</p><p><span>星期</span>星期六</p>
            <p><span>农历</span>丙午年七月初三</p><p><span>佛历</span>2570年</p>
          </div>
        </details>

        <p className="source-note">历法数据已核验 · 法务以寺院最新公告为准</p>
      </section>

      <nav className="bottom-nav" aria-label="主导航">
        <a className="active" href="#"><span className="today-dot">●</span><b>今日</b></a>
        <a href="#calendar"><CalendarIcon /><b>日历</b></a>
      </nav>
    </main>
  );
}
