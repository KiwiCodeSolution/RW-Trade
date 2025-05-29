'use client'
// import { useRouter } from 'next/router';
import { useRouter } from 'next/compat/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Breadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    if (router.asPath !== '/') {
      const pathArray = router.asPath.split('/').filter((x) => x !== '');
      const breadcrumbItems = pathArray.map((path, index) => {
        const href = '/' + pathArray.slice(0, index + 1).join('/');
        const text = path
          .split('-')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
        return { href, text };
      });

      setBreadcrumbs([{ href: '/', text: 'Home' }, ...breadcrumbItems]);
    }
  }, [router.asPath]);

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="breadcrumb">
      {breadcrumbs.map((crumb, index) => (
        <span key={crumb.href} className="breadcrumb-item">
          {index < breadcrumbs.length - 1 ? (
            <Link href={crumb.href}>
              <a>{crumb.text}</a>
            </Link>
          ) : (
            <span>{crumb.text}</span>
          )}
          {index < breadcrumbs.length - 1 && <span> / </span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;