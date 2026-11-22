---
title: "From Obsidian to the Web, part 1: publishing notes with Quartz"
description: How I got a selection of my Obsidian notes online with Quartz, GitHub and GitHub Pages, and what I'd do differently.
pubDate: 2025-12-10
tags:
  - Obsidian
  - Quartz
series: From Obsidian to the Web
seriesPart: 1
draft: false
---

*Originally written on my notes site, [In the corner](https://nina4github.github.io/IdeasCorner/), built with the setup this post describes.*

## Focus
Goal: I want to publish some of my Obsidian notes to the web. The idea is to create a blog-like repository that I can use as an idea dump, but also to build a cohesive story around some topics.

Technology: after a brief discussion with Perplexity I am opting for Obsidian > Quartz > GitHub > GitHub Pages.
Let's see how it goes.

Info:
- I am working on a Mac
- My Obsidian vault is on iCloud

EDITED: Step 1 should be skipped, but it was an interesting first step to refamiliarise myself with GitHub and understand GitHub Pages a bit. The whole interaction with GitHub Pages is handled by hosting a repository with my Quartz instance and configuring GitHub Pages to use a GitHub Action. [Step 7](#step-7-hook-it-all-together)

### Step 1: How and where to publish
What do I use to publish? Perplexity suggests GitHub Pages. I have a GitHub account and I had started working on it again, so... why not.

#### About GitHub Pages
Start with https://docs.github.com/en/pages/quickstart
Ok, I created a new project following the instructions.

**Issue 1**: the page URL is not immediately available... should I wait 10 minutes? **Yes**

GitHub Pages can read md files.
I created a new page. Technically I do not need to transform the md files, because GitHub Pages does that on its own.

### Step 2: How to get Obsidian md files to GitHub
Let's use Quartz, an SSG (static site generator), to pull the Obsidian files and create a structured website.

Start with Quartz 4 https://quartz.jzhao.xyz/?ref=ssp.sh
It is pretty straightforward.

- check node version, check npm version
- follow the instructions to clone and install Quartz
	- create a project folder where to install and run Quartz (mine is under /Projects/nina_website and it contains the cloned GitHub repository where I will finally publish the content)
	- follow the instructions in the terminal to connect Quartz to your Obsidian vault with **Symlink an existing folder**.
	  My Obsidian vault is in **iCloud**, so I had to find the real path. I opened the folder in a new terminal and used the `pwd` command to retrieve it.
- run `npx quartz create`
- for the first run without changing configurations, Quartz requires an index.md file, so I added an index page in Obsidian. (*I plan to figure out how to change this default*)

The site is available on localhost:8080 and updates live (unless it hits an error and you need to re-run it).

### Step 3: Recap
1. I now have the GitHub repository publishing the README on a GitHub page.
2. I have my whole Obsidian vault published locally through Quartz.

#### What I want
1. #priorityHigh I want to separate what to publish from the random notes I take when I feel like it.
2. #priorityLow I may want to change the overall look of the pages.
3. I want to publish the Quartz public folder to the GitHub repo.
4. I want to ensure that by committing, I get that same website on GitHub Pages.

### Step 4: Tell Quartz to only look at a specific folder
Ok, I am trying a few options.

#### Option 1: Explicit Publish
Configure the Quartz filters to accept only files with the property `publish` set to true, using the plugin Explicit Publish https://quartz.jzhao.xyz/plugins/ExplicitPublish
To add a property to a file, go to Obsidian, open a file, and in the top right menu choose "Add property": `publish: true`
Then edit the filters in `quartz.config.ts`, remove the existing filter and use Explicit Publish (or maybe you can use both).

#### Option 2: Remove Drafts
This is the default.
Configure the Quartz filters to exclude files with the property `draft` set to true, using the plugin Remove Drafts https://quartz.jzhao.xyz/plugins/RemoveDrafts
To add a property to a file, go to Obsidian, open a file, and in the top right menu choose "Add property": `draft: true`

#### Option 3: Connect to a specific folder in your vault
You can also add only a specific folder of your vault for Quartz to process. This gives you more control, and you can still add the filters above on top.
As I had already started with Quartz, I had to remove the existing content folder, create it again and then re-run the command `npx quartz create`.

### Step 5: Synchronise Quartz to GitHub Pages
Final step: I want to take the public folder of Quartz and commit it to GitHub.
Not sure I should keep the Quartz configuration in the same repository... why would I not?

#### Generate and commit the public folder to your GitHub repo
1. Build Quartz with the output option set to a path in the GitHub repository configured for GitHub Pages. I published it in a /docs folder:
   `npx quartz build --output [pathtoyourlocalinstanceofyourgithubrepository]/docs`

I think I would also version the Quartz project: I am adding more and more customisations, and it is better to store them more safely than on an old Mac.

### Step 6: Recap
I have a selection of my Obsidian notes live at https://nina4github.github.io 🎉
It has the very basic design of the default Quartz theme. I changed a couple of basic details in `quartz.config.ts`, like _PageTitle_, and added a _description_.

### Step 7: Hook it all together
And then I actually changed the approach: I created a new repo, synchronised all of Quartz into it and created a GitHub Action to publish the content to GitHub Pages, as described in this tutorial: https://notes.nicolevanderhoeven.com/How+to+publish+Obsidian+notes+with+Quartz+on+GitHub+Pages
and here https://quartz.jzhao.xyz/hosting#github-pages

*(P.S. I should have just read this from the start... but Perplexity did not mention it, or I did not easily see it in the references.)*
