import { test, expect } from '@playwright/test';

const AliceID = "recbpM8AY5xY7fkLl"

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("LWCW 2025");
});

test('correctly selects a user', async ({ page }) => {
  await page.context().clearCookies()

  await page.goto('/');

  // Click the dropdown
  await page.click('[id^="headlessui-combobox-button-"]');
  // Click the first option (Alice)
  await page.click('[id="headlessui-combobox-option-:r1:"]');

  // check that it set a cookie
  const cookies = await page.context().cookies()
  await expect(cookies.find(c => c.name == 'user').value).toBe(AliceID)

});

test('shows correct sessions for user', async ({ page, context }) => {
  // claim to be Alice Example1
  await context.addCookies([
        { name: 'user', value: AliceID, path: '/', domain: 'localhost' }
    ]);

  // filter sessions Alice is going to
  await page.goto('/?view=rsvp');

  // has "Kickoff"
  await expect(page.locator('body')).toContainText('Kickoff');
  // doesn't have "Workshop"
  await expect(page.locator('body')).not.toContainText('Workshop');
});
