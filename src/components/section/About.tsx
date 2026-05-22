import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AsciiMorphText from "../AsciiMorphText";
import TypewriterCarousel from "../TypewriterCarousel";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useThemeColors, withAlpha } from "../../hooks/useThemeColors";
import {
  profile1,
  profile2,
  profile3,
  stickers as stickerImages,
} from "../../assets";

const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [asciiText, setAsciiText] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  const roles = [
    "Information Systems Student",
    "Web Developer",
    "UI/UX Enthusiast",
    "IT Support Enthusiast",
  ];

  const profileImages = [
    { src: profile1, caption: "Rosa Silaban" },
    { src: profile2, caption: "Information Systems Student" },
    { src: profile3, caption: "Web Developer & IT Support Enthusiast" },
  ];

  const fullAsciiArt = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢠⡾⠲⠶⣤⣀⣠⣤⣤⣤⡿⠛⠿⡴⠾⠛⢻⡆⠀⠀⠀
⠀⠀⠀⣼⠁⠀⠀⠀⠉⠁⠀⢀⣿⠐⡿⣿⠿⣶⣤⣤⣷⡀⠀⠀
⠀⠀⠀⢹⡶⠀⠀⠀⠀⠀⠀⠈⢯⣡⣿⣿⣀⣰⣿⣦⢂⡏⠀⠀
⠀⠀⢀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠹⣍⣭⣾⠁⠀⠀
⠀⣀⣸⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣸⣧⣤⡀
⠈⠉⠹⣏⡁⠀⢸⣿⠀⠀⠀⢀⡀⠀⠀⠀⣿⠆⠀⢀⣸⣇⣀⠀
⠀⠐⠋⢻⣅⡄⢀⣀⣀⡀⠀⠯⠽⠂⢀⣀⣀⡀⠀⣤⣿⠀⠉⠀
⠀⠀⠴⠛⠙⣳⠋⠉⠉⠙⣆⠀⠀⢰⡟⠉⠈⠙⢷⠟⠈⠙⠂⠀
⠀⠀⠀⠀⠀⢻⣄⣠⣤⣴⠟⠛⠛⠛⢧⣤⣤⣀⡾⠀⠀⠀⠀⠀`;

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 3;

    const typeWriter = () => {
      if (currentIndex < fullAsciiArt.length) {
        setAsciiText(fullAsciiArt.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, typingSpeed);
      }
    };

    const startDelay = setTimeout(() => {
      typeWriter();
    }, 500);

    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false;
            return;
          }

          const rect = sectionRef.current.getBoundingClientRect();
          const sectionHeight = rect.height;
          const windowHeight = window.innerHeight;

          const visibleTop = Math.max(0, -rect.top);
          const visibleBottom = Math.min(
            sectionHeight,
            windowHeight - rect.top,
          );
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          const progress = visibleHeight / windowHeight;
          setScrollProgress(Math.min(1, Math.max(0, progress)));
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showProfileModal) {
      const timer = setTimeout(() => {
        const modal = document.querySelector(
          '[role="region"][aria-label="Profile photo carousel"]',
        ) as HTMLElement;

        if (modal) {
          modal.focus();
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [showProfileModal]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? profileImages.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === profileImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goToPrevious();
    } else if (e.key === "ArrowRight") {
      goToNext();
    } else if (e.key === "Escape") {
      setIsClosing(true);
      setTimeout(() => {
        setShowProfileModal(false);
        setIsClosing(false);
      }, 300);
    }
  };

  const stickers = [
    {
      id: 1,
      image: stickerImages[0],
      initialX: -180,
      initialY: -80,
      finalX: -550,
      finalY: -100,
      mobileInitialX: -120,
      mobileInitialY: -60,
      mobileFinalX: -250,
      mobileFinalY: -80,
    },
    {
      id: 2,
      image: stickerImages[1],
      initialX: 180,
      initialY: -60,
      finalX: 600,
      finalY: -250,
      mobileInitialX: 120,
      mobileInitialY: -40,
      mobileFinalX: 200,
      mobileFinalY: -120,
    },
    {
      id: 3,
      image: stickerImages[2],
      initialX: -160,
      initialY: 240,
      finalX: -200,
      finalY: 380,
      mobileInitialX: -100,
      mobileInitialY: 160,
      mobileFinalX: -120,
      mobileFinalY: 220,
    },
    {
      id: 4,
      image: stickerImages[3],
      initialX: 190,
      initialY: 260,
      finalX: 500,
      finalY: 150,
      mobileInitialX: 110,
      mobileInitialY: 180,
      mobileFinalX: 180,
      mobileFinalY: 120,
    },
    {
      id: 5,
      image: stickerImages[4],
      initialX: -200,
      initialY: 120,
      finalX: -200,
      finalY: -380,
      mobileInitialX: -130,
      mobileInitialY: 80,
      mobileFinalX: -130,
      mobileFinalY: -180,
    },
    {
      id: 6,
      image: stickerImages[5],
      initialX: 170,
      initialY: 100,
      finalX: 150,
      finalY: -360,
      mobileInitialX: 110,
      mobileInitialY: 70,
      mobileFinalX: 100,
      mobileFinalY: -160,
    },
    {
      id: 7,
      image: stickerImages[6],
      initialX: -130,
      initialY: -130,
      finalX: -450,
      finalY: -380,
      mobileInitialX: -90,
      mobileInitialY: -90,
      mobileFinalX: -200,
      mobileFinalY: -200,
    },
    {
      id: 8,
      image: stickerImages[7],
      initialX: 150,
      initialY: 200,
      finalX: 200,
      finalY: 350,
      mobileInitialX: 100,
      mobileInitialY: 140,
      mobileFinalX: 130,
      mobileFinalY: 200,
    },
    {
      id: 9,
      image: stickerImages[8],
      initialX: -140,
      initialY: 300,
      finalX: -500,
      finalY: 200,
      mobileInitialX: -90,
      mobileInitialY: 200,
      mobileFinalX: -180,
      mobileFinalY: 160,
    },
    {
      id: 10,
      image: stickerImages[9],
      initialX: 200,
      initialY: 120,
      finalX: 500,
      finalY: -380,
      mobileInitialX: 130,
      mobileInitialY: 80,
      mobileFinalX: 200,
      mobileFinalY: -180,
    },
    {
      id: 11,
      image: stickerImages[10],
      initialX: -220,
      initialY: -40,
      finalX: 600,
      finalY: 10,
      mobileInitialX: -140,
      mobileInitialY: -30,
      mobileFinalX: 220,
      mobileFinalY: 10,
    },
    {
      id: 12,
      image: stickerImages[11],
      initialX: 110,
      initialY: -180,
      finalX: 500,
      finalY: 300,
      mobileInitialX: 80,
      mobileInitialY: -120,
      mobileFinalX: 180,
      mobileFinalY: 180,
    },
    {
      id: 13,
      image: stickerImages[12],
      initialX: -120,
      initialY: 360,
      finalX: 500,
      finalY: -100,
      mobileInitialX: -80,
      mobileInitialY: 240,
      mobileFinalX: 180,
      mobileFinalY: -80,
    },
    {
      id: 14,
      image: stickerImages[13],
      initialX: 210,
      initialY: 40,
      finalX: -640,
      finalY: -220,
      mobileInitialX: 140,
      mobileInitialY: 30,
      mobileFinalX: -220,
      mobileFinalY: -140,
    },
    {
      id: 15,
      image: stickerImages[14],
      initialX: -100,
      initialY: 160,
      finalX: -400,
      finalY: 320,
      mobileInitialX: -70,
      mobileInitialY: 110,
      mobileFinalX: -150,
      mobileFinalY: 200,
    },
    {
      id: 16,
      image: stickerImages[15],
      initialX: 130,
      initialY: -100,
      finalX: -600,
      finalY: 100,
      mobileInitialX: 90,
      mobileInitialY: -70,
      mobileFinalX: -200,
      mobileFinalY: 80,
    },
  ];

  const getStickerStyle = (sticker: (typeof stickers)[0]) => {
    const progress = scrollProgress;
    const isMobile = window.innerWidth < 768;
    const isVerySmall = window.innerWidth < 375;

    const initialX = isMobile ? sticker.mobileInitialX : sticker.initialX;
    const initialY = isMobile ? sticker.mobileInitialY : sticker.initialY;
    const finalX = isMobile ? sticker.mobileFinalX : sticker.finalX;
    const finalY = isMobile ? sticker.mobileFinalY : sticker.finalY;

    const constrainedFinalX = isVerySmall
      ? Math.max(-100, Math.min(100, finalX * 0.3))
      : isMobile
        ? Math.max(-150, Math.min(150, finalX * 0.5))
        : finalX;

    const constrainedFinalY = isVerySmall ? finalY * 0.6 : finalY * 0.8;

    const x = initialX + (constrainedFinalX - initialX) * progress;
    const y = initialY + (constrainedFinalY - initialY) * progress;
    const scale = isVerySmall
      ? 0.4 + 0.15 * progress
      : isMobile
        ? 0.6 + 0.2 * progress
        : 0.8 + 0.4 * progress;

    const opacity = 0.9 + 0.1 * progress;
    const rotation = progress * 20;

    return {
      transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`,
      opacity,
      transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
      willChange: "transform, opacity",
      width: isVerySmall ? "50px" : isMobile ? "60px" : "80px",
      height: isVerySmall ? "50px" : isMobile ? "60px" : "80px",
      filter: `drop-shadow(0 4px 8px ${themeColors.effects.dropShadow})`,
    };
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen"
      style={{
        background:
          themeColors.background.sections?.about ||
          themeColors.background.gradient,
        transition: "background 0.3s ease-in-out",
        width: "100%",
        maxWidth: "100vw",
        contain: "layout style",
      }}
    >
      {/* Hero Section */}
      <div className="py-10 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start max-w-6xl mx-auto gap-8">
            <div className="text-left w-full md:w-auto">
              <div className="ascii-container justify-start text-3xl md:text-4xl lg:text-5xl">
                <AsciiMorphText text="Hi, I'm Rosa Silaban" />
              </div>

              <div className="hero-subtitle justify-start text-base md:text-lg lg:text-xl mt-2">
                <div className="flex flex-wrap items-center justify-start">
                  <span
                    className={
                      isDarkMode ? "hero-subtitle-dark" : "hero-subtitle-light"
                    }
                  >
                    I am a&nbsp;
                  </span>
                  <TypewriterCarousel
                    roles={roles}
                    className={
                      isDarkMode ? "hero-subtitle-dark" : "hero-subtitle-light"
                    }
                  />
                </div>
              </div>

              <div className="hero-buttons flex justify-start gap-3 mt-4">
                <button
                  className="hero-action-btn text-sm md:text-base px-4 py-2 md:px-5 md:py-2.5"
                  onClick={() => {
                    window.open("/resume.pdf", "_blank");
                  }}
                >
                  Resume →
                </button>

                <Link
                  to="/contact"
                  className="hero-action-btn text-sm md:text-base px-4 py-2 md:px-5 md:py-2.5"
                >
                  Contact →
                </Link>
              </div>
            </div>

            <div
              className="hidden md:block"
              style={{
                fontSize: "0.8rem",
                lineHeight: "1",
                fontFamily: "monospace",
                minHeight: "150px",
                color: isDarkMode
                  ? themeColors.primary
                  : themeColors.colors.pink[500],
              }}
            >
              <pre>{asciiText}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* About Section with Stickers and Custom Book */}
      <div
        className="py-8 md:py-12"
        style={{
          background: isDarkMode
            ? "transparent"
            : `linear-gradient(180deg, transparent 0%, ${withAlpha(
                themeColors.colors.pink[50],
                0.5,
              )} 50%, ${themeColors.colors.pink[25]} 100%)`,
        }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center relative min-h-[400px] md:min-h-[600px]">
            {/* Animated Stickers */}
            <div className="absolute inset-0 flex items-center justify-center">
              {stickers.map((sticker) => {
                const isVerySmall = window.innerWidth < 375;
                const isMobile = window.innerWidth < 768;

                return (
                  <img
                    key={sticker.id}
                    src={sticker.image}
                    alt=""
                    className="absolute z-10 pointer-events-none select-none"
                    style={getStickerStyle(sticker)}
                    loading={sticker.id <= 4 ? "eager" : "lazy"}
                    decoding="async"
                    width={isVerySmall ? "50" : isMobile ? "60" : "80"}
                    height={isVerySmall ? "50" : isMobile ? "60" : "80"}
                  />
                );
              })}
            </div>

            {/* Custom Journal Book */}
            <div className="w-full md:max-w-2xl lg:max-w-4xl relative z-20 px-1 md:px-0">
              <div
                className="mx-auto cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                onClick={() => setShowProfileModal(true)}
                style={{
                  maxWidth: "820px",
                  minHeight: "430px",
                  background: isDarkMode
                    ? "linear-gradient(135deg, #2b2b35 0%, #1f2430 100%)"
                    : "linear-gradient(135deg, #fffaf2 0%, #fff3dc 100%)",
                  borderRadius: "22px",
                  boxShadow: isDarkMode
                    ? "0 25px 60px rgba(0,0,0,0.45)"
                    : "0 25px 60px rgba(140,90,80,0.25)",
                  border: isDarkMode
                    ? "2px solid #3b4252"
                    : "2px solid #ead7bd",
                  display: "grid",
                  gridTemplateColumns: "1fr 18px 1fr",
                  overflow: "hidden",
                  position: "relative",
                  padding: "28px",
                }}
              >
                {/* Left Page */}
                <div
                  style={{
                    background: isDarkMode ? "#252b36" : "#fffdf7",
                    borderRadius: "16px 6px 6px 16px",
                    padding: "28px",
                    boxShadow: "inset -8px 0 20px rgba(0,0,0,0.08)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "260px",
                      margin: "0 auto",
                      background: isDarkMode ? "#384152" : "#f3d8df",
                      padding: "14px",
                      borderRadius: "8px",
                      transform: "rotate(-2deg)",
                      boxShadow: "0 12px 25px rgba(0,0,0,0.18)",
                    }}
                  >
                    <img
                      src="/profile.jpg"
                      alt="Rosa Silaban"
                      style={{
                        width: "100%",
                        height: "260px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        display: "block",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "22px",
                      fontFamily: "'DK Crayonista', cursive",
                      color: isDarkMode
                        ? themeColors.colors.pink[300]
                        : themeColors.colors.pink[500],
                      fontSize: "28px",
                      fontWeight: "bold",
                    }}
                  >
                    Rosa Silaban
                  </div>

                  <p
                    style={{
                      textAlign: "center",
                      marginTop: "6px",
                      color: isDarkMode
                        ? themeColors.colors.dark[200]
                        : themeColors.colors.dark[600],
                      fontSize: "14px",
                    }}
                  >
                    Information Systems Student
                  </p>
                </div>

                {/* Spiral Binding */}
                <div
                  style={{
                    background: isDarkMode ? "#111827" : "#d8c1a5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                    }}
                  >
                    {Array.from({ length: 13 }).map((_, index) => (
                      <span
                        key={index}
                        style={{
                          width: "22px",
                          height: "8px",
                          border: isDarkMode
                            ? "2px solid #f9a8d4"
                            : "2px solid #8b5a65",
                          borderRadius: "999px",
                          background: "transparent",
                          display: "block",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Page */}
                <div
                  style={{
                    background: isDarkMode ? "#252b36" : "#fffdf7",
                    borderRadius: "6px 16px 16px 6px",
                    padding: "34px 32px",
                    boxShadow: "inset 8px 0 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'DK Crayonista', cursive",
                      color: isDarkMode
                        ? themeColors.colors.pink[300]
                        : themeColors.colors.pink[500],
                      fontSize: "36px",
                      marginBottom: "16px",
                    }}
                  >
                    hi!
                  </h3>

                  <p
                    style={{
                      color: isDarkMode
                        ? themeColors.colors.dark[200]
                        : themeColors.colors.dark[700],
                      fontSize: "15px",
                      lineHeight: "1.9",
                      marginBottom: "14px",
                    }}
                  >
                    Saya adalah mahasiswa Sistem Informasi di Universitas IPWIJA
                    yang memiliki minat dalam pengembangan web, UI/UX Design,
                    database, dan IT Support.
                  </p>

                  <p
                    style={{
                      color: isDarkMode
                        ? themeColors.colors.dark[200]
                        : themeColors.colors.dark[700],
                      fontSize: "15px",
                      lineHeight: "1.9",
                      marginBottom: "14px",
                    }}
                  >
                    Saya terbiasa menggunakan HTML, CSS, JavaScript, Java,
                    Python, dan MySQL untuk membuat project sederhana berbasis
                    teknologi informasi.
                  </p>

                  <p
                    style={{
                      color: isDarkMode
                        ? themeColors.colors.dark[200]
                        : themeColors.colors.dark[700],
                      fontSize: "15px",
                      lineHeight: "1.9",
                    }}
                  >
                    Saya memiliki semangat belajar yang tinggi, teliti, mampu
                    bekerja sama dalam tim, dan siap mengembangkan kemampuan di
                    dunia kerja.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 ${
            isClosing ? "animate-fadeOut" : "animate-fadeIn"
          }`}
          style={{ backgroundColor: themeColors.background.overlay }}
          onClick={() => {
            setIsClosing(true);
            setTimeout(() => {
              setShowProfileModal(false);
              setIsClosing(false);
            }, 300);
          }}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div
            className={`relative w-full max-w-sm md:max-w-md ${
              isClosing ? "animate-scaleOut" : "animate-scaleIn"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full bg-black rounded-lg shadow-2xl overflow-hidden focus:outline-none"
              style={{
                aspectRatio: "4/5",
                minHeight: "300px",
                maxHeight: "80vh",
              }}
              role="region"
              aria-label="Profile photo carousel"
              aria-live="polite"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {profileImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.src}
                    alt={`Profile photo ${index + 1}`}
                    className={`absolute w-full h-full object-contain transition-opacity duration-500 ${
                      index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                    loading="eager"
                    onError={(e) => {
                      console.error("Image failed to load:", image.src);
                      e.currentTarget.style.display = "block";
                      e.currentTarget.style.backgroundColor = "#f3f4f6";
                    }}
                  />
                ))}
              </div>

              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-300"
                style={
                  {
                    backgroundColor: isDarkMode
                      ? withAlpha(themeColors.colors.dark[700], 0.9)
                      : withAlpha(themeColors.colors.white, 0.8),
                    color: isDarkMode
                      ? themeColors.colors.white
                      : themeColors.colors.dark[700],
                    border: isDarkMode ? "2px solid #374151" : "none",
                    boxShadow: isDarkMode
                      ? `0 4px 12px ${withAlpha(themeColors.colors.black, 0.6)}`
                      : undefined,
                  } as React.CSSProperties
                }
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-300"
                style={
                  {
                    backgroundColor: isDarkMode
                      ? withAlpha(themeColors.colors.dark[700], 0.9)
                      : withAlpha(themeColors.colors.white, 0.8),
                    color: isDarkMode
                      ? themeColors.colors.white
                      : themeColors.colors.dark[700],
                    border: isDarkMode ? "2px solid #374151" : "none",
                    boxShadow: isDarkMode
                      ? `0 4px 12px ${withAlpha(themeColors.colors.black, 0.6)}`
                      : undefined,
                  } as React.CSSProperties
                }
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {profileImages.length}
              </div>

              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-base font-medium max-w-[220px] text-center">
                {profileImages[currentImageIndex].caption}
              </div>
            </div>

            <div className="flex justify-center gap-0 mt-4">
              {profileImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="transition-all focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 flex items-center justify-center"
                  style={
                    {
                      minWidth: "44px",
                      minHeight: "44px",
                      padding: "0",
                      backgroundColor: "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    } as React.CSSProperties
                  }
                  aria-label={`Go to image ${index + 1}`}
                >
                  <span
                    className="rounded-full transition-all"
                    style={{
                      width: index === currentImageIndex ? "32px" : "12px",
                      height: "12px",
                      backgroundColor:
                        index === currentImageIndex
                          ? themeColors.colors.pink[300]
                          : isDarkMode
                            ? withAlpha(themeColors.colors.pink[300], 0.3)
                            : themeColors.colors.dark[300],
                    }}
                  />
                </button>
              ))}
            </div>

            <button
              className="absolute top-4 right-4 text-white rounded-full w-11 h-11 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90"
              style={{
                backgroundColor: themeColors.colors.pink[500],
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  themeColors.colors.pink[600])
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  themeColors.colors.pink[500])
              }
              aria-label="Close modal"
              onClick={(e) => {
                e.stopPropagation();
                setIsClosing(true);
                setTimeout(() => {
                  setShowProfileModal(false);
                  setIsClosing(false);
                }, 300);
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
