import { getTranslations } from 'next-intl/server';;

export default async function Home() {
  const t = await getTranslations();

  return (
    <div className="home">
      <div className="home-content">
        <h1 className='text-6xl font-bold text-slate-700 drop-shadow-md'>
          {t("home.title")}
        </h1>
        <p className='text-2xl text-center  text-slate-700'>
          {t("home.description")}
        </p>
      </div>
    </div>
  );
}
