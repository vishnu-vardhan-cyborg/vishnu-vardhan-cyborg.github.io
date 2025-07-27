import './CustomFooter.css'; // Link the CSS below

export default function CustomFooter() {
  return (
    <footer className="custom-footer">
      <div className="footer-left">
        <p>© 2025 Vishnu Vardhan. All rights reserved.</p>
        <h1 className="footer-logo">
          <span>V</span>ISHNU<br />
          <span>V</span>ARDHAN
        </h1>
      </div>

      <div className="footer-right">
        <p className="quote">
          When it comes to art, It's important not to hide the Madness.
        </p>
        <ul className="footer-links">
          <li><span>Tweeting about design, dev & life in itself</span> <a href="https://x.com/bembum91">Twitter</a></li>
          <li><span>Pixel Perfect shots of my work</span> <a href="#">Dribbble Layers</a></li>
          <li><span>Brainrot of Networking</span> <a href="#">LinkedIn</a></li>
          <li><span>LinkedIn's Cooler Cousin</span> <a href="#">Peerlist</a></li>
          <li><span>Detailed Showcase of my work</span> <a href="#">Behance</a></li>
          <li><span>If you are stalking me this would help</span> <a href="#">Bento</a></li>
        </ul>
      </div>
    </footer>
  );
}
