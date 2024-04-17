import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaSpotify,
  FaTwitter,
} from 'react-icons/fa'
import { Logo } from '../logos/logo-barzim'

export const Footer = () => {
  return (
    <footer className="hidden bg-gray-cards md:block">
      <div className="mx-auto max-w-screen-lg space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-accent-foreground">
            <Logo width={96} variant="auto" />
          </div>

          <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-accent-foreground transition hover:opacity-75"
              >
                <span className="sr-only">Instagram</span>
                <FaInstagram size={24} />
              </a>
            </li>

            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-accent-foreground transition hover:opacity-75"
              >
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin size={24} />
              </a>
            </li>

            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-accent-foreground transition hover:opacity-75"
              >
                <span className="sr-only">GitHub</span>

                <FaGithub size={24} />
              </a>
            </li>
            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-accent-foreground transition hover:opacity-75"
              >
                <span className="sr-only">Spotify</span>

                <FaSpotify size={24} />
              </a>
            </li>

            {/* <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="text-accent-foreground transition hover:opacity-75"
              >
                <span className="sr-only">Dribbble</span>

                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li> */}
          </ul>
        </div>

        {/* <div className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16">
          <div>
            <p className="font-medium text-gray-900">Services</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-accent-foreground transition hover:opacity-75"
                >
                  {' '}
                  1on1 Coaching{' '}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-accent-foreground transition hover:opacity-75"
                >
                  {' '}
                  Company Review{' '}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-accent-foreground transition hover:opacity-75"
                >
                  {' '}
                  Accounts Review{' '}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-accent-foreground transition hover:opacity-75"
                >
                  {' '}
                  HR Consulting{' '}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-accent-foreground transition hover:opacity-75"
                >
                  {' '}
                  SEO Optimisation{' '}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900">Company</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-accent-foreground transition hover:opacity-75"
                >
                  {' '}
                  About{' '}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-accent-foreground transition hover:opacity-75"
                >
                  {' '}
                  Meet the Team{' '}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-accent-foreground transition hover:opacity-75"
                >
                  {' '}
                  Accounts Review{' '}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900">Helpful Links</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-accent-foreground transition hover:opacity-75"
                >
                  {' '}
                  Contact{' '}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-accent-foreground transition hover:opacity-75"
                >
                  {' '}
                  FAQs{' '}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-accent-foreground transition hover:opacity-75"
                >
                  {' '}
                  Live Chat{' '}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900">Legal</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-accent-foreground transition hover:opacity-75"
                >
                  {' '}
                  Accessibility{' '}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-accent-foreground transition hover:opacity-75"
                >
                  {' '}
                  Returns Policy{' '}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-accent-foreground transition hover:opacity-75"
                >
                  {' '}
                  Refund Policy{' '}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-accent-foreground transition hover:opacity-75"
                >
                  {' '}
                  Hiring Statistics{' '}
                </a>
              </li>
            </ul>
          </div>
        </div> */}

        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()}. Barzim LLC. Alguns direitos
          reservados Outros não.
        </p>
      </div>
    </footer>
  )
}
