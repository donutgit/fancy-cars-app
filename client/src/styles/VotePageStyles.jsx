const VotePageStyles = {
  Root: {
    flexGrow: 1,
    position: "relative",
    boxSizing: "border-box",
    width: "100%",
    // maxWidth: "1664px",
    margin: "auto",
    display: 'flex',
    flexWrap: 'nowrap',
  },
  NavigationWrap: {
    backgroundColor: "#14171b",
    height: "calc(100vh - 52px)",
    width: "240px",
    overflow: "hidden",
    boxSizing: "border-box",
    flexShrink: '0',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  MainWrap: {
    position: 'relative',
    width: '100%',
    flexGrow: '1',
    height: "calc(100vh - 52px)",
    overflowX: "hidden",
    overflowY: "auto",
    boxSizing: "border-box",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    backgroundColor: "#1a1d22",
  },
  LoadingCircle: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: 'auto'
  },
  Instructions: {
    color: "#fff"
  },
  Stepper: {
    backgroundColor: "#14171b",
    padding: "0",
    overflow: "auto"
  },
  StepRoot: {
    position: 'relative',
    borderBottom: '1px solid #333333',
    borderLeft: "3px solid transparent",
    transition: "all 0.4s ease-out",
    "&:hover": {
      backgroundColor: '#1a2027'
    }
  },
  ActiveStep: {
    backgroundColor: '#1a2027',
    borderLeftColor: '#d22730',
    // borderBottomColor: '#252b38 !important',
  },
  CompletedStep: {
    backgroundColor: '#1a2027',
    borderLeftColor: '#d22730',
    // borderBottomColor: '#252b38 !important',
  },
  StepButton: {
    boxSizing: "border-box",
    margin: "0",
    padding: "0",
    height: "50px",
  },
  StepIcon: {
    padding: "20px 20px 20px 17px",
    backgroundColor: "#1a2027",
    height: "50px",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  StepLabel: {
    color: "#757575"
  },
  nominations: {
    padding: "15px",
    display: "grid",
    gridGap: "30px",
    justifyContent: "center",
    gridAutoRows: "minmax(100px, auto)",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))"
  },
  controls: {
    zIndex: "10",
    position: "fixed",
    left: "calc(50% + 240px)",
    bottom: 0,
    transform: "translate(calc(-50% - 120px), 0)",
    boxSizing: "border-box",
    margin: "0 auto",
    color: "#00BCD4",
    border: "1px solid",
    backgroundColor: "#14171b",
    boxShadow: "-4px 10px 16px 1px rgba(0, 0, 0, 0.09)",
    transition: "all 700ms cubic-bezier(0.19, 1, 0.22, 1)"
  },
  controlButtons: {
    display: "flex",
    justifyContent: "center"
  },
  choosedCar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "200px",
    alignItems: "center",
    color: "#8c8c8c",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    fontSize: "13px",
    textAlign: "center"
  },
  sidebarNavItemText: {
    letterSpacing: ".2em",
    fontSize: "10px",
    textTransform: "uppercase",
    textAlign: "left",
    display: "flex",
    flexFlow: "column nowrap",
    marginLeft: "5px",
    "& .textEllipsis": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      "-webkitBoxOrient": "vertical",
      display: "-webkit-box",
      "-webkitLineClamp": 1
    },
    "& .active": {
      color: "#c31f28"
    }
  },
  SidebarTitle: {
    margin: "20px",
    fontSize: "12px",
    color: "#525252",
    fontWeight: "700",
    textTransform: 'uppercase',
    boxSizing: 'border-box'
  },
  Social: {
    marginBottom: "1em"
  },
  ReactLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0",
    // backgroundColor: "#12171c",
    "& img": {
      height: "50px"
    }
  }
};

export default VotePageStyles;
