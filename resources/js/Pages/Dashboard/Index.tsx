import { useState, FormEvent } from "react";
import { Head, router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
  Users,
  Clock,
  CheckCircle,
  Search,
  Trash2,
  Phone,
  Building,
} from "lucide-react";

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  institute_name: string | null;
  student_count: string | null;
  message: string | null;
  status: "pending" | "contacted" | "completed" | "cancelled";
  created_at: string;
}

interface Stats {
  total_leads: number;
  pending_leads: number;
  contacted_leads: number;
  completed_leads: number;
}

interface Props {
  leads: {
    data: Lead[];
    links: { url: string | null; label: string; active: boolean }[];
  };
  stats: Stats;
  filters: { search: string };
}

export default function Dashboard({ leads, stats, filters }: Props) {
  const [searchTerm, setSearchTerm] = useState(filters.search || "");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    router.get("/dashboard", { search: searchTerm }, { preserveState: true });
  };

  const handleStatusChange = (leadId: number, newStatus: string) => {
    router.patch(`/dashboard/leads/${leadId}/status`, { status: newStatus });
  };

  const handleDeleteLead = (leadId: number) => {
    if (confirm("Are you sure you want to delete this lead submission?")) {
      router.delete(`/dashboard/leads/${leadId}`);
    }
  };

  return (
    <DashboardLayout title="Dashboard & Leads">
      {/* Top Header Controls */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-deep">Overview & Lead Submissions</h2>
          <p className="text-xs text-muted-foreground">
            Manage student, teacher & institution lead requests submitted through Amar School portal.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, phone or institute..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 rounded-lg border border-input bg-card py-2 pl-9 pr-4 text-xs text-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90"
          >
            Filter
          </button>
        </form>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card-elevated flex items-center gap-4 p-5">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
            <Users className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Total Lead Submissions</p>
            <p className="text-2xl font-bold text-brand-deep">{stats.total_leads}</p>
          </div>
        </div>

        <div className="card-elevated flex items-center gap-4 p-5">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber-500/10 text-amber-600">
            <Clock className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Pending Requests</p>
            <p className="text-2xl font-bold text-brand-deep">{stats.pending_leads}</p>
          </div>
        </div>

        <div className="card-elevated flex items-center gap-4 p-5">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-500/10 text-blue-600">
            <Phone className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Contacted Institutions</p>
            <p className="text-2xl font-bold text-brand-deep">{stats.contacted_leads}</p>
          </div>
        </div>

        <div className="card-elevated flex items-center gap-4 p-5">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600">
            <CheckCircle className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs text-muted-foreground">Completed / Onboarded</p>
            <p className="text-2xl font-bold text-brand-deep">{stats.completed_leads}</p>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="card-elevated overflow-hidden">
        <div className="border-b border-border p-5">
          <h3 className="text-base font-bold text-brand-deep">Lead Requests</h3>
        </div>

        {leads.data.length === 0 ? (
          <div className="p-12 text-center text-sm text-muted-foreground">
            No lead submissions found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/40 uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">Contact Person</th>
                  <th className="px-6 py-3">Institute Details</th>
                  <th className="px-6 py-3">Phone / Email</th>
                  <th className="px-6 py-3">Submission Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leads.data.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/20">
                    <td className="px-6 py-4 font-semibold text-brand-deep">
                      {lead.name}
                      {lead.message && (
                        <p className="mt-1 text-[11px] font-normal text-muted-foreground line-clamp-1">
                          "{lead.message}"
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <div className="flex items-center gap-1.5 font-medium text-foreground">
                        <Building className="h-3.5 w-3.5 text-primary" />
                        {lead.institute_name || "N/A"}
                      </div>
                      {lead.student_count && (
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          Students: {lead.student_count}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <div className="font-semibold text-foreground">{lead.phone}</div>
                      {lead.email && <div className="text-[11px]">{lead.email}</div>}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`rounded-md border border-input px-2.5 py-1 text-xs font-semibold focus:outline-none ${
                          lead.status === "pending"
                            ? "bg-amber-50 text-amber-700"
                            : lead.status === "contacted"
                            ? "bg-blue-50 text-blue-700"
                            : lead.status === "completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        title="Delete Lead"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
