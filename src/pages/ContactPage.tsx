import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";
import { contactPageJsonLd } from "@/lib/seo";
import PageShell from "@/components/site/PageShell";
import Btn from "@/components/fx/Btn";
import Cross from "@/components/fx/Cross";
import CauseRipple from "@/components/fx/CauseRipple";
import KineticHeadline from "@/components/fx/KineticHeadline";
import Reveal from "@/components/fx/Reveal";
import ScrambleText from "@/components/fx/ScrambleText";

interface FormValues {
  name: string;
  email: string;
  focus: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;
type FormStatus = "idle" | "error" | "sent";

const EMPTY_VALUES: FormValues = {
  name: "",
  email: "",
  focus: "",
  message: "",
};
const EMPTY_TOUCHED: Record<keyof FormValues, boolean> = {
  name: false,
  email: false,
  focus: false,
  message: false,
};

const FOCUS_OPTIONS = [
  { value: "website", label: "Website / Digital presence" },
  { value: "webapp", label: "Web app / Dashboard" },
  { value: "database", label: "Database / Data management" },
  { value: "hosting", label: "Hosting / Deployment / Maintenance" },
  { value: "other", label: "Other" },
] as const;

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Required";
  if (!values.email.trim()) errors.email = "Required";
  else if (!/^\S+@\S+\.\S+$/.test(values.email))
    errors.email = "Invalid format";
  if (!values.focus) errors.focus = "Select one";
  if (!values.message.trim()) errors.message = "Required";
  return errors;
};

const INPUT_CLASS =
  "w-full border-b border-bone/15 bg-transparent py-3 text-[0.95rem] text-bone caret-solar outline-none transition-colors placeholder:text-bone/30";

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  touched: boolean;
  children: ReactNode;
}

function Field({ label, htmlFor, error, touched, children }: FieldProps) {
  const showError = touched && Boolean(error);
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="flex items-baseline justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone/50"
      >
        {label}
        <AnimatePresence>
          {showError && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-ember"
            >
              ⚠ {error}
            </motion.span>
          )}
        </AnimatePresence>
      </label>
      <div className="group relative mt-1.5">
        {children}
        <span
          className={cn(
            "pointer-events-none absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-gradient-to-r from-solar to-azure transition-transform duration-500 group-focus-within:scale-x-100",
            showError && "scale-x-100 from-ember to-ember",
          )}
        />
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [touched, setTouched] =
    useState<Record<keyof FormValues, boolean>>(EMPTY_TOUCHED);
  const [status, setStatus] = useState<FormStatus>("idle");
  const controls = useAnimationControls();

  const errors = validate(values);
  const hasErrors = Object.keys(errors).length > 0;

  const handleChange =
    (field: keyof FormValues) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (status === "error") setStatus("idle");
    };

  const handleBlur = (field: keyof FormValues) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hasErrors) {
      setTouched({ name: true, email: true, focus: true, message: true });
      setStatus("error");
      void controls.start({
        x: [0, -10, 10, -6, 6, 0],
        transition: { duration: 0.45 },
      });
      return;
    }
    setValues(EMPTY_VALUES);
    setTouched(EMPTY_TOUCHED);
    setStatus("sent");
  };

  return (
    <PageShell
      title="Contact • Codecraft"
      description="Start a project with Codecraft. Tell us what you’re building and what results you want — we’ll reply with next steps, timeline, and a scale path."
      path="/contact"
      jsonLd={contactPageJsonLd()}
    >
      <section className="relative overflow-hidden">
        <div className="bp-grid bp-fade absolute inset-0" aria-hidden />
        <div
          className="absolute -top-40 left-[-12%] size-[480px] rounded-full bg-solar/[0.08] blur-[120px]"
          aria-hidden
        />
        <div
          className="absolute bottom-[-20%] right-[-8%] size-[420px] rounded-full bg-azure/[0.07] blur-[120px]"
          aria-hidden
        />

        <div className="shell relative grid gap-14 pb-24 pt-32 md:pt-40 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 md:pb-32">
          {/* Copy */}
          <div>
            <KineticHeadline
              delay={0.15}
              segments={[
                { text: "Let’s" },
                { text: "force", className: "hl-serif" },
                { text: "the next change together." },
              ]}
              className="font-display text-[clamp(2.5rem,5.8vw,4.4rem)] font-bold leading-[0.99] tracking-[-0.03em] text-bone"
            />
            <Reveal delay={0.5}>
              <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-bone/60">
                Tell us what you’re building — and what results you want. We’ll
                reply with next steps, timeline, and what it will take to scale.
              </p>
            </Reveal>
            <Reveal delay={0.65}>
              <div className="mt-10 max-w-lg divide-y divide-bone/10 border-y border-bone/10 font-mono text-[0.62rem] uppercase tracking-[0.18em]">
                <div className="flex items-center justify-between py-4">
                  <span className="text-bone/40">Response</span>
                  <span className="text-bone/80">
                    Next steps • Timeline • Scale path
                  </span>
                </div>
                <div className="flex items-center justify-between py-4">
                  <span className="text-bone/40">Channels</span>
                  <span className="text-bone/80">Email • WhatsApp • CRM</span>
                </div>
                <div className="flex items-center justify-between py-4">
                  <span className="text-bone/40">Status</span>
                  <span className="flex items-center gap-2 text-bone/80">
                    <span className="animate-blink size-1.5 rounded-full bg-pulse" />
                    Accepting projects
                  </span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.78}>
              <p className="mt-10 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-bone/35">
                <ScrambleText text="TRANSMISSION // OPEN" duration={1000} />
              </p>
            </Reveal>
          </div>

          {/* Form panel */}
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT, delay: 0.35 }}
          >
            <motion.div
              animate={controls}
              className="relative overflow-hidden rounded-[1.6rem] border border-bone/10 bg-surface p-7 shadow-[0_45px_90px_-45px_rgba(0,0,0,0.9)] md:p-10"
            >
              <Cross className="left-4 top-4" />
              <Cross className="right-4 top-4" />
              <Cross className="bottom-4 left-4" />
              <Cross className="bottom-4 right-4" />

              <div className="flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone/40">
                <span>Form {"//"} NEW-PROJECT</span>
                <span
                  className="animate-blink inline-block h-3 w-1.5 bg-solar"
                  aria-hidden
                />
              </div>

              <form
                className="mt-8 space-y-7"
                onSubmit={handleSubmit}
                autoComplete="on"
                noValidate
              >
                <div className="grid gap-7 sm:grid-cols-2">
                  <Field
                    label="Name"
                    htmlFor="name"
                    error={errors.name}
                    touched={touched.name}
                  >
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={INPUT_CLASS}
                      placeholder="Your name"
                      value={values.name}
                      onChange={handleChange("name")}
                      onBlur={handleBlur("name")}
                      required
                    />
                  </Field>
                  <Field
                    label="Email"
                    htmlFor="email"
                    error={errors.email}
                    touched={touched.email}
                  >
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={INPUT_CLASS}
                      placeholder="you@company.com"
                      value={values.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      required
                    />
                  </Field>
                </div>

                <Field
                  label="Project focus"
                  htmlFor="focus"
                  error={errors.focus}
                  touched={touched.focus}
                >
                  <div className="relative">
                    <select
                      id="focus"
                      name="focus"
                      className={cn(
                        INPUT_CLASS,
                        "appearance-none pr-8",
                        !values.focus && "text-bone/30",
                      )}
                      value={values.focus}
                      onChange={handleChange("focus")}
                      onBlur={handleBlur("focus")}
                      required
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      {FOCUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-1 top-1/2 size-4 -translate-y-1/2 text-bone/40"
                      strokeWidth={1.8}
                    />
                  </div>
                </Field>

                <Field
                  label="Message"
                  htmlFor="message"
                  error={errors.message}
                  touched={touched.message}
                >
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={cn(INPUT_CLASS, "resize-none")}
                    placeholder="What’s the goal, what’s the current challenge, and when do you need it?"
                    value={values.message}
                    onChange={handleChange("message")}
                    onBlur={handleBlur("message")}
                    required
                  />
                </Field>

                <Btn type="submit" variant="primary" size="lg" full>
                  Send message
                </Btn>

                <p className="text-center text-[0.78rem] leading-relaxed text-bone/40">
                  This form is currently front-end only. When you’re ready, we
                  can connect it to email, WhatsApp, or your CRM.
                </p>

                <p
                  aria-live="polite"
                  className="min-h-5 text-center font-mono text-[0.62rem] uppercase tracking-[0.18em]"
                >
                  {status === "error" && (
                    <span className="text-ember">
                      Please complete the required fields as prompted.
                    </span>
                  )}
                </p>
              </form>

              {/* Success overlay */}
              <AnimatePresence>
                {status === "sent" && (
                  <motion.div
                    key="success"
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 rounded-[inherit] bg-surface px-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="relative grid size-28 place-items-center">
                      <CauseRipple tone="pulse" className="inset-0" rings={3} />
                      <motion.span
                        className="relative grid size-16 place-items-center rounded-full bg-pulse text-carbon"
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 16,
                          delay: 0.15,
                        }}
                      >
                        <Check className="size-7" strokeWidth={2.2} />
                      </motion.span>
                    </div>
                    <div>
                      <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bone/45">
                        <ScrambleText text="SIGNAL RECEIVED" />
                      </p>
                      <h3 className="mt-3 font-display text-2xl font-semibold text-bone">
                        Message prepared.
                      </h3>
                      <p className="mt-2 max-w-xs text-[0.88rem] leading-relaxed text-bone/55">
                        Connect this form to email/CRM when ready.
                      </p>
                    </div>
                    <Btn
                      variant="ghost"
                      size="sm"
                      onClick={() => setStatus("idle")}
                      arrow={false}
                    >
                      Send another message
                    </Btn>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
