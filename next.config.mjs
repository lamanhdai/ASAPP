import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [{ hostname: '**' }],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
