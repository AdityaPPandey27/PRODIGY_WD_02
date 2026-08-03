<div align="center">

# ⏱️ Stopwatch Web Application

*A modern, premium, and highly accurate stopwatch built with Vanilla JavaScript.*

</div>

A beautifully crafted, high-precision stopwatch web application designed with a sleek glassmorphism interface. Built using **HTML5**, **CSS3**, and **Vanilla JavaScript**, this project leverages the `performance.now()` API to deliver drift-free timing with millisecond precision. The application is lightweight, responsive, and requires no external libraries or frameworks.

---

## 📌 Features

- ▶️ Start stopwatch with high-precision timing
- ⏸️ Pause without losing progress
- ▶️ Resume exactly where you left off
- 🔄 Reset stopwatch and clear all laps
- 🏁 Record unlimited lap times
- 📜 View complete lap history
- ⚡ High-precision timer using `performance.now()`
- 📱 Fully responsive across Desktop, Tablet, and Mobile
- ✨ Modern Glassmorphism user interface
- ⌨️ Keyboard shortcuts for quick controls
- 🎨 Smooth animations and interactive effects
- 📋 Auto-scrolling lap list

---

## 🛠️ Technologies Used

This project is built using pure web technologies without any external dependencies.

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic page structure |
| **CSS3** | Glassmorphism styling, animations, responsiveness |
| **JavaScript (ES6+)** | Stopwatch logic, DOM manipulation, event handling |

---

## 📂 Project Structure

```text
Stopwatch-Web-Application/
│
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── script.js           # Stopwatch functionality
├── README.md           # Project documentation
└── assets/
    └── screenshots/    # Application screenshots
```

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/Stopwatch-Web-Application.git
```

### Navigate to the Project

```bash
cd Stopwatch-Web-Application
```

### Run the Application

Simply open **index.html** in your preferred web browser.

No installation, dependencies, or build tools are required.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Space** | Start / Pause |
| **L** | Record Lap |
| **R** | Reset Stopwatch |

---

## ⚙️ How It Works

The stopwatch is built for accuracy using the browser's high-resolution timer.

### Start
- Captures the current timestamp using `performance.now()`
- Starts a `requestAnimationFrame()` loop for smooth updates

### Pause
- Stops the animation frame
- Stores the exact elapsed time

### Resume
- Recalculates the start timestamp
- Continues without losing precision

### Reset
- Clears elapsed time
- Removes all lap records
- Restores the UI to its default state

### Lap
- Records the current elapsed time
- Calculates the duration since the previous lap
- Displays the newest lap at the top of the history

---

## 🎨 UI Highlights

- Frosted Glassmorphism interface
- Premium dark gradient background
- Responsive Flexbox layout
- Smooth hover animations
- Interactive button effects
- Auto-scrolling lap history
- Monospace timer display for stable alignment

---

## 📈 Future Improvements

- 🌗 Dark / Light theme toggle
- 💾 Save sessions using Local Storage
- 📤 Export lap times (CSV / TXT)
- 🔊 Optional sound effects
- 🎯 Multiple stopwatch instances
- 🎨 Custom accent color themes
- 📊 Lap statistics dashboard
- 📱 Progressive Web App (PWA) support

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/AmazingFeature
```

3. Commit your changes

```bash
git commit -m "Add AmazingFeature"
```

4. Push the branch

```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

See the **LICENSE** file for more details.

---

## 👨‍💻 Author

**Aditya Pratap Pandey**

- GitHub: https://github.com/AdityaPPandey27
- LinkedIn: https://linkedin.com/in/aditya-pratap-pandey-875b36273

---

## ⭐ Support

If you found this project useful or learned something from it, consider giving the repository a **⭐ Star**. Your support helps others discover the project and motivates future improvements.
