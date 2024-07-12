import {express,cors,cookieParser,appRoutes, errorHanlderMiddleware} from './exports.js';

export default function createExpressApp(){
    const app = express();
    app.use(cors({origin:true, credentials:true}));
    app.use(express.json());    
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use("/api", appRoutes);
    app.use(errorHanlderMiddleware);
    return app;
};