'use client';

import { trpc } from '@/app/_trpc/client';
import DatePicker from '@/components/DatePicker';
import FormButtonContainer from '@/components/FormButtonContainer';
import JournalSelect from '@/components/JournalSelect';
import { MessageDisplay } from '@/components/MessageDisplay';
import { NumberInput } from '@/components/NumberInput';
import { TextArea } from '@/components/TextArea';
import FormDescriptionOrMessage from '@/components/ui/FormDescriptionOrMessage';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Deposit, depositSchema } from '@/model/entry';
import { EntryType } from '@/model/entryType';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function DepositForm({ depositId }: { depositId?: string }) {
  const t = useTranslations('deposit-form');
  const router = useRouter();
  const locale = useLocale();
  const [values, setValues] = useState<Deposit>({
    entryType: EntryType.Deposit,
  } as Deposit);
  const [error, setError] = useState<any>(null);

  const mutation = trpc.deposit.save.useMutation({
    onSuccess: () => {
      toast({
        title: t('success-title'),
        description: t('success-description'),
      });
      router.push(`/${locale}/trading/entries`);
    },
    onError: (error) => {
      setError(error);
    },
  });

  if (depositId) {
    trpc.deposit.single.useQuery(depositId, {
      onSuccess: (data) => {
        setValues(data);
      },
      onError: (error) => {
        setError(error);
      },
    });
  }

  const form = useForm<Deposit>({
    resolver: zodResolver(depositSchema),
    defaultValues: values,
    values,
  });

  function onSubmit(data: Deposit) {
    mutation.mutate(data);
  }

  return (
    <>
      <MessageDisplay message={error} variant="destructive" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="journalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('journal-label')}</FormLabel>
                <FormControl>
                  <JournalSelect
                    onValueChange={(journal) => field.onChange(journal?._id)}
                    value={field.value}
                  />
                </FormControl>
                <FormDescriptionOrMessage
                  form={form}
                  fieldName="journalId"
                  descriptionKey="journal-description"
                  translations={t}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="mb-2">{t('date-label')}</FormLabel>

                <FormControl>
                  <DatePicker
                    withTime
                    value={field.value}
                    onSelect={field.onChange}
                    placeholder={t('date-placeholder')}
                  />
                </FormControl>
                <FormDescriptionOrMessage
                  form={form}
                  fieldName="date"
                  descriptionKey="date-description"
                  translations={t}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('price-label')}</FormLabel>

                <FormControl>
                  <NumberInput {...field} />
                </FormControl>

                <FormDescriptionOrMessage
                  form={form}
                  fieldName="price"
                  descriptionKey="price-description"
                  translations={t}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('description-label')}</FormLabel>
                <FormControl>
                  <TextArea
                    placeholder={t('description-placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormDescriptionOrMessage
                  form={form}
                  fieldName="description"
                  descriptionKey="description-description"
                  translations={t}
                />
              </FormItem>
            )}
          />

          <FormButtonContainer>
            <Button
              type="button"
              variant="outline"
              className="w-full md:w-[200px]"
              onClick={() => router.back()}
            >
              {t('cancel')}
            </Button>
            <Button type="submit" className="w-full md:w-[200px]">
              {t('save')}
            </Button>
          </FormButtonContainer>
        </form>
      </Form>
    </>
  );
}
