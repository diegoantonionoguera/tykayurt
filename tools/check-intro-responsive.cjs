// Run after building site and Sabores: node tools/check-intro-responsive.cjs
const { chromium, expect } = require(require.resolve('@playwright/test', { paths: [__dirname + '/../packages/web'] }));
const { readFile, mkdtemp } = require('node:fs/promises');
const { resolve, join, extname, sep } = require('node:path');
const { tmpdir } = require('node:os');
const apps = {
  site: resolve(__dirname, '../packages/web/dist'),
  bio: resolve(__dirname, '../../tykayurt-link-da-bio'),
  sabores: resolve(__dirname, '../../TykaYurt Sabores/flavors-showcase/dist'),
};
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mp4': 'video/mp4', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.png': 'image/png' };
(async () => {
  const output = await mkdtemp(join(tmpdir(), 'tykayurt-dual-intro-'));
  const browser = await chromium.launch({ channel: 'msedge' });
  try {
    for (const [app, root] of Object.entries(apps)) {
      for (const mobile of [true, false]) {
        const viewport = mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 };
        const page = await browser.newPage({ viewport, isMobile: mobile, hasTouch: mobile });
        const videos = new Set();
        await page.route('**/*', async route => {
          const url = new URL(route.request().url());
          if (url.origin !== 'http://intro.test') return route.abort();
          const file = resolve(root, '.' + (url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname)));
          if (!file.startsWith(root + sep)) return route.abort();
          if (file.endsWith('.mp4')) videos.add(file);
          try { await route.fulfill({ body: await readFile(file), contentType: types[extname(file)] || 'application/octet-stream' }); }
          catch { await route.fulfill({ status: 404, body: '' }); }
        });
        await page.goto('http://intro.test');
        await page.waitForFunction(() => document.querySelector('video')?.readyState >= 2);
        const data = await page.locator('video').evaluate(v => {
          v.pause(); v.currentTime = 4;
          return { src: v.currentSrc, width: v.videoWidth, height: v.videoHeight, rate: v.playbackRate, loop: v.loop, fit: getComputedStyle(v).objectFit };
        });
        expect(data.src).toContain(mobile ? 'logo-mobile-20260926.mp4' : 'logo-desktop-20260926.mp4');
        expect([data.width, data.height]).toEqual(mobile ? [1080, 1920] : [1920, 1080]);
        expect(data.rate).toBe(2); expect(data.loop).toBe(false); expect(data.fit).toBe('contain');
        await page.waitForFunction(() => !document.querySelector('video').seeking);
        await page.screenshot({ path: join(output, `${app}-${mobile ? 'mobile' : 'desktop'}.png`) });
        if (mobile) {
          await page.setViewportSize({ width: 844, height: 390 });
          await expect(page.locator('video')).toHaveAttribute('src', data.src);
          await expect(page.locator('.brand-intro')).toHaveCSS('height', '390px');
        }
        expect(videos.size).toBe(1);
        await page.getByRole('button', { name: 'Pular abertura' }).click();
        await expect(page.locator('.brand-intro')).toHaveCount(0);
        console.log(`${app} ${mobile ? 'mobile' : 'desktop'}: passed (one video, dimensions, playback, skip)`);
        await page.close();
      }
    }
    console.log(`Screenshots: ${output}`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
