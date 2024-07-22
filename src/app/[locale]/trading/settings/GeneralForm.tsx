'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Icons } from '@/components/Icons';
import SubmitButton from '@/components/SubmitButton';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { useSetLocale } from '@/hooks/useSetLocale';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useServerAction } from 'zsa-react';
import { update } from './action';
import { generalFormSchema, GeneralFormValues } from './schema';

export function GeneralForm({
  initialValues,
}: {
  initialValues: GeneralFormValues;
}) {
  const { isPending, execute, error } = useServerAction(update);
  const t = useTranslations('appearance');
  const { setTheme } = useTheme();
  const { locale, setLocale } = useSetLocale();

  const form = useForm<GeneralFormValues>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: initialValues,
    mode: 'onTouched',
  });

  async function onSubmit(values: GeneralFormValues) {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('language')}</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setLocale(value);
                }}
                defaultValue={locale}
              >
                <FormControl>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a verified language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="en">
                    <div className="flex flex-row items-center gap-1">
                      <Icons.UK />
                      <span>{t('english')}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="pt-Br">
                    <div className="flex flex-row items-center gap-1">
                      <Icons.Brazil />
                      <span>{t('portuguese')}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>{t('language-description')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>{t('theme')}</FormLabel>
              <FormDescription>{t('theme-description')}</FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  setTheme(value);
                }}
                defaultValue={field.value}
                className="grid max-w-xl grid-cols-3 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="light" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-2 w-[30px] md:w-[80px] rounded-lg bg-[#ecedef]" />
                          <div className="h-2 w-[50px] md:w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      {t('light')}
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="dark" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-2 w-[30px] md:w-[80px] rounded-lg bg-slate-400" />
                          <div className="h-2 w-[50px] md:w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      {t('dark')}
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="system" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-2 w-[30px] md:w-[80px] rounded-lg bg-[#ecedef]" />
                          <div className="h-2 w-[50px] md:w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      {t('system')}
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
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
