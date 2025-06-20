import { APP_SETTINGS } from '@/lib/settings';

const FOOTER_TEXT = '© 2025 NBN Compare';

export function Footer() {
  return (
    <footer className="text-center text-sm text-gray-500 p-2 sm:p-4">
      {FOOTER_TEXT} ({APP_SETTINGS.VERSION})
    </footer>
  );
}
