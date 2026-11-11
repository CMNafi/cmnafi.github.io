import { expect, test } from '@playwright/test';

const pages = ['/', '/story/', '/field-notes/', '/garage/', '/play/', '/connect/', '/fab/', '/startup/', '/brewing/'];
const nav = ['Story', 'Field Notes', 'Garage', 'Play', 'Connect'];

test.describe('Shared shell', () => {
  for (const path of pages) {
    test(`${path} has the one header, no horizontal scroll, no script errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(path);

      const header = page.locator('header.sh');
      await expect(header).toHaveCount(1);
      await expect(header.locator('.sh-mark')).toHaveText('C M Nafi');
      await expect(header.locator('.sh-nav a')).toHaveText(nav);
      await expect(page.locator('h1')).toHaveCount(1);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });
  }

  test('articles use the same header and show no injected takeaways box', async ({ page }) => {
    await page.goto('/field-notes/blackstone-vs-blackrock/');
    await expect(page.locator('header.sh')).toHaveCount(1);
    await expect(page.locator('.sh-nav a[aria-current="page"]')).toHaveText('Field Notes');
    await expect(page.getByText(/AI TAKEAWAYS/i)).toHaveCount(0);
  });
});

test.describe('Homepage', () => {
  test('introduces Nafi and links to writing and tools', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Still learning');
    await expect(page.locator('#home-writing ~ ul a, [aria-labelledby="home-writing"] .s-row')).toHaveCount(5);
    const hrefs = await page.locator('.s-row').evaluateAll((els) => els.map((el) => el.getAttribute('href')));
    for (const href of hrefs) expect(href).toMatch(/^\/(field-notes|garage|projects|play)/);
  });
});

test.describe('Field Notes index', () => {
  test('filters by category', async ({ page }) => {
    await page.goto('/field-notes/');
    const all = await page.locator('[data-fn-note]:visible').count();
    expect(all).toBeGreaterThan(50);
    await page.locator('[data-fn-filter="Cricket"]').click();
    const cricket = await page.locator('[data-fn-note]:visible').count();
    expect(cricket).toBeGreaterThan(0);
    expect(cricket).toBeLessThan(all);
    await page.locator('[data-fn-filter="all"]').click();
    await expect(page.locator('[data-fn-note]:visible')).toHaveCount(all);
  });
});
