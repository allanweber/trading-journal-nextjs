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
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';
import { update } from './action';
import { profileFormSchema } from './schema';

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function UserProfileForm({
  initialValues,
}: {
  initialValues: ProfileFormValues;
}) {
  const t = useTranslations('account-form');
  const { isPending, execute, error } = useServerAction(update);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialValues,
    mode: 'onTouched',
  });

  async function onSubmit(values: ProfileFormValues) {
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
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('display-name')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>{t('display-description')}</FormDescription>
              <FormErrorMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('first-name')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormErrorMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('last-name')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormErrorMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('bio')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('bio-description')} {...field} />
              </FormControl>
              <FormErrorMessage />
            </FormItem>
          )}
        />
        {error && (
          <div className="text-sm text-destructive">{error.message}</div>
        )}
        <SubmitButton isPending={isPending} disabled={!form.formState.isValid}>
          {t('save')}
        </SubmitButton>
      </form>
    </Form>
  );
}
