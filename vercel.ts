import { routes, type VercelConfig } from '@vercel/config/v1';

// The Vercel Angular framework preset misorders the auto-generated routes
// for Angular's newer `outputMode: "static"` build (angular.json), placing
// the error/404 handler before the filesystem check. That causes every
// request — including static assets — to 404 before Vercel ever looks for
// a matching file. Building as a plain static site sidesteps that broken
// preset while keeping the same build output.
export const config: VercelConfig = {
  framework: null,
  buildCommand: 'ng build',
  outputDirectory: 'dist/somniation/browser',
  rewrites: [routes.rewrite('/(.*)', '/index.csr.html')],
};
