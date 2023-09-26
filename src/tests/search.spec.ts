import {
  test, expect,
  // type Page
} from '@playwright/test'

const BASE_URL = 'https://fm1mmzp3-5173.brs.devtunnels.ms/'

// const testInitialLoad = async (page: Page) => {
//   await page.goto(BASE_URL)
//   await page.waitForSelector('#characterList')
//   expect(page).not.toBeNull()
// }

// const testIsLoading = async (page: Page) => {
//   const loader = page.locator('#loader')
//   expect(loader).toBeVisible()
//   await loader.waitFor({ state: 'detached' })
// }

// const testIsCharacterVisible = async (page: Page) => {
//   const firstCharacter = page.locator('#characterList li:first-child')
//   await expect(firstCharacter).toBeVisible()
// }

// test('Test Paging', async ({ page }) => {
//   await testInitialLoad(page)
//   await page.getByRole('button', { name: 'Next' }).click();
//   await testIsLoading(page)
//   await testIsCharacterVisible(page)
//   await page.getByRole('button', { name: 'Prev' }).click();
//   await testIsLoading(page)
//   await testIsCharacterVisible(page)
// })


test('Test SearchBar', async ({ page }) => {
  await page.goto(BASE_URL)

  const searchBar = await page.waitForSelector('input[type="text"]')
  expect(searchBar).not.toBeNull()


  await searchBar.fill('rick')


  await page.waitForSelector('#characterList')

  const firstCharacter = page.locator('#characterList li:first-child h1')
  const title = await firstCharacter.textContent()
  expect(title?.toLowerCase()).toContain('rick')
})