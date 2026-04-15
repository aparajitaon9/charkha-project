import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              The Charkha Project
            </div>
            <p className="footer-tagline">
              Deep research into India&apos;s food, mythology, sacred places,
              and hidden cultures. For the globally curious.
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
            <div className="footer-col-title">Explore</div>
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
                  Sacred India
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@thecharkhaproject" target="_blank" rel="noopener noreferrer">
                  Mythology
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
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 The Charkha Project</span>
          <span><a href="#">Privacy</a></span>
        </div>
      </div>
    </footer>
  )
}
