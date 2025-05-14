import axios from 'axios';
import router from '@/routes/router';
const userUrl = "http://localhost:3000/cinema/";


export async function createCinema(data) {
    try {
        return await axios.post(userUrl + "createCinema", data).then(res => res.data);
    } catch (error) {
        console.error("Error creating new cinemas:", error);
        await router.push("/error");
    }
}

export async function getAllCinemas() {
    try {
        return await axios.get(userUrl + "getAllCinemas").then(res => res.data.data.cinemas);
    } catch (error) {
        console.error("Error finding cinemas:", error);
        await router.push("/error");
    }
}

export async function deleterCinema(id) {
    try {
        return await axios.delete(userUrl + "deleteCinema", id).then(res => res.data);
    } catch (error) {
        console.error("Error deleting cinema:", error);
        await router.push("/error");
    }
}
