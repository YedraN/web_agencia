"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  Check,
  Loader2,
  Video,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = "calendar" | "form" | "success";

interface BookingForm {
  name: string;
  email: string;
  topic: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const CALL_DURATION = 30; // minutes
const TIMEZONE = "Europe/Madrid";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function isBeforeToday(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CalendarPicker({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (d: Date) => void;
}) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const daysInMonth = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDow = new Date(year, month, 1).getDay();
    const total = new Date(year, month + 1, 0).getDate();
    const days: (Date | null)[] = Array(firstDow).fill(null);
    for (let d = 1; d <= total; d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  }, [viewDate]);

  const prevMonth = () =>
    setViewDate((v) => new Date(v.getFullYear(), v.getMonth() - 1, 1));
  const nextMonth = () =>
    setViewDate((v) => new Date(v.getFullYear(), v.getMonth() + 1, 1));

  const canGoPrev =
    viewDate.getFullYear() > today.getFullYear() ||
    viewDate.getMonth() > today.getMonth();

  return (
    <div className="select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold text-white">
          {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
        </span>
        <button
          onClick={nextMonth}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center text-[11px] font-semibold text-white/25 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-1">
        {daysInMonth.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;
          const disabled = isBeforeToday(date) || isWeekend(date);
          const isSelected = selected ? isSameDay(date, selected) : false;
          const isToday = isSameDay(date, today);

          return (
            <button
              key={date.toISOString()}
              onClick={() => !disabled && onSelect(date)}
              disabled={disabled}
              className={cn(
                "mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all duration-150",
                isSelected
                  ? "bg-white text-black font-bold"
                  : disabled
                  ? "text-white/15 cursor-not-allowed"
                  : isToday
                  ? "text-white border border-white/20 hover:bg-white/[0.08]"
                  : "text-white/70 hover:bg-white/[0.08] hover:text-white"
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TimeSlots({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (t: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {TIME_SLOTS.map((slot) => (
        <button
          key={slot}
          onClick={() => onSelect(slot)}
          className={cn(
            "py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-150 border",
            selected === slot
              ? "bg-white text-black border-white font-bold"
              : "bg-white/[0.03] text-white/60 border-white/[0.08] hover:bg-white/[0.07] hover:text-white hover:border-white/20"
          )}
        >
          {slot}
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingModal({ open, onOpenChange }: BookingModalProps) {
  const [step, setStep] = useState<Step>("calendar");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<BookingForm>({
    name: "",
    email: "",
    topic: "",
  });
  const [errors, setErrors] = useState<Partial<BookingForm>>({});

  const canContinue = selectedDate !== null && selectedTime !== null;

  function handleReset() {
    setStep("calendar");
    setSelectedDate(null);
    setSelectedTime(null);
    setForm({ name: "", email: "", topic: "" });
    setErrors({});
  }

  function validate(): boolean {
    const newErrors: Partial<BookingForm> = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = "Please enter your name";
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleConfirm() {
    if (!validate()) return;

    setIsLoading(true);
    try {
      // TODO: Replace with real API call
      // await fetch("/api/bookings", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     name: form.name,
      //     email: form.email,
      //     topic: form.topic,
      //     date: selectedDate?.toISOString(),
      //     time: selectedTime,
      //     timezone: TIMEZONE,
      //     duration: CALL_DURATION,
      //   }),
      // });
      // TODO: Send confirmation email via /api/bookings/confirm
      // TODO: Create Calendly/Google Calendar event via the API

      await new Promise((r) => setTimeout(r, 1500)); // remove when real API is ready
      setStep("success");
    } catch (error) {
      toast.error("Couldn't confirm the booking. Please try again or email us directly.");
    } finally {
      setIsLoading(false);
    }
  }

  const slideVariants = {
    enter: { opacity: 0, x: 24 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 },
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) handleReset();
        onOpenChange(v);
      }}
    >
      <DialogContent className="bg-[#0f0f0f] border-white/[0.08] text-white p-0 overflow-hidden !max-w-[860px] w-[calc(100vw-2rem)] rounded-2xl shadow-2xl">
        {/* ── Top info bar ── */}
        <div className="flex items-center gap-5 px-6 pt-6 pb-5 border-b border-white/[0.06]">
          <div className="h-10 w-10 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0">
            <Video className="h-5 w-5 text-white/50" />
          </div>
          <div>
            <DialogTitle className="text-base font-bold text-white leading-tight">
              Discovery Call · {CALL_DURATION} min
            </DialogTitle>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-xs text-white/40">
                <Clock className="h-3 w-3" /> {CALL_DURATION} minutes
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1 text-xs text-white/40">
                <Globe className="h-3 w-3" /> Google Meet
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1 text-xs text-white/40">
                <Calendar className="h-3 w-3" /> {TIMEZONE}
              </span>
            </div>
          </div>

          {/* Step indicators */}
          <div className="ml-auto flex items-center gap-1.5">
            {(["calendar", "form", "success"] as Step[]).map((s, i) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  step === s
                    ? "w-6 bg-white"
                    : i < ["calendar", "form", "success"].indexOf(step)
                    ? "w-3 bg-white/40"
                    : "w-3 bg-white/10"
                )}
              />
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="min-h-[420px] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {/* STEP 1: Calendar + Times */}
            {step === "calendar" && (
              <motion.div
                key="calendar"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="p-8 grid md:grid-cols-2 gap-10"
              >
                {/* Left: Calendar */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                    Select a date
                  </p>
                  <CalendarPicker
                    selected={selectedDate}
                    onSelect={(d) => {
                      setSelectedDate(d);
                      setSelectedTime(null);
                    }}
                  />
                </div>

                {/* Right: Time slots */}
                <div>
                  {selectedDate ? (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">
                        {formatDate(selectedDate)}
                      </p>
                      <p className="text-xs text-white/25 mb-4">Available slots</p>
                      <TimeSlots
                        selected={selectedTime}
                        onSelect={setSelectedTime}
                      />
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-white/25">
                      <Calendar className="h-10 w-10 mb-3 opacity-30" />
                      <p className="text-sm">Select a date to see available time slots</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Form */}
            {step === "form" && (
              <motion.div
                key="form"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="p-8"
              >
                {/* Summary bar */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] mb-6">
                  <div className="h-8 w-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white/50" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {selectedDate ? formatDate(selectedDate) : ""} · {selectedTime}
                    </div>
                    <div className="text-xs text-white/40">Discovery Call · {CALL_DURATION} min · Google Meet</div>
                  </div>
                  <button
                    onClick={() => setStep("calendar")}
                    className="ml-auto text-xs text-white/40 hover:text-white transition-colors underline underline-offset-4"
                  >
                    Change
                  </button>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
                    Your details
                  </p>

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">
                      Full name *
                    </label>
                    <Input
                      id="booking-name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="h-11 bg-white/[0.04] border-white/[0.09] text-white placeholder:text-white/25 focus-visible:ring-white/20 focus-visible:border-white/20 rounded-xl"
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">
                      Email address *
                    </label>
                    <Input
                      id="booking-email"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="h-11 bg-white/[0.04] border-white/[0.09] text-white placeholder:text-white/25 focus-visible:ring-white/20 focus-visible:border-white/20 rounded-xl"
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">
                      What would you like to discuss? <span className="text-white/25">(optional)</span>
                    </label>
                    <textarea
                      id="booking-topic"
                      rows={3}
                      placeholder="e.g. We need a new e-commerce platform and are evaluating agencies..."
                      value={form.topic}
                      onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.09] text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 rounded-xl resize-none text-sm"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Success */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="p-6 flex flex-col items-center justify-center text-center min-h-[380px]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
                  className="h-20 w-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center mb-6"
                >
                  <Check className="h-9 w-9 text-emerald-400" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-2xl font-extrabold text-white mb-2"
                >
                  You're booked!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="text-white/50 text-sm max-w-sm mb-8 leading-relaxed"
                >
                  A confirmation has been sent to{" "}
                  <span className="text-white font-semibold">{form.email}</span>.
                  We'll see you on{" "}
                  <span className="text-white font-semibold">
                    {selectedDate ? formatDate(selectedDate) : ""} at {selectedTime}
                  </span>.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Button
                    onClick={() => {
                      handleReset();
                      onOpenChange(false);
                    }}
                    className="rounded-full bg-white text-black hover:bg-white/90 font-semibold px-6"
                  >
                    Back to site
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      // TODO: Generate .ics file download or add to Google Calendar
                      toast.info("Add to calendar — coming soon");
                    }}
                    className="rounded-full border border-white/10 hover:bg-white/[0.05] text-white/60 hover:text-white px-6"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Add to Calendar
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Footer actions ── */}
        {step !== "success" && (
          <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between">
            {step === "form" ? (
              <button
                onClick={() => setStep("calendar")}
                className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {step === "calendar" ? (
              <Button
                onClick={() => setStep("form")}
                disabled={!canContinue}
                className="rounded-full bg-white text-black hover:bg-white/90 font-semibold px-6 disabled:opacity-30"
              >
                Continue
                <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            ) : (
              <Button
                id="booking-confirm"
                onClick={handleConfirm}
                disabled={isLoading}
                className="rounded-full bg-white text-black hover:bg-white/90 font-semibold px-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Confirming...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
