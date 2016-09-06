import { DocHead } from 'meteor/kadira:dochead';

// Set Favicons
DocHead.addLink({ rel: 'apple-touch-icon', type: 'image/png',
  sizes: '57x57', href: '/images/favicon/apple-icon-57x57.png' });
DocHead.addLink({ rel: 'apple-touch-icon', type: 'image/png',
  sizes: '60x60', href: '/images/favicon/apple-icon-60x60.png' });
DocHead.addLink({ rel: 'apple-touch-icon', type: 'image/png',
  sizes: '72x72', href: '/images/favicon/apple-icon-72x72.png' });
DocHead.addLink({ rel: 'apple-touch-icon', type: 'image/png',
  sizes: '76x76', href: '/images/favicon/apple-icon-76x76.png' });
DocHead.addLink({ rel: 'apple-touch-icon', type: 'image/png',
  sizes: '114x114', href: '/images/favicon/apple-icon-114x114.png' });
DocHead.addLink({ rel: 'apple-touch-icon', type: 'image/png',
  sizes: '120x120', href: '/images/favicon/apple-icon-120x120.png' });
DocHead.addLink({ rel: 'apple-touch-icon', type: 'image/png',
  sizes: '144x144', href: '/images/favicon/apple-icon-144x144.png' });
DocHead.addLink({ rel: 'apple-touch-icon', type: 'image/png',
  sizes: '152x152', href: '/images/favicon/apple-icon-152x152.png' });
DocHead.addLink({ rel: 'apple-touch-icon', type: 'image/png',
  sizes: '180x180', href: '/images/favicon/apple-icon-180x180.png' });
DocHead.addLink({ rel: 'icon', type: 'image/png',
  sizes: '192x192', href: '/images/favicon/android-icon-192x192.png' });
DocHead.addLink({ rel: 'icon', type: 'image/png',
  sizes: '32x32', href: '/images/favicon/favicon-32x32.png' });
DocHead.addLink({ rel: 'icon', type: 'image/png',
  sizes: '96x96', href: '/images/favicon/favicon-96x96.png' });
DocHead.addLink({ rel: 'icon', type: 'image/png',
  sizes: '16x16', href: '/images/favicon/favicon-16x16.png' });
DocHead.addLink({ rel: 'manifest', href: '/images/favicon/manifest.json' });

DocHead.addMeta({ name: 'viewport',
  content: 'width=device-width,initial-scale=1' });
DocHead.addMeta({ name: 'msapplication-TileColor',
  content: '#ffffff' });
DocHead.addMeta({ name: 'msapplication-TileImage',
  content: '/images/favicon/ms-icon-144x144.png' });
DocHead.addMeta({ name: 'theme-color',
  content: '#ffffff' });

// Set Font
DocHead.addLink({
  rel: 'stylesheet',
  type: 'text/css',
  href: 'https://fonts.googleapis.com/css?family=Roboto:400,300,500',
});
