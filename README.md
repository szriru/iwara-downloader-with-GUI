# Iwara downloader with GUI

![Iwara Downloader With GUI](https://github.com/szriru/iwara-downloader-with-GUI/blob/main/HowToUse/assets/idwg.png)

## About the project

This is Iwara downloader with GUI.
You can download videos on iwara.tv with GUI.

I felt like making a downloader for me to learn codes. So I did.

Currently, there's a lot of restriction for its functions and UXs.
You may be not　able to use this comfortably.

They say there will be brand-new iwara website soon. So its gonna be after that happens when I make iwara-downloader in earnest.


###  Build with
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://github.com/vitejs/vite)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Electron.js](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)](https://electronjs.org/)

## Getting Started

### From release-build
I will put it on release-build page when I can call it v1.0.0

### From dev
1. clone this repo
```
git clone https://github.com/szriru/iwara-downloader-with-GUI
```
2. Install all dependencies with npm
```
npm install
```
3. 
```
npm run dev
```

### How to use
1. Put "user page" URL and hit GET button
2. Hit choose save location button to choose it (recommend to choose "C://User/Username/Downloads")
3. Select quality you want download.
4. Hit download button
5. After a while, you will see download progress gauge.

Currently you can only get download items by putting "user page".
You can download videos only one by one to avoid getting access denied.
You need to restart the app to download from another user.
  
## Roadmap

### Feature to add

- All Vieo Download with one click.
- Remember what you downloaded,. ( use + access to local database)
- Subscription system. Download automatically when the users uploaded videos.


### Improve

- Accept any URL type. Currently only "https://ecchi.iwara.tv/users/somename"
- Improve Video List View
    - Not only its URL, but thumbnail, video name, publisher.
    - Button to remove from list.
- Code Readabiliy. Should Make components of each section. But how to pass setstate func to child component. I need to learn around state management.
- A Function to set save file name.
- A lot of Error handling.

### Errors:
- save location is limited. EPERM. no permission.
- React stops its rendering process when the window minimized. So you cannot recognize if downloading is done or not.
- Get access denied due to bot-like behavior xD


  
  
  
  

## Acknowledgements

This project used a Starter template. ==> [Vite + React + Typescript + Electron - Starter](https://github.com/maxstue/vite-reactts-electron-starter)

Other templates related to this.

- [vite-react-electron](https://github.com/caoxiemeihao/vite-react-electron)

- [electron-vite-react](https://github.com/twstyled/electron-vite-react)

- [vite-electron-esbuild-starter](https://github.com/jctaoo/vite-electron-esbuild-starter)
