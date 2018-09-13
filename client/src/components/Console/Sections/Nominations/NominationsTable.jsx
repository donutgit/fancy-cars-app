const NominationsTableStyles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  tableHeader: {
    backgroundColor: "#000",
    display: "flex",
    flexGrow: 1,
    padding: "0 24px 0 24px",
    minHeight: "48px"
  },
  tableHeaderCol: {
    flexBasis: "50%",
    "&:last-child": {
      paddingRight: "32px"
    }
  },
  addNewNom: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

export default NominationsTableStyles;