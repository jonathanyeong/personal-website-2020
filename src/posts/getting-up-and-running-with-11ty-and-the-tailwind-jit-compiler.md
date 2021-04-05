---
date: 2021-04-07T00:00:00-07:00
title: Getting up and running with 11ty and the Tailwind JIT compiler
published: false
cover_image: ''
description: Tailwind has announced the beta release of the Tailwind JIT compiler.
  Using the compiler will reduce the size of your development CSS, without sacrificing
  build times. In this tutorial, I'll show how you can use Tailwind JIT compiler with
  an 11ty project.

---
Tailwind is getting a [Just In Time (JIT) compiler](https://github.com/tailwindlabs/tailwindcss-jit "Tailwind JIT")! The Tailwind JIT compiler will generate your styles during run-time as you add classes to your templates. That means our CSS files only contains the styles we need. Also, the build times are fast and the development CSS matches production. The JIT compiler is in beta, but other than the [known limitations](https://github.com/tailwindlabs/tailwindcss-jit#known-limitations "Tailwind JIT: Known limitations"), it looks ready to use! Let’s get it working with an 11ty project.

Getting Tailwind JIT working with 11ty is very similar to a standard Tailwind setup. In this post, I’ll do a full tutorial on getting a Tailwind JIT + 11ty application up and running. I’ll also show the steps needed to minimize the css for production. If you want to jump straight to the full solution, here’s the [github repo](https://github.com/jonathanyeong/eleventy-tailwind-site "Tailwind JIT + 11ty github repo").

Versions used:

* 11ty (0.12.1)
* Tailwind JIT (0.1.17)

## Setting up the application

We’re going to do some boilerplate-y things to get everything set up. If you already have an 11ty project up and running, feel free to skip these steps.

### Creating the application folders

Let’s create a new folder `eleventy-tailwind-blog`, go into the folder, and add a `package.json` file to it. The `-y` flag on `npm init` skips the questionnaire.

```bash
mkdir eleventy-tailwind-blog
cd eleventy-tailwind-blog

npm init -y
```

Next, we’re going to install eleventy as a dev dependency and create a `src` folder. You can structure an 11ty application however you want, but having a folder where all your templates and assets live keeps things nicely organized.

```bash
npm install --save-dev @11ty/eleventy
mkdir src
```

### Setting up the configuration and html

Create an `.eleventy.js` file at the top level folder, `eleventy-tailwind-blog`. This file is where all the 11ty configuration lives. There’s a lot of sensible defaults that 11ty provides, so for now we’ll just tell 11ty where our files live (`src/`) and what the output directory (`dist/`) should be. 11ty will generate the output folder for us.

```js
module.exports = config => {
  return {
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
```

Next, inside your `src` folder, add an `index.njk` file, and add the boilerplate code below. This file is a [Nunjucks](https://mozilla.github.io/nunjucks/ "Nunjucks") template. And we’ll be using some features from Nunjucks throughout the rest of the tutorial. 11ty supports many [different types of templating languages](https://www.11ty.dev/docs/languages/ "11ty template languages"). And many of them have similar features. Feel free to use whichever one you’re most comfortable with.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>{{ title }}</title>
  </head>
  <body>
    <div class="container mx-auto text-center pt-5">
      <h1 class="text-5xl underline mb-5">Welcome to 11ty + Tailwind JIT!</h1>
      <p class="text-2xl font-serif text-purple-600 mb-2">Add some styling to this paragraph. And check out the button!</p>
      <button class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg">
        Hey there!
      </button>
    </div>
  </body>
</html>
```

The boilerplate code doesn’t have any styling. I included some Tailwind classes that we’ll see in action after we set up Tailwind. But first, let’s get everything up and running.

### Getting up and running

Update the `“scripts”` section in your `package.json` with a `start` and `build` command. These commands will allow us to run 11ty in dev and build in production, respectively.

```bash
...
"scripts": {
  "start": "eleventy --serve",
  "build": "eleventy"
},
...
```

Finally, we can start our 11ty application via:

```html
npm start
```

Navigate to localhost:8080 and you should see our unstyled, and pretty boring, page!
![](Screen%20Shot%202021-03-28%20at%2012.03.49%20pm.png "Unstyled 11ty page using nunjucks template")

## Getting Tailwind JIT installed

Now for the fun part! Let’s get Tailwind JIT installed and transform the plain old HTML page into something a little prettier!

### Install TailwindJIT and supporting packages

Next, we need to install the Tailwind JIT and supporting packages as dev dependencies. The command below is pulled from the [Tailwind JIT github](https://github.com/tailwindlabs/tailwindcss-jit "Tailwind JIT - GIthub").

```bash
npm install -D @tailwindcss/jit tailwindcss postcss
```

Now, we’ll create a `postcss.config.js` file at the top level folder and add Tailwindcss/JIT to it as a plugin:

```js
module.exports = {
  plugins: [
    require('@tailwindcss/jit')  
  ]
}
```

Next, create a `tailwind.config.js` file and specify the CSS files we want to purge. The JIT compiler will remove the unused CSS classes from the files that match the pattern in the config. We’ll be running purge on our Nunjucks templates in `src` and the resulting HTML files in `dist` that get generated after 11ty runs. If you had other files that contain Tailwind classes you would want to add them below.

```js
module.exports = {
  purge: [
    './dist/**/*.html',
    './src/**/*.njk',
  ]
}
```

### Getting Tailwind up and running

To finish up with the Tailwind install, we’re going to create a new folder `src/assets/styles`. This will be where our Tailwind CSS file lives.

```js
cd src
mkdir assets
cd assets
mkdir styles
```

Next, add `tailwind.css` to `assets/styles`. And paste the following code into it. The [Tailwind directives](https://tailwindcss.com/docs/functions-and-directives "Tailwind Directives") will get swapped out with actual CSS during runtime.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

We’re also going to install `postcss-cli` and `npm-run-all`. PostCSS cli will let us run `postcss` on the command line - through an npm command. We’ll also want to run both our 11ty server and postcss in parallel, that’s where `npm-run-all` comes in.

```bash
npm install -D postcss-cli npm-run-all
```

Update our npm scripts to the following.

```json
...
"scripts": {
  "watch:eleventy": "eleventy --serve",
  "watch:postcss": "NODE_ENV=development postcss src/assets/styles/tailwind.css --o dist/assets/styles style.css --watch",
  "start": "npm-run-all --parallel watch:",
  "build": "ELEVENTY_ENV=production eleventy && NODE_ENV=production postcss src/assets/styles/tailwind.css --o dist/assets/styles/style.css"
},
...
```

Let’s take a closer look at the `watch:postcss` script command. We’re telling postcss to take the `tailwind.css` file and output a `style.css` file in the `dist` directory. It will do so in watch mode, which means every time you make a change it will recompile the css file. We’ll need to reference this `style.css` in our `index.njk` file. Add the following to the `<head>` of our `index.njk` file:

```html
<link rel="stylesheet" href="{{ '/assets/styles/style.css' | url }}">
```

Finally, let’s start our application and see our Tailwind styles in all their glory!

```bash
npm start
```

![](Screen%20Shot%202021-03-28%20at%2012.04.19%20pm.png "A styled Tailwind page")

## Optimizing for production

Optimizing for production means minifying the CSS code. With Tailwind JIT we’re already purging the CSS for both development and production. But we still want to reduce the filesize as much as possible when building to production. We’re going to use `cssnano` to minify our CSS for us.

### Setting up cssnano

First, we’ll install `cssnano` as a dev dependency:

```html
npm install -D cssnano
```

Next, update the `postcss.config.js` to include `cssnano`. We’ll also add a switch to only include the `cssnano` plugin if we’re targeting production. This switch allows us to see un-minified CSS in development.

```js
const cssnano = require('cssnano')({
    preset: 'default',
})

module.exports = {
  plugins: [
    require('@tailwindcss/jit'),
    ...process.env.NODE_ENV === 'production'
      ? [cssnano]
      : []
  ]
}
```

Since our build script already targets production. We can run `npm build` and navigate to the `dist` folder to find the minified CSS.

### (Optional) Building a separate css file for production

Right now, both our production and development css gets built to the same file. But it might be nice to be explicit about which file is for production and which file isn’t. We’re going to alter our project to build to `style.min.css` for production instead.

Create a new, `_data`, folder under `src`:

```js
cd src
mkdir _data
```

And add a `myProject.js` file to that folder. You can call this file whatever you like, 11ty will name the object based on the filename. We’ll use this file to access an environment variable that we can use in our `index.njk` template.

```js
module.exports = {
  environment: process.env.ELEVENTY_ENV
};
```

Next, update the `<link>` tag in your head with the code below:

```html
{% if myProject.environment == "production" %}
  <link rel="stylesheet" href="{{ '/assets/styles/style.min.css' | url }}">
{% else %}
  <link rel="stylesheet" href="{{ '/assets/styles/style.css' | url }}">
{% endif %}
```

You can find similar `if` statements in other templating languages. The purpose of the code above is to tell 11ty to use the `min.css` file during production.

Finally, update our `build` command in the package.json to:

```json
"build": "ELEVENTY_ENV=production eleventy && NODE_ENV=production postcss src/assets/styles/tailwind.css --o dist/assets/styles/style.min.css"
```

Now run `npm run build` and navigate to the `dist` folder. Under `src/assets/styles` you should find `style.min.css` which will contain all your minified css.

## Conclusion

I hope this helped you get started on your tailwind + 11ty journey! The 11ty application in this tutorial, doesn’t do anything too fancy. But the steps to get Tailwind JIT compiler should be transferrable to most projects. If you wanted the full source code here’s the [Github repo](https://github.com/jonathanyeong/eleventy-tailwind-site "11ty tailwind github repo").