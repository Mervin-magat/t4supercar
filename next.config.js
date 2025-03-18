/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import { withSentryConfig } from "@sentry/nextjs";

/** @type {import("next").NextConfig} */
const coreConfig = {
    images: {
        remotePatterns: [
            { hostname: "utfs.io" },
            { hostname: "tk8zpspyil.ufs.sh" }, // ✅ Add this hostname
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

// Wrap Next.js config with Sentry
const sentryConfig = withSentryConfig(coreConfig, {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options
    org: "t4supercar",
    project: "t4-supercar",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors
    automaticVercelMonitors: true,
});

export default sentryConfig;
