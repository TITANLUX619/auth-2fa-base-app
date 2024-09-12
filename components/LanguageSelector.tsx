'use client';

import { Locale, usePathname, useRouter } from '@/i18n/routing';
import Image from 'next/image';
import { setCookie } from 'cookies-next';

export default function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();

  function changeLanguage(nextLocale: Locale) {
    setCookie('locale', nextLocale, { path: '/' });
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className=" flex flex-row w-full justify-center gap-2 z-50 my-4">
      <button onClick={() => changeLanguage('es')} className="focus:outline-none">
        <Image
          src="/assets/spainFlag.svg"
          alt="Spanish"
          width={40}
          height={40}
          className="hover:scale-105 transition-transform"
        />
      </button>
      <button onClick={() => changeLanguage('en')} className="focus:outline-none">
        <Image
          src="/assets/ukFlag.svg"
          alt="English"
          width={40}
          height={40}
          className="hover:scale-105 transition-transform"
        />
      </button>
    </div>
  );
};