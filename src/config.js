console.log("process.env : ", process.env)

export default {
    apiAdress: process.env.REACT_APP_API_ADDRESS || "http://localhost:3000"
}