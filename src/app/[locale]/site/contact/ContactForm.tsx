'use client';

import FormErrorMessage from '@/components/FormErrorMessage';
import SubmitButton from '@/components/SubmitButton';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { useServerAction } from 'zsa-react';
import { recaptchaValidation } from '../actions';
import { sendMessage } from './action';
import { contactFormSchema, ContactFormValues } from './schema';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [captcha, setCaptcha] = useState<boolean>(false);
  const captchaRef = useRef(null);

  const { isPending, execute, error } = useServerAction(sendMessage);
  const { execute: validate } = useServerAction(recaptchaValidation);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    mode: 'onTouched',
  });

  async function onSubmit(values: ContactFormValues) {
    const [data, err] = await execute(values);
    if (err) {
      return toast({
        description: err.message,
        variant: 'destructive',
      });
    }
    if (data && data.success) {
      toast({
        description: t('success'),
      });
      form.reset();
      if (captchaRef?.current) {
        // @ts-ignore
        captchaRef.current.reset();
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('name')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>{t('name-description')}</FormDescription>
              <FormErrorMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>{t('email-description')}</FormDescription>
              <FormErrorMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('message')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('message-description')} {...field} />
              </FormControl>
              <FormErrorMessage />
            </FormItem>
          )}
        />
        {error && (
          <div className="text-sm text-destructive">{error.message}</div>
        )}
        <div className="flex flex-col gap-2 w-full">
          <SubmitButton
            isPending={isPending}
            disabled={!form.formState.isValid || !captcha}
          >
            {t('send')}
          </SubmitButton>
        </div>
      </form>
      <div className="mt-2">
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={async (token) => {
            const [data, err] = await validate({ token: token! });
            if (err || !data?.success) {
              setCaptcha(false);
            } else {
              setCaptcha(true);
            }
          }}
          ref={captchaRef}
        />
      </div>
    </Form>
  );
}
