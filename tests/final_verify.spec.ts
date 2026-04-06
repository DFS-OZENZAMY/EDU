import { test, expect } from '@playwright/test';

test('verify secure login and admin dashboard', async ({ page }) => {
  // 1. Go to login page
  await page.goto('http://localhost:3000/login');

  // 2. Fill login form with admin credentials (from seed)
  await page.fill('input[name="email"]', 'admin@edu.ma');
  await page.fill('input[name="password"]', 'admin123');

  // Role buttons are used instead of a select
  await page.click('button:has-text("Admin")');

  // 3. Submit
  await page.click('button[type="submit"]');

  // 4. Wait for redirection to dashboard overview
  await page.waitForURL('**/dashboard/overview');

  // 5. Verify we are on the dashboard
  await expect(page.locator('h1')).toContainText('Vue d\'ensemble');
  await expect(page.locator('text=Bienvenue sur votre espace EDU !')).toBeVisible();

  // 6. Check if session cookie is present and likely a JWT (long string)
  const cookies = await page.context().cookies();
  const sessionCookie = cookies.find(c => c.name === 'session');
  expect(sessionCookie).toBeDefined();
  expect(sessionCookie?.value.length).toBeGreaterThan(50);

  // 7. Take screenshot
  await page.screenshot({ path: 'final_verification.png', fullPage: true });
});
