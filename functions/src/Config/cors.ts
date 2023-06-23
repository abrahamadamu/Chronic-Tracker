const origins = [
  "http://localhost:3000",
  "https://chronic-tracker.web.app",
  "https://chronic-tracker.firebaseapp.com",
];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (origins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export { corsOptions };
