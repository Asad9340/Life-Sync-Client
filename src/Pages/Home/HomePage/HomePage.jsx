import Banner from '../../../components/Banner/Banner';
import BloodDonationFeatured from '../../../components/BloodDonationFeatured/BloodDonationFeatured';
import ContactUs from '../../../components/ContactUs/ContactUs';

function HomePage() {
  return (
    <>
      <Banner
        title="Join the Life-Saving Cause"
        subtitle="Be a hero, donate blood today"
        image="https://i.postimg.cc/QN7b68ms/mt-1802-slider-img02.jpg"
        buttonText1="Join as a donor"
        buttonText2="Search Donors"
      />
      <BloodDonationFeatured />
      <ContactUs
        contactNumber="01710101984"
        emailAddress="asadulimran1999@gmail.com"
      />
    </>
  );
}

export default HomePage;
