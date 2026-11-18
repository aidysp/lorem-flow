# 📝 LoremFlow

A lightweight, fast, and installable **Progressive Web App (PWA)** for generating custom placeholder text. Built with **Node.js** and **Express**, it provides both a clean web interface and a straightforward REST API for developers and designers.


---

## ✨ Features

* **Custom Text Generation:** Easily customize the exact number of words per paragraph and total paragraphs.
* **REST API Endpoint:** Clean `GET /api/lorem` endpoint with query parameter support and strict input validation.
* **PWA & Offline Support:** Powered by a Service Worker and Web App Manifest. Can be installed on desktop and mobile devices and loads seamlessly offline.
* **Zero Frontend Dependencies:** Built with pure HTML, CSS, and Vanilla JavaScript for instant load times.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) installed on your machine.

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd lorem-flow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   node server.js
   ```

4. **Open in browser:**
   Navigate to `http://localhost:3000`

---

## 📡 API Reference

### Generate Lorem Ipsum Text

```http
GET /api/lorem
```

#### Query Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `words` | `integer` | `20` | Number of words per paragraph (`1` – `1000`) |
| `paragraphs` | `integer` | `1` | Number of paragraphs (`1` – `50`) |

#### Example Request
```bash
curl "http://localhost:3000/api/lorem?words=10&paragraphs=2"
```

#### Success Response (`200 OK`)
```json
{
  "words": 10,
  "paragraphs": 2,
  "text": "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do.\n\nEiusmod tempor incididunt ut labore et dolore magna aliqua enim."
}
```

#### Error Response (`400 Bad Request`)
Returned when query parameters are out of range or not positive integers:
```json
{
  "error": "Параметры words (1-1000) и paragraphs (1-50) должны быть положительными целыми."
}
```

---

## 📁 Project Structure

```text
lorem-flow/
├── public/
│   ├── index.html      # Main generator UI
│   ├── about.html      # Project info page
│   ├── app.js          # Client-side API calls & SW registration
│   ├── manifest.json   # PWA manifest configuration
│   ├── sw.js           # Service Worker for offline caching
│   └── icon.png        # App icon
├── server.js           # Express server & API routes
├── package.json        # Project dependencies
└── README.md           # Documentation
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

