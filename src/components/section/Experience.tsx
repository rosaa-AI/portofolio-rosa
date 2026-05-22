import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar, MapPin } from "lucide-react";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useThemeColors } from "../../hooks/useThemeColors";

const Experience = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const experiences = [
    {
      title: "Information Systems Student",
      company: "Universitas IPWIJA",
      location: "Bogor, Indonesia",
      period: "2023 - Present",
      description: [
        "Mempelajari dasar pengembangan sistem informasi, pemrograman, basis data, analisis sistem, dan teknologi informasi.",
        "Terbiasa menggunakan HTML, CSS, Java, JavaScript, Python, dan MySQL dalam pengerjaan tugas maupun project.",
        "Memiliki minat pada bidang Web Development, UI/UX Design, Database Management, dan IT Support.",
      ],
    },
    {
      title: "Web Development Project",
      company: "Academic CRUD System",
      location: "Personal / Academic Project",
      period: "2024 - 2025",
      description: [
        "Membuat sistem informasi akademik berbasis web untuk mengelola data mahasiswa, dosen, dan mata kuliah.",
        "Mengimplementasikan fitur CRUD seperti tambah data, edit data, hapus data, dan pencarian data.",
        "Menggunakan PHP, MySQL, HTML, dan CSS untuk membangun tampilan dan pengelolaan database.",
      ],
    },
    {
      title: "UI/UX Design Project",
      company: "E-Commerce App Redesign",
      location: "Personal / Academic Project",
      period: "2024 - 2025",
      description: [
        "Membuat redesign tampilan aplikasi e-commerce menggunakan Figma.",
        "Berfokus pada kemudahan navigasi, konsistensi visual, dan pengalaman pengguna yang lebih nyaman.",
        "Menyusun alur tampilan dari halaman produk hingga proses checkout agar lebih mudah dipahami pengguna.",
      ],
    },
    {
      title: "IT Support Learning",
      company: "Technical Support Preparation",
      location: "Self Learning",
      period: "2024 - Present",
      description: [
        "Mempelajari dasar troubleshooting perangkat komputer, instalasi software, dan pengecekan kendala teknis.",
        "Memahami pentingnya dokumentasi masalah, komunikasi dengan pengguna, dan penyelesaian kendala secara sistematis.",
        "Siap mengembangkan kemampuan teknis dan pelayanan pengguna di lingkungan kerja IT Support.",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="py-8 relative"
      style={{
        background:
          themeColors.background.sections?.experience ||
          themeColors.background.gradient,
        transition: "background 0.3s ease-in-out",
      }}
    >
      {/* Subtle gradient overlay for top edge blending */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "60px",
          background: isDarkMode
            ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)`
            : `linear-gradient(180deg, ${themeColors.colors.pink[25]} 0%, transparent 100%)`,
          zIndex: 1,
        }}
      />
      {/* Subtle gradient overlay for bottom edge blending to white divider */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "60px",
          background: isDarkMode
            ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)`
            : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.white} 100%)`,
          zIndex: 1,
        }}
      />
      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <h2
          className="text-4xl font-bold text-center mb-6"
          style={{
            color: isDarkMode
              ? themeColors.colors.white
              : themeColors.colors.pink[500],
          }}
        >
          Experience
        </h2>

        <div className="max-w-4xl mx-auto space-y-4">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="border-2 border-pink-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg bg-white/95 dark:bg-gray-800/95"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle
                      className="text-2xl"
                      style={{
                        color: isDarkMode
                          ? themeColors.colors.pink[300]
                          : themeColors.colors.pink[400],
                      }}
                    >
                      {exp.title}
                    </CardTitle>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-400 mt-1">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <ul className="space-y-1">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span
                        className="mr-2"
                        style={{ color: themeColors.primary }}
                      >
                        •
                      </span>
                      <span
                        className="text-sm"
                        style={{
                          color: isDarkMode
                            ? themeColors.colors.dark[200]
                            : themeColors.colors.dark[600],
                        }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
