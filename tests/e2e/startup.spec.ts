import { expect, test } from '@playwright/test';

test.describe('Startup stack', () => {
  test('lists every tool and filters by search and licence', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/startup/');

    const tools = page.locator('[data-su-tool]');
    const total = await tools.count();
    expect(total).toBeGreaterThan(140);
    await expect(page.locator('[data-su-stage]')).toHaveCount(13);
    await expect(page.locator('[data-su-result]')).toHaveText(`Showing all ${total} tools`);

    await page.locator('[data-su-search]').fill('zapier');
    await expect(page.locator('[data-su-tool]:visible')).toHaveCount(3);
    await expect(page.locator('[data-su-stage]:visible')).toHaveCount(1);

    await page.locator('[data-su-search]').fill('');
    await page.locator('[data-su-filter="starter"]').click();
    await expect(page.locator('[data-su-tool]:visible')).toHaveCount(12);

    await page.locator('[data-su-search]').fill('no such tool here');
    await expect(page.locator('[data-su-empty]')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('every card links to its GitHub repository', async ({ page }) => {
    await page.goto('/startup/');
    const hrefs = await page.locator('.su-card').evaluateAll((els) => els.map((el) => el.getAttribute('href') || ''));
    for (const href of hrefs) expect(href).toMatch(/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+$/);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});
