import { useState, useRef, useEffect, FormEvent } from "react";
import { router } from "@inertiajs/react";
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
  Layers,
  Search,
  ArrowUp,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

interface ModuleItem {
  id?: number;
  icon?: string;
  title: string;
  body?: string;
  description?: string;
}

interface SampleItem {
  id?: number;
  title: string;
  image_url?: string | null;
}

interface PageContent {
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
  app_image_url?: string | null;
  google_play_url?: string;
  app_store_url?: string;
  faqTitle?: string;
  modules?: ModuleItem[];
  samples?: SampleItem[];
}

interface PageItem {
  id: number;
  title: string;
  slug: string;
  status: string;
  updated_at: string;
  content: PageContent;
}

interface Props {
  pages: PageItem[];
}

export default function Pages({ pages: initialPages }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const defaultHomeContent: PageContent = {
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
    app_image_url: null,
    google_play_url: "https://play.google.com/store",
    app_store_url: "https://apple.com/app-store",
    faqTitle: "Most common question about our services",
  };

  const defaultModules: ModuleItem[] = [
    { id: 1, icon: "ClipboardList", title: "Admission Management", body: "Keep track of the admission procedure for your school. Record every detail of each student such as their name, age, address, class and grade from arrival." },
    { id: 2, icon: "GraduationCap", title: "Student Management", body: "Track and unfold each student information of where they stand in their scholarship, and update status with one click of a button." },
    { id: 3, icon: "CalendarCheck", title: "Attendance Management", body: "Monitor daily attendance for students and staff, with distance and delays, and generate a quick view of the overall class attendance." },
    { id: 4, icon: "BookOpen", title: "Academic Management", body: "Schools no longer need to spend extra hours and human resources to maintain various academic activities." },
    { id: 5, icon: "CreditCard", title: "Fees Management", body: "Keep track of the school fees and other payments made by your students. You can even send reminders when a student is due for payment." },
    { id: 6, icon: "LineChart", title: "Exam and Result Management", body: "The software allows you to record your students' test results for each subject and helps them improve." },
    { id: 7, icon: "Users", title: "Parent Management", body: "This software allows you to manage the parents of each student. You can keep track of their contact information as well as their payment details." },
    { id: 8, icon: "Wallet", title: "Payroll Management", body: "You can round the salary of your employees and make sure they receive them pay on time. It is essential to keep track of all financial transactions." },
    { id: 9, icon: "UserCog", title: "Teacher and Employee Management", body: "Amarschool allows you to manage your teacher, employee and their records. It helps you keep track of their attendance, performance and leave." },
    { id: 10, icon: "MessageSquare", title: "Payment and SMS Gateway", body: "Amarschool provides SMS gateways so that you can send SMS alerts for important events, and an online payment collection option." },
    { id: 11, icon: "School", title: "Class Management", body: "Amarschool helps you create a class schedule, which is easy to manage and will help you keep track of your students' activities." },
    { id: 12, icon: "Smartphone", title: "Student and Teacher App", body: "Connecting with guardians is at your fingertips. Mobile apps for iOS and Android connected to School Management software." },
    { id: 13, icon: "Percent", title: "Promotion Management", body: "Amarschool helps you manage the promotion of students from one grade to another, based on their performance." },
    { id: 14, icon: "NotebookPen", title: "Lesson Planning", body: "Now teachers don't need to make separate manual full lesson planning. With Amarschool, teachers can easily do it and publish it for students." },
    { id: 15, icon: "PlaneTakeoff", title: "Leave Management", body: "Manage the leave of all the teachers and staffs with ease. You can keep track of how many days are left for each teacher." },
    { id: 16, icon: "Home", title: "Homework Management", body: "Once students can be given day by day homework effectively and avoid the impossibility of unfamiliarities to changed movement." },
    { id: 17, icon: "Calculator", title: "Accounts Management", body: "This software allows you to manage the accounts of your school. It allows you to keep track of all the payments that are made by parents and students." },
    { id: 18, icon: "Banknote", title: "Online Payment", body: "Guardians no longer need to go to the school to pay all the school fees and vouchers — they can collect and pay online." },
    { id: 19, icon: "Bell", title: "Notice Management", body: "Amarschool allows you to create notices for students, teachers and parents and send notices to multiple recipients at once." },
    { id: 20, icon: "Fingerprint", title: "Bio-Metric / RFID", body: "Amarschool ERP comes with easy integration with biometric device for employee/student attendance." },
  ];

  const [pagesList, setPagesList] = useState<PageItem[]>(initialPages && initialPages.length > 0 ? initialPages : [
    { id: 1, title: "Home Page", slug: "/", status: "Published", updated_at: "2026-08-16", content: defaultHomeContent },
    { id: 2, title: "About Us", slug: "/about", status: "Published", updated_at: "2026-08-16", content: { heroHeading: "Completed Educational Solution", heroDescription: "Amar School Management System is a comprehensive online school management system." } },
    { id: 3, title: "Features & Modules", slug: "/features", status: "Published", updated_at: "2026-08-16", content: { heroHeading: "Core Modules / Features", heroDescription: "Explore 20+ modules of Amar School for complete school automation.", modules: defaultModules } },
    { id: 4, title: "ID Card Design Service", slug: "/id-card", status: "Published", updated_at: "2026-08-16", content: { heroHeading: "ID Card Design Service", heroDescription: "Professional student, teacher and staff ID card design for your institute." } },
    { id: 5, title: "Graphics Design Service", slug: "/services/graphics-design", status: "Published", updated_at: "2026-08-16", content: { heroHeading: "Graphic Design Agency In Bangladesh", heroDescription: "Logo, business card, brochure, t-shirt and social media design." } },
    { id: 6, title: "Web Development Service", slug: "/services/web-development", status: "Published", updated_at: "2026-08-16", content: { heroHeading: "Web Development Service", heroDescription: "Custom websites and web applications built by a team, not freelancers." } },
  ]);

  const defaultSamples: SampleItem[] = [
    { id: 1, title: "PVC Card Design -01 (Student)", front_image_url: null, back_image_url: null },
    { id: 2, title: "PVC Card Design -01 (Teacher)", front_image_url: null, back_image_url: null },
    { id: 3, title: "PVC Card Design -02 (Student)", front_image_url: null, back_image_url: null },
    { id: 4, title: "PVC Card Design -02 (Teacher)", front_image_url: null, back_image_url: null },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<PageItem | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "content" | "modules" | "samples">("content");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [moduleSearch, setModuleSearch] = useState("");
  const [sampleFrontFiles, setSampleFrontFiles] = useState<{ [key: number]: File }>({});
  const [sampleBackFiles, setSampleBackFiles] = useState<{ [key: number]: File }>({});
  const [appBannerFile, setAppBannerFile] = useState<File | null>(null);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = 0;
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen, activeTab]);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    status: "Published",
    content: defaultHomeContent,
    modules: defaultModules,
    samples: defaultSamples,
  });

  const handleOpenAddModal = () => {
    setEditingPage(null);
    setModuleSearch("");
    setSampleFrontFiles({});
    setSampleBackFiles({});
    setAppBannerFile(null);
    setActiveTab("general");
    setFormData({
      title: "",
      slug: "/",
      status: "Published",
      content: defaultHomeContent,
      modules: defaultModules,
      samples: defaultSamples,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (page: PageItem) => {
    setEditingPage(page);
    setModuleSearch("");
    setSampleFrontFiles({});
    setSampleBackFiles({});
    setAppBannerFile(null);
    const existingModules = page.content.modules && page.content.modules.length > 0 ? page.content.modules : defaultModules;
    const existingSamples = page.content.samples && page.content.samples.length > 0 ? page.content.samples : defaultSamples;
    
    setActiveTab(page.slug === "/features" ? "modules" : page.slug === "/id-card" ? "samples" : "content");
    setFormData({
      title: page.title,
      slug: page.slug,
      status: page.status,
      content: { ...defaultHomeContent, ...page.content },
      modules: existingModules,
      samples: existingSamples,
    });
    setIsModalOpen(true);
  };

  const handleModuleChange = (index: number, field: "title" | "body" | "icon", value: string) => {
    const updated = [...formData.modules];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({
      ...formData,
      modules: updated,
      content: {
        ...formData.content,
        modules: updated,
      },
    });
  };

  const handleAddModule = () => {
    const newModule: ModuleItem = {
      id: Date.now(),
      icon: "BookOpen",
      title: "New School Module",
      body: "Enter detailed description for this core module here.",
    };
    const updated = [...formData.modules, newModule];
    setFormData({
      ...formData,
      modules: updated,
      content: {
        ...formData.content,
        modules: updated,
      },
    });
  };

  const handleRemoveModule = (index: number) => {
    const updated = formData.modules.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      modules: updated,
      content: {
        ...formData.content,
        modules: updated,
      },
    });
  };

  const handleAddSample = () => {
    const newSample: SampleItem = {
      id: Date.now(),
      title: `PVC Card Design -${String((formData.samples?.length || 0) + 1).padStart(2, "0")}`,
      front_image_url: null,
      back_image_url: null,
    };
    const updated = [...(formData.samples || []), newSample];
    setFormData({
      ...formData,
      samples: updated,
      content: { ...formData.content, samples: updated },
    });

    // Auto-scroll to bottom of modal so newly added sample card set is immediately visible!
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      }
    }, 100);
  };

  const handleRemoveSample = (index: number) => {
    const updated = (formData.samples || []).filter((_, i) => i !== index);
    setFormData({
      ...formData,
      samples: updated,
      content: { ...formData.content, samples: updated },
    });
  };

  const handleSampleTitleChange = (index: number, title: string) => {
    const updated = [...(formData.samples || [])];
    updated[index] = { ...updated[index], title };
    setFormData({
      ...formData,
      samples: updated,
      content: { ...formData.content, samples: updated },
    });
  };

  const handleSampleFrontFileChange = (index: number, file: File | null) => {
    if (!file) return;
    setSampleFrontFiles((prev) => ({ ...prev, [index]: file }));

    const reader = new FileReader();
    reader.onload = (e) => {
      const updated = [...(formData.samples || [])];
      updated[index] = {
        ...updated[index],
        front_image_url: e.target?.result as string,
        image_url: e.target?.result as string,
      };
      setFormData({
        ...formData,
        samples: updated,
        content: { ...formData.content, samples: updated },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSampleBackFileChange = (index: number, file: File | null) => {
    if (!file) return;
    setSampleBackFiles((prev) => ({ ...prev, [index]: file }));

    const reader = new FileReader();
    reader.onload = (e) => {
      const updated = [...(formData.samples || [])];
      updated[index] = { ...updated[index], back_image_url: e.target?.result as string };
      setFormData({
        ...formData,
        samples: updated,
        content: { ...formData.content, samples: updated },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAppBannerFileChange = (file: File | null) => {
    if (!file) return;
    setAppBannerFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          app_image_url: e.target?.result as string,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSavePage = (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const today = new Date().toISOString().split("T")[0];

    let updatedList: PageItem[];
    if (editingPage) {
      updatedList = pagesList.map((p) =>
        p.id === editingPage.id
          ? {
              ...p,
              title: formData.title,
              slug: formData.slug,
              status: formData.status,
              content: {
                ...formData.content,
                modules: formData.slug === "/features" ? formData.modules : formData.content.modules,
                samples: formData.slug === "/id-card" ? formData.samples : formData.content.samples,
              },
              updated_at: today,
            }
          : p
      );
    } else {
      const newPage: PageItem = {
        id: Date.now(),
        title: formData.title,
        slug: formData.slug.startsWith("/") ? formData.slug : `/${formData.slug}`,
        status: formData.status,
        updated_at: today,
        content: {
          ...formData.content,
          modules: formData.modules,
          samples: formData.samples,
        },
      };
      updatedList = [...pagesList, newPage];
    }

    setPagesList(updatedList);

    const postData = new FormData();
    postData.append("pages_json", JSON.stringify(updatedList));

    if (appBannerFile) {
      postData.append("app_banner_image", appBannerFile);
    }

    Object.entries(sampleFrontFiles).forEach(([index, file]) => {
      postData.append(`sample_front_images[${index}]`, file);
    });

    Object.entries(sampleBackFiles).forEach(([index, file]) => {
      postData.append(`sample_back_images[${index}]`, file);
    });

    router.post(
      "/dashboard/pages",
      postData,
      {
        onSuccess: () => {
          setSaving(false);
          setIsModalOpen(false);
          setSuccessMessage(`Page "${formData.title}" sections and samples saved successfully!`);
          setTimeout(() => setSuccessMessage(null), 4000);
        },
        onError: () => {
          setSaving(false);
        },
      }
    );
  };

  const handleDeletePage = (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete the page "${title}"?`)) {
      const updatedList = pagesList.filter((p) => p.id !== id);
      setPagesList(updatedList);
      router.post("/dashboard/pages", { pages: updatedList });
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
            Edit page section contents, titles, descriptions, hero banners & Core Modules list.
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
                        title="Edit Page Content & Core Modules"
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

      {/* Full Page Content & Core Modules Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="flex max-h-[88vh] h-[88vh] w-full max-w-4xl flex-col rounded-2xl border border-border bg-card shadow-[var(--shadow-float)] overflow-hidden">
            {/* Modal Header */}
            <div className="shrink-0 flex items-center justify-between border-b border-border p-5 sm:p-6 bg-card z-10">
              <div>
                <h3 className="text-lg font-bold text-brand-deep">
                  {editingPage ? `Page Content & Section Editor: ${editingPage.title}` : "Add New Page"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Edit section titles, descriptions, headings & Core Features/Modules for this page.
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
            <div className="shrink-0 flex border-b border-border bg-muted/30 px-6 z-10">
              {formData.slug === "/id-card" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("samples")}
                  className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold transition-colors ${
                    activeTab === "samples"
                      ? "border-primary text-primary font-bold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ImageIcon className="h-4 w-4" />
                  ID Card Design Samples ({formData.samples?.length || 0})
                </button>
              )}

              {formData.slug === "/features" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("modules")}
                  className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold transition-colors ${
                    activeTab === "modules"
                      ? "border-primary text-primary font-bold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Layers className="h-4 w-4" />
                  Core Modules List ({formData.modules.length} Modules)
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveTab("content")}
                className={`flex items-center gap-2 border-b-2 py-3 px-4 text-xs font-semibold transition-colors ${
                  activeTab === "content"
                    ? "border-primary text-primary font-bold"
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
                    ? "border-primary text-primary font-bold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Type className="h-4 w-4" />
                Page Settings & SEO
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSavePage} className="flex flex-1 flex-col overflow-hidden min-h-0">
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
                {activeTab === "samples" ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-brand-deep">ID Card Design Samples ({formData.samples?.length || 0})</h4>
                        <p className="text-xs text-muted-foreground">Upload and manage ID card design sample images displayed on the ID Card page gallery.</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddSample}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add New Sample Card
                      </button>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      {(formData.samples || []).map((sample, index) => (
                        <div key={sample.id || index} className="rounded-xl border border-border bg-background p-5 space-y-4 shadow-xs flex flex-col justify-between">
                          <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                              Sample Card Set #{index + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSample(index)}
                              className="flex items-center gap-1 text-[11px] font-semibold text-destructive hover:underline"
                            >
                              <Trash2 className="h-3 w-3" />
                              Remove
                            </button>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-muted-foreground uppercase">
                              Sample Title / Label
                            </label>
                            <input
                              type="text"
                              required
                              value={sample.title}
                              onChange={(e) => handleSampleTitleChange(index, e.target.value)}
                              placeholder="e.g. PVC Card Design -01 (Student)"
                              className="mt-1 w-full rounded-lg border border-input bg-card py-1.5 px-3 text-xs font-bold text-foreground focus:border-primary"
                            />
                          </div>

                          {/* 2-Column Front & Back Image Upload Boxes */}
                          <div className="grid gap-4 sm:grid-cols-2">
                            {/* Front Part Image */}
                            <div className="space-y-1.5">
                              <label className="block text-[10px] font-bold text-brand-deep uppercase">
                                1. Front Part Image (সামনের অংশ)
                              </label>
                              {sample.front_image_url || sample.image_url ? (
                                <div className="relative overflow-hidden rounded-lg border border-border bg-muted p-1 text-center">
                                  <img
                                    src={sample.front_image_url || sample.image_url || ""}
                                    alt={`${sample.title} Front`}
                                    className="h-36 w-full object-contain rounded-md"
                                  />
                                  <label className="mt-2 inline-block cursor-pointer rounded bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary hover:bg-primary/20">
                                    Change Front
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => handleSampleFrontFileChange(index, e.target.files?.[0] || null)}
                                    />
                                  </label>
                                </div>
                              ) : (
                                <label className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-4 cursor-pointer hover:bg-muted/60 transition-colors text-center h-36">
                                  <Upload className="h-6 w-6 text-muted-foreground/60" />
                                  <span className="mt-1 text-[11px] font-semibold text-foreground">Upload Front Part</span>
                                  <span className="text-[9px] text-muted-foreground">Student/Teacher Photo Side</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleSampleFrontFileChange(index, e.target.files?.[0] || null)}
                                  />
                                </label>
                              )}
                            </div>

                            {/* Back Part Image */}
                            <div className="space-y-1.5">
                              <label className="block text-[10px] font-bold text-brand-deep uppercase">
                                2. Back Part Image (পিছনের অংশ)
                              </label>
                              {sample.back_image_url ? (
                                <div className="relative overflow-hidden rounded-lg border border-border bg-muted p-1 text-center">
                                  <img
                                    src={sample.back_image_url}
                                    alt={`${sample.title} Back`}
                                    className="h-36 w-full object-contain rounded-md"
                                  />
                                  <label className="mt-2 inline-block cursor-pointer rounded bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary hover:bg-primary/20">
                                    Change Back
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => handleSampleBackFileChange(index, e.target.files?.[0] || null)}
                                    />
                                  </label>
                                </div>
                              ) : (
                                <label className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-4 cursor-pointer hover:bg-muted/60 transition-colors text-center h-36">
                                  <Upload className="h-6 w-6 text-muted-foreground/60" />
                                  <span className="mt-1 text-[11px] font-semibold text-foreground">Upload Back Part</span>
                                  <span className="text-[9px] text-muted-foreground">QR / Address / Rules Side</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleSampleBackFileChange(index, e.target.files?.[0] || null)}
                                  />
                                </label>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Add Sample Card Set Button */}
                    <div className="flex justify-center pt-6 pb-2 border-t border-border/80">
                      <button
                        type="button"
                        onClick={handleAddSample}
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-all active:scale-95 cursor-pointer"
                      >
                        <Plus className="h-4 w-4 stroke-[3]" />
                        + Add New Sample Card Set (নতুন আইডি কার্ড সেট যুক্ত করুন)
                      </button>
                    </div>
                  </div>
                ) : activeTab === "modules" ? (
                  <div className="space-y-6">
                    <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card/95 py-3 backdrop-blur-xs">
                      <div>
                        <h4 className="text-sm font-bold text-brand-deep">All Core Modules ({formData.modules.length})</h4>
                        <p className="text-xs text-muted-foreground">Search and edit titles & descriptions for modules shown on the Features page.</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Search module (e.g. Admission)..."
                            value={moduleSearch}
                            onChange={(e) => setModuleSearch(e.target.value)}
                            className="w-48 sm:w-56 rounded-lg border border-input bg-background py-1.5 pl-8 pr-3 text-xs focus:border-primary focus:outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (scrollRef.current) scrollRef.current.scrollTop = 0;
                          }}
                          className="flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
                          title="Scroll to Top (Module #1)"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                          Top #1
                        </button>
                        <button
                          type="button"
                          onClick={handleAddModule}
                          className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Add Module
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {formData.modules
                        .map((mod, index) => ({ mod, index }))
                        .filter(({ mod }) =>
                          mod.title.toLowerCase().includes(moduleSearch.toLowerCase()) ||
                          (mod.body || mod.description || "").toLowerCase().includes(moduleSearch.toLowerCase())
                        )
                        .map(({ mod, index }) => (
                          <div key={mod.id || index} className="rounded-xl border border-border bg-background p-4 space-y-3 shadow-xs">
                            <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                                Module #{index + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveModule(index)}
                                className="flex items-center gap-1 text-[11px] font-semibold text-destructive hover:underline"
                              >
                                <Trash2 className="h-3 w-3" />
                                Remove
                              </button>
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-muted-foreground uppercase">
                                Module Title
                              </label>
                              <input
                                type="text"
                                required
                                value={mod.title}
                                onChange={(e) => handleModuleChange(index, "title", e.target.value)}
                                className="mt-1 w-full rounded-lg border border-input bg-card py-1.5 px-3 text-xs font-bold text-foreground focus:border-primary"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-muted-foreground uppercase">
                                Description / Details
                              </label>
                              <textarea
                                rows={2}
                                required
                                value={mod.body || mod.description || ""}
                                onChange={(e) => handleModuleChange(index, "body", e.target.value)}
                                className="mt-1 w-full rounded-lg border border-input bg-card py-1.5 px-3 text-xs text-foreground focus:border-primary"
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : activeTab === "general" ? (
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

                    {/* Section 3: Mobile App Banner & Download Links */}
                    <div className="rounded-xl border border-border bg-background p-5 space-y-4">
                      <div className="flex items-center gap-2 border-b border-border pb-2">
                        <Smartphone className="h-4 w-4 text-primary" />
                        <h4 className="text-sm font-bold text-brand-deep">3. Mobile App Banner & Download Links</h4>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
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

                        <div>
                          <label className="block text-[11px] font-semibold text-muted-foreground uppercase">
                            Google Play Store Link (URL)
                          </label>
                          <input
                            type="text"
                            placeholder="https://play.google.com/store/apps/details?id=..."
                            value={formData.content.google_play_url || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                content: { ...formData.content, google_play_url: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-card py-2 px-3 text-xs font-mono focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-muted-foreground uppercase">
                            Apple App Store Link (URL)
                          </label>
                          <input
                            type="text"
                            placeholder="https://apps.apple.com/app/id..."
                            value={formData.content.app_store_url || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                content: { ...formData.content, app_store_url: e.target.value },
                              })
                            }
                            className="mt-1 w-full rounded-lg border border-input bg-card py-2 px-3 text-xs font-mono focus:border-primary"
                          />
                        </div>
                      </div>

                      {/* Mobile App Image Upload Box */}
                      <div className="pt-2">
                        <label className="block text-[11px] font-semibold text-muted-foreground uppercase mb-2">
                          Mobile App Mockup Image (মোবাইল অ্যাপ ছবি)
                        </label>
                        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border/80 bg-muted/20 p-4">
                          <div className="h-28 w-44 shrink-0 overflow-hidden rounded-lg border border-border bg-card p-1 text-center flex items-center justify-center">
                            {formData.content.app_image_url ? (
                              <img
                                src={formData.content.app_image_url}
                                alt="Mobile App Banner"
                                className="h-full w-full object-contain"
                              />
                            ) : (
                              <div className="text-[10px] text-muted-foreground">Default Asset Image</div>
                            )}
                          </div>
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-foreground">
                              Upload new mobile app mockup image to replace the current display on website.
                            </p>
                            <label className="inline-flex items-center gap-1.5 cursor-pointer rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs hover:opacity-90 transition-opacity">
                              <Upload className="h-3.5 w-3.5" />
                              Select App Image
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleAppBannerFileChange(e.target.files?.[0] || null)}
                              />
                            </label>
                            {appBannerFile && (
                              <p className="text-[11px] font-semibold text-emerald-600">
                                Selected: {appBannerFile.name} (Ready to save)
                              </p>
                            )}
                          </div>
                        </div>
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
              <div className="shrink-0 flex items-center justify-between border-t border-border bg-card p-4 z-10">
                <span className="text-xs text-muted-foreground">
                  Changes will update website pages and modules permanently.
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
                    disabled={saving}
                    className="flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-md hover:opacity-90 disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : "Save All Page Sections & Modules"}
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
