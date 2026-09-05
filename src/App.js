import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Leaf, Microchip, Sun, Shield, Moon, SunMedium } from "lucide-react";

const ASSET = "/assets/";
const getImageSrc = (image) => {
  if (!image) return "";
  return (image.startsWith && (image.startsWith("http") || image.startsWith("//"))) ? image : `${ASSET}${image}`;
};

/* ── Hero carousel laptops ── */
const heroSlides = [
  {
    title: "Dell Inspiron",
    subtitle: "14 Plus 2-in-1 Laptop",
    price: "₹56,000*",
    tag: "Best Seller",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=85",
    accent: "#00b4ff",
  },
  {
    title: "Dell XPS 15",
    subtitle: "OLED Touch Display",
    price: "₹1,29,000*",
    tag: "Premium",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1400&q=85",
    accent: "#9542f1",
  },
  {
    title: "Dell Latitude",
    subtitle: "Business Ultrabook",
    price: "₹78,000*",
    tag: "Business",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1400&q=85",
    accent: "#00e5ff",
  },
  {
    title: "Dell Alienware",
    subtitle: "m16 Gaming Laptop",
    price: "₹1,89,000*",
    tag: "Gaming",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1400&q=85",
    accent: "#ff4d6d",
  },
];

const slides = [
  { type: "hero" },
  { type: "feature", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1950&q=80", title: "Secure and reliable", description: "Designed to provide secure and reliable performance for your everyday computing needs.", icon: "security" },
  { type: "feature", image: "https://images.unsplash.com/photo-1587825140708-4b1b9b6bf6b9?auto=format&fit=crop&w=1950&q=80", title: "New AI experiences", description: "Sleek 14-inch 2-in-1 with on-device Copilot+ powered by Intel® Core™ Ultra processors, with stunning performance that powers the newest AI experiences.", icon: "ai" },
  { type: "feature", image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1950&q=80", title: "Built-in sustainability", description: "Thoughtfully designed features and materials help make this device a more sustainable choice.", icon: "leaf" },
  { type: "feature", image: "https://images.unsplash.com/photo-1526403224741-9e7f6b3a9b40?auto=format&fit=crop&w=1950&q=80", title: "Powered by four modes", description: "Use the flexible 2-in-1 design in different modes depending on the way you work, create and enjoy content.", icon: "sun" },
  { type: "xps", image: "https://images.unsplash.com/photo-1587825140708-4b1b9b6bf6b9?auto=format&fit=crop&w=1200&q=80", title: "Dell XPS 13", price: "₹53,364", emi: "₹2,224" },
  { type: "accessory", image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=1200&q=80", heading: "ACCESSORIES", product: "Dell 6-in-1 USB-C Multiport Adapter", code: "DA305", originalPrice: "₹9,999/-*", offerPrice: "₹1,999/-*" },
  { type: "accessory", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80", heading: "ACCESSORIES", product: "Dell Pro 7-in-1 USB-C Travel Hub", code: "DA326", originalPrice: "₹9,999/-*", offerPrice: "₹1,999/-*" },
  { type: "offer", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80", heading: "SPECIAL OFFERS", product: "JBL Tune 770NC Headphones worth", originalPrice: "₹9,999/-*", offerPrice: "₹1,999/-*" },
];

/* ── Animation variants ── */
const fadeLeft = { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } };

/* ── Animated text: splits by word ── */
function AnimatedWords({ text, className, delay = 0, once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });
  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.55, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Animated text: splits by character ── */
function AnimatedChars({ text, className, delay = 0, once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });
  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Reveal line ── */
function RevealLine({ delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="relative overflow-hidden my-6" style={{ height: "1px" }}>
      <motion.div
        className="divider-glow absolute inset-0"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/* ── Price Badge ── */
function PriceBadge({ price, dark = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const textColor = dark ? "text-[#071a49]" : "text-white";
  const borderColor = dark ? "border-[#071a49]" : "border-cyan-400";
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.6, opacity: 0, rotate: -15 }}
      animate={inView ? { scale: 1, opacity: 1, rotate: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      className={`relative w-36 h-36 md:w-44 md:h-44 rounded-full flex items-center justify-center price-badge-glow ${textColor}`}
    >
      <div className={`absolute inset-0 rounded-full border ${borderColor}/20`} />
      <div className={`absolute inset-3 rounded-full border ${borderColor}/40`} />
      <div className={`absolute inset-6 rounded-full border ${borderColor}/60`} />
      <div className="scan-line" />
      <div className="relative text-center z-10">
        <p className="text-xs tracking-widest uppercase opacity-70">Price</p>
        <p className="text-xs tracking-widest uppercase opacity-70">Starting from</p>
        <motion.strong
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="block text-xl md:text-2xl mt-1 font-bold"
        >
          {price}
        </motion.strong>
      </div>
    </motion.div>
  );
}

/* ── Feature Icon ── */
function FeatureIcon({ type, dark }) {
  const icons = {
    ai:       <Microchip size={64} strokeWidth={1.2} />,
    leaf:     <Leaf      size={64} strokeWidth={1.2} />,
    sun:      <Sun       size={64} strokeWidth={1.2} />,
    security: <Shield    size={64} strokeWidth={1.2} />,
  };
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
      animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      className={`transition-colors duration-500 ${dark ? "text-[#0a2869]" : "text-cyan-300"}`}
    >
      {icons[type] || <div className="w-16 h-16 rounded-xl border border-current flex items-center justify-center text-3xl">✓</div>}
    </motion.div>
  );
}

/* ── Navigation arrows ── */
function Navigation({ previous, next, dark = false }) {
  const color = dark ? "text-[#071a49]" : "text-white";
  const bg    = dark ? "bg-[#071a49]/10 hover:bg-[#071a49]/20" : "bg-white/10 hover:bg-white/20";
  return (
    <div className={`absolute z-30 inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none ${color}`}>
      {[{ fn: previous, Icon: ChevronLeft }, { fn: next, Icon: ChevronRight }].map(({ fn, Icon }, i) => (
        <motion.button
          key={i}
          onClick={fn}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className={`pointer-events-auto w-11 h-11 rounded-full border border-current/40 ${bg} backdrop-blur-sm flex items-center justify-center transition-colors`}
        >
          <Icon size={22} />
        </motion.button>
      ))}
    </div>
  );
}

/* ── Footer ── */
function Footer({ dark = false }) {
  const c = dark ? "text-[#071a49]/60" : "text-white/50";
  return (
    <>
      <div className={`absolute bottom-4 left-6 md:left-12 z-20 text-[10px] tracking-wider ${c}`}>Copyright © 2025 Dell Inc.</div>
      <div className={`absolute bottom-4 right-6 md:right-12 z-20 text-[10px] tracking-wider ${c}`}>*T&Cs apply</div>
    </>
  );
}

/* ══════════════════════════════════════
   HERO CAROUSEL
══════════════════════════════════════ */
const heroImageVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "30%" : "-30%",
    scale: 1.08,
    opacity: 0,
  }),
  center: {
    x: "0%",
    scale: 1,
    opacity: 1,
  },
  exit: (dir) => ({
    x: dir > 0 ? "-30%" : "30%",
    scale: 0.94,
    opacity: 0,
  }),
};

const heroTextVariants = {
  enter: (dir) => ({ opacity: 0, y: dir > 0 ? 40 : -40, filter: "blur(6px)" }),
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit:   (dir) => ({ opacity: 0, y: dir > 0 ? -30 : 30, filter: "blur(4px)" }),
};

function HeroSlide({ dark }) {
  const [[current, dir], setCurrent] = useState([0, 1]);
  const timerRef = useRef(null);

  const paginate = useCallback((newDir) => {
    setCurrent(([prev]) => {
      const next = (prev + newDir + heroSlides.length) % heroSlides.length;
      return [next, newDir];
    });
  }, []);

  /* auto-advance every 5 s */
  useEffect(() => {
    timerRef.current = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timerRef.current);
  }, [paginate]);

  const resetTimer = (newDir) => {
    clearInterval(timerRef.current);
    paginate(newDir);
    timerRef.current = setInterval(() => paginate(1), 5000);
  };

  const hs = heroSlides[current];

  return (
    <section className={`slide overflow-hidden transition-colors duration-700 ${dark ? "bg-[#dce8ff]" : "bg-[#071a49]"}`}>

      {/* ── Full-bleed background image with parallax crossfade ── */}
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={`bg-${current}`}
          custom={dir}
          variants={heroImageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: "transform, opacity" }}
        >
          <img
            src={hs.image}
            alt={hs.title}
            className="w-full h-full object-cover"
            style={{ opacity: dark ? 0.28 : 0.65 }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Gradient overlay ── */}
      <div className={`absolute inset-0 transition-colors duration-700 pointer-events-none ${
        dark
          ? "bg-gradient-to-b from-[#dce8ff]/70 via-[#dce8ff]/20 to-[#dce8ff]/90"
          : "bg-gradient-to-b from-[#071a49]/30 via-transparent to-[#071a49]"
      }`} />

      {/* ── Accent colour tint that shifts per slide ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`tint-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: dark ? 0.06 : 0.18 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 60% 40%, ${hs.accent}, transparent 65%)` }}
        />
      </AnimatePresence>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-[13vh] px-4 text-center">

        {/* Brand label */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`text-xs tracking-[0.45em] uppercase mb-5 transition-colors duration-500 ${dark ? "text-[#071a49]/50" : "text-white/55"}`}
        >
          Dell Technologies
        </motion.div>

        {/* Slide tag pill */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`tag-${current}`}
            custom={dir}
            variants={heroTextVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block mb-4 px-4 py-1 rounded-full text-[10px] tracking-[0.3em] uppercase font-medium border"
            style={{
              borderColor: `${hs.accent}60`,
              color: dark ? "#071a49" : hs.accent,
              background: dark ? `${hs.accent}15` : `${hs.accent}20`,
            }}
          >
            {hs.tag}
          </motion.span>
        </AnimatePresence>

        {/* Title */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.h1
              key={`title-${current}`}
              custom={dir}
              variants={heroTextVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className={`text-[11vw] md:text-[7vw] font-light tracking-[-0.05em] leading-none transition-colors duration-500 ${dark ? "text-[#071a49]" : "text-white"}`}
            >
              {hs.title}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`sub-${current}`}
            custom={dir}
            variants={heroTextVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className={`text-base md:text-2xl mt-3 tracking-wide font-light transition-colors duration-500 ${dark ? "text-[#071a49]/70" : "text-white/75"}`}
          >
            {hs.subtitle}
          </motion.p>
        </AnimatePresence>

        {/* Laptop mockup image card */}
        <div className="relative mt-8 md:mt-10 w-full max-w-[520px] md:max-w-[640px] mx-auto">
          {/* Glow behind card */}
          <AnimatePresence initial={false}>
            <motion.div
              key={`glow-${current}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 rounded-2xl blur-3xl -z-10"
              style={{ background: `radial-gradient(ellipse, ${hs.accent}40, transparent 70%)` }}
            />
          </AnimatePresence>

          {/* Card frame */}
          <div className={`relative rounded-2xl overflow-hidden border transition-colors duration-500 ${dark ? "border-[#071a49]/15 bg-white/40" : "border-white/10 bg-white/5"} backdrop-blur-sm`}>
            {/* Shimmer top bar */}
            <div className="h-[3px] w-full shimmer-line relative overflow-hidden" style={{ background: `linear-gradient(90deg, transparent, ${hs.accent}, transparent)` }} />

            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={`card-img-${current}`}
                custom={dir}
                variants={{
                  enter: (d) => ({ x: d > 0 ? "18%" : "-18%", opacity: 0, scale: 1.04 }),
                  center: { x: "0%", opacity: 1, scale: 1 },
                  exit:  (d) => ({ x: d > 0 ? "-14%" : "14%", opacity: 0, scale: 0.97 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                className="float-product"
              >
                <img
                  src={hs.image}
                  alt={hs.title}
                  className="w-full h-[28vh] md:h-[36vh] object-cover object-center"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            {/* Bottom info bar */}
            <div className={`flex items-center justify-between px-5 py-3 transition-colors duration-500 ${dark ? "bg-white/60" : "bg-[#071a49]/60"} backdrop-blur-md`}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`info-${current}`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-4"
                >
                  <div>
                    <p className={`text-[10px] tracking-widest uppercase opacity-60 ${dark ? "text-[#071a49]" : "text-white"}`}>Starting from</p>
                    <p className="text-lg md:text-xl font-semibold" style={{ color: hs.accent }}>{hs.price}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => resetTimer(i > current ? 1 : -1)}
                    className="rounded-full transition-all duration-400 focus:outline-none"
                    style={{
                      width: i === current ? "20px" : "7px",
                      height: "7px",
                      background: i === current ? hs.accent : (dark ? "rgba(7,26,73,0.3)" : "rgba(255,255,255,0.35)"),
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Prev / Next arrows ── */}
      <div className="absolute z-20 inset-x-3 md:inset-x-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
        {[{ dir: -1, Icon: ChevronLeft }, { dir: 1, Icon: ChevronRight }].map(({ dir: d, Icon }) => (
          <motion.button
            key={d}
            onClick={() => resetTimer(d)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.88 }}
            className={`pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full border backdrop-blur-sm flex items-center justify-center transition-colors ${
              dark
                ? "border-[#071a49]/30 bg-white/40 text-[#071a49] hover:bg-white/70"
                : "border-white/25 bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <Icon size={20} />
          </motion.button>
        ))}
      </div>

      {/* ── Progress bar ── */}
      <div className={`absolute bottom-16 left-1/2 -translate-x-1/2 z-20 w-32 h-[2px] rounded-full overflow-hidden ${dark ? "bg-[#071a49]/15" : "bg-white/15"}`}>
        <motion.div
          key={current}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full rounded-full"
          style={{ background: hs.accent }}
        />
      </div>

      <Footer dark={dark} />
    </section>
  );
}

/* ══════════════════════════════════════
   FEATURE SLIDE
══════════════════════════════════════ */
function FeatureSlide({ slide, dark }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section className={`slide transition-colors duration-500 ${dark ? "bg-[#dce8ff]" : "bg-[#071a49]"}`} ref={ref}>
      <motion.img
        src={getImageSrc(slide.image)}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.06, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: dark ? 0.25 : 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <div className={`absolute inset-0 transition-colors duration-500 ${
        dark
          ? "bg-gradient-to-b from-[#dce8ff]/70 via-[#dce8ff]/30 to-[#dce8ff]"
          : "bg-gradient-to-b from-[#071a49]/5 via-transparent to-[#071a49]"
      }`} />

      <div className="relative z-10 min-h-screen flex items-end pb-[12vh] px-6 md:px-[22vw]">
        <div className="max-w-2xl">
          <FeatureIcon type={slide.icon} dark={dark} />
          <div className="mt-6 overflow-hidden">
            <h2 className={`text-4xl md:text-[4.5vw] font-light tracking-[-0.03em] leading-tight transition-colors duration-500 ${
              dark ? "text-[#071a49]" : "text-white"
            }`}>
              <AnimatedWords text={slide.title} delay={0.1} />
            </h2>
          </div>
          <RevealLine delay={0.3} />
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className={`text-base md:text-xl font-light leading-relaxed transition-colors duration-500 ${
              dark ? "text-[#071a49]/75" : "text-white/85"
            }`}
          >
            {slide.description}
          </motion.p>
        </div>
      </div>

      <div className="absolute z-20 right-[5vw] bottom-[10vh]">
        <PriceBadge price="₹56,000*" dark={dark} />
      </div>
      <Footer dark={dark} />
    </section>
  );
}

/* ══════════════════════════════════════
   XPS SLIDE
══════════════════════════════════════ */
function XpsSlide({ slide, goTo, index, dark }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section className={`slide transition-colors duration-500 ${dark ? "bg-[#e8eeff]" : "bg-[#061536]"}`} ref={ref}>
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        dark ? "opacity-0" : "opacity-100"
      } bg-[radial-gradient(ellipse_at_25%_50%,rgba(103,67,255,0.4),transparent_50%),linear-gradient(135deg,#061536,#071f4f)]`} />
      {dark && <div className="absolute inset-0 bg-gradient-to-br from-[#dce8ff] to-[#e8eeff]" />}

      <motion.div
        className="absolute left-[2%] md:left-[6%] top-[18%] w-[46%] md:w-[48%] float-product"
        initial={{ opacity: 0, x: -80, scale: 0.85 }}
        animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={getImageSrc(slide.image)} alt="" className="w-full h-auto object-contain max-h-[60vh]" />
      </motion.div>

      <motion.div
        className={`absolute left-[50%] top-[22%] max-w-[44%] transition-colors duration-500 ${
          dark ? "text-[#071a49]" : "text-white"
        }`}
        variants={fadeLeft}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-4xl md:text-6xl font-light leading-tight">
          <AnimatedChars text={slide.title} delay={0.3} />
        </h2>
        <RevealLine delay={0.5} />
        {[
          { label: "Starting from", value: slide.price },
          { label: "EMI starting at", value: slide.emi },
        ].map(({ label, value }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 + i * 0.2 }}
            className={i > 0 ? "mt-5" : ""}
          >
            <p className={`text-sm md:text-lg tracking-wide ${dark ? "text-[#071a49]/60" : "text-white/70"}`}>{label}</p>
            <p className="text-3xl md:text-5xl font-light text-gradient-blue">{value}</p>
            {i === 0 && <div className={`w-48 h-px mt-4 ${dark ? "bg-[#071a49]/20" : "bg-white/20"}`} />}
          </motion.div>
        ))}
        {/* . */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className={`mt-8 px-8 py-3 rounded-lg border text-sm tracking-widest uppercase transition-colors ${
            dark
              ? "border-[#071a49]/40 bg-[#071a49]/10 hover:bg-[#071a49]/20 text-[#071a49]"
              : "border-indigo-400/60 bg-indigo-700/50 hover:bg-indigo-600/70 text-white"
          }`}
        >
          Know More
        </motion.button>
      </motion.div>

      <Navigation previous={() => goTo(index - 1)} next={() => goTo(index + 1)} dark={dark} />
      <Footer dark={dark} />
    </section>
  );
}

/* ══════════════════════════════════════
   ACCESSORY / OFFER SLIDE
══════════════════════════════════════ */
function AccessorySlide({ slide, isOffer = false, goTo, index, dark }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const bg   = dark
    ? (isOffer ? "bg-[#f5f8ff]" : "bg-[#e0eaff]")
    : (isOffer ? "bg-[#e7edf4]" : "bg-[#0a2869]");
  const text = dark ? "text-[#071a49]" : (isOffer ? "text-[#071a49]" : "text-white");
  const priceColor = dark ? "text-[#0a2869]" : "text-cyan-400";

  return (
    <section className={`slide transition-colors duration-500 ${bg} ${text}`} ref={ref}>
      <motion.div
        className="absolute left-[2%] md:left-[4%] top-[20%] w-[44%] md:w-[46%] float-product"
        initial={{ opacity: 0, x: -60, scale: 0.88 }}
        animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={getImageSrc(slide.image)} alt="" className="w-full h-auto object-contain max-h-[60vh]" />
      </motion.div>

      <motion.div
        className="absolute left-[49%] top-[25%] max-w-[45%]"
        variants={fadeLeft}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={inView ? { opacity: 1, letterSpacing: "0.35em" } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xs uppercase font-medium opacity-60 mb-3"
        >
          {slide.heading}
        </motion.p>
        <h2 className="text-3xl md:text-5xl font-light tracking-wide leading-tight">
          <AnimatedWords text={slide.heading} delay={0.2} />
        </h2>
        <RevealLine delay={0.4} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base md:text-xl leading-relaxed"
        >
          {slide.product}
        </motion.p>
        {slide.code && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.6 } : {}}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="text-sm mt-1 tracking-widest"
          >
            {slide.code}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-6 text-base md:text-xl"
        >
          <s className="opacity-50 mr-2">{slide.originalPrice}</s>
          <motion.strong
            initial={{ scale: 0.8 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            className={`text-xl md:text-2xl ${priceColor}`}
          >
            at {slide.offerPrice}
          </motion.strong>
        </motion.div>
      </motion.div>

      <Navigation previous={() => goTo(index - 1)} next={() => goTo(index + 1)} dark={dark || isOffer} />
      <Footer dark={dark || isOffer} />
    </section>
  );
}

/* ══════════════════════════════════════
   HEADER
══════════════════════════════════════ */
function Header({ active, dark, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerBg = dark
    ? scrolled ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/10" : "bg-white"
    : scrolled ? "bg-[#071a49]/95 backdrop-blur-md shadow-lg shadow-black/30" : "bg-[#071a49]";
  const textColor  = dark ? "text-[#071a49]" : "text-white";
  const dotInactive = dark ? "bg-[#071a49]/25" : "bg-white/30";
  const borderColor = dark ? "border-[#071a49]/50" : "border-white/50";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${headerBg} ${textColor}`}
    >
      <motion.div className="text-xl tracking-tight" whileHover={{ scale: 1.03 }}>
        <span className="font-bold">DELL</span>{" "}
        <span className="font-light opacity-80">Technologies</span>
      </motion.div>

      {/* <div className="hidden md:flex items-center gap-2">
        {slides.map((_, i) => (
          <motion.div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === active ? "w-6 h-2 nav-dot-active" : `w-2 h-2 ${dotInactive}`
            }`}
            whileHover={{ scale: 1.3 }}
          />
        ))}
      </div> */}

      <div className="flex items-center gap-3">
        <motion.button
          onClick={toggleDark}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          className={`w-11 h-11 rounded-full border ${borderColor} flex items-center justify-center transition-colors hover:border-cyan-400`}
          aria-label="Toggle dark/light mode"
        >
          <AnimatePresence mode="wait" initial={false}>
            {dark ? (
              <motion.span
                key="sun"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <SunMedium size={18} />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <Moon size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.div
          whileHover={{ scale: 1.08 }}
          className={`w-11 h-11 rounded-full border ${borderColor} flex items-center justify-center text-[8px] text-center leading-tight tracking-wider cursor-pointer transition-colors`}
        >
          TRUST<br />2025
        </motion.div>
      </div>
    </motion.header>
  );
}

/* ══════════════════════════════════════
   APP
══════════════════════════════════════ */
export default function App() {
  const [active, setActive] = useState(0);
  const [dark, setDark] = useState(false);

  const toggleDark = () => setDark(d => !d);

  useEffect(() => {
    document.documentElement.classList.toggle("light-mode", dark);
  }, [dark]);

  const goTo = (index) => {
    const next = Math.max(0, Math.min(slides.length - 1, index));
    setActive(next);
    document.getElementById(`slide-${next}`)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActive(Number(e.target.dataset.index));
      }),
      { threshold: 0.5 }
    );
    slides.forEach((_, i) => {
      const el = document.getElementById(`slide-${i}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") goTo(active + 1);
      if (e.key === "ArrowUp"   || e.key === "PageUp")   goTo(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const renderSlide = (slide, index) => {
    const props = { slide, goTo, index, dark };
    if (slide.type === "hero")      return <HeroSlide dark={dark} />;
    if (slide.type === "feature")   return <FeatureSlide {...props} />;
    if (slide.type === "xps")       return <XpsSlide {...props} />;
    if (slide.type === "accessory") return <AccessorySlide {...props} />;
    return <AccessorySlide {...props} isOffer />;
  };

  return (
    <main className={`transition-colors duration-500 ${dark ? "bg-[#f0f4ff]" : "bg-[#071a49]"}`}>
      {/* Particles */}
      <div className={`particles transition-opacity duration-500 ${dark ? "opacity-40" : "opacity-100"}`}>
        {Array.from({ length: 20 }).map((_, i) => <div key={i} className="particle" />)}
      </div>

      <Header active={active} dark={dark} toggleDark={toggleDark} />

      {/* Slide counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className={`fixed z-50 left-1/2 -translate-x-1/2 bottom-5 px-5 py-2 rounded-full backdrop-blur-md border text-xs tracking-[0.3em] transition-colors duration-500 ${
          dark
            ? "bg-white/80 border-[#071a49]/20 text-[#071a49]/70"
            : "bg-[#071a49]/80 border-white/10 text-white/70"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={active}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
          >
            {String(active + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
        {" / "}
        {slides.length}
      </motion.div>

      {/* Side navigation dots */}
      {/* <div className="fixed z-50 right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
        {slides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            whileHover={{ scale: 1.4 }}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? "w-2.5 h-2.5 nav-dot-active"
                : `w-2 h-2 ${dark ? "bg-[#071a49]/30 hover:bg-[#071a49]/60" : "bg-white/30 hover:bg-white/60"}`
            }`}
          />
        ))}
      </div> */}

      {slides.map((slide, index) => (
        <div
          id={`slide-${index}`}
          data-index={index}
          key={index}
          className="relative"
        >
          {renderSlide(slide, index)}
          {slide.type !== "hero" && slide.type !== "xps" && slide.type !== "feature" && (
            <Navigation
              previous={() => goTo(index - 1)}
              next={() => goTo(index + 1)}
              dark={dark || slide.type === "offer"}
            />
          )}
        </div>
      ))}
    </main>
  );
}
