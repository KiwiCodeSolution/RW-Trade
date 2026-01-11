import BtnIcon from '@/assets/icons/btn-icon-02-prim.svg'
import BtnGost from '../commonUI/BtnGost'
import BaseSection from './baseComponents/BaseSection'
import Title from './baseComponents/Title'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

type ContentType = { category: string; name: string; text: string; img: string }

export const LinkToCategory = ({ item, isFirst }: { item: ContentType; isFirst?: boolean }) => {
    if (!item) return null;

    return (
        <Link
            href={`/catalog/${item.category}`}
            className={`${isFirst ? 'border-r-[2px] border-r-nav/30 pr-4' : 'pl-4 lg:pl-0'}`}
        >
            <div className='flex flex-col items-center max-w-[260px] mx-auto'>
                <div className='mb-5 w-[100px] h-[100px] rounded-lg flex items-center justify-center bg-primary'>
                    <Image src={item.img} width={64} height={64} alt='icon' />
                </div>
                <h3 className='text-xl font-semibold mb-2 text-center max-w-[200px]'>
                    {item?.name}
                </h3>
                <p className='text-center text-txt-dark opacity-50'>{item?.text}</p>
            </div>
        </Link>
    )
}

const PopularCategories = () => {
    const t = useTranslations('HomePage.popular_categories')
    const content: ContentType[] = [
        {
            category: 'lighting',
            name: t('categories.0.name'),
            text: t('categories.0.text'),
            img: '/icons/car-light.png'
        },
        {
            category: 'tools',
            name: t('categories.1.name'),
            text: t('categories.1.text'),
            img: '/icons/tools.png'
        },
        {
            category: 'control',
            name: t('categories.2.name'),
            text: t('categories.2.text'),
            img: '/icons/control.png'
        },
        {
            category: 'electric',
            name: t('categories.3.name'),
            text: t('categories.3.text'),
            img: '/icons/electric-wave.png'
        }
    ]

    return (
        <BaseSection className='py-9'>
            <Title tag='h2' styles='text-center'>
                {t('title')}
            </Title>
            <div className='hidden lg:grid grid-cols-4 gap-10 pt-10'>
                {content.map(item => (
                    <LinkToCategory key={item.category} item={item} />
                ))}
            </div>
            <div className='grid grid-cols-2 lg:hidden border-t-[2px] border-t-nav/30 py-4 mt-10'>
                {content.slice(0, 2).map((item, index) => (
                    <LinkToCategory key={item.category} item={item} isFirst={index === 0} />
                ))}
            </div>

            <div className='grid grid-cols-2 lg:hidden border-t-[2px] border-t-nav/30 py-4'>
                {content.slice(2, 4).map((item, index) => (
                    <LinkToCategory key={item.category} item={item} isFirst={index === 0} />
                ))}
            </div>
            <div className='flex justify-center mt-10 lg:mt-0'>
                <BtnGost variant='outlined' as='link' href='/catalog'>
                    <BtnIcon />
                    <span>{t('btn')}</span>
                </BtnGost>
            </div>
        </BaseSection>
    )
}

export default PopularCategories
