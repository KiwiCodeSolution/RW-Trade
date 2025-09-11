import '../../../app/globals.css'
import UserHeader from '@/components/userUI/UserHeader';
import UserFooter from '@/components/userUI/UserFooter';

export async function generateStaticParams() {
  return [
    { lang: "uk" },
    { lang: "en" }
  ];
}


const LangLayout = async ({ children, params }) => {

  const { lang } = await params

  return (
    <html lang={lang}>
      <body>
        <UserHeader currentLang={lang} />
        {children}
        <UserFooter />
      </body>

    </html>
  )
}

export default LangLayout