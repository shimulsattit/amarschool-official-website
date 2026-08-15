import { useState, FormEvent } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
  FileText,
  ExternalLink,
  Edit3,
  Plus,
  X,
  Save,
  CheckCircle2,
  Trash2,
  Sliders,
  Type,
  Layout,
  HelpCircle,
  Smartphone,
} from "lucide-react";

interface PageItem {
  id: number;
  title: string;
  slug: string;
  status: string;
  updated_at: string;
  content: {
    heroKicker?: string;
    heroHeading?: string;
    heroDescription?: string;
    heroButtonText?: string;
    whyTitle?: string;
    whyDescription?: string;
    featuresKicker?: string;
    featuresTitle?: string;
    appTitle?: string;
    appDescription?: string;
    faqTitle?: string;
  };
}

interface Props {
  pages: PageItem[];
}

export default function Pages({ pages: initialPages }: Props) {
  const defaultHomeContent = {
    heroKicker: "Manage School Easily",
    heroHeading: "Amar School Education Management System",
    heroDescription:
      "Amar School is a completely online school management software. It is a one stop solution to manage students, teachers, guardians, academics and accounts of your institute.",
    heroButtonText: "Request A Demo",
    whyTitle: "Completed School Management System",
    whyDescription:
      "Amarschool is a cloud based school management software that helps you to manage all your school work easily. It is designed with the latest technology and can be accessed from any device.",
    featuresKicker: "Core features",
    featuresTitle: "Everything your institute needs",
    appTitle: "Stay connected with everyone! Try our Mobile App",
    appDescription:
      "Parents, students and teachers stay connected through the mobile app. Attendance, results, notices and fee payments in one place.",
    faqTitle: "Most common question about our services",
  };

  const [pagesList, setPagesList] = useState<PageItem[]>([
    {
      id: 1,
      title: "Home Page",
      slug: "/",
      status: "Published",
      updated_at: "2026-08-15",
      content: defaultHomeContent,
    },
    {
      id: 2,
      title: "About Us",
      slug: "/about",
      status: "Published",
      updated_at: "2026-08-15",
      content: {
        heroHeading: "Completed Educational Solution",
        heroDescription:
          "Amar School Management System is a comprehensive online school management system that enables educators to manage their schools from a single, central location.",
      },
    },
    {
      id: 3,
      title: "Features & Modules",
      slug: "/features",
      status: "Published",
      updated_at: "2026-08-15",
      content: {
        heroHeading: "Core Modules / Features",
        heroDescription: "Explore 20+ modules of Amar School for complete school automation.",
      },
    },
    {
      id: 4,
      title: "ID Card Design Service",
      slug: "/id-card",
      status: "Published",
      updated_at: "2026-08-15",
      content: {
        heroHeading: "ID Card Design Service",
        heroDescription: "Professional student, teacher and staff ID card design for your institute.",
      },
    },
    {
      id: 5,
      title: "Graphics Design Service",
      slug: "/services/graphics-design",
      status: "Published",
      updated_at: "2026-08-15",
      content: {
        heroHeading: "Graphic Design Agency In Bangladesh",
        heroDescription: "Logo, business card, brochure, t-shirt and social media design.",
      },
    },
    {
      id: 6,
      title: "Web Development Service",
      slug: "/services/web-development",
      status: "Published",
      updated_at: "2026-08-15",
      content: {
        heroHeading: "Web Development Service",
        heroDescription: "Custom websites and web applications built by a team, not freelancers.",
      },
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<PageItem | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "content">("content");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    status: "Published",
    content: defaultHomeContent,
  });

  const handleOpenAddModal = () => {
    setEditingPage(null);
    setActiveTab("general");
    setFormData({
      title: "",
      slug: "/",
      status: "Published",
      content: defaultHomeContent,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (page: PageItem) => {
    setEditingPage(page);
    setActiveTab("content");
    setFormData({
      title: page.title,
      slug: page.slug,
      status: page.status,
      content: { ...defaultHomeContent, ...page.content },
    });
    setIsModalOpen(true);
  };

  const handleSavePage = (e: FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];

    if (editingPage) {
      setPagesList((prev) =>
        prev.map((p) =>
          p.id === editingPage.id
            ? {
                ...p,
                title: formData.title,
                slug: formData.slug,
                status: formData.status,
                content: formData.content,
                updated_at: today,
              }
            : p
        )
      );
      setSuccessMessage(`Page "${formData.title}" sections and content saved successfully!`);
    } else {
      const newPage: PageItem = {
        id: Date.now(),
        title: formData.title,
        slug: formData.slug.startsWith("/") ? formData.slug : `/${formData.slug}`,
        status: formData.status,
        updated_at: today,
        content: formData.content,
      };
      setPagesList((prev) => [...prev, newPage]);
      setSuccessMessage(`New page "${formData.title}" created successfully!`);
    }

    setIsModalOpen(false);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleDeletePage = (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete the page "${title}"?`)) {
      setPagesList((prev) => prev.filter((p) => p.id !== id));
      setSuccessMessage(`Page "${title}" deleted successfully.`);
      setTimeout(() => setSuccessMessage(null), 4000);
    }
  };

  return (
    <DashboardLayout title="Pages Management">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-deep">All Website Pages</h2>
          <p className="text-xs text-muted-foreground">
            Edit page section contents, titles, descriptions, headings & hero banners.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add New Page
        </button>
      </div>

      {successMessage && (
        <div className="mb-6 flex items-center gap-2 rounded-lg bg-emerald-500/15 p-4 text-xs font-semibold text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          {successMessage}
        </div>
      )}

      <div className="card-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border bg-muted/40 uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-3">Page Title</th>
                <th className="px-6 py-3">Route / URL Slug</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Last Updated</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pagesList.map((page) => (
                <tr key={page.id} className="hover:bg-muted/20">
                  <td className="px-6 py-4 font-semibold text-brand-deep">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      {page.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                    {page.slug}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        page.status === "Published"
                          ? "bg-emerald-500/15 text-emerald-600"
                          : "bg-amber-500/15 text-amber-600"
                      }`}
                    >
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {page.updated_at}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={page.slug}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        title="View Live Page"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => handleOpenEditModal(page)}
                        className="flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                        title="Edit Page Content & Sections"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        Edit Sections
                      </button>
                      <button
                        onClick={() => handleDeletePage(page.id, page.title)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        title="Delete Page"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full Page Content & Sections Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="flex h-[90vh] w-full max-w-3xl flex-col rounded-2xl border border-border bg-card shadow-[var(--shadow-float)]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border p-6">
              <div>
                <h3 className="text-lg font-bold text-brand-deep">
                  {editingPage ? `Page Content Editor: ${editingPage.title}` : "Add New Page"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Edit section titles, paragraphs, buttons, and headings for this page.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-border bg-muted/30 px-6">
              <button
                type="button"
                onClick={() => setActiveTab("content")}
                className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold transition-colors ${
                  activeTab === "content"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sliders className="h-4 w-4" />
                Section Contents & Text
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("general")}
                className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold transition-colors ${
                  activeTab === "general"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Type className="h-4 w-4" />
                Page Settings & SEO
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSavePage} className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeTab === "general" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Page Title
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="mt-1.5 w-full rounded-lg border border-input bg-background py-2 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Route / URL Slug
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="mt-1.5 w-full rounded-lg border border-input bg-background py-2 px-3 text-xs font-mono text-foreground focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="mt-1.5 w-full rounded-lg border border-input bg-background py-2 px-3 text-xs font-semibold text-foreground focus:border-primary focus:outline-none"
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Section 1: Hero Banner */}
                    <div className="rounded-xl border border-border bg-background p-5 space-y-4">
                      <div className="flex items-center gap-2 border-b border-border pb-2">
                        <Layout className="h-4 w-4 text-primary" />
                        <h4 className="text-sm font-bold text-brand-deep">1. Hero Section (Main Banner)</h4>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-muted-foreground uppercase">
                            Kicker / Top Badge Text
                          </label>
                          <input
                            type="text"
                            value={formData.content.heroKicker || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                content: { ...formData.content, heroKicker: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-card py-2 px-3 text-xs focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-muted-foreground uppercase">
                            Main Button Text
                          </label>
                          <input
                            type="text"
                            value={formData.content.heroButtonText || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                content: { ...formData.content, heroButtonText: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-card py-2 px-3 text-xs focus:border-primary"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-muted-foreground uppercase">
                            Main Heading Title
                          </label>
                          <input
                            type="text"
                            value={formData.content.heroHeading || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                content: { ...formData.content, heroHeading: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-card py-2 px-3 text-xs font-semibold focus:border-primary"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-muted-foreground uppercase">
                            Hero Description Paragraph
                          </label>
                          <textarea
                            rows={3}
                            value={formData.content.heroDescription || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                content: { ...formData.content, heroDescription: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-card py-2 px-3 text-xs focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Why Choose Us */}
                    <div className="rounded-xl border border-border bg-background p-5 space-y-4">
                      <div className="flex items-center gap-2 border-b border-border pb-2">
                        <Type className="h-4 w-4 text-primary" />
                        <h4 className="text-sm font-bold text-brand-deep">2. Why Choose Us Section</h4>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-muted-foreground uppercase">
                          Section Heading
                        </label>
                        <input
                          type="text"
                          value={formData.content.whyTitle || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              content: { ...formData.content, whyTitle: e.target.value },
                            })
                          }
                          className="mt-1 w-full rounded-lg border border-input bg-card py-2 px-3 text-xs font-semibold focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-muted-foreground uppercase">
                          Section Description Text
                        </label>
                        <textarea
                          rows={2}
                          value={formData.content.whyDescription || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              content: { ...formData.content, whyDescription: e.target.value },
                            })
                          }
                          className="mt-1 w-full rounded-lg border border-input bg-card py-2 px-3 text-xs focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Section 3: Mobile App Banner */}
                    <div className="rounded-xl border border-border bg-background p-5 space-y-4">
                      <div className="flex items-center gap-2 border-b border-border pb-2">
                        <Smartphone className="h-4 w-4 text-primary" />
                        <h4 className="text-sm font-bold text-brand-deep">3. Mobile App Banner Section</h4>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-muted-foreground uppercase">
                          Banner Heading
                        </label>
                        <input
                          type="text"
                          value={formData.content.appTitle || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              content: { ...formData.content, appTitle: e.target.value },
                            })
                          }
                          className="mt-1 w-full rounded-lg border border-input bg-card py-2 px-3 text-xs font-semibold focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-muted-foreground uppercase">
                          Banner Description
                        </label>
                        <input
                          type="text"
                          value={formData.content.appDescription || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              content: { ...formData.content, appDescription: e.target.value },
                            })
                          }
                          className="mt-1 w-full rounded-lg border border-input bg-card py-2 px-3 text-xs focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Section 4: FAQ Section */}
                    <div className="rounded-xl border border-border bg-background p-5 space-y-4">
                      <div className="flex items-center gap-2 border-b border-border pb-2">
                        <HelpCircle className="h-4 w-4 text-primary" />
                        <h4 className="text-sm font-bold text-brand-deep">4. FAQ Section Heading</h4>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-muted-foreground uppercase">
                          FAQ Section Title
                        </label>
                        <input
                          type="text"
                          value={formData.content.faqTitle || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              content: { ...formData.content, faqTitle: e.target.value },
                            })
                          }
                          className="mt-1 w-full rounded-lg border border-input bg-card py-2 px-3 text-xs font-semibold focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-between border-t border-border bg-muted/20 p-4">
                <span className="text-xs text-muted-foreground">
                  Changes will update page sections in real-time.
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground hover:bg-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-md hover:opacity-90"
                  >
                    <Save className="h-4 w-4" />
                    Save All Page Sections
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
