const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v3M18 3v3M4.5 8.5h15M5.5 5h13a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" /></svg>
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

      <section className="content-sheet sacred-sheet">
        <div className="section-heading">
          <div><p>今日 · 二月十九</p><h2>观音圣诞</h2></div>
          <span className="quiet-tag sacred-tag">重要圣日</span>
        </div>

        <article className="memorial-detail-card">
          <span className="lotus-mark">莲</span>
          <div><p className="eyebrow">今日纪念</p><h3>观世音菩萨圣诞</h3><p className="description">纪念观世音菩萨大悲愿行的传统佛教节日</p></div>
          <button aria-label="查看纪念日依据">依据</button>
        </article>

        <div className="name-card"><span>圣号</span><p>南无大悲观世音菩萨</p><small>点击可查看经典依据</small></div>

        <div className="section-title"><div><span />东林法务</div><button>查看日历</button></div>
        <article className="notice-card event-card">
          <div className="date-chip"><b>04</b><span>四月</span></div>
          <div className="event-copy"><p className="eyebrow">庐山东林寺 · 今日附近</p><h3>清明祭祖法会</h3><p className="description">示意法讯 · 正式上线前核验官方公告</p></div>
          <span className="review-badge">待核验</span>
        </article>

        <details className="details-card">
          <summary><span><b>今日历法详情</b><small>公历 · 农历 · 佛历</small></span><i>＋</i></summary>
          <div className="details-grid">
            <p><span>公历</span>2026年4月6日</p><p><span>星期</span>星期一</p>
            <p><span>农历</span>丙午年二月十九</p><p><span>佛历</span>2570年</p>
          </div>
        </details>
        <p className="source-note">纪念日数据已交叉核验 · 法务以寺院最新公告为准</p>
      </section>

      <nav className="bottom-nav" aria-label="主导航">
        <a className="active" href="#"><span className="today-dot">●</span><b>今日</b></a>
        <a href="#calendar"><CalendarIcon /><b>日历</b></a>
      </nav>
    </main>
  );
}
