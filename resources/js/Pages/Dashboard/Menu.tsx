import { useState, FormEvent } from "react";
import { router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Menu as MenuIcon, Plus, GripVertical, Edit3, Trash2, X, Save, CheckCircle2 } from "lucide-react";

interface MenuItem {
  id: number;
  title: string;
  url: string;
  location: string;
  order: number;
  active: boolean;
}

interface Props {
  menuItems: MenuItem[];
}

export default function Menu({ menuItems: initialMenuItems }: Props) {
  const [itemsList, setItemsList] = useState<MenuItem[]>(initialMenuItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    location: "Header & Footer",
    order: 1,
    active: true,
  });

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      url: "/",
      location: "Header & Footer",
      order: itemsList.length + 1,
      active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      url: item.url,
      location: item.location,
      order: item.order,
      active: item.active,
    });
    setIsModalOpen(true);
  };

  const persistMenuItems = (newItems: MenuItem[], message: string) => {
    setItemsList(newItems);
    router.post(
      "/dashboard/menu",
      { items: newItems },
      {
        preserveState: true,
        onSuccess: () => {
          setSuccessMessage(message);
          setTimeout(() => setSuccessMessage(null), 4000);
        },
      }
    );
  };

  const handleSaveItem = (e: FormEvent) => {
    e.preventDefault();

    let updatedList: MenuItem[];
    if (editingItem) {
      updatedList = itemsList.map((i) =>
        i.id === editingItem.id
          ? {
              ...i,
              title: formData.title,
              url: formData.url,
              location: formData.location,
              order: Number(formData.order),
              active: formData.active,
            }
          : i
      );
      persistMenuItems(updatedList, `Menu item "${formData.title}" updated and synced to website header!`);
    } else {
      const newItem: MenuItem = {
        id: Date.now(),
        title: formData.title,
        url: formData.url.startsWith("/") ? formData.url : `/${formData.url}`,
        location: formData.location,
        order: Number(formData.order),
        active: formData.active,
      };
      updatedList = [...itemsList, newItem];
      persistMenuItems(updatedList, `New menu item "${formData.title}" added and synced to website header!`);
    }

    setIsModalOpen(false);
  };

  const handleDeleteItem = (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete the menu item "${title}"?`)) {
      const updatedList = itemsList.filter((i) => i.id !== id);
      persistMenuItems(updatedList, `Menu item "${title}" removed from website header.`);
    }
  };

  return (
    <DashboardLayout title="Menu Management">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-deep">Header & Footer Menu</h2>
          <p className="text-xs text-muted-foreground">
            Configure navigation links, order, and position across Amar School site.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add Menu Item
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
                <th className="px-4 py-3 text-center">Order</th>
                <th className="px-6 py-3">Menu Title</th>
                <th className="px-6 py-3">Target URL</th>
                <th className="px-6 py-3">Placement</th>
                <th className="px-6 py-3">Visibility</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {itemsList.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20">
                  <td className="px-4 py-4 text-center">
                    <div className="inline-flex items-center gap-1 font-bold text-muted-foreground">
                      <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground/60" />
                      #{item.order}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-brand-deep">
                    <div className="flex items-center gap-2">
                      <MenuIcon className="h-4 w-4 text-primary" />
                      {item.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                    {item.url}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.location}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        item.active
                          ? "bg-emerald-500/15 text-emerald-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.active ? "Visible" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                        title="Edit Menu Item"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id, item.title)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        title="Delete Menu Item"
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

      {/* Edit / Add Menu Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-float)]">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-base font-bold text-brand-deep">
                {editingItem ? `Edit Menu Item: ${editingItem.title}` : "Add New Menu Item"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md p-1 text-muted-foreground hover:bg-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Menu Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. OMR"
                  className="mt-1.5 w-full rounded-lg border border-input bg-background py-2 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Target Route / URL
                </label>
                <input
                  type="text"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="e.g. /OMR"
                  className="mt-1.5 w-full rounded-lg border border-input bg-background py-2 px-3 text-xs font-mono text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Placement
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="mt-1.5 w-full rounded-lg border border-input bg-background py-2 px-3 text-xs font-semibold text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="Header & Footer">Header & Footer</option>
                    <option value="Header Only">Header Only</option>
                    <option value="Footer Only">Footer Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="mt-1.5 w-full rounded-lg border border-input bg-background py-2 px-3 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="rounded border-input text-primary focus:ring-primary"
                  />
                  Active (Visible on website)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
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
                  Save & Sync to Header
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
