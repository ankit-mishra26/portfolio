# Deploying to Netlify: step by step

## Before you start
- A GitHub account and a Netlify account (free plans are fine)
- Git installed. Check with `git --version` in PowerShell. If it is missing, install it from git-scm.com, then reopen PowerShell.
- The site runs locally with `npm run dev` and `npm run typecheck` shows no errors

## Step 1. Check the project is safe to upload
In the project folder:
```powershell
dir .gitignore
```
It must list `.env.local` and `node_modules`. Never upload a file that contains a real API key.

## Step 2. Put the project on GitHub
1. On github.com click **New repository**, name it (for example `portfolio`), leave it empty (no README), and create it.
2. In PowerShell, inside the project folder, run these one at a time:
   ```powershell
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
3. If GitHub asks you to sign in, use the browser prompt. If `git commit` asks who you are, run:
   ```powershell
   git config --global user.name "Ankit Mishra"
   git config --global user.email "your-email@example.com"
   ```
   then run the commit again.
4. Refresh the GitHub page and confirm your files are there and `.env.local` is NOT.

## Step 3. Get your Resend API key
1. Sign in at resend.com with the same email you want messages sent to.
2. Open **API Keys**, then **Create API Key**, and copy it once. It is shown only once.
3. Keep it somewhere private. Do not paste it in chats, code or screenshots.

## Step 4. Create the Netlify site
1. In Netlify click **Add new site**, then **Import an existing project**, then **GitHub**, and choose the repository.
2. Leave the build settings as detected (Next.js). `netlify.toml` already pins Node 22.
3. Before deploying, open **Environment variables** (or add them in Step 5), then deploy.

## Step 5. Add the environment variables
Site configuration, then **Environment variables**, then **Add a variable**:

| Name | Value |
|---|---|
| `RESEND_API_KEY` | your key from Step 3 (tick "Contains secret values") |
| `NEXT_PUBLIC_SITE_URL` | your final address, for example `https://your-site-name.netlify.app` |

`CONTACT_TO_EMAIL` is optional. Messages go to the email in `data/socials.ts` by default.

Variables only apply to new deploys, so after adding or changing any: **Deploys**, then **Trigger deploy**, then **Clear cache and deploy site**.

## Step 6. Choose your site address
Site configuration, then **Site details**, then **Change site name**. Pick something clean such as `ankit-mishra-portfolio`. Your address becomes `https://ankit-mishra-portfolio.netlify.app`.
Set `NEXT_PUBLIC_SITE_URL` to exactly that address and redeploy, so link previews and the sitemap use it.

(You already have a site at regal-dolphin-32970b.netlify.app. To use it for this portfolio, link the repository to that site instead: Site configuration, then Build & deploy, then Continuous deployment, then Link repository. This replaces what is live there. If you do this, update the portfolio link on your résumé if the address changes.)

## Step 7. Test the live site
- [ ] Home page, dark/light toggle, nav links and mobile menu work
- [ ] Résumé button downloads the PDF, and `/resume` opens it
- [ ] Each project page opens
- [ ] **Contact form:** send a test message and check your inbox and spam folder
- [ ] Ask Ankit answers the suggested questions
- [ ] Ctrl+K opens the command palette
- [ ] `/sitemap.xml` and `/robots.txt` show your real address

## Step 8. Check link previews
Paste your address into LinkedIn Post Inspector (linkedin.com/post-inspector) and opengraph.xyz. You should see the preview card with your name and the pipeline row.

## Step 9. Updating the site later
Edit files locally, then:
```powershell
git add .
git commit -m "Update"
git push
```
Netlify rebuilds automatically after every push.

## Troubleshooting
- **Visitors see "contact form is not set up":** `RESEND_API_KEY` is missing, or you have not redeployed since adding it.
- **Message does not arrive:** open Netlify, then **Logs**, then **Functions**, and look for lines starting with `[contact]`. Also check Resend's dashboard under **Emails**. With the default test sender, Resend only delivers to the email address your Resend account was created with. To send to any inbox, verify your own domain in Resend and set `CONTACT_FROM_EMAIL`.
- **Build fails:** open the deploy log and read the first red error. Confirm `npm run typecheck` passes locally, and that `package-lock.json` was committed.
- **GitHub section says "temporarily unavailable":** GitHub rate-limited the request and it retries within the hour. A `GITHUB_TOKEN` variable avoids this.
- **Old preview image or title after changes:** redeploy, then re-scrape in the sharing debuggers.
- **Spam protection note:** the contact and Ask limits are kept per serverless instance in memory. They slow down spam but are not a hard guarantee.
