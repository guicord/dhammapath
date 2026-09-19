"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./MapExperience.module.css";
import { seedConcepts } from "@/content/dhamma-concepts";
import { sanitizeInlineHtml } from "@/lib/content/sanitizeInlineHtml";
import {
  LotusIcon,
  ArrowIcon,
  FlipToIcon,
  BackBtnIcon,
  HindranceHandIcon,
  BloomIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BuddhaWheelIllustration,
  WheelOfBecomingIllustration,
} from "./icons";

const conceptByMapNodeId = new Map(seedConcepts.map((c) => [c.mapNodeId, c]));

function Term({ k, children }: { k: string; children: ReactNode }) {
  return (
    <button type="button" className={styles.t} data-k={k}>
      {children}
    </button>
  );
}

export function MapExperience() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const pagesBoxRef = useRef<HTMLDivElement>(null);
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const pagenoRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const tip = tipRef.current;
    const pagesBox = pagesBoxRef.current;
    const page1 = page1Ref.current;
    const page2 = page2Ref.current;
    const prev = prevRef.current;
    const next = nextRef.current;
    const pageno = pagenoRef.current;
    const sub = subRef.current;
    const hint = hintRef.current;
    if (!wrap || !tip || !pagesBox || !page1 || !page2 || !prev || !next || !pageno || !sub || !hint) {
      return;
    }
    const pages = [page1, page2];

    const cleanups: Array<() => void> = [];
    const on = (el: EventTarget, type: string, handler: (e: Event) => void, opts?: AddEventListenerOptions) => {
      el.addEventListener(type, handler, opts);
      cleanups.push(() => el.removeEventListener(type, handler, opts));
    };

    const isInteractive = (el: EventTarget | null) =>
      el instanceof Element && !!el.closest(`button, a, input, textarea, select, .${styles.tooltip}`);

    // ---------------------------------------------------------------------
    // Tooltip
    // ---------------------------------------------------------------------
    let current: HTMLElement | null = null;

    function place(el: HTMLElement) {
      const r = el.getBoundingClientRect();
      const t = tip!.getBoundingClientRect();
      const pad = 10;
      let left = r.left + r.width / 2 - t.width / 2;
      left = Math.max(pad, Math.min(left, window.innerWidth - t.width - pad));
      let top = r.top - t.height - 9;
      if (top < pad) top = r.bottom + 9;
      tip!.style.left = left + "px";
      tip!.style.top = top + "px";
    }

    function hide(e?: Event) {
      const related = (e as FocusEvent | MouseEvent | undefined)?.relatedTarget as Node | null;
      if (related && tip!.contains(related)) return;
      tip!.classList.remove(styles.on);
      tip!.setAttribute("aria-hidden", "true");
      current = null;
    }

    function show(el: HTMLElement) {
      const concept = conceptByMapNodeId.get(el.dataset.k ?? "");
      if (!concept) return;
      tip!.innerHTML =
        `<b class="${styles.tooltipTitle}">${concept.title}</b>` +
        `<span class="${styles.tooltipBody}">${sanitizeInlineHtml(concept.explanation)}</span>` +
        `<a class="${styles.tooltipReadMore}" href="/concepts/${concept.slug}">Read more →</a>`;
      tip!.classList.add(styles.on);
      tip!.setAttribute("aria-hidden", "false");
      current = el;
      place(el);
      const readMore = tip!.querySelector("a");
      if (readMore) on(readMore, "blur", hide);
    }

    const terms = Array.from(wrap.querySelectorAll<HTMLElement>("[data-k]"));
    terms.forEach((el) => {
      on(el, "mouseenter", () => show(el));
      on(el, "mouseleave", hide);
      on(el, "focus", () => show(el));
      on(el, "blur", hide);
      on(el, "click", (e) => {
        e.stopPropagation();
        if (current === el) hide();
        else show(el);
      });
    });
    on(tip, "mouseleave", () => hide());

    // ---------------------------------------------------------------------
    // Flip cards
    // ---------------------------------------------------------------------
    const flipCards = Array.from(wrap.querySelectorAll<HTMLElement>(`.${styles.flip}`));
    flipCards.forEach((card) => {
      const set = (v: boolean) => card.classList.toggle(styles.open, v);
      const flipto = card.querySelector<HTMLElement>(`.${styles.flipto}`);
      const backbtn = card.querySelector<HTMLElement>(`.${styles.backbtn}`);
      if (flipto) {
        on(flipto, "click", (e) => {
          e.stopPropagation();
          hide();
          set(true);
        });
      }
      if (backbtn) {
        on(backbtn, "click", (e) => {
          e.stopPropagation();
          hide();
          set(false);
        });
      }
    });

    // ---------------------------------------------------------------------
    // Page chrome + navigation
    // ---------------------------------------------------------------------
    const subs = ["The path to happiness", "The nature of reality"];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pg = 0;
    let busy = false;

    function chrome(n: number) {
      sub!.textContent = subs[n];
      pageno!.textContent = `Page ${n + 1} of 2`;
      prev!.hidden = n === 0;
      next!.hidden = n === pages.length - 1;
      hint!.style.display = n === 0 ? "" : "none";
    }

    function go(n: number, dir?: number) {
      if (busy || n === pg || n < 0 || n >= pages.length) return;
      hide();
      const direction = dir || (n > pg ? 1 : -1);
      const out = pages[pg];
      const inn = pages[n];

      if (reduce) {
        out.classList.remove(styles.on);
        inn.classList.add(styles.on);
        pg = n;
        chrome(n);
        window.scrollTo({ top: 0 });
        return;
      }

      busy = true;
      const h = pagesBox!.offsetHeight;
      pagesBox!.style.minHeight = h + "px";

      out.style.setProperty("--to", (direction > 0 ? -40 : 40) + "px");
      inn.style.setProperty("--from", (direction > 0 ? 60 : -60) + "px");

      out.classList.remove(styles.on);
      out.classList.add(styles.leaving);
      inn.classList.add(styles.on, styles.anim);
      pg = n;
      chrome(n);
      window.scrollTo({ top: 0, behavior: "smooth" });

      const done = () => {
        out.classList.remove(styles.leaving);
        inn.classList.remove(styles.anim);
        out.style.transform = "";
        inn.style.transform = "";
        pagesBox!.style.minHeight = "";
        busy = false;
      };
      inn.addEventListener("animationend", done, { once: true });
      setTimeout(done, 420);
    }

    on(next, "click", (e) => {
      e.stopPropagation();
      go(pg + 1, 1);
    });
    on(prev, "click", (e) => {
      e.stopPropagation();
      go(pg - 1, -1);
    });

    // ---------------------------------------------------------------------
    // Swipe navigation (touch)
    // ---------------------------------------------------------------------
    let x0 = 0;
    let y0 = 0;
    let t0 = 0;
    let tracking = false;
    let dragging = false;
    const cur = () => pages[pg];
    const canGoDir = (dx: number) => (dx < 0 && pg < pages.length - 1) || (dx > 0 && pg > 0);

    on(
      wrap,
      "touchstart",
      (e) => {
        const te = e as TouchEvent;
        if (busy || te.touches.length !== 1) {
          tracking = false;
          return;
        }
        const t = te.touches[0];
        x0 = t.clientX;
        y0 = t.clientY;
        t0 = Date.now();
        tracking = true;
      },
      { passive: true },
    );

    on(
      wrap,
      "touchmove",
      (e) => {
        if (!tracking) return;
        const te = e as TouchEvent;
        const t = te.touches[0];
        const dx = t.clientX - x0;
        const dy = t.clientY - y0;
        if (!dragging) {
          if (Math.abs(dy) > Math.abs(dx)) {
            tracking = false;
            return;
          }
          if (Math.abs(dx) < 12) return;
          dragging = true;
          pagesBox!.classList.add(styles.dragging);
          cur().style.transition = "none";
        }
        const damp = canGoDir(dx) ? 1 : 0.28;
        const p = cur();
        p.style.transform = `translateX(${dx * damp}px)`;
        p.style.opacity = String(Math.max(0.45, 1 - (Math.abs(dx) * damp) / 480));
      },
      { passive: true },
    );

    on(
      wrap,
      "touchend",
      (e) => {
        if (!tracking) return;
        tracking = false;
        const te = e as TouchEvent;
        const t = te.changedTouches[0];
        const dx = t.clientX - x0;
        const dy = t.clientY - y0;
        const dt = Date.now() - t0;
        const fast = dt < 300 && Math.abs(dx) > 35;
        const far = Math.abs(dx) > 70;

        if (dragging) {
          const p = cur();
          p.style.transition = "";
          p.style.transform = "";
          p.style.opacity = "";
          pagesBox!.classList.remove(styles.dragging);
          dragging = false;
        }
        if (isInteractive(te.target)) return;
        if (Math.abs(dy) > 60) return;
        if (!(fast || far)) return;
        if (dx < 0) go(pg + 1, 1);
        else go(pg - 1, -1);
      },
      { passive: true },
    );

    on(
      wrap,
      "touchcancel",
      () => {
        if (dragging) {
          const p = cur();
          p.style.transition = "transform .22s ease, opacity .22s ease";
          p.style.transform = "";
          p.style.opacity = "";
          setTimeout(() => {
            p.style.transition = "";
          }, 230);
          pagesBox!.classList.remove(styles.dragging);
          dragging = false;
        }
        tracking = false;
      },
      { passive: true },
    );

    on(document, "keydown", (e) => {
      const ke = e as KeyboardEvent;
      if (isInteractive(document.activeElement)) return;
      if (ke.key === "ArrowRight") go(pg + 1, 1);
      if (ke.key === "ArrowLeft") go(pg - 1, -1);
    });

    // ---------------------------------------------------------------------
    // Trackpad / horizontal wheel navigation
    // ---------------------------------------------------------------------
    let acc = 0;
    let idle: ReturnType<typeof setTimeout> | undefined;
    let locked = false;
    let live = false;

    function settle(commit: number) {
      const p = pages[pg];
      if (live) {
        p.style.transition = "transform .2s ease, opacity .2s ease";
        p.style.transform = "";
        p.style.opacity = "";
        setTimeout(() => {
          p.style.transition = "";
        }, 210);
        live = false;
      }
      if (commit) go(commit > 0 ? pg + 1 : pg - 1, commit > 0 ? 1 : -1);
      acc = 0;
    }

    on(
      wrap,
      "wheel",
      (e) => {
        const we = e as WheelEvent;
        if (Math.abs(we.deltaX) <= Math.abs(we.deltaY)) return;
        if (busy) return;
        we.preventDefault();
        if (locked) return;

        acc += we.deltaX;
        const canGoWheel = (acc > 0 && pg < pages.length - 1) || (acc < 0 && pg > 0);
        const damp = canGoWheel ? 1 : 0.25;

        const p = pages[pg];
        if (!live) {
          p.style.transition = "none";
          live = true;
        }
        const shift = -acc * 0.55 * damp;
        p.style.transform = `translateX(${shift}px)`;
        p.style.opacity = String(Math.max(0.5, 1 - Math.abs(shift) / 460));

        clearTimeout(idle);

        if (canGoWheel && Math.abs(acc) > 110) {
          locked = true;
          const dir = acc > 0 ? 1 : -1;
          settle(dir);
          clearTimeout(idle);
          idle = setTimeout(() => {
            locked = false;
            acc = 0;
          }, 700);
          return;
        }
        idle = setTimeout(() => settle(0), 140);
      },
      { passive: false },
    );

    // ---------------------------------------------------------------------
    // Global
    // ---------------------------------------------------------------------
    on(document, "click", () => hide());
    on(document, "keydown", (e) => {
      if ((e as KeyboardEvent).key === "Escape") hide();
    });
    on(
      window,
      "scroll",
      () => {
        if (current) place(current);
      },
      { passive: true },
    );
    on(window, "resize", () => {
      if (current) place(current);
    });

    return () => {
      clearTimeout(idle);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="wrap" ref={wrapRef}>
      <header className={styles.masthead}>
        <LotusIcon className={styles.lotus} />
        <div>
          <h1>Dhamma map</h1>
          <p ref={subRef}>The path to happiness</p>
        </div>
        <LotusIcon className={styles.lotus} />
      </header>

      <p className={styles.hint} ref={hintRef}>
        Hover or tap any underlined term for its explanation. Click a card&rsquo;s arrow to turn it over.
      </p>

      <div className={styles.pages} ref={pagesBoxRef}>
        <div className={`${styles.page} ${styles.on}`} ref={page1Ref}>
          <BuddhaWheelIllustration />
          <ArrowIcon className={styles.arrow} fill="#E0518A" />

          <section className={`${styles.section} ${styles.marks}`}>
            <h2>Three Marks of Existence</h2>
            <p className={styles.pali}>
              <Term k="tilakkhana">Ti-lakkhaṇa</Term> — true of all things
            </p>
            <ul>
              <li>
                <Term k="anicca">Anicca</Term> — all <Term k="sankhata">conditioned things</Term> are impermanent
              </li>
              <li>
                <Term k="dukkha">Dukkha</Term> — all conditioned things are unsatisfactory
              </li>
              <li>
                <Term k="anatta">Anattā</Term> — all things are not-self
              </li>
            </ul>
          </section>

          <ArrowIcon className={styles.arrow} fill="#E8622F" />

          <section className={`${styles.section} ${styles.truths}`}>
            <h2>The Four Noble Truths</h2>
            <p className={styles.pali}>
              <Term k="saccani">Cattāri Ariyasaccāni</Term>
            </p>
            <ul>
              <li>
                <Term k="t1">Dukkha</Term> — there is suffering
              </li>
              <li>
                <Term k="t2">Samudaya</Term> — its origin is craving
              </li>
              <li>
                <Term k="t3">Nirodha</Term> — suffering can cease
              </li>
              <li>
                <Term k="t4">Magga</Term> — the path leading to its cessation
              </li>
            </ul>
          </section>

          <ArrowIcon className={styles.arrow} fill="#6C63E8" />

          <div className={styles.path}>
            <header>
              <h2>The Noble Eightfold Path</h2>
              <p>
                <Term k="magga">Ariyo Aṭṭhaṅgiko Magga</Term> — 8 factors in 3 trainings
              </p>
            </header>

            <div className={styles.flip} style={{ height: 250 }}>
              <div className={styles.faces}>
                <div className={`${styles.face} ${styles.front} ${styles.wisdom}`}>
                  <div>
                    <h2>Wisdom</h2>
                    <p className={styles.pali}>
                      <Term k="panna">Paññā</Term> · factors 1–2
                    </p>
                    <ul>
                      <li>
                        <Term k="p1">Right view</Term>
                      </li>
                      <li>
                        <Term k="p2">Right intention</Term>
                      </li>
                    </ul>
                  </div>
                  <button className={styles.flipto} type="button" aria-label="Wisdom examines the aggregates — turn the card">
                    <FlipToIcon fill="#6C63E8" />
                    <span>5 Aggregates</span>
                  </button>
                </div>
                <div className={`${styles.face} ${styles.back} ${styles.aggregates}`}>
                  <button className={styles.backbtn} type="button" aria-label="Turn card back">
                    <BackBtnIcon />
                    back
                  </button>
                  <h2>5 Aggregates</h2>
                  <p className={styles.pali}>
                    <Term k="khandha">Pañcakkhandha</Term>
                  </p>
                  <ul>
                    <li>
                      <Term k="rupa">Rūpa</Term> — form
                    </li>
                    <li>
                      <Term k="vedana">Vedanā</Term> — feeling
                    </li>
                    <li>
                      <Term k="sanna">Saññā</Term> — perception
                    </li>
                    <li>
                      <Term k="sankhara">Saṅkhāra</Term> — volition
                    </li>
                    <li>
                      <Term k="vinnana">Viññāṇa</Term> — consciousness
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.flip} style={{ height: 250 }}>
              <div className={styles.faces}>
                <div className={`${styles.face} ${styles.front} ${styles.conduct}`}>
                  <div>
                    <h2>Ethical conduct</h2>
                    <p className={styles.pali}>
                      <Term k="sila">Sīla</Term> · factors 3–5
                    </p>
                    <ul>
                      <li>
                        <Term k="p3">Right speech</Term>
                      </li>
                      <li>
                        <Term k="p4">Right action</Term>
                      </li>
                      <li>
                        <Term k="p5">Right livelihood</Term>
                      </li>
                    </ul>
                  </div>
                  <button className={styles.flipto} type="button" aria-label="Conduct is practised as the precepts — turn the card">
                    <FlipToIcon fill="#5FA524" />
                    <span>5 Precepts</span>
                  </button>
                </div>
                <div className={`${styles.face} ${styles.back} ${styles.precepts}`}>
                  <button className={styles.backbtn} type="button" aria-label="Turn card back">
                    <BackBtnIcon />
                    back
                  </button>
                  <h2>5 Precepts</h2>
                  <p className={styles.pali}>
                    <Term k="pancasila">Pañca Sīla</Term>
                  </p>
                  <ul>
                    <li>
                      <Term k="s1">No killing</Term>
                    </li>
                    <li>
                      <Term k="s2">No stealing</Term>
                    </li>
                    <li>
                      <Term k="s3">No sexual misconduct</Term>
                    </li>
                    <li>
                      <Term k="s4">No lying</Term>
                    </li>
                    <li>
                      <Term k="s5">No intoxicants</Term>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.flip} style={{ height: 250 }}>
              <div className={styles.faces}>
                <div className={`${styles.face} ${styles.front} ${styles.calm}`}>
                  <div>
                    <h2>Concentration</h2>
                    <p className={styles.pali}>
                      <Term k="samadhi">Samādhi</Term> · factors 6–8
                    </p>
                    <ul>
                      <li>
                        <Term k="p6">Right effort</Term>
                      </li>
                      <li>
                        <Term k="p7">Right mindfulness</Term>
                      </li>
                      <li>
                        <Term k="p8">Right concentration</Term>
                      </li>
                    </ul>
                  </div>
                  <button className={styles.flipto} type="button" aria-label="The hindrances block concentration — turn the card">
                    <HindranceHandIcon />
                    <span>5 Hindrances</span>
                  </button>
                </div>
                <div className={`${styles.face} ${styles.back} ${styles.hindrances}`}>
                  <button className={styles.backbtn} type="button" aria-label="Turn card back">
                    <BackBtnIcon />
                    back
                  </button>
                  <h2>5 Hindrances</h2>
                  <p className={styles.pali}>
                    <Term k="nivarana">Nīvaraṇa</Term>
                  </p>
                  <ul>
                    <li>
                      <Term k="h1">Sensual desire</Term>
                    </li>
                    <li>
                      <Term k="h2">Ill-will</Term>
                    </li>
                    <li>
                      <Term k="h3">Sloth and torpor</Term>
                    </li>
                    <li>
                      <Term k="h4">Restlessness</Term>
                    </li>
                    <li>
                      <Term k="h5">Doubt</Term>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <ArrowIcon className={styles.arrow} fill="#B34A24" />

          <div className={styles.works}>
            <header>
              <h2>What the path works on</h2>
              <p>Roots to pull up, fetters to cut, qualities to grow</p>
            </header>

            <section className={`${styles.section} ${styles.roots}`}>
              <h2>Three Unwholesome Roots</h2>
              <p className={styles.pali}>
                <Term k="mula">Akusala-mūla</Term> — what every harmful action grows from
              </p>
              <ul>
                <li>
                  <Term k="lobha">Lobha</Term> — greed
                </li>
                <li>
                  <Term k="dosa">Dosa</Term> — hatred
                </li>
                <li>
                  <Term k="moha">Moha</Term> — delusion
                </li>
              </ul>
            </section>

            <section className={`${styles.section} ${styles.fetters}`}>
              <h2>Ten Fetters</h2>
              <p className={styles.pali}>
                <Term k="samyojana">Saṃyojana</Term> — what binds to saṃsāra; each stage cuts some
              </p>
              <ul>
                <li>
                  <span className={styles.stage}>stream-enterer</span>
                  <Term k="f_1">Self-view</Term>
                </li>
                <li>
                  <span className={styles.stage}>stream-enterer</span>
                  <Term k="f_2">Doubt</Term>
                </li>
                <li>
                  <span className={styles.stage}>stream-enterer</span>
                  <Term k="f_3">Attachment to rites</Term>
                </li>
                <li>
                  <span className={styles.stage}>non-returner</span>
                  <Term k="f_4">Sensual desire</Term>
                </li>
                <li>
                  <span className={styles.stage}>non-returner</span>
                  <Term k="f_5">Ill-will</Term>
                </li>
                <li>
                  <span className={styles.stage}>arahant</span>
                  <Term k="f_6">Desire for form</Term>
                </li>
                <li>
                  <span className={styles.stage}>arahant</span>
                  <Term k="f_7">Desire for formlessness</Term>
                </li>
                <li>
                  <span className={styles.stage}>arahant</span>
                  <Term k="f_8">Conceit</Term>
                </li>
                <li>
                  <span className={styles.stage}>arahant</span>
                  <Term k="f_9">Restlessness</Term>
                </li>
                <li>
                  <span className={styles.stage}>arahant</span>
                  <Term k="f_10">Ignorance</Term>
                </li>
              </ul>
            </section>

            <div className={styles.flip} style={{ height: 270 }}>
              <div className={styles.faces}>
                <div className={`${styles.face} ${styles.front} ${styles.bvihara}`}>
                  <div>
                    <h2>Four Divine Abodes</h2>
                    <p className={styles.pali}>
                      <Term k="brahma">Brahmavihāra</Term> — boundless qualities to cultivate
                    </p>
                    <ul>
                      <li>
                        <Term k="metta">Mettā</Term> — loving-kindness
                      </li>
                      <li>
                        <Term k="karuna">Karuṇā</Term> — compassion
                      </li>
                      <li>
                        <Term k="mudita">Muditā</Term> — sympathetic joy
                      </li>
                      <li>
                        <Term k="upekkha">Upekkhā</Term> — equanimity
                      </li>
                    </ul>
                  </div>
                  <button className={styles.flipto} type="button" aria-label="See the near and far enemies of each abode">
                    <FlipToIcon fill="#4E7F19" />
                    <span>Near &amp; far enemies</span>
                  </button>
                </div>
                <div className={`${styles.face} ${styles.back} ${styles.bvihara}`}>
                  <button className={styles.backbtn} type="button" aria-label="Turn card back">
                    <BackBtnIcon />
                    back
                  </button>
                  <h2>Near &amp; far enemies</h2>
                  <p className={styles.pali}>What imitates each quality, and what opposes it</p>
                  <ul className={styles.enemies}>
                    <li className={styles.hd}>Divine abode</li>
                    <li className={styles.hd}>Near enemy — imitates it</li>
                    <li className={styles.hd}>Far enemy — opposes it</li>
                    <li className={styles.q}>Mettā</li>
                    <li>Sentimental attachment</li>
                    <li>Ill-will</li>
                    <li className={styles.q}>Karuṇā</li>
                    <li>Pity, looking down</li>
                    <li>Cruelty</li>
                    <li className={styles.q}>Muditā</li>
                    <li>Exuberance, false cheer</li>
                    <li>Envy</li>
                    <li className={styles.q}>Upekkhā</li>
                    <li>Indifference</li>
                    <li>Craving, anxiety</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <ArrowIcon className={styles.arrow} fill="#12A87F" />

          <section className={`${styles.section} ${styles.fruits}`}>
            <h2>Fruits of the Path</h2>
            <p className={styles.pali}>
              <Term k="phala">Phala</Term> — jhāna and the four stages of awakening
            </p>
            <ul>
              <li>
                <Term k="jhana">Jhāna</Term> — deep absorptions (via samādhi)
              </li>
              <li>
                <Term k="f1">Sotāpanna</Term> — stream-enterer
              </li>
              <li>
                <Term k="f2">Sakadāgāmi</Term> — once-returner
              </li>
              <li>
                <Term k="f3">Anāgāmi</Term> — non-returner
              </li>
              <li>
                <Term k="f4">Arahant</Term> — fully liberated
              </li>
            </ul>
          </section>

          <ArrowIcon className={styles.arrow} fill="#6C63E8" />

          <BloomIcon className={styles.bloom} />

          <div className={styles.goal}>
            <strong>Liberation</strong>
            <span>
              <Term k="nibbana">Nibbāna</Term> — end of suffering
            </span>
          </div>

          <p className={styles.legend}>Red hand = the hindrances block samādhi</p>
        </div>

        <div className={styles.page} ref={page2Ref}>
          <WheelOfBecomingIllustration />
          <p className={styles.legend} style={{ margin: "0 0 14px" }}>
            The wheel of dependent origination keeps turning …
          </p>

          <section className={`${styles.section} ${styles.marks2}`}>
            <h2>The nature of reality</h2>
            <p className={styles.pali}>
              <Term k="tilakkhana">Ti-lakkhaṇa</Term> — three marks stamped on all experience
            </p>
            <ul>
              <li>
                <Term k="anicca">Anicca</Term> — all <Term k="sankhata">saṅkhāra</Term> are impermanent
              </li>
              <li>
                <Term k="dukkha">Dukkha</Term> — all saṅkhāra are unsatisfactory
              </li>
              <li>
                <Term k="anatta">Anattā</Term> — all dhammā are not-self
              </li>
            </ul>
          </section>

          <ArrowIcon className={styles.arrow} fill="#6C63E8" />

          <section className={styles.chain}>
            <h2>Dependent origination</h2>
            <p className={styles.pali}>
              <Term k="paticca">Paṭicca-samuppāda</Term> — each link conditions the next
            </p>
            <ul className={styles.links}>
              <li>
                <span className={styles.n}>1</span>
                <Term k="L1">Avijjā</Term> — ignorance
              </li>
              <li>
                <span className={styles.n}>2</span>
                <Term k="L2">Saṅkhāra</Term> — formations
              </li>
              <li>
                <span className={styles.n}>3</span>
                <Term k="L3">Viññāṇa</Term> — consciousness
              </li>
              <li>
                <span className={styles.n}>4</span>
                <Term k="L4">Nāmarūpa</Term> — mind-body
              </li>
              <li>
                <span className={styles.n}>5</span>
                <Term k="L5">Saḷāyatana</Term> — six senses
              </li>
              <li>
                <span className={styles.n}>6</span>
                <Term k="L6">Phassa</Term> — contact
              </li>
              <li>
                <span className={styles.n}>7</span>
                <Term k="L7">Vedanā</Term> — feeling
              </li>
              <li className={styles.key}>
                <span className={styles.n}>8</span>
                <Term k="L8">Taṇhā</Term> — craving
              </li>
              <li>
                <span className={styles.n}>9</span>
                <Term k="L9">Upādāna</Term> — clinging
              </li>
              <li>
                <span className={styles.n}>10</span>
                <Term k="L10">Bhava</Term> — becoming
              </li>
              <li>
                <span className={styles.n}>11</span>
                <Term k="L11">Jāti</Term> — birth
              </li>
              <li>
                <span className={styles.n}>12</span>
                <Term k="L12">Jarāmaraṇa</Term> — ageing, death
              </li>
            </ul>
            <p className={styles.loop}>
              ↻ Link 12 feeds link 1 again — saṃsāra keeps turning.
              <br />
              Taṇhā (highlighted) is the second Noble Truth: the link to cut.
            </p>
          </section>

          <ArrowIcon className={styles.arrow} fill="#2C7BC4" />

          <section className={`${styles.section} ${styles.kamma}`}>
            <h2>Kamma and Saṃsāra</h2>
            <p className={styles.pali}>Action, its result, and the round of rebirth</p>
            <ul>
              <li>
                <Term k="kamma">Kamma</Term> — intentional action (cetanā)
              </li>
              <li>
                <Term k="vipaka">Vipāka</Term> — its ripening result
              </li>
              <li>
                <Term k="samsara">Saṃsāra</Term> — the round of rebirth
              </li>
              <li>
                <Term k="punabbhava">Punabbhava</Term> — renewed becoming
              </li>
            </ul>
          </section>

          <ArrowIcon className={styles.arrow} fill="#12A87F" />

          <div className={styles.closing}>
            <strong>Seeing this clearly is paññā</strong>
            <span>One who sees dependent origination sees the Dhamma</span>
          </div>
        </div>
      </div>

      <nav className={styles.nav}>
        <button className={`${styles.navbtn} ${styles.ghost}`} ref={prevRef} type="button" hidden>
          <ChevronLeftIcon />
          Back
        </button>
        <span className={styles.pageno} ref={pagenoRef}>
          Page 1 of 2
        </span>
        <button className={styles.navbtn} ref={nextRef} type="button">
          Next
          <ChevronRightIcon />
        </button>
      </nav>

      <div className={styles.tooltip} role="tooltip" aria-hidden="true" ref={tipRef} />
    </div>
  );
}
