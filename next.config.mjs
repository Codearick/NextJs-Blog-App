/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'https://cloud.appwrite.io/console/project-65ef35df017ae425b96d/storage/bucket-65ef3b034100cda1b12b',
                port: '',
            },
        ],
    },
};

export default nextConfig;
