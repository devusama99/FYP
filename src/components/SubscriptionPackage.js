import {
  makeStyles,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import BoxContainerWhite from "./BoxContainerWhite";
import PaymentSubscriptionTemplate from "./PaymentSubscriptionTemplate";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const useStyle = makeStyles((theme) => ({
  content: {
    width: "98.5%",
    boxSizing: "border-box",
    margin: theme.spacing(7),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(7),
      width: "100%",
    },

    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2),
    },
  },
  subscriptionHeading: {
    fontWeight: "bold",
  },
  selectPlanHeading: {
    fontWeight: "bold",
    marginTop: theme.spacing(3),
  },
  subscriptionCardsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(3),
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  subscriptionCards: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(3),
    boxShadow: " 6px 2px 15px -3px rgba(0, 0, 0, 0.06)",
    width: "85%",
    [theme.breakpoints.up("md")]: {
      width: "32%",
      padding: theme.spacing(2),
      marginTop: theme.spacing(0),
    },
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.primary.light,
    borderRadius: "10px",
  },
  planFeatures: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  bgSecondary: {
    backgroundColor: theme.palette.secondary.light,
  },
  mt2: {
    marginTop: theme.spacing(2),
  },
  InputWidth: {
    minWidth: "250px",
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 120,
  },
  saveBtn: {
    backgroundImage: `linear-gradient(95.47deg, #0067B1 0.51%, #008181 99.64%)`,
    color: theme.palette.light.main,
    marginTop: theme.spacing(2),
    boxShadow: "none",
    display: "block",
    minWidth: "100px",
  },
}));

function SubscriptionPackage() {
  const classes = useStyle();

  //   Select

  const [plan, setPlan] = useState("");

  const handleChange = (event) => {
    setPlan(event.target.value);
  };

  const { REACT_APP_BACKEND: BACKEND } = process.env;
  const { REACT_APP_STRIPE_KEY: STRIPE_KEY } = process.env;
  const [stripData, setStripeData] = useState({});

  const [subscriptions, setSubscriptions] = useState([]);

  const [snackData, setSnackData] = useState({
    type: "",
    message: "",
    open: false,
  });

  const sendPayment = (token) => {
    console.log(token);
    const body = {
      token,
      ...stripData,
    };

    return axios
      .post(
        "https://intelligenie-backend.herokuapp.com/userRouter/checkout",
        body
      )
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  function getSubscriptions() {
    setSnackData({ ...snackData, open: false });
    var config = {
      method: "get",
      url: `${BACKEND}/userRouter/viewAllSubscription`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setSubscriptions(response.data);
      })
      .catch(function (error) {
        setSnackData({
          type: "error",
          message: "Error getting subscriptions packages",
          open: false,
        });
      });
  }

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <div className={classes.content}>
      <BoxContainerWhite>
        <Typography
          variant={"h6"}
          color={"secondary"}
          className={classes.subscriptionHeading}
        >
          Subscription Packages:
        </Typography>
        <div className={classes.subscriptionCardsContainer}>
          {subscriptions.map((ele, i) => (
            <div className={classes.subscriptionCards}>
              <Typography
                variant={"h5"}
                color={"primary"}
                className={classes.bold}
              >
                {ele.SubscriptionName}
              </Typography>
              <Typography
                variant={"h6"}
                color={"primary"}
                className={classes.bold}
                gutterBottom
              >
                {ele.SubscriptionPrice}$/Month
              </Typography>
              <div className={classes.planFeatures}>
                {ele.SubscriptionFeatures.map((item, i) => (
                  <Typography variant={"body2"} gutterBottom>
                    {item}
                  </Typography>
                ))}
              </div>
              <StripeCheckout
                stripeKey={STRIPE_KEY}
                token={sendPayment}
                name={ele.SubscriptionName}
                amount={ele.SubscriptionPrice * 100}
              >
                <br />
                <br />
                <Button
                  variant="outlined"
                  onClick={() =>
                    setStripeData({
                      subscriptionName: ele.SubscriptionName,
                      totalamount: ele.SubscriptionPrice,
                      receipt_email: JSON.parse(localStorage.getItem("user"))
                        .userEmail,
                      subsId: ele._id,
                      userId: JSON.parse(localStorage.getItem("user"))._id,
                    })
                  }
                >
                  Subscribe
                </Button>
              </StripeCheckout>
            </div>
          ))}
        </div>
        {/* <Typography
          variant={"h6"}
          color={"secondary"}
          className={classes.selectPlanHeading}
        >
          Select Plan:
        </Typography>
        <div>
          <Typography variant={"body2"} className={classes.mt2}>
            Features and services of IntelliGenie are dependent on your
            <span className={classes.bold}> Subscription Plan</span>. We highly
            recommend <span className={classes.bold}>premium plan</span> the get
            full access of features and services{" "}
          </Typography>
          <Typography variant={"body2"} className={classes.mt2}>
            Select subscription plan according to your needs
          </Typography>
          <FormControl
            variant="standard"
            className={classes.formControl}
            color={"primary"}
          >
            <InputLabel id="demo-simple-select-filled-label">
              Select Plan
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={plan}
              onChange={handleChange}
              className={classes.InputWidth}
            >
              <MenuItem selected value={"free"}>
                Free
              </MenuItem>
              <MenuItem value={"basic"}>Basic</MenuItem>
              <MenuItem value={"premium"}>Premium</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" className={classes.saveBtn}>
            Save
          </Button>
        </div> */}
      </BoxContainerWhite>
    </div>
  );
}

export default SubscriptionPackage;
