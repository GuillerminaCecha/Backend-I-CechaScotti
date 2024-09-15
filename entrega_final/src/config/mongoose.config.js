import { connect, Types } from "mongoose";

const connectDB = () => {
    const URI = "mongodb+srv://guillerminacecha:TadyB9DXsltXEQBc@clusterguillermina.eahoq3w.mongodb.net/";

    const options = {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
        dbName: "ecommerce",
    };

    connect(URI, options)
        .then(() => console.log("Conectado a MongoDB"))
        .catch((err) => console.error("Error al conectar con MongoDB", err));
};

const isValidID = (id) => {
    return Types.ObjectId.isValid(id);
};

export default { 
    connectDB, isValidID,
};