import React, { Component } from "react";
import Header from "../components/MainPageContent/Header/Header";
import Gallery from "../components/MainPageContent/Gallery/Gallery";
import News from "../components/MainPageContent/News/News";
import Prize from "../components/MainPageContent/Prize/Prize";
import OurMission from "../components/MainPageContent/OurMission/OurMission";
import BestCar from "../components/MainPageContent/BestCar/BestCar";
import ContactUs from "../components/MainPageContent/ContactUs/ContactUs";
import Partners from "../components/MainPageContent/Partners/Partnert";
//styles
import classes from "../styles/MainPage.module.css";

class MainPage extends Component {
  render() {
    return (
      <React.Fragment>
        <section
          className={classes.Header}
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dxfogjj18/image/upload/f_auto/v1536671643/autoroku_assets/banner_image_v2.png)"
          }}
        >
          <Header />
        </section>
        <section className={classes.Content}>
          <BestCar />
        </section>
        <section className={classes.Gallery}>
          <Gallery />
        </section>
        <section className={classes.Content}>
          <News />
        </section>
        <section
          className={classes.Prize}
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dxfogjj18/image/upload/f_auto/v1536671643/autoroku_assets/prize_bg_lg.png)"
          }}
        >
          <Prize />
        </section>
        <section className={classes.OurMission}>
          <OurMission />
        </section>
        <section className={classes.Content}>
          <Partners />
        </section>
        <section className={classes.ContactUs}>
          <ContactUs />
        </section>
      </React.Fragment>
    );
  }
}

export default MainPage;
