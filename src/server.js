import cookieParser from 'cookie-parser';
export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());


}
