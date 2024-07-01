import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@node-rs/argon2'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/site',
        permanent: true,
      },
      {
        source: '/en',
        destination: '/en/site',
        permanent: true,
      },
      {
        source: '/pt-Br',
        destination: '/pt-Br/site',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
