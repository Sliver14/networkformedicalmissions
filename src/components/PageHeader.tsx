import Link from "next/link";

interface PageHeaderProps {
  title: string;
  breadcrumb: { label: string; href?: string }[];
}

const PageHeader = ({ title, breadcrumb }: PageHeaderProps) => {
  return (
    <section className="page-header">
      <div 
        className="page-header-bg"
        style={{ backgroundImage: "url('/assets/images/backgrounds/page-header-bg-1-1.jpg')" }}
      ></div>
      <div className="container">
        <div className="page-header__inner">
          <h2>{title}</h2>
          <ul className="thm-breadcrumb list-unstyled">
            <li>
              <Link href="/">Home</Link>
            </li>
            {breadcrumb.map((item, index) => (
              <li key={index}>
                <span>/</span>
                {item.href ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  item.label
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
