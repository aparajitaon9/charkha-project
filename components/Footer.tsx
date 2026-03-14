import Link from 'next/link'
import RainbowBar from './RainbowBar'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <RainbowBar style={{ marginBottom: '48px', borderRadius: '4px' }} />
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="nav-logo-dot" />
              The Charkha Project
            </div>
            <p className="footer-tagline">
              Spinning India&apos;s stories into something worth reading. Research-led
              content about India&apos;s food, mythology, sacred places, and hidden cultures.
            </p>
            <div className="footer-social">
              <a
                href="https://youtube.com/@thecharkhaproject"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="YouTube"
              >YT</a>
              <a
                href="https://instagram.com/thecharkhaproject"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="Instagram"
              >IG</a>
              <a
                href="https://pinterest.com/thecharkhaproject"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="Pinterest"
              >PT</a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Pillars</div>
            <ul className="footer-links">
              <li><Link href="/sacred-india">Sacred India</Link></li>
              <li><Link href="/mythology">Mythology</Link></li>
              <li><Link href="/food-culture">Food & Culture</Link></li>
              <li><Link href="/hidden-india">Hidden India</Link></li>
              <li><Link href="/plan-india">Plan India</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Watch</div>
            <ul className="footer-links">
              <li>
                <a href="https://youtube.com/@thecharkhaproject" target="_blank" rel="noopener noreferrer">
                  YouTube Channel
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@thecharkhaproject" target="_blank" rel="noopener noreferrer">
                  Sacred India Playlist
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@thecharkhaproject" target="_blank" rel="noopener noreferrer">
                  Mythology Playlist
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@thecharkhaproject" target="_blank" rel="noopener noreferrer">
                  Food Playlist
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Connect</div>
            <ul className="footer-links">
              <li><Link href="/#newsletter">Newsletter</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><a href="mailto:hello@thecharkhaproject.com">Contact</a></li>
              <li><a href="#">Work with us</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 The Charkha Project. All rights reserved.</span>
          <span>Built with curiosity. Powered by research. <a href="#">Privacy</a></span>
        </div>
      </div>
    </footer>
  )
}
