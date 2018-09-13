import React from "react";
import { dbStore } from "../firebase/firebase";
import AppDataContext from "../hoc/AppDataContext";

const withAppData = Component =>
  class WithAppData extends React.PureComponent {
    state = {
      pureData: [],
      nominations: [],
      allCars: [],
      error: true
    };

    componentWillMount() {
      // ------------FIRESTORE---------------
      const cachedHits = localStorage.getItem("AppData2");
      if (cachedHits) {
        const STATE = JSON.parse(cachedHits);
        console.warn('Taking data from local storage')
        this.setState({ ...STATE });
        return;
      }

      dbStore
        .collection("poll")
        .doc("nominations")
        .get()
        .then(doc => {
          if (doc.exists) {
            return Object.values(doc.data().list);
          } else {
            throw new Error("No such document - [nominations].");
          }
        })
        .then(nominations => {
          dbStore
            .collection("poll")
            .doc("cars")
            .onSnapshot(
              doc => {
                if (doc.exists) {
                  const pureData = doc.data();
                  const poll = {};

                  nominations.forEach(nom => {
                    let filter = Object.values(doc.data()).filter(car => {
                      return car.nominations.includes(nom);
                    });
                    poll[nom] = filter;
                  });
                  const STATE = {
                    pureData: pureData,
                    nominations: nominations,
                    allCars: poll,
                    error: false
                  };
                  localStorage.setItem("AppData2", JSON.stringify(STATE));
                  this.setState({ ...STATE });
                  // this.setState({
                  //   pureData: pureData,
                  //   nominations: nominations,
                  //   allCars: poll,
                  //   error: false
                  // });
                } else {
                  console.log("No such document - [cars].");
                }
              },
              error => {
                console.log("Something went wrong!", error);
              }
            );
        })
        .catch(error => {
          console.log("Something went wrong!", error);
        });
    }

    render() {
      console.log('[APP DATA HOC]', this.state);
      return (
        <AppDataContext.Provider
          value={{
            state: this.state
          }}
        >
          <Component />
        </AppDataContext.Provider>
      );
    }
  };

export default withAppData;
