import env from '@/env';
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const BASE_URL = env.HOST_NAME;
const APP_NAME = env.APP_NAME;

export default async function ResetPassword({ token }: { token: string }) {
  const t = await getTranslations('emails');
  const url = `${BASE_URL}/auth/reset-password?token=${token}`;
  return (
    <Html>
      <Head />
      <Preview>{t('reset-password')}</Preview>
      <Tailwind>
        <React.Fragment>
          <Body className="bg-white my-auto mx-auto font-sans">
            <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[475px]">
              <Section className="mt-[32px]">
                <Img
                  src={`${BASE_URL}/logo.svg`}
                  width="58"
                  height="58"
                  alt="StarterKit"
                  className="my-0 mx-auto"
                />
                <Text className="text-black font-medium text-[24px] leading-[32px] mt-[16px] text-center">
                  {APP_NAME}
                </Text>
              </Section>

              <Section className="text-center mt-[32px] mb-[32px]">
                <Text className="text-black font-medium text-[14px] leading-[24px] mb-8">
                  {t('reset-password-description')}
                </Text>

                <Text className="text-[#2754C5] text-xl font-semibold">
                  <Button href={url} target="_blank">
                    {t('reset-password')}
                  </Button>
                </Text>

                <Text className="text-sm">{url}</Text>
              </Section>

              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

              <Text className="text-[#666666] text-[12px] leading-[24px] flex items-center justify-center">
                © {new Date().getFullYear()} {APP_NAME}.{' '}
                {t('all-rights-reserved')}.
              </Text>
            </Container>
          </Body>
        </React.Fragment>
      </Tailwind>
    </Html>
  );
}
