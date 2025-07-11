# IP Address Tracker

## App Preview

<div align="center">
  <img src="./public/desktop-preview.png" alt="Desktop Preview" width="600" />
  <br>
  <img src="./public/mobile-preview.png" alt="Mobile Preview" width="250" />
</div>

## Overview

IP Address Tracker is a responsive web application that allows users to search for any IP address or domain and view its geolocation information on an interactive map. The project is built with React, LeafletJS for mapping, and the IP Geolocation API by IPify for location data.

This project was developed as part of the [Frontend Mentor](https://www.frontendmentor.io) challenge. It demonstrates modern React development practices, API integration, responsive design, and interactive UI components.

---

## Features

- **Automatic Geolocation:** On initial load, the app displays your current IP address and its location on the map.
- **Search Functionality:** Enter any valid IPv4, IPv6 address, or domain to view its location and key details.
- **Interactive Map:** Uses LeafletJS for a smooth, interactive map experience. Zoom controls adapt to mobile and desktop layouts.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Error Handling:** Displays clear error messages for invalid input or failed lookups.
- **Loading States:** Modern loading spinner UI for a polished user experience.

---

## Technologies Used

- **React** (with hooks)
- **LeafletJS** (react-leaflet)
- **Ant Design** (for loading and error UI)
- **Tailwind CSS** (utility-first styling)
- **IPify Geolocation API** (for IP/domain location data)

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/ip-address-tracker.git
   cd ip-address-tracker
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Configure your API key:**

   - Sign up for a free account at [IPify](https://geo.ipify.org/).
   - Create a `.env` file in the project root:
     ```
     VITE_IPIFY_API_KEY=your_api_key_here
     ```

4. **Start the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser:**
   - Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## Usage

- **View your own IP:** The app automatically shows your IP and location on load.
- **Search for IP or domain:** Enter a valid IP address (IPv4/IPv6) or domain (e.g., `github.com`) and submit.
- **Map interaction:** Pan and zoom the map. On mobile, zoom controls are at the bottom for easier access.
- **Error handling:** Invalid input or domains/IPs that can't be resolved will show a clear error message.

---

## Example Inputs

**Domains:**

- `github.com`
- `wikipedia.org`
- `bbc.co.uk`
- `openai.com`

**IPv4:**

- `8.8.8.8`
- `1.1.1.1`
- `185.199.108.153`

**IPv6:**

- `2001:4860:4860::8888`
- `2606:4700:4700::1111`

---

## Project Structure

```
src/
  components/
    IpMap.jsx
    LoadingSpinner.jsx
  App.jsx
  main.jsx
public/
  images/
  design/
  ...
```

---

## Deployment

You can deploy this project using [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or [GitHub Pages](https://pages.github.com/).  
Make sure to set your API key as an environment variable in your deployment settings.

---

## Credits

- Challenge by [Frontend Mentor](https://www.frontendmentor.io)
- Map by [LeafletJS](https://leafletjs.com/)
- Geolocation API by [IPify](https://geo.ipify.org/)
- UI components by [Ant Design](https://ant.design/)
- Design assets from the challenge starter files

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Feedback & Contributions

Feedback, issues, and pull requests are welcome!  
Feel free to open an issue or submit a PR to improve the project.

---

**Enjoy tracking IPs and domains! 🚀**
