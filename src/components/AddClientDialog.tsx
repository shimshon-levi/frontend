import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { clientsQueries, type Client } from "../services/queries/clients";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreated?: (client: Client) => void; // להחזיר להורה את הלקוח שנוצר
};

export default function AddClientDialog({
  open,
  onOpenChange,
  onCreated,
}: Props) {
  // שדות טופס
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"active" | "pending" | "inactive">(
    "active"
  );
  const [notes, setNotes] = useState(""); // לא נשלח לשרת אם אין שדה כזה – רק הדגמה ויזואלית

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setStatus("active");
    setNotes("");
    setErr(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (!firstName.trim()) return setErr("שם פרטי הוא שדה חובה");
    // אם אצלך email חובה – השאר. אם לא, תמחק את הבדיקה
    // if (!email.trim())     return setErr("אימייל הוא שדה חובה");

    setLoading(true);
    try {
      const created = await clientsQueries.create({
        firstName: firstName.trim(),
        lastName: lastName.trim() || undefined,
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        company: company.trim() || undefined,
        // status לא חלק מה-DTO שלך – נשאר ויזואלי בלבד.
      });

      onCreated?.(created);
      reset();
      onOpenChange(false);
    } catch (e: any) {
      setErr(e?.response?.data?.message ?? e?.message ?? "שגיאה ביצירה");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(v) => {
        if (!v) reset();
        onOpenChange(v);
      }}
    >
      <Dialog.Portal>
        {/* שכבת רקע */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[1px]" />
        {/* התיבה */}
        <Dialog.Content
          dir="rtl"
          className="
            fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[92vw] max-w-[720px] rounded-2xl bg-white shadow-xl
            p-4 sm:p-6
          "
        >
          {/* כותרת */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <Dialog.Title className="text-xl font-semibold">
                הוספת לקוח חדש
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-500">
                מלא את פרטי הלקוח החדש
              </Dialog.Description>
            </div>
            <Dialog.Close
              className="rounded-full w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200"
              aria-label="סגור"
            >
              ✕
            </Dialog.Close>
          </div>

          {/* טופס */}
          <form onSubmit={submit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">שם פרטי *</label>
                <input
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="שם לקוח"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">שם משפחה</label>
                <input
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="שם משפחה"
                />
              </div>

              <div>
                <label className="text-sm font-medium">אימייל</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium">טלפון</label>
                <input
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05X-XXXXXXX"
                />
              </div>

              <div>
                <label className="text-sm font-medium">חברה</label>
                <input
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="שם החברה"
                />
              </div>
              <div>
                <label className="text-sm font-medium">סטטוס</label>
                <select
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                >
                  <option value="active">פעיל</option>
                  <option value="pending">ממתין</option>
                  <option value="inactive">לא פעיל</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium">הערות</label>
                <textarea
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 min-h-[84px]"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="הערות נוספות… (אופציונלי)"
                />
              </div>
            </div>

            {err && <div className="text-sm text-red-600">{err}</div>}

            <div className="mt-2 flex items-center justify-end gap-2">
              <Dialog.Close
                className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
                onClick={() => reset()}
                type="button"
              >
                ביטול
              </Dialog.Close>
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-700 disabled:opacity-60"
              >
                {loading ? "שומר…" : "הוסף לקוח"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
