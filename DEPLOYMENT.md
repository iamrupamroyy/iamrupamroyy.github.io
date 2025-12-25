# How to Deploy Your Portfolio Website to GitHub Pages

This file contains two sets of instructions for deploying your portfolio website to GitHub Pages.

---

## Option 1: Deploy to `https://iamrupamroyy.github.io/my-portfolio/` (Recommended & Easiest)

This option uses the existing configuration of your project and is the most straightforward way to deploy your website.

### Steps:

1.  **Commit and Push Your Changes:**
    First, you need to commit all the changes you've made to your local repository and then push them to your GitHub repository.

    ```bash
    # Add all the changes to the staging area
    git add .

    # Commit the changes with a message
    git commit -m "Deploying updated portfolio"

    # Push the changes to your main branch on GitHub
    git push origin main
    ```
    *(**Note:** If you are using a different branch name, replace `main` with your branch name.)*

2.  **Deploy to GitHub Pages:**
    Once your changes are on GitHub, you can use the `deploy` script that is already in your `package.json` file.

    ```bash
    npm run deploy
    ```

    This command will build your project and deploy it to the `gh-pages` branch on your GitHub repository.

3.  **Verify Your Deployment:**
    After the `npm run deploy` command finishes, it might take a few minutes for the changes to be visible. You can then visit your portfolio website at [https://iamrupamroyy.github.io/my-portfolio/](https://iamrupamroyy.github.io/my-portfolio/).

---

## Option 2: Deploy to `https://iamrupamroyy.github.io/`

This option is more involved and requires you to change your repository name and settings on GitHub.

### Step 1: Rename Your GitHub Repository

For your website to be available at `https://iamrupamroyy.github.io/`, your GitHub repository **must** be named `iamrupamroyy.github.io`.

1.  Go to your repository on GitHub.
2.  Click on the "Settings" tab.
3.  Under the "General" section, you will find the "Repository name" field.
4.  Rename your repository to `iamrupamroyy.github.io`.

### Step 2: Update `package.json`

You need to update the `homepage` property in your `package.json` file.

1.  Open the `package.json` file in your editor.
2.  Change the `homepage` property to `https://iamrupamroyy.github.io/`.

    ```json
    "homepage": "https://iamrupamroyy.github.io/",
    ```

### Step 3: Deploy

Now you can deploy your website using the same `npm run deploy` command.

```bash
npm run deploy
```

This will deploy your website to the `gh-pages` branch.

### Step 4: Change GitHub Pages Source

After deploying, you need to tell GitHub Pages to use the `gh-pages` branch as the source.

1.  Go to your repository on GitHub.
2.  Click on the "Settings" tab.
3.  Go to the "Pages" section from the left sidebar.
4.  Under "Build and deployment", for the "Source", select "Deploy from a branch".
5.  For the "Branch", select `gh-pages` and `/ (root)` folder, and click "Save".

Your website should then be available at `https://iamrupamroyy.github.io/` after a few minutes.
