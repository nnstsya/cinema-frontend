import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";


let stripePromise;

const initializeStripe = async () => {
  stripePromise = await loadStripe("pk_test_51RVAJuQqgpmzaCqzmRQktxLVsfgbIZWhML0oEFBlPnpSiX4eMVrnsRO2YwuF0yCWxzbWWL4pgLNPw27xMK5CoIuF00TKvsDHpX");
};

initializeStripe();
const payUrl = "http://localhost:3000/pay/buyTicket";

export const buyTickets = async (email, sessionId, emailPlace) => {
    const data = {
        email : email,
        sessionId: sessionId,
        emailPlace: emailPlace
    }

    const session = await axios.post(payUrl, data).then(res => res.data.stripeSession);

    await stripePromise.redirectToCheckout({
        sessionId: session.id
    });
};