const CarCardStyles = {
  card: {
    width: "100%",
    maxWidth: 340,
    margin: "auto",
    position: "relative"
  },
  media: {
    height: 200
  },
  inputMarkText: {
    fontSize: "1.5rem",
    width: "100%"
  },
  inputModelText: {
    fontSize: "0.875rem"
  },
  buttonsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  voteButtons: {
    margin: "0 4px"
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0
  },
  DefaultCard: {
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
    "&$ActiveCard": {
      "&:before": {
        borderColor: "#d22730"
      }
    },
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      boxSizing: "border-box",
      border: "3px solid transparent"
    }
  },
  Checked: {
    position: "absolute",
    color: "#fff",
    bottom: 0,
    right: 0,
    transform: "translate3d(110%, 110%, 0)",
    transition: "transform 0.3s",
    zIndex: 10,
    "&:before": {
      content: "''",
      display: "block",
      borderColor: "transparent transparent #d22730",
      borderStyle: "solid",
      borderWidth: "0 0 70px 70px",
      height: 0,
      width: 0
    }
  },
  ActiveCard: {
    "& $Checked": {
      transform: " translateZ(0)"
    }
  },
  OverlayWrap: {
    transition: "opacity 0.4s",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box"
  },
  IconButton: {
    position: "absolute",
    top: 0,
    right: 0,
    pointerEvents: "auto"
  }
};

export default CarCardStyles;
