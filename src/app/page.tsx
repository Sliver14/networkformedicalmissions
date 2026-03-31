import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";

export const dynamic = "force-dynamic";

export default async function Home() {
  const upcomingEvents = await prisma.event.findMany({
    where: { isActive: true },
    orderBy: { startDate: "asc" },
    take: 3,
  });

  const latestNews = await prisma.news.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: {
      _count: {
        select: { comments: { where: { isApproved: true } } }
      }
    }
  });

  return (
    <div className="flex flex-col w-full">
      <HeroSlider />

      {/* Welcome Section */}
      <section className="welcome-one py-[60px] lg:py-[100px]">
        <div className="container">
          <div className="flex flex-wrap lg:flex-nowrap gap-[40px] lg:gap-[70px]">
            <div className="w-full lg:w-1/2">
              <div className="welcome-one__left relative">
                <div className="welcome-one__img-box relative before:hidden md:before:block before:absolute before:top-0 before:left-[-60px] before:h-[330px] before:w-[30px] before:bg-cyan-500 before:content-['']">
                  <Image src="/22.jpeg" alt="Medical Mission" width={600} height={500} className="w-full h-auto rounded-xl md:rounded-none" />
                  <div className="welcome-one__img-box-2 hidden md:block absolute bottom-[-30px] left-[-60px]">
                    <Image src="/8.jpeg" alt="Medical Mission" width={320} height={250} />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="welcome-one__right">
                <div className="section-title">
                  <span className="section-title__tagline text-cyan-500 font-black">Welcome to NMM</span>
                  <h2 className="section-title__title text-[#1f2230] font-black text-[32px] md:text-[50px] leading-[40px] md:leading-[62px]">Sharing God's Love Through Medical Care</h2>
                </div>
                <p className="welcome-one__right-text text-[16px] md:text-[18px] leading-[26px] md:leading-[30px] text-gray-500">
                  We welcome Christian medical missionaries, health care professionals, partners as well as all those with a passion for providing medical, relief and community support services to hurting people around the world.
                </p>
                <div className="welcome-one__our-mission-and-story flex flex-col sm:flex-row mt-[38px] gap-6 sm:gap-8">
                  <div className="welcome-one__mission-and-story-single">
                    <h3 className="text-[18px] md:text-[20px] font-black leading-[30px] mb-[10px] md:mb-[15px]"><i className="fas fa-arrow-circle-right text-cyan-500 mr-2"></i> Our Mission</h3>
                    <p className="text-[15px] md:text-[16px]">To share and promote the knowledge of God’s love through His Son, Jesus Christ, by providing quality healthcare.</p>
                  </div>
                  <div className="welcome-one__mission-and-story-single">
                    <h3 className="text-[18px] md:text-[20px] font-black leading-[30px] mb-[10px] md:mb-[15px]"><i className="fas fa-arrow-circle-right text-cyan-500 mr-2"></i> Our Impact</h3>
                    <p className="text-[15px] md:text-[16px]">Fostering community development and Christian missionary impact across nations.</p>
                  </div>
                </div>
                <Link href="/about" className="thm-btn welcome-one__btn mt-[30px] md:mt-[54px]">
                  <i className="fas fa-arrow-circle-right"></i> Read More About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Boxes Section */}
      <section className="three-boxes">
        <div className="flex flex-wrap lg:flex-nowrap">
          {[
            { title: "Associate Membership", text: "Join our global network of medical professionals.", link: "/membership/associate", color: "bg-cyan-500" },
            { title: "Become a Volunteer", text: "Lend your skills to help those in need.", link: "/volunteers", color: "bg-cyan-600" },
            { title: "Partner with Us", text: "Support our projects and expand our reach.", link: "/support", color: "bg-cyan-700" }
          ].map((box, i) => (
            <div key={i} className={`w-full lg:w-1/3 ${box.color} p-[40px_30px] md:p-[60px_50px_60px] text-white transition-all`}>
              <div className="three-boxes__single">
                <h3 className="text-[24px] md:text-[30px] font-black mb-[10px] md:mb-[15px]">{box.title}</h3>
                <p className="text-[16px] md:text-[18px] opacity-90 mb-[20px] md:mb-[30px]">{box.text}</p>
                <Link href={box.link} className="bg-white text-gray-900 px-6 py-3 rounded font-black hover:bg-gray-100 transition-colors inline-block">
                  <i className="fas fa-arrow-circle-right mr-2 text-cyan-500"></i> {i === 2 ? "Donate Now" : i === 1 ? "Apply Today" : "Join Now"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="events-one py-[60px] md:py-[100px]">
        <div className="container">
          <div className="flex flex-wrap items-end mb-[30px] md:mb-[50px]">
            <div className="w-full lg:w-2/3">
              <div className="section-title mb-0">
                <span className="section-title__tagline font-black">Upcoming Events</span>
                <h2 className="section-title__title font-black">Check latest upcoming events</h2>
              </div>
            </div>
            <div className="w-full lg:w-1/3 mt-4 lg:mt-0 text-left lg:text-right">
              <Link href="/events" className="thm-btn">
                <i className="fas fa-arrow-circle-right"></i> View All Events
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="events-one__single group">
                <div className="events-one__img">
                  <Image src={event.image || "/assets/images/resources/events-one-img-1.jpg"} alt={event.title} width={400} height={300} className="w-full object-cover" />
                  <div className="events-one__date-box">
                    <p>{event.startDate ? new Date(event.startDate).getDate() : "00"} <br /> {event.startDate ? new Date(event.startDate).toLocaleString('default', { month: 'short' }) : "Mon"}</p>
                  </div>
                  <div className="absolute inset-0 bg-[#1f2230] opacity-0 group-hover:opacity-80 transition-all duration-500"></div>
                  <div className="events-one__bottom">
                    <p><i className="far fa-clock text-cyan-500 mr-1"></i> {event.startDate ? new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "10:00 am"}</p>
                    <h3 className="events-one__bottom-title">
                      <Link href={`/events/${event.slug}`}>{event.title}</Link>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="news-two relative py-[150px_0_70px] mt-[-50px]">
        <div className="news-two-bg absolute inset-0 -z-10 bg-no-repeat bg-cover grayscale" style={{ backgroundImage: "url('/assets/images/backgrounds/news-two-bg.jpg')" }}>
          <div className="absolute inset-0 bg-[#1f2230] opacity-90"></div>
        </div>
        <div className="container relative z-10">
          <div className="section-title text-center">
            <span className="section-title__tagline font-black">Get Daily Updates</span>
            <h2 className="section-title__title text-white font-black">Latest news & articles directly coming from the blog</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {latestNews.map((news) => (
              <div key={news.id} className="news-two__single group">
                <div className="news-two__img-box">
                  <div className="news-two__img relative">
                    <Image src={news.image || "/31.jpeg"} alt={news.title} width={400} height={250} className="w-full h-[250px] object-cover" />
                    <Link href={`/news/${news.slug}`} className="absolute inset-0 bg-cyan-500/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center text-white text-[26px]">
                      <i className="fas fa-link"></i>
                    </Link>
                  </div>
                  <div className="news-two__date">
                    <p>{news.publishedAt ? new Date(news.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Recently"}</p>
                  </div>
                </div>
                <div className="news-two__content bg-white p-[30px_40px_30px]">
                  <ul className="news-two__meta list-none p-0 m-0 flex mb-[15px]">
                    <li className="flex items-center text-[14px] font-black text-gray-400 mr-[15px]"><i className="fas fa-eye text-cyan-500 mr-1"></i> {Number(news.views)}</li>
                    <li className="flex items-center text-[14px] font-black text-gray-400 mr-[15px]"><i className="fas fa-heart text-cyan-500 mr-1"></i> {Number(news.likes)}</li>
                    <li className="flex items-center text-[14px] font-black text-gray-400 mr-[15px]"><i className="fas fa-comments text-cyan-500 mr-1"></i> {news._count.comments}</li>
                  </ul>
                  <h3 className="news-two__title text-[26px] font-black leading-[36px] mb-[11px]">
                    <Link href={`/news/${news.slug}`} className="text-[#1f2230] hover:text-cyan-500 transition-colors line-clamp-2">{news.title}</Link>
                  </h3>
                  <Link href={`/news/${news.slug}`} className="thm-btn news-two__btn !p-[10px_25px] !text-[12px] mt-4">
                    <i className="fas fa-arrow-circle-right"></i> Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
