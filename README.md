🎬 Movie App

Live Demo: https://movie-app-hazel-gamma-54.vercel.app/

🚀 Overview

This is a modern React-based movie discovery app using Vite and React. Users can browse movies, add favourites, and search via the OMDb API (as an example). The UI leverages icons from react-icons and a responsive layout for mobile & desktop.

🧩 Features

Browse & search for movies

Add or remove movies from a watch-list

Heart/favourite toggle icon using FaHeart / FaRegHeart from react-icons

Responsive design, optimized for performance

Deployed on Vercel for zero-config hosting

🧠 Tech Stack

React (functional components + hooks)

Vite for build & dev workflow

Context API or other state management for watch-list

OMDb API for movie data

React Icons for iconography

Vercel for deployment

🔧 Setup Instructions
git clone <your-repo-url>
cd movie-app
npm install
npm run dev       # for development
npm run build     # for production build
npm run preview   # preview production build locally

📋 How to Use

Navigate to the home page — you’ll see trending or default movies.

Use the search bar to find specific titles.

Click the heart icon to add/remove a movie to your watch-list.

Click a movie card for more details (if implemented).

Visit the “Watch-list” section to see your favourites.

✅ What’s Working

Search functionality (by title)

Watch-list add/remove toggle

Icon switching between filled & outlined heart

Live deployment working at the link above

Responsive UI for mobile and desktop

🚧 What Could Be Improved

Add pagination or infinite scroll for movie results

Display detailed movie page with synopsis, ratings, trailer etc.

Persist watch-list between sessions (localStorage or backend)

Use TypeScript for type safety

Add unit/integration tests

Improve error handling for API failures

📝 License

This project is licensed under the MIT License – feel free to use & adapt it.
