'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Check, Loader2, Send as Telegram, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { site } from '@/lib/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<Status>('idle');

  const schema = z.object({
    name: z.string().trim().min(2, t('form.errors.name')),
    company: z.string().trim().optional(),
    phone: z.string().trim().min(5, t('form.errors.phone')),
    email: z
      .string()
      .trim()
      .email(t('form.errors.email'))
      .optional()
      .or(z.literal('')),
    message: z.string().trim().optional(),
    website: z.string().max(0).optional(),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('request_failed');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  const infos = [
    { icon: Phone, label: t('phone'), value: site.phone, href: `tel:${site.phoneHref}` },
    { icon: Mail, label: t('email'), value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: t('address'), value: t('addressValue') },
    { icon: Clock, label: t('hours'), value: t('hoursValue') },
  ] as const;

  const fieldClass =
    'w-full rounded-2xl border border-[rgb(var(--border))] surface-elevated px-4 py-3 text-sm text-[rgb(var(--fg))] placeholder:text-[rgb(var(--fg-subtle))] transition-colors duration-200 focus:border-[rgb(var(--accent))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]/25';

  return (
    <section id="contact" className="section surface-subtle">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Left — invitation & contacts */}
          <div className="flex flex-col">
            <Reveal>
              <span className="eyebrow">{t('eyebrow')}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-display font-semibold text-balance">
                <span className="text-gradient">{t('title')}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted text-pretty">
                {t('subtitle')}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="mt-10 grid gap-5 sm:grid-cols-2">
                {infos.map((info) => {
                  const Icon = info.icon;
                  const body = (
                    <div className="flex items-start gap-3.5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[rgb(var(--border))] surface-elevated text-[rgb(var(--accent))]">
                        <Icon size={17} />
                      </span>
                      <div>
                        <dt className="text-xs text-subtle">{info.label}</dt>
                        <dd className="mt-0.5 text-sm font-medium">{info.value}</dd>
                      </div>
                    </div>
                  );
                  return 'href' in info && info.href ? (
                    <a
                      key={info.label}
                      href={info.href}
                      className="rounded-2xl transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      {body}
                    </a>
                  ) : (
                    <div key={info.label}>{body}</div>
                  );
                })}
              </dl>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex items-center gap-3">
                <a
                  href={site.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] surface-elevated px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgb(var(--accent))]"
                >
                  <Telegram size={16} className="text-[rgb(var(--accent))]" /> Telegram
                </a>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] surface-elevated px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgb(var(--accent))]"
                >
                  <MessageCircle size={16} className="text-[rgb(var(--accent))]" /> WhatsApp
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={0.1}>
            <div className="border-glow card p-6 shadow-lift sm:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[24rem] flex-col items-center justify-center text-center"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-[rgb(var(--accent))] text-[rgb(var(--accent-fg))]">
                      <Check size={26} />
                    </span>
                    <p className="mt-5 max-w-sm text-pretty text-muted">{t('form.success')}</p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-6 text-sm font-medium text-[rgb(var(--accent))] hover:underline"
                    >
                      {t('form.submit')}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="grid gap-4"
                  >
                    {/* Honeypot */}
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden
                      className="absolute h-0 w-0 opacity-0"
                      {...register('website')}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label={t('form.name')} error={errors.name?.message}>
                        <input
                          className={fieldClass}
                          placeholder={t('form.namePlaceholder')}
                          autoComplete="name"
                          {...register('name')}
                        />
                      </Field>
                      <Field label={t('form.company')}>
                        <input
                          className={fieldClass}
                          placeholder={t('form.companyPlaceholder')}
                          autoComplete="organization"
                          {...register('company')}
                        />
                      </Field>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label={t('form.phone')} error={errors.phone?.message}>
                        <input
                          className={fieldClass}
                          placeholder={t('form.phonePlaceholder')}
                          inputMode="tel"
                          autoComplete="tel"
                          {...register('phone')}
                        />
                      </Field>
                      <Field label={t('form.email')} error={errors.email?.message}>
                        <input
                          className={fieldClass}
                          placeholder={t('form.emailPlaceholder')}
                          inputMode="email"
                          autoComplete="email"
                          {...register('email')}
                        />
                      </Field>
                    </div>

                    <Field label={t('form.message')}>
                      <textarea
                        rows={4}
                        className={`${fieldClass} resize-none`}
                        placeholder={t('form.messagePlaceholder')}
                        {...register('message')}
                      />
                    </Field>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="btn-vivid group mt-1 inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-full px-7 text-[0.975rem] font-medium text-white shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-glow disabled:pointer-events-none disabled:opacity-70"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          {t('form.submitting')}
                        </>
                      ) : (
                        <>
                          {t('form.submit')}
                          <Send size={17} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>

                    {status === 'error' && (
                      <p className="text-sm text-[rgb(var(--accent))]" role="alert">
                        {t('form.error')}
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      {children}
      {error && (
        <span className="mt-1 block text-xs text-[rgb(var(--accent))]" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
