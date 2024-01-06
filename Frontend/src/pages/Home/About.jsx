import MainNavigation from '../../Components/Navigation/MainNavigation';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <MainNavigation />
      <h2>About Us</h2>
      <p>
        Welcome to Ghumfir - Your Ultimate Travel Companion. We are passionate about providing
        an amazing travel experience for our users.
      </p>
      <h3>Our Team</h3>
      <p>
        Meet the talented individuals behind Ghumfir who work tirelessly to bring you the best
        travel solutions.
      </p>
      {/* Include information about team members here */}
      <h3>Our Mission</h3>
      <p>
        At Ghumfir, our mission is to make travel planning and exploration seamless and enjoyable
        for everyone.
      </p>
      <h3>Contact Us</h3>
      <p>
        Have questions or feedback? Feel free to reach out to us at <a href="mailto:info@ghumfir.com">info@ghumfir.com</a>.
      </p>
    </div>
  );
};

export default About;
