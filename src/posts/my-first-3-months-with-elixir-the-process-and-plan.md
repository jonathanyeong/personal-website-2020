---
date: 2020-10-05T00:00:00-07:00
title: My first 3 months with Elixir
description: I've been learning Elixir on the side for the past 3 months. I wanted
  to share the plan I've roughly followed. And my learning process.
published: false

---
I've been learning Elixir as a side project for the past few months. And I wanted to share my process and the rough learning plan I've been following. Before we dive in, I wanted to give some context on my journey so far. As much as I want to, I'm not using Elixir at work. Meaning I haven't built a production-ready Elixir app. Luckily I had to prep for a conference talk on a deep dive into the pipe operator. Having that as a motivator helped push me to learn more. Since the conference, I've continued on my Elixir journey by following the learning plan below.

## Learning plan

I love plans. Something about them makes me so happy. This plan reflects the concepts I've learnt so far. I've enjoyed this progression because everything builds on top of another. And I never feel like I'm overwhelmed by information or trying to figure out what to work on next. I don't think I can cover everything to learn. And depending on your needs, you may want to focus on something different. Tweak it as you see fit. And if there's a concept I must learn, please let me know! Points in **bold** are concepts I haven't spent time on.

* Elixir Foundations
  * Basic types and operators
  * Conditional statements - if, cond, case.
  * Modules and functions
  * Using Lists, Maps, Tuples
* Practicing coding problems
  * Pattern matching
  * Recursion
  * Using Enums
  * Using binaries and charlists.
* Building Elixir apps
  * Exunit testing
  * Handling state - Processes, Agents, GenServer
  * Supervisor and supervision trees (OTP).
  * Using mix to generate an Elixir application.
  * Plugs (if you're interested in web development)
  * **Metaprogramming**
  * **Database Ecto**
  * **File handling**
  * **Date and Time**
  * **Deploying an Elixir app**

## My Learning Process

My learning process can be broken down into two parts; hands-on coding and reading the Elixir lang guide. When I first started learning Elixir, I skimmed through the guide to get a sense of what the syntax looks like. To help me remember what I read, I used Exercism to get some hands-on practice. Doing coding challenges also helped me ask more questions about the language, like how do you use Enums? To answer these questions, I alternated between the Elixir lang guide and the module Hexdocs.

From challenges, I started building Elixir applications. Well, just one application, a URL shortener. This project taught me about tracking state with GenServer, how to start a webserver, and how to build a router. Another idea that comes to mind for a side project is a CSV parser that will store transformed data into a database. Hopefully, this will teach me about reading a file and how to use Ecto. Ultimately, everyone learns differently. And I encourage you to experiment and see what works for you.

## What's next?

Next up for me is learning how to deploy an Elixir app in production. Also, understanding how to read/write from a database or a file. And then more time spent with Plugs and concurrency. I'm sure tomorrow I'll add another thing onto the list! The final piece of advice I can give is revisiting code you've written in the past. It's always nice to see where you started and how far you've come.

## Resources

* [Elixir Lang guides](https://elixir-lang.org/getting-started/introduction.html)
* My most commonly used Hexdocs
  * [Map](https://hexdocs.pm/elixir/Map.html)
  * [Enum](https://hexdocs.pm/elixir/Enum.html)
  * [List](https://hexdocs.pm/elixir/List.html)
* [Elixir School](https://elixirschool.com/en/) - Another written guide like the Elixir lang guides.
* [Elixir Casts](https://elixircasts.io/) - Video tutorials
* [Alchemist Camp](https://alchemist.camp/) - Video tutorials